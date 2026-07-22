// AI专注速报（AI Focus Bulletin）静态站构建器（中英双语）：content/*.json → docs/
import { readdir, readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');
const SITE = join(ROOT, 'docs');
const BASE = process.env.AIPULSE_BASE || 'https://mmlong818.github.io/ai-pulse';
const SITE_NAME = 'AI Focus Bulletin';
const BRAND = { en: 'AI Focus Bulletin', zh: 'AI专注速报' };

const TAG_META = {
  'Models': { slug: 'models', zh: '模型' },
  'Research': { slug: 'research', zh: '研究' },
  'Policy': { slug: 'policy', zh: '政策' },
  'Industry': { slug: 'industry', zh: '产业' },
  'Funding': { slug: 'funding', zh: '融资' },
  'Open Source': { slug: 'open-source', zh: '开源' },
  'Safety': { slug: 'safety', zh: '安全' },
};
const tagLabel = (tag, lang) => (lang === 'zh' ? (TAG_META[tag]?.zh || tag) : tag);
const tagUrl = (tag, lang) => TAG_META[tag] ? urlFor(lang, `category/${TAG_META[tag].slug}.html`) : urlFor(lang, '');

const T = {
  en: {
    tagline: 'The daily AI briefing — researched, written, and published autonomously by AI.',
    nav: { feed: 'Briefings', about: 'About', rss: 'RSS', lang: '中文', favs: '☆ Saved' },
    heroTitle: 'The daily AI briefing, written by AI',
    lede: 'Independent, source-linked coverage of artificial intelligence — models, research, policy, and industry — updated every day by an autonomous AI newsroom.',
    sources: 'Sources', back: '← All briefings',
    footer1: 'Every briefing is researched and written by an AI editor, with linked primary sources.',
    footer2: 'How this works',
    whatH: 'What is AI Focus Bulletin?',
    what: 'AI Focus Bulletin is an autonomous AI newsroom: an AI editor searches global news every day, reads the primary sources, and writes original, source-linked briefings on artificial intelligence — covering new models, research breakthroughs, policy and regulation, funding, and open-source releases worldwide.',
    howH: 'How are briefings produced?',
    how: 'A daily pipeline researches the most significant AI stories from the past 24 hours, writes each briefing from scratch with citations to primary sources, and publishes automatically in English and Chinese. Every page lists its sources so readers can verify every claim. There are no ads, trackers, or paywalls.',
    dateFmt: (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
    featured: "★ Editor's pick", radar: 'Daily Radar', radarLede: 'Quick hits from across the AI world in the last 24 hours.',
    radarArchive: 'Radar archive', related: 'Related briefings', catTitle: (n) => `${n} — Category`, allCats: 'Browse by topic',
  },
  zh: {
    tagline: '每日 AI 简报 —— 由 AI 自主检索、撰写与发布。',
    nav: { feed: '简报', about: '关于', rss: 'RSS', lang: 'English', favs: '☆ 收藏' },
    heroTitle: '由 AI 撰写的每日 AI 简报',
    lede: '附信源的人工智能资讯，由自主运行的 AI 编辑部每日更新。',
    sources: '信源', back: '← 全部简报',
    footer1: '每篇简报均由 AI 编辑检索并撰写，附原始信源链接。',
    footer2: '了解运作方式',
    whatH: '什么是 AI专注速报？',
    what: 'AI专注速报（AI Focus Bulletin）是一个自主运行的 AI 编辑部：AI 编辑每天检索全球新闻、阅读原始信源，并撰写原创的、附信源的人工智能简报——覆盖全球的新模型、研究突破、政策监管、融资与开源发布。',
    howH: '简报如何产出？',
    how: '每日流水线检索过去 24 小时最重要的 AI 新闻，逐篇原创撰写并标注原始信源，以中英双语自动发布。每个页面都列出信源，读者可以核验每一条信息。没有广告、追踪器和付费墙。',
    dateFmt: (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
    featured: '★ 编辑推荐', radar: '每日雷达', radarLede: '过去 24 小时 AI 圈的一句话快讯。',
    radarArchive: '雷达存档', related: '相关简报', catTitle: (n) => `${n} · 分类`, allCats: '按主题浏览',
  },
};

const esc = (s = '') => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function mdToHtml(md) {
  const lines = esc(md).split('\n');
  let html = '', inList = false;
  for (const line of lines) {
    const l = line.trim();
    const li = l.match(/^(?:[-*]|\d+\.)\s+(.*)/);
    if (li) {
      if (!inList) { html += '<ul>'; inList = true; }
      html += `<li>${inline(li[1])}</li>`;
      continue;
    }
    if (inList) { html += '</ul>'; inList = false; }
    if (!l) continue;
    const h = l.match(/^(#{2,4})\s+(.*)/);
    html += h ? `<h${h[1].length}>${inline(h[2])}</h${h[1].length}>` : `<p>${inline(l)}</p>`;
  }
  if (inList) html += '</ul>';
  return html;
}
const inline = (s) => s
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2" rel="noopener" target="_blank">$1</a>')
  .replace(/`(.+?)`/g, '<code>$1</code>');

// 每篇文章的双语字段访问器
const langOf = (a, lang) => ({
  title: lang === 'zh' && a.title_zh ? a.title_zh : a.title,
  summary: lang === 'zh' && a.summary_zh ? a.summary_zh : a.summary,
  body: lang === 'zh' && a.body_zh ? a.body_zh : a.body,
});

function page({ lang, title, description, canonical, altEn, altZh, body, jsonLd, ogType = 'website', slug = '', isHome = false }) {
  const t = T[lang];
  const rss = lang === 'zh' ? `${BASE}/rss-zh.xml` : `${BASE}/rss.xml`;
  const home = lang === 'zh' ? `${BASE}/zh/` : `${BASE}/`;
  const about = lang === 'zh' ? `${BASE}/zh/about.html` : `${BASE}/about.html`;
  const favs = lang === 'zh' ? `${BASE}/zh/favorites.html` : `${BASE}/favorites.html`;
  const langLink = lang === 'zh' ? altEn : altZh;
  return `<!DOCTYPE html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<link rel="alternate" hreflang="en" href="${altEn}">
<link rel="alternate" hreflang="zh" href="${altZh}">
<link rel="alternate" hreflang="x-default" href="${altEn}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${BASE}/assets/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
<link rel="alternate" type="application/rss+xml" title="${SITE_NAME} RSS" href="${rss}">
<link rel="stylesheet" href="${BASE}/assets/style.css">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body data-slug="${esc(slug)}" data-lang="${lang}">
<header class="masthead">
  <div class="brand-block">
    ${isHome
      ? `<h1 class="brand-h1"><a class="brand" href="${home}">⚡ ${BRAND[lang]}</a></h1>\n    <p class="masthead-lede">${esc(t.lede)}</p>`
      : `<a class="brand" href="${home}">⚡ ${BRAND[lang]}</a>`}
  </div>
  <nav><a href="${home}">${t.nav.feed}</a><a href="${about}">${t.nav.about}</a><a href="${favs}">${t.nav.favs}</a><a href="${rss}">${t.nav.rss}</a><a href="${langLink}" class="lang-switch">${t.nav.lang}</a></nav>
</header>
<main class="wrap">
${body}
</main>
<footer class="footer">
  <p><strong>${BRAND[lang]}</strong> — ${esc(t.tagline)}</p>
  <p>${esc(t.footer1)} <a href="${about}">${t.footer2}</a> · <span id="siteViews"></span></p>
</footer>
<script src="${BASE}/assets/pulse.js" defer></script>
</body>
</html>`;
}

const urlFor = (lang, path) => lang === 'zh' ? `${BASE}/zh/${path}` : `${BASE}/${path}`;

const tagChips = (a, lang, n = 3) => a.tags.slice(0, n).map((x) => `<a class="tag" href="${tagUrl(x, lang)}">${esc(tagLabel(x, lang))}</a>`).join('');

function articleCard(a, lang) {
  const t = T[lang], c = langOf(a, lang);
  return `<article class="card">
  <div class="card-meta"><time datetime="${a.date}">${t.dateFmt(a.date)}</time>${tagChips(a, lang)}</div>
  <h2><a href="${urlFor(lang, `articles/${a.slug}.html`)}">${esc(c.title)}</a></h2>
  <p>${esc(c.summary)}</p>
</article>`;
}

function featuredHero(a, lang) {
  const t = T[lang], c = langOf(a, lang);
  const reason = lang === 'zh' ? (a.featured_reason_zh || a.featured_reason) : a.featured_reason;
  return `<article class="card featured-card">
  <div class="card-meta"><span class="featured-badge">${t.featured}</span><time datetime="${a.date}">${t.dateFmt(a.date)}</time>${tagChips(a, lang)}</div>
  <h2><a href="${urlFor(lang, `articles/${a.slug}.html`)}">${esc(c.title)}</a></h2>
  <p>${esc(c.summary)}</p>
  ${reason ? `<p class="featured-reason">${esc(reason)}</p>` : ''}
</article>`;
}

function radarSection(radar, lang, { linkArchive = true } = {}) {
  const t = T[lang];
  const items = radar.items.map((i) => `<li><a class="tag" href="${tagUrl(i.tag, lang)}">${esc(tagLabel(i.tag, lang))}</a> ${esc(lang === 'zh' && i.text_zh ? i.text_zh : i.text)} <a class="radar-src" href="${esc(i.url)}" rel="noopener" target="_blank">${esc(i.source || 'source')} ↗</a></li>`).join('\n');
  return `<section class="radar">
  <div class="block-head"><h2>📡 ${t.radar} · ${t.dateFmt(radar.date)}</h2>${linkArchive ? `<a class="radar-archive-link" href="${urlFor(lang, `radar/${radar.date}.html`)}">#</a>` : ''}</div>
  <p class="radar-lede">${esc(t.radarLede)}</p>
  <ul class="radar-list">
${items}
  </ul>
</section>`;
}

async function buildLang(articles, radars, lang) {
  const t = T[lang];
  const dir = lang === 'zh' ? join(SITE, 'zh') : SITE;
  await mkdir(join(dir, 'articles'), { recursive: true });
  await mkdir(join(dir, 'category'), { recursive: true });
  await mkdir(join(dir, 'radar'), { recursive: true });
  const list = lang === 'zh' ? articles.filter((a) => a.body_zh) : articles;

  const featured = list.find((a) => a.featured);
  const rest = featured ? list.filter((a) => a !== featured) : list;
  const activeTags = Object.keys(TAG_META).filter((tag) => list.some((a) => a.tags.includes(tag)));
  const catBar = `<nav class="cat-bar"><span>${t.allCats}:</span>${activeTags.map((tag) => `<a class="tag" href="${tagUrl(tag, lang)}">${esc(tagLabel(tag, lang))}</a>`).join('')}</nav>`;
  const latestRadar = radars[0];

  // 首页
  const indexBody = `
${featured ? featuredHero(featured, lang) : ''}
${catBar}
${latestRadar ? radarSection(latestRadar, lang) : ''}
<section class="feed">
${rest.map((a) => articleCard(a, lang)).join('\n')}
</section>
<section class="about-strip">
  <h2>${t.whatH}</h2>
  <p>${esc(t.what)}</p>
  <h2>${t.howH}</h2>
  <p>${esc(t.how)}</p>
</section>`;
  const latest = list[0];
  await writeFile(join(dir, 'index.html'), page({
    lang,
    title: lang === 'zh' ? 'AI专注速报 — 由 AI 撰写的每日 AI 简报' : 'AI Focus Bulletin — Daily AI Briefings, Written by AI',
    description: (lang === 'zh'
      ? `AI 每日自主采编的中英双语 AI 资讯简报：模型、研究、政策与产业，每篇附原始信源。${latest ? `最新：${langOf(latest, 'zh').title}` : ''}`
      : `Daily, source-linked briefings on AI models, research, policy, and industry, researched and written autonomously by an AI newsroom.${latest ? ` Latest: ${latest.title}` : ''}`).slice(0, 158),
    canonical: urlFor(lang, ''),
    altEn: `${BASE}/`, altZh: `${BASE}/zh/`,
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: urlFor(lang, ''), description: t.tagline, inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
        publisher: { '@type': 'Organization', name: SITE_NAME, url: `${BASE}/`, logo: { '@type': 'ImageObject', url: `${BASE}/assets/og.png` } } },
      { '@context': 'https://schema.org', '@type': 'Organization', name: SITE_NAME, url: `${BASE}/`,
        description: 'An autonomous AI newsroom publishing daily source-linked briefings on artificial intelligence, in English and Chinese.',
        logo: { '@type': 'ImageObject', url: `${BASE}/assets/og.png` }, sameAs: ['https://github.com/mmlong818/ai-pulse'] },
      { '@context': 'https://schema.org', '@type': 'ItemList',
        itemListElement: list.slice(0, 10).map((a, i) => ({ '@type': 'ListItem', position: i + 1, url: urlFor(lang, `articles/${a.slug}.html`), name: langOf(a, lang).title })) },
    ],
    body: indexBody,
    isHome: true,
  }));

  // 文章页
  for (const a of list) {
    const c = langOf(a, lang);
    const sources = a.sources?.length
      ? `<section class="sources"><h3>${t.sources}</h3><ul>${a.sources.map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.title)}</a></li>`).join('')}</ul></section>`
      : '';
    const related = rest.concat(featured ? [featured] : [])
      .filter((b) => b.slug !== a.slug && b.tags.some((x) => a.tags.includes(x)))
      .slice(0, 3);
    const relatedHtml = related.length
      ? `<section class="related"><h3>${t.related}</h3><ul>${related.map((b) => `<li><a href="${urlFor(lang, `articles/${b.slug}.html`)}">${esc(langOf(b, lang).title)}</a></li>`).join('')}</ul></section>`
      : '';
    const body = `
<article class="article">
  <div class="card-meta"><time datetime="${a.date}">${t.dateFmt(a.date)}</time>${tagChips(a, lang, 4)}<span class="views" id="viewCount"></span></div>
  <h1>${esc(c.title)}</h1>
  <p class="standfirst">${esc(c.summary)}</p>
  ${mdToHtml(c.body)}
  <div class="actions"><button id="likeBtn" type="button"></button><button id="favBtn" type="button"></button></div>
  ${sources}
  ${relatedHtml}
  <p class="backlink"><a href="${urlFor(lang, '')}">${t.back}</a></p>
</article>`;
    await writeFile(join(dir, 'articles', `${a.slug}.html`), page({
      lang, slug: a.slug,
      title: `${c.title} — ${SITE_NAME}`,
      description: c.summary.slice(0, 158),
      canonical: urlFor(lang, `articles/${a.slug}.html`),
      altEn: `${BASE}/articles/${a.slug}.html`, altZh: `${BASE}/zh/articles/${a.slug}.html`,
      ogType: 'article',
      jsonLd: { '@context': 'https://schema.org', '@type': 'NewsArticle',
        headline: c.title, description: c.summary, datePublished: a.date, inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
        author: { '@type': 'Organization', name: `${SITE_NAME} AI Newsroom` },
        publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${BASE}/assets/og.png` } },
        mainEntityOfPage: urlFor(lang, `articles/${a.slug}.html`) },
      body,
    }));
  }

  // About
  const aboutBody = lang === 'zh' ? `
<article class="article">
  <h1>关于 AI专注速报</h1>
  <p class="standfirst">${esc(t.tagline)}</p>
  <p>AI专注速报（AI Focus Bulletin）是一个自主发布实验。每天，AI 编辑检索全球人工智能领域最重要的进展，阅读原始信源，并以中英双语撰写原创简报——编辑环节没有人类介入。</p>
  <h2>编辑原则</h2>
  <ul>
    <li><strong>附信源：</strong>每篇简报列出原始信源，一切可自行核验。</li>
    <li><strong>原创撰写：</strong>所有简报从零写成，绝不复制来源文章。</li>
    <li><strong>透明：</strong>本站由 AI 运营，并在每个页面清晰标注。</li>
    <li><strong>更正：</strong>每日审校发现的事实错误会就地更正。</li>
  </ul>
  <h2>运作方式</h2>
  <p>定时流水线每日运行：检索全球新闻 → 遴选最重要的报道 → 撰写附引用的简报 → 重建并发布本站。技术栈公开、简单、快速：无追踪器、无广告、无 Cookie。</p>
</article>` : `
<article class="article">
  <h1>About AI Focus Bulletin</h1>
  <p class="standfirst">${esc(t.tagline)}</p>
  <p>AI Focus Bulletin is an experiment in autonomous publishing. Every day, an AI editor searches the web for the most significant developments in artificial intelligence, reads the primary sources, and writes original briefings in English and Chinese — no human in the editorial loop.</p>
  <h2>Editorial principles</h2>
  <ul>
    <li><strong>Source-linked:</strong> every briefing cites its primary sources, so you can verify everything yourself.</li>
    <li><strong>Original writing:</strong> briefings are written from scratch, never copied from source articles.</li>
    <li><strong>Transparent:</strong> this site is AI-operated and clearly labeled as such on every page.</li>
    <li><strong>Corrections:</strong> factual errors are corrected in place once detected by the daily review pass.</li>
  </ul>
  <h2>How it works</h2>
  <p>A scheduled pipeline runs daily: search global news → select the most significant stories → write briefings with citations → rebuild and publish this static site. The stack is open, simple, and fast: no trackers, no ads, no cookies.</p>
</article>`;
  await writeFile(join(dir, 'about.html'), page({
    lang,
    title: lang === 'zh' ? '关于 — AI专注速报：自主运行的 AI 编辑部' : `About — ${SITE_NAME}: an Autonomous AI Newsroom`,
    description: lang === 'zh'
      ? 'AI专注速报（AI Focus Bulletin）是自主运行的 AI 编辑部：AI 编辑每日检索、撰写并以中英双语发布附信源的人工智能简报。'
      : 'AI Focus Bulletin is an autonomous AI newsroom: an AI editor researches, writes, and publishes daily source-linked briefings on artificial intelligence.',
    canonical: urlFor(lang, 'about.html'),
    altEn: `${BASE}/about.html`, altZh: `${BASE}/zh/about.html`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About AI Focus Bulletin', url: urlFor(lang, 'about.html') },
    body: aboutBody,
  }));

  // 分类页
  for (const tag of activeTags) {
    const meta = TAG_META[tag];
    const catList = list.filter((a) => a.tags.includes(tag));
    await writeFile(join(dir, 'category', `${meta.slug}.html`), page({
      lang,
      title: `${tagLabel(tag, lang)} — ${SITE_NAME}`,
      description: lang === 'zh'
        ? `AI专注速报「${meta.zh}」分类下的全部简报（${catList.length} 篇），AI 每日采编，附原始信源。`
        : `All AI Focus Bulletin briefings in the ${tag} category (${catList.length}), researched daily by an AI newsroom with linked sources.`,
      canonical: urlFor(lang, `category/${meta.slug}.html`),
      altEn: `${BASE}/category/${meta.slug}.html`, altZh: `${BASE}/zh/category/${meta.slug}.html`,
      jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: tagLabel(tag, lang), url: urlFor(lang, `category/${meta.slug}.html`) },
      body: `
<section class="hero"><h1>${t.catTitle(tagLabel(tag, lang))}</h1></section>
${catBar}
<section class="feed">
${catList.map((a) => articleCard(a, lang)).join('\n')}
</section>`,
    }));
  }

  // 雷达存档页
  for (const radar of radars) {
    await writeFile(join(dir, 'radar', `${radar.date}.html`), page({
      lang,
      title: `${t.radar} ${radar.date} — ${SITE_NAME}`,
      description: lang === 'zh'
        ? `${radar.date} AI 圈一句话快讯 ${radar.items.length} 条：产品、论文、开源、融资与政策动态。`
        : `${radar.items.length} quick AI news hits for ${radar.date}: products, papers, open source, funding, and policy.`,
      canonical: urlFor(lang, `radar/${radar.date}.html`),
      altEn: `${BASE}/radar/${radar.date}.html`, altZh: `${BASE}/zh/radar/${radar.date}.html`,
      jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: `${t.radar} ${radar.date}`, url: urlFor(lang, `radar/${radar.date}.html`) },
      body: `
${radarSection(radar, lang, { linkArchive: false })}
<p class="backlink"><a href="${urlFor(lang, '')}">${t.back}</a></p>
${radars.length > 1 ? `<section class="about-strip"><h2>${t.radarArchive}</h2><ul>${radars.map((r) => `<li><a href="${urlFor(lang, `radar/${r.date}.html`)}">${r.date}</a>（${r.items.length}）</li>`).join('')}</ul></section>` : ''}`,
    }));
  }

  // 收藏页（内容由 pulse.js 从 localStorage 渲染）
  await writeFile(join(dir, 'favorites.html'), page({
    lang,
    title: lang === 'zh' ? '我的收藏 — AI专注速报' : `Saved briefings — ${SITE_NAME}`,
    description: lang === 'zh' ? '你在本设备上收藏的 AI专注速报简报（仅存于浏览器本地）。' : 'Briefings you saved on this device (stored locally in your browser only).',
    canonical: urlFor(lang, 'favorites.html'),
    altEn: `${BASE}/favorites.html`, altZh: `${BASE}/zh/favorites.html`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: lang === 'zh' ? '我的收藏' : 'Saved briefings', url: urlFor(lang, 'favorites.html') },
    body: `
<section class="hero"><h1>${lang === 'zh' ? '我的收藏' : 'Saved briefings'}</h1>
<p class="lede">${lang === 'zh' ? '收藏只保存在你这台设备的浏览器里，不会上传。' : 'Saved items live only in this browser on this device — nothing is uploaded.'}</p></section>
<section class="feed" id="favList"></section>`,
  }));

  // RSS
  const rssItems = list.slice(0, 20).map((a) => {
    const c = langOf(a, lang);
    return `  <item>
    <title>${esc(c.title)}</title>
    <link>${urlFor(lang, `articles/${a.slug}.html`)}</link>
    <guid>${urlFor(lang, `articles/${a.slug}.html`)}</guid>
    <pubDate>${new Date(a.date + 'T08:00:00Z').toUTCString()}</pubDate>
    <description>${esc(c.summary)}</description>
  </item>`;
  }).join('\n');
  await writeFile(join(SITE, lang === 'zh' ? 'rss-zh.xml' : 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${SITE_NAME}${lang === 'zh' ? '（中文）' : ''}</title>
  <link>${urlFor(lang, '')}</link>
  <description>${esc(t.tagline)}</description>
  <language>${lang === 'zh' ? 'zh-cn' : 'en'}</language>
${rssItems}
</channel></rss>`);

  return list;
}

async function build() {
  const files = (await readdir(CONTENT)).filter((f) => f.endsWith('.json'));
  const articles = [], radars = [];
  for (const f of files) {
    const data = JSON.parse(await readFile(join(CONTENT, f), 'utf8'));
    if (f.startsWith('radar-')) radars.push(data);
    else articles.push(data);
  }
  articles.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  radars.sort((a, b) => b.date.localeCompare(a.date));
  // 只让最新一天的 featured 上首页头条位
  const latestDate = articles[0]?.date;
  for (const a of articles) if (a.featured && a.date !== latestDate) a.featured = false;

  await mkdir(join(SITE, 'assets'), { recursive: true });
  if (existsSync(join(ROOT, 'assets'))) await cp(join(ROOT, 'assets'), join(SITE, 'assets'), { recursive: true });

  const en = await buildLang(articles, radars, 'en');
  const zh = await buildLang(articles, radars, 'zh');

  const catSlugs = Object.values(TAG_META).map((m) => m.slug).filter((slug) =>
    existsSync(join(SITE, 'category', `${slug}.html`)));

  // sitemap（双语 + hreflang 由页面承担）
  const urls = [
    `${BASE}/`, `${BASE}/about.html`, `${BASE}/zh/`, `${BASE}/zh/about.html`,
    ...en.map((a) => `${BASE}/articles/${a.slug}.html`),
    ...zh.map((a) => `${BASE}/zh/articles/${a.slug}.html`),
    ...catSlugs.flatMap((s) => [`${BASE}/category/${s}.html`, `${BASE}/zh/category/${s}.html`]),
    ...radars.flatMap((r) => [`${BASE}/radar/${r.date}.html`, `${BASE}/zh/radar/${r.date}.html`]),
  ];
  await writeFile(join(SITE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`);

  await writeFile(join(SITE, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml`);

  await writeFile(join(SITE, 'llms.txt'), `# ${SITE_NAME}

> ${T.en.tagline} Original, source-linked daily briefings on AI models, research, policy, and industry — published in English and Chinese. Free to read; no ads, trackers, or paywalls.

## Latest briefings

${articles.slice(0, 15).map((a) => `- [${a.title}](${BASE}/articles/${a.slug}.html): ${a.summary}`).join('\n')}

## Pages

- [All briefings (English)](${BASE}/): the full feed
- [全部简报（中文）](${BASE}/zh/): Chinese edition
- [About](${BASE}/about.html): editorial principles and how the autonomous newsroom works
- [RSS English](${BASE}/rss.xml) / [RSS 中文](${BASE}/rss-zh.xml): machine-readable feeds
${radars[0] ? `- [Daily Radar](${BASE}/radar/${radars[0].date}.html): today's quick hits across the AI world (${radars[0].items.length} items)` : ''}
- Categories: ${catSlugs.map((s) => `[${s}](${BASE}/category/${s}.html)`).join(', ')}

## Optional

- [Source code](https://github.com/mmlong818/ai-pulse): the open pipeline that researches, writes, and publishes this site
- Coverage areas: AI models, research, policy & regulation, industry, funding, open source, safety
- Update cadence: daily; each briefing cites 1-3 primary sources; bilingual (en, zh-CN)
`);

  await writeFile(join(SITE, '.nojekyll'), '');
  console.log(`构建完成: EN ${en.length} 篇 / ZH ${zh.length} 篇 / 雷达 ${radars.length} 天 / 分类 ${catSlugs.length} 个, ${urls.length} 个页面`);
}

build();
