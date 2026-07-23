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
  'AIGC': { slug: 'aigc', zh: 'AIGC' },
  'Agents': { slug: 'agents', zh: 'Agent' },
};
const tagLabel = (tag, lang) => (lang === 'zh' ? (TAG_META[tag]?.zh || tag) : tag);
const tagUrl = (tag, lang) => TAG_META[tag] ? urlFor(lang, `category/${TAG_META[tag].slug}.html`) : urlFor(lang, '');

const T = {
  en: {
    tagline: 'The daily AI briefing — researched, written, and published autonomously by AI.',
    nav: { about: 'About', rss: 'RSS', lang: '中文', favs: '☆ Saved' },
    heroTitle: 'The daily AI briefing, written by AI',
    lede: 'Source-linked AI news, updated daily by an autonomous AI newsroom.',
    sources: 'Sources', back: '← All briefings',
    footer1: 'Every briefing is researched and written by an AI editor, with linked primary sources.',
    footer2: 'How this works',
    whatH: 'What is AI Focus Bulletin?',
    what: 'AI Focus Bulletin is an autonomous AI newsroom: an AI editor searches global news every day, reads the primary sources, and writes original, source-linked briefings on artificial intelligence — covering new models, research breakthroughs, policy and regulation, funding, and open-source releases worldwide.',
    howH: 'How are briefings produced?',
    how: 'The pipeline runs twice a day (07:00 and 19:00 Beijing time). It gathers timestamped candidates from 17 first-tier RSS feeds and 29 official X accounts of AI labs via API, then an AI editor selects the most significant stories, verifies sources and publication dates, and writes each deep briefing plus the Daily Radar from scratch in English and Chinese. Every page lists its sources so readers can verify every claim. There are no ads, trackers, or paywalls.',
    dateFmt: (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
    featured: "★ Editor's pick", radar: 'Daily Radar', radarLede: 'Quick hits from across the AI world in the last 24 hours.',
    radarArchive: 'Radar archive', radarCalLede: 'Pick a date to see everything published that day.', searchPh: 'Search briefings and quick hits…', dayLede: 'All briefings and quick hits published that day.', related: 'Related briefings', catTitle: (n) => `${n} — Category`, allCats: 'Browse by topic',
    archive: 'Archive', archiveLede: 'Every briefing ever published, grouped by date.', moreLink: () => 'View the archive →',
  },
  zh: {
    tagline: '每日 AI 简报 —— 由 AI 自主检索、撰写与发布。',
    nav: { about: '关于', rss: 'RSS', lang: 'English', favs: '☆ 收藏' },
    heroTitle: '由 AI 撰写的每日 AI 简报',
    lede: '附信源的人工智能资讯，由自主运行的 AI 编辑部每日更新。',
    sources: '信源', back: '← 全部简报',
    footer1: '每篇简报均由 AI 编辑检索并撰写，附原始信源链接。',
    footer2: '了解运作方式',
    whatH: '什么是 AI专注速报？',
    what: 'AI专注速报（AI Focus Bulletin）是一个自主运行的 AI 编辑部：AI 编辑每天检索全球新闻、阅读原始信源，并撰写原创的、附信源的人工智能简报——覆盖全球的新模型、研究突破、政策监管、融资与开源发布。',
    howH: '简报如何产出？',
    how: '流水线每天运行两次（北京时间 7:00 与 19:00）：先从 17 个一级 RSS 信源和 29 个 AI 实验室官方 X 账号（API 直连）获取带真实时间戳的候选新闻，AI 编辑再遴选最重要的故事、核验信源与发布日期，以中英双语原创撰写深度简报与「每日雷达」快讯并自动发布。每个页面都列出信源，读者可以核验每一条信息。没有广告、追踪器和付费墙。',
    dateFmt: (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }),
    featured: '★ 编辑推荐', radar: '每日雷达', radarLede: '过去 24 小时 AI 圈的一句话快讯。',
    radarArchive: '雷达存档', radarCalLede: '点击日期查看当天发布的全部内容。', searchPh: '搜索简报与快讯…', dayLede: '当天发布的全部深度简报与一句话快讯。', related: '相关简报', catTitle: (n) => `${n} · 分类`, allCats: '按主题浏览',
    archive: '存档', archiveLede: '全部历史简报，按日期分组，永久留存。', moreLink: () => '查看历史记录 →',
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
<meta property="og:image" content="${BASE}/assets/${lang === 'zh' ? 'og.png' : 'og-en.png'}">
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
  <nav><a href="${lang === 'zh' ? `${BASE}/zh/archive.html` : `${BASE}/archive.html`}">${t.archive}</a><a href="${about}">${t.nav.about}</a><a href="${favs}">${t.nav.favs}</a><a href="${rss}">${t.nav.rss}</a><a href="${langLink}" class="lang-switch">${t.nav.lang}</a></nav>
</header>
<main class="wrap">
${body}
</main>
<footer class="footer">
  <p><strong>${BRAND[lang]}</strong>${lang === 'zh'
    ? ' - <a href="https://x.com/mmlong8" rel="noopener" target="_blank">猫叔</a>AI作品。'
    : ' - An AI work by <a href="https://x.com/mmlong8" rel="noopener" target="_blank">Uncle Cat</a>.'}</p>
  <p>${esc(t.footer1)} <a href="${about}">${t.footer2}</a> · <span id="siteViews"></span></p>
</footer>
<script src="${BASE}/assets/pulse.js" defer></script>
</body>
</html>`;
}

const urlFor = (lang, path) => lang === 'zh' ? `${BASE}/zh/${path}` : `${BASE}/${path}`;

// 英文页日期遵循美东时间；中文页北京时间
const shiftDay = (iso, n) => new Date(Date.parse(iso + 'T00:00:00Z') + n * 86400000).toISOString().slice(0, 10);
// 简报的"最佳时间戳"：优先新闻源头发布时刻（published），其次本站发布时刻（published_at）
const articleTs = (a) => (a.published && a.published.includes('T') ? a.published : a.published_at) || null;
const dispDate = (a, lang) => {
  const iso = articleTs(a);
  if (!iso) return (a.published && !a.published.includes('T')) ? a.published : a.date;
  return new Date(iso).toLocaleDateString('en-CA', { timeZone: lang === 'zh' ? 'Asia/Shanghai' : 'America/New_York' });
};
// 雷达刊期：北京第 N 天的刊覆盖美东 N-1 天 07:00 → N 天 07:00，英文页标 N-1
const radarDispDate = (radar, lang) => lang === 'en' ? shiftDay(radar.date, -1) : radar.date;

// 简报时间标注：新闻源头发布时刻，日期 + 时间（中文北京时间 / 英文美东时间）；只有日期时不显示时刻
const articleDateTime = (a, lang) => {
  const t = T[lang], d = dispDate(a, lang), iso = articleTs(a);
  if (!iso) return t.dateFmt(d);
  const dt = new Date(iso);
  return lang === 'zh'
    ? `${t.dateFmt(d)} ${dt.toLocaleTimeString('zh-CN', { timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: false })}`
    : `${t.dateFmt(d)}, ${dt.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: 'numeric', minute: '2-digit', hour12: true })} ET`;
};

const tagChips = (a, lang, n = 3) => a.tags.slice(0, n).map((x) => `<a class="tag" href="${tagUrl(x, lang)}">${esc(tagLabel(x, lang))}</a>`).join('');

function articleCard(a, lang) {
  const c = langOf(a, lang);
  return `<article class="card">
  <div class="card-meta"><time datetime="${esc(articleTs(a) || a.published || a.date)}">${articleDateTime(a, lang)}</time>${tagChips(a, lang)}</div>
  <h2><a href="${urlFor(lang, `articles/${a.slug}.html`)}">${esc(c.title)}</a></h2>
  <p>${esc(c.summary)}</p>
</article>`;
}

function featuredHero(a, lang) {
  const t = T[lang], c = langOf(a, lang);
  const reason = lang === 'zh' ? (a.featured_reason_zh || a.featured_reason) : a.featured_reason;
  return `<article class="card featured-card">
  <div class="card-meta"><span class="featured-badge">${t.featured}</span><time datetime="${esc(articleTs(a) || a.published || a.date)}">${articleDateTime(a, lang)}</time>${tagChips(a, lang)}</div>
  <h2><a href="${urlFor(lang, `articles/${a.slug}.html`)}">${esc(c.title)}</a></h2>
  <p>${esc(c.summary)}</p>
  ${reason ? `<p class="featured-reason">${esc(reason)}</p>` : ''}
</article>`;
}

// 雷达条目时间：中文页显示北京时间，英文页显示美东时间；只有日期的旧条目只显示日期
function radarTime(published, lang) {
  if (!published) return '';
  const hasTime = published.includes('T');
  const d = new Date(hasTime ? published : published + 'T00:00:00Z');
  if (isNaN(d)) return '';
  if (!hasTime) {
    return lang === 'zh'
      ? d.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit', timeZone: 'UTC' })
      : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  }
  return lang === 'zh'
    ? d.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false })
    : d.toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) + ' ET';
}

const radarTs = (i, fallback) => {
  const p = i.published || fallback;
  return Date.parse(p.includes('T') ? p : p + 'T00:00:00Z') || 0;
};

// 存档日历：按月网格，有内容的日期可点击（附条数）；entries: [{key: 展示日期, href, n}]
function calendarHtml(entries, lang) {
  const byDate = new Map(entries.map((e) => [e.key, e]));
  const months = [...byDate.keys()].map((d) => d.slice(0, 7)).filter((m, i, a) => a.indexOf(m) === i).sort().reverse();
  const week = lang === 'zh' ? ['一', '二', '三', '四', '五', '六', '日'] : ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  return months.map((m) => {
    const [y, mo] = m.split('-').map(Number);
    const days = new Date(Date.UTC(y, mo, 0)).getUTCDate();
    const lead = (new Date(Date.UTC(y, mo - 1, 1)).getUTCDay() + 6) % 7; // 周一开头
    const cells = [];
    for (let i = 0; i < lead; i++) cells.push('<span class="cal-cell"></span>');
    for (let d = 1; d <= days; d++) {
      const iso = `${m}-${String(d).padStart(2, '0')}`;
      const hit = byDate.get(iso);
      cells.push(hit
        ? `<a class="cal-cell cal-day has-radar" href="${hit.href}">${d}<span class="cal-count">${hit.n}</span></a>`
        : `<span class="cal-cell cal-day">${d}</span>`);
    }
    const title = lang === 'zh' ? `${y} 年 ${mo} 月` : new Date(Date.UTC(y, mo - 1, 1)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });
    return `<section class="cal-month"><h2>${title}</h2><div class="cal-grid">${week.map((w) => `<span class="cal-cell cal-w">${w}</span>`).join('')}${cells.join('')}</div></section>`;
  }).join('\n');
}

// 快讯条目：电报体——时间打头，正文紧凑，与简报卡片形式区分
function radarItemLi(i, lang) {
  const time = radarTime(i.published, lang);
  return `<li>${time ? `<time class="radar-time" datetime="${esc(i.published)}">${esc(time)}</time>` : ''}<a class="tag" href="${tagUrl(i.tag, lang)}">${esc(tagLabel(i.tag, lang))}</a> <span class="radar-text">${esc(lang === 'zh' && i.text_zh ? i.text_zh : i.text)}</span> <a class="radar-src" href="${esc(i.url)}" rel="noopener" target="_blank">${esc(i.source || 'source')} ↗</a></li>`;
}

// 班次（edition）：北京 07:00 / 19:00 为界（= UTC 前日 23:00 / 当日 11:00），以 UTC 11:00 为锚每 12 小时一个边界
const EB_ANCHOR = 11 * 3600000, EB_HALF = 12 * 3600000;
const floorEdition = (ms) => Math.floor((ms - EB_ANCHOR) / EB_HALF) * EB_HALF + EB_ANCHOR; // 文章：发布时刻之前最近的边界
const ceilEdition = (ms) => Math.ceil((ms - EB_ANCHOR) / EB_HALF) * EB_HALF + EB_ANCHOR;   // 快讯：发布时刻之后最近的截稿边界
const editionDayOf = (eb) => new Date(eb + 8 * 3600000).toISOString().slice(0, 10);        // 班次所属的北京刊期日
const editionLabel = (eb, lang) => {
  const d = new Date(eb);
  if (lang === 'zh') {
    const bj = new Date(eb + 8 * 3600000);
    return `${bj.getUTCMonth() + 1}月${bj.getUTCDate()}日${bj.getUTCHours() === 7 ? '早报' : '晚报'}`;
  }
  const hour = Number(d.toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }));
  const dateStr = d.toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric' });
  return `${hour < 12 ? 'Morning' : 'Evening'} edition, ${dateStr}`;
};

// 单一时间线：简报卡片与一句话快讯按发布时间倒序混排，连续的快讯合并进一个紧凑分组
// editions: N 时只保留最近 N 个班次（首页用 2：晚报上线时早报下移，次日早报上线时保留前一晚报）
// withinH: 产品硬规则——首页只展示源头时间在 N 小时内的内容，更早的只存在于历史归档
function timelineHtml(articles, radars, lang, { editions, withinH } = {}) {
  let entries = [
    // 排序用源头发布时间；班次归属（保留窗口）仍按本站发布时刻
    ...articles.map((a) => {
      const ts = Date.parse(articleTs(a) || a.date + 'T11:00:00Z') || 0;
      const ebTs = Date.parse(a.published_at || articleTs(a) || a.date + 'T11:00:00Z') || 0;
      return { ts, eb: floorEdition(ebTs), html: articleCard(a, lang), radar: false };
    }),
    ...radars.flatMap((r) => r.items.map((i) => { const ts = radarTs(i, r.date); return { ts, eb: ceilEdition(ts), html: radarItemLi(i, lang), radar: true }; })),
  ].sort((a, b) => b.ts - a.ts); // 严格按源头时间倒序；班次（eb）只用于保留窗口，不参与排序
  if (withinH) {
    const cutoff = Date.now() - withinH * 3600000;
    entries = entries.filter((e) => e.ts >= cutoff);
  }
  if (editions) {
    const keep = new Set([...new Set(entries.map((e) => e.eb))].sort((a, b) => b - a).slice(0, editions));
    entries = entries.filter((e) => keep.has(e.eb));
  }
  const out = [];
  let group = [];
  const flush = () => { if (group.length) { out.push(`<ul class="radar-list feed-radar">\n<li class="feed-radar-head">⚡ ${lang === 'zh' ? '快讯' : 'Quick hits'}</li>\n${group.join('\n')}\n</ul>`); group = []; } };
  for (const e of entries) {
    if (e.radar) { group.push(e.html); continue; }
    flush();
    out.push(e.html);
  }
  flush();
  return out.join('\n');
}

async function buildLang(articles, radars, lang) {
  const t = T[lang];
  const dir = lang === 'zh' ? join(SITE, 'zh') : SITE;
  await mkdir(join(dir, 'articles'), { recursive: true });
  await mkdir(join(dir, 'category'), { recursive: true });
  await mkdir(join(dir, 'radar'), { recursive: true });
  const list = lang === 'zh' ? articles.filter((a) => a.body_zh) : articles;

  // 同一刊期日早晚两班各有一个 featured，头条取本站发布时刻最新的一班
  const featured = list.filter((a) => a.featured)
    .sort((a, b) => (b.published_at || '').localeCompare(a.published_at || ''))[0] || null;
  const rest = featured ? list.filter((a) => a !== featured) : list;
  const activeTags = Object.keys(TAG_META).filter((tag) => list.some((a) => a.tags.includes(tag)));
  const catBar = `<nav class="cat-bar"><span>${t.allCats}:</span>${activeTags.map((tag) => `<a class="tag" href="${tagUrl(tag, lang)}">${esc(tagLabel(tag, lang))}</a>`).join('')}</nav>`;

  // 首页：单一时间线（简报 + 快讯混排），最近两个班次 + 严格 24 小时（产品定位，不可放宽）
  const heroFresh = featured && Date.parse(articleTs(featured) || featured.date) >= Date.now() - 24 * 3600000;
  const indexBody = `
${heroFresh ? featuredHero(featured, lang) : ''}
${catBar}
<section class="feed">
${timelineHtml(rest, radars, lang, { editions: 2, withinH: 24 })}
</section>
<p class="more-link"><a href="${urlFor(lang, 'archive.html')}">📚 ${t.moreLink()}</a></p>`;
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
        logo: { '@type': 'ImageObject', url: `${BASE}/assets/og.png` },
        sameAs: ['https://github.com/mmlong818/ai-pulse', 'https://x.com/mmlong8', 'https://x.com/mmlong8/status/2079913046747820417'],
        founder: { '@type': 'Person', name: 'Uncle Cat (猫叔)', url: 'https://x.com/mmlong8' } },
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
  <div class="card-meta"><time datetime="${esc(articleTs(a) || a.published || a.date)}">${articleDateTime(a, lang)}</time>${tagChips(a, lang, 4)}<span class="views" id="viewCount"></span></div>
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
        headline: c.title, description: c.summary, datePublished: a.published_at || a.date, inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
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
  <p>定时流水线每天运行两次（北京时间 7:00 与 19:00）：从 17 个一级 RSS 信源和 29 个 AI 实验室官方 X 账号（API 直连）获取带真实时间戳的候选 → AI 编辑遴选并核验信源与发布日期 → 以中英双语原创撰写深度简报与「每日雷达」→ 重建并发布本站，同时通过 IndexNow 通知搜索引擎。全部历史内容永久留存于<a href="${urlFor(lang, "archive.html")}">存档</a>。技术栈公开、简单、快速：无追踪器、无广告、无 Cookie。</p>
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
  <p>The pipeline runs twice a day (07:00 and 19:00 Beijing time): timestamped candidates flow in from 17 first-tier RSS feeds and 29 official X accounts of AI labs via API → an AI editor selects stories and verifies sources and publication dates → deep briefings and the Daily Radar are written from scratch in English and Chinese → the site is rebuilt, published, and submitted to search engines via IndexNow. Everything ever published is kept permanently in the <a href="${urlFor(lang, "archive.html")}">archive</a>. The stack is open, simple, and fast: no trackers, no ads, no cookies.</p>
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

  // 按天归档页（/day/YYYY-MM-DD.html）：当天全部简报 + 快讯的时间线
  const dayMap = new Map();
  for (const a of list) { if (!dayMap.has(a.date)) dayMap.set(a.date, { articles: [], radars: [] }); dayMap.get(a.date).articles.push(a); }
  for (const r of radars) { if (!dayMap.has(r.date)) dayMap.set(r.date, { articles: [], radars: [] }); dayMap.get(r.date).radars.push(r); }
  await mkdir(join(dir, 'day'), { recursive: true });
  for (const [date, d] of dayMap) {
    const disp = lang === 'en' ? shiftDay(date, -1) : date;
    const nItems = d.radars.reduce((s, r) => s + r.items.length, 0);
    await writeFile(join(dir, 'day', `${date}.html`), page({
      lang,
      title: `${t.dateFmt(disp)} — ${SITE_NAME}`,
      description: lang === 'zh'
        ? `${disp} 发布的 ${d.articles.length} 篇深度简报与 ${nItems} 条一句话快讯。`
        : `${d.articles.length} briefings and ${nItems} quick hits published on ${disp} (ET).`,
      canonical: urlFor(lang, `day/${date}.html`),
      altEn: `${BASE}/day/${date}.html`, altZh: `${BASE}/zh/day/${date}.html`,
      jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: t.dateFmt(disp), url: urlFor(lang, `day/${date}.html`) },
      body: `
<section class="hero"><h1>${t.dateFmt(disp)}</h1><p class="lede">${esc(t.dayLede)}</p></section>
<section class="feed">
${timelineHtml(d.articles, d.radars, lang)}
</section>
<p class="backlink"><a href="${urlFor(lang, 'archive.html')}">📚 ${t.archive}</a> · <a href="${urlFor(lang, '')}">${t.back}</a></p>`,
    }));
  }

  // 旧 /radar/ 链接重定向到对应按天页（雷达概念已并入时间线）
  const redirect = (to) => `<!DOCTYPE html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${to}"><link rel="canonical" href="${to}"><a href="${to}">→</a>`;
  for (const r of radars) await writeFile(join(dir, 'radar', `${r.date}.html`), redirect(urlFor(lang, `day/${r.date}.html`)));
  await writeFile(join(dir, 'radar', 'index.html'), redirect(urlFor(lang, 'archive.html')));

  // 本地搜索索引（纯前端，无服务器）
  const searchIndex = [
    ...list.map((a) => ({ k: 'a', t: langOf(a, lang).title, s: langOf(a, lang).summary, u: urlFor(lang, `articles/${a.slug}.html`), d: dispDate(a, lang) })),
    ...radars.flatMap((r) => r.items.map((i) => ({ k: 'r', t: lang === 'zh' && i.text_zh ? i.text_zh : i.text, s: i.source || '', u: urlFor(lang, `day/${r.date}.html`), d: lang === 'en' ? shiftDay(r.date, -1) : r.date }))),
  ];
  await writeFile(join(SITE, `search-index-${lang}.json`), JSON.stringify(searchIndex));

  // 存档页：搜索 + 日历
  const calEntries = [...dayMap.entries()].map(([date, d]) => ({
    key: lang === 'en' ? shiftDay(date, -1) : date,
    href: urlFor(lang, `day/${date}.html`),
    n: d.articles.length + d.radars.reduce((s, r) => s + r.items.length, 0),
  }));
  const archiveBody = `
<section class="hero"><h1>${t.archive}</h1><p class="lede">${esc(t.radarCalLede)}</p></section>
<div class="search-box"><input id="searchBox" type="search" placeholder="${esc(t.searchPh)}" data-index="${BASE}/search-index-${lang}.json"></div>
<ul class="search-results" id="searchResults"></ul>
${calendarHtml(calEntries, lang)}
<script src="${BASE}/assets/search.js" defer></script>`;
  await writeFile(join(dir, 'archive.html'), page({
    lang,
    title: lang === 'zh' ? `存档 — ${BRAND.zh}` : `Archive — ${SITE_NAME}`,
    description: lang === 'zh'
      ? `AI专注速报历史存档：按日历浏览每天发布的全部简报与快讯，支持搜索。`
      : `${SITE_NAME} archive: browse every day's briefings and quick hits on a calendar, with search.`,
    canonical: urlFor(lang, 'archive.html'),
    altEn: `${BASE}/archive.html`, altZh: `${BASE}/zh/archive.html`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'CollectionPage', name: t.archive, url: urlFor(lang, 'archive.html') },
    body: archiveBody,
  }));

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

  // RSS：与首页同规则，最近两个班次 + 严格 24 小时（简报逐条 + 每班次一条快讯速览）
  const rssCutoff = Date.now() - 24 * 3600000;
  const rssArticleEntries = list
    .filter((a) => Date.parse(articleTs(a) || a.date) >= rssCutoff)
    .map((a) => ({ a, eb: floorEdition(Date.parse(a.published_at || a.date + 'T11:00:00Z') || 0) }));
  const radarByEb = new Map();
  for (const r of radars) for (const i of r.items) {
    const ts = radarTs(i, r.date), eb = ceilEdition(ts);
    if (ts < rssCutoff) continue;
    if (!radarByEb.has(eb)) radarByEb.set(eb, []);
    radarByEb.get(eb).push({ i, ts });
  }
  const keepEbs = [...new Set([...rssArticleEntries.map((e) => e.eb), ...radarByEb.keys()])].sort((a, b) => b - a).slice(0, 2);
  const keepSet = new Set(keepEbs);
  const rssItems = [
    ...rssArticleEntries.filter((e) => keepSet.has(e.eb)).map(({ a }) => {
      const c = langOf(a, lang);
      return `  <item>
    <title>${esc(c.title)}</title>
    <link>${urlFor(lang, `articles/${a.slug}.html`)}</link>
    <guid>${urlFor(lang, `articles/${a.slug}.html`)}</guid>
    <pubDate>${(a.published_at ? new Date(a.published_at) : new Date(a.date + 'T08:00:00Z')).toUTCString()}</pubDate>
    <description>${esc(c.summary)}</description>
  </item>`;
    }),
    ...keepEbs.filter((eb) => radarByEb.has(eb)).map((eb) => {
      const items = radarByEb.get(eb).sort((x, y) => y.ts - x.ts).map((e) => e.i);
      const day = editionDayOf(eb);
      const title = lang === 'zh'
        ? `⚡ 一句话快讯 ${items.length} 条 · ${editionLabel(eb, 'zh')}`
        : `⚡ ${items.length} quick hits — ${editionLabel(eb, 'en')}`;
      const desc = items.map((i) => `· ${lang === 'zh' && i.text_zh ? i.text_zh : i.text}（${i.source || 'source'}）`).join('\n');
      return `  <item>
    <title>${esc(title)}</title>
    <link>${urlFor(lang, `day/${day}.html`)}</link>
    <guid>${urlFor(lang, `day/${day}.html`)}#e${eb}</guid>
    <pubDate>${new Date(eb).toUTCString()}</pubDate>
    <description>${esc(desc)}</description>
  </item>`;
    }),
  ].join('\n');
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
  // 简报优先：同一故事已有深度简报时，去掉对应的一句话快讯（按主源 URL 匹配）
  const normUrl = (u) => (u || '').replace(/[?#].*$/, '').replace(/\/$/, '').toLowerCase();
  const covered = new Set(articles.flatMap((a) => (a.sources || []).map((s) => normUrl(s.url))));
  for (const r of radars) r.items = r.items.filter((i) => !covered.has(normUrl(i.url)));
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
    `${BASE}/archive.html`, `${BASE}/zh/archive.html`,
    ...en.map((a) => `${BASE}/articles/${a.slug}.html`),
    ...zh.map((a) => `${BASE}/zh/articles/${a.slug}.html`),
    ...catSlugs.flatMap((s) => [`${BASE}/category/${s}.html`, `${BASE}/zh/category/${s}.html`]),
    ...[...new Set([...articles.map((a) => a.date), ...radars.map((r) => r.date)])].flatMap((d) => [`${BASE}/day/${d}.html`, `${BASE}/zh/day/${d}.html`]),
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
- [Archive](${BASE}/archive.html): calendar of every day's briefings and quick hits, with search
- Categories: ${catSlugs.map((s) => `[${s}](${BASE}/category/${s}.html)`).join(', ')}

## Optional

- [Source code](https://github.com/mmlong818/ai-pulse): the open pipeline that researches, writes, and publishes this site
- [Launch announcement on X](https://x.com/mmlong8/status/2079913046747820417): by the publisher, Uncle Cat (猫叔)
- Coverage areas: AI models, research, policy & regulation, industry, funding, open source, safety
- Update cadence: daily; each briefing cites 1-3 primary sources; bilingual (en, zh-CN)
`);

  await writeFile(join(SITE, '.nojekyll'), '');
  console.log(`构建完成: EN ${en.length} 篇 / ZH ${zh.length} 篇 / 雷达 ${radars.length} 天 / 分类 ${catSlugs.length} 个, ${urls.length} 个页面`);
}

build();
