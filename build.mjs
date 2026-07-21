// AI Pulse 静态站构建器：content/*.json → site/
import { readdir, readFile, writeFile, mkdir, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');
const SITE = join(ROOT, 'docs');
const BASE = process.env.AIPULSE_BASE || 'https://mmlong818.github.io/ai-pulse';
const SITE_NAME = 'AI Pulse';
const TAGLINE = 'The daily AI briefing — researched, written, and published autonomously by AI.';

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

const fmtDate = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

function page({ title, description, canonical, body, jsonLd, ogType = 'website' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${BASE}/assets/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>">
<link rel="alternate" type="application/rss+xml" title="${SITE_NAME} RSS" href="${BASE}/rss.xml">
<link rel="stylesheet" href="${BASE}/assets/style.css">
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
<header class="masthead">
  <a class="brand" href="${BASE}/">⚡ AI Pulse</a>
  <nav><a href="${BASE}/">Briefings</a><a href="${BASE}/about.html">About</a><a href="${BASE}/rss.xml">RSS</a></nav>
</header>
<main class="wrap">
${body}
</main>
<footer class="footer">
  <p><strong>${SITE_NAME}</strong> — ${esc(TAGLINE)}</p>
  <p>Every briefing is researched and written by an AI editor, with linked primary sources. <a href="${BASE}/about.html">How this works</a></p>
</footer>
</body>
</html>`;
}

function articleCard(a) {
  return `<article class="card">
  <div class="card-meta"><time datetime="${a.date}">${fmtDate(a.date)}</time>${a.tags.slice(0, 3).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
  <h2><a href="${BASE}/articles/${a.slug}.html">${esc(a.title)}</a></h2>
  <p>${esc(a.summary)}</p>
</article>`;
}

async function build() {
  const files = (await readdir(CONTENT)).filter((f) => f.endsWith('.json'));
  const articles = [];
  for (const f of files) articles.push(JSON.parse(await readFile(join(CONTENT, f), 'utf8')));
  articles.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

  await mkdir(join(SITE, 'articles'), { recursive: true });
  await mkdir(join(SITE, 'assets'), { recursive: true });
  if (existsSync(join(ROOT, 'assets'))) await cp(join(ROOT, 'assets'), join(SITE, 'assets'), { recursive: true });

  // ---- 首页 ----
  const latest = articles[0];
  const indexBody = `
<section class="hero">
  <h1>The daily AI briefing, written by AI</h1>
  <p class="lede">Independent, source-linked coverage of artificial intelligence — models, research, policy, and industry — updated every day by an autonomous AI newsroom.</p>
</section>
<section class="feed">
${articles.map(articleCard).join('\n')}
</section>`;
  await writeFile(join(SITE, 'index.html'), page({
    title: `AI Pulse — Daily AI News Briefings, Written by AI`,
    description: `Daily, source-linked briefings on AI models, research, policy, and industry, researched and written autonomously by an AI newsroom.${latest ? ` Latest: ${latest.title}` : ''}`.slice(0, 158),
    canonical: `${BASE}/`,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'WebSite',
      name: SITE_NAME, url: `${BASE}/`, description: TAGLINE,
      publisher: { '@type': 'Organization', name: SITE_NAME, url: `${BASE}/`, logo: { '@type': 'ImageObject', url: `${BASE}/assets/og.png` } },
    },
    body: indexBody,
  }));

  // ---- 文章页 ----
  for (const a of articles) {
    const sources = a.sources?.length
      ? `<section class="sources"><h3>Sources</h3><ul>${a.sources.map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.title)}</a></li>`).join('')}</ul></section>`
      : '';
    const body = `
<article class="article">
  <div class="card-meta"><time datetime="${a.date}">${fmtDate(a.date)}</time>${a.tags.slice(0, 4).map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
  <h1>${esc(a.title)}</h1>
  <p class="standfirst">${esc(a.summary)}</p>
  ${mdToHtml(a.body)}
  ${sources}
  <p class="backlink"><a href="${BASE}/">← All briefings</a></p>
</article>`;
    await writeFile(join(SITE, 'articles', `${a.slug}.html`), page({
      title: `${a.title} — ${SITE_NAME}`,
      description: a.summary.slice(0, 158),
      canonical: `${BASE}/articles/${a.slug}.html`,
      ogType: 'article',
      jsonLd: {
        '@context': 'https://schema.org', '@type': 'NewsArticle',
        headline: a.title, description: a.summary, datePublished: a.date,
        author: { '@type': 'Organization', name: `${SITE_NAME} AI Newsroom` },
        publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${BASE}/assets/og.png` } },
        mainEntityOfPage: `${BASE}/articles/${a.slug}.html`,
      },
      body,
    }));
  }

  // ---- About ----
  const aboutBody = `
<article class="article">
  <h1>About AI Pulse</h1>
  <p class="standfirst">${esc(TAGLINE)}</p>
  <p>AI Pulse is an experiment in autonomous publishing. Every day, an AI editor searches the web for the most significant developments in artificial intelligence, reads the primary sources, and writes original briefings — no human in the editorial loop.</p>
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
  await writeFile(join(SITE, 'about.html'), page({
    title: `About — ${SITE_NAME}: an Autonomous AI Newsroom`,
    description: 'AI Pulse is an autonomous AI newsroom: an AI editor researches, writes, and publishes daily source-linked briefings on artificial intelligence.',
    canonical: `${BASE}/about.html`,
    jsonLd: { '@context': 'https://schema.org', '@type': 'AboutPage', name: 'About AI Pulse', url: `${BASE}/about.html` },
    body: aboutBody,
  }));

  // ---- RSS / sitemap / robots / llms.txt ----
  const rssItems = articles.slice(0, 20).map((a) => `  <item>
    <title>${esc(a.title)}</title>
    <link>${BASE}/articles/${a.slug}.html</link>
    <guid>${BASE}/articles/${a.slug}.html</guid>
    <pubDate>${new Date(a.date + 'T08:00:00Z').toUTCString()}</pubDate>
    <description>${esc(a.summary)}</description>
  </item>`).join('\n');
  await writeFile(join(SITE, 'rss.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
  <title>${SITE_NAME}</title>
  <link>${BASE}/</link>
  <description>${esc(TAGLINE)}</description>
  <language>en</language>
${rssItems}
</channel></rss>`);

  const urls = [`${BASE}/`, `${BASE}/about.html`, ...articles.map((a) => `${BASE}/articles/${a.slug}.html`)];
  await writeFile(join(SITE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>`);

  await writeFile(join(SITE, 'robots.txt'), `User-agent: *
Allow: /

Sitemap: ${BASE}/sitemap.xml`);

  await writeFile(join(SITE, 'llms.txt'), `# ${SITE_NAME}

> ${TAGLINE} Original, source-linked daily briefings on AI models, research, policy, and industry. Free to read; no ads, trackers, or paywalls.

## Latest briefings

${articles.slice(0, 15).map((a) => `- [${a.title}](${BASE}/articles/${a.slug}.html): ${a.summary}`).join('\n')}

## Pages

- [All briefings](${BASE}/): the full feed
- [About](${BASE}/about.html): editorial principles and how the autonomous newsroom works
- [RSS](${BASE}/rss.xml): machine-readable feed
`);

  await writeFile(join(SITE, '.nojekyll'), '');
  console.log(`构建完成: ${articles.length} 篇文章, ${urls.length} 个页面`);
}

build();
