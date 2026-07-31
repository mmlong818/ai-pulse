// Generate a Zhihu-ready draft for the Beijing evening edition.
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');
const OUT = join(ROOT, 'zhihu', 'drafts');
const BASE = process.env.AIPULSE_BASE || 'https://mmlong818.github.io/ai-pulse';

const EB_ANCHOR = 11 * 3600000;
const EB_HALF = 12 * 3600000;
const floorEdition = (ms) => Math.floor((ms - EB_ANCHOR) / EB_HALF) * EB_HALF + EB_ANCHOR;
const ceilEdition = (ms) => Math.ceil((ms - EB_ANCHOR) / EB_HALF) * EB_HALF + EB_ANCHOR;
const articleTs = (a) => (a.published && a.published.includes('T') ? a.published : a.published_at) || null;
const langOfZh = (a) => ({
  title: a.title_zh || a.title,
  summary: a.summary_zh || a.summary,
  body: a.body_zh || a.body || '',
});
const escHtml = (s = '') => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');
const mdLink = (text, url) => `[${String(text || url).replace(/\]/g, '\\]')}](${url})`;

function bjDate(iso = new Date().toISOString()) {
  return new Date(Date.parse(iso) + 8 * 3600000).toISOString().slice(0, 10);
}

function dateLabel(date) {
  const [y, m, d] = date.split('-').map(Number);
  return `${m}月${d}日`;
}

function eveningBoundary(date) {
  return Date.parse(`${date}T11:00:00Z`);
}

function isEveningRun() {
  if (process.argv.includes('--force') || process.env.AIPULSE_ZHIHU_FORCE === '1') return true;
  if ((process.env.AIPULSE_FORCE_EDITION || '').toLowerCase() === 'evening') return true;
  const hour = new Date(Date.now() + 8 * 3600000).getUTCHours();
  return hour >= 18;
}

function targetDate() {
  const arg = process.argv.find((x) => /^\d{4}-\d{2}-\d{2}$/.test(x));
  if (arg) return arg;
  return process.env.AIPULSE_EDITION_DATE || bjDate();
}

async function loadContent() {
  const files = (await readdir(CONTENT)).filter((f) => f.endsWith('.json'));
  const articles = [];
  const radars = [];
  for (const f of files) {
    const data = JSON.parse(await readFile(join(CONTENT, f), 'utf8'));
    if (f.startsWith('radar-')) radars.push(data);
    else articles.push(data);
  }
  return { articles, radars };
}

function eveningArticles(articles, boundary) {
  const selected = articles
    .filter((a) => {
      const ts = Date.parse(a.published_at || articleTs(a) || `${a.date}T11:00:00Z`);
      return Number.isFinite(ts) && floorEdition(ts) === boundary && (a.body_zh || a.summary_zh);
    })
    .sort((a, b) => (Date.parse(articleTs(b) || b.published_at || 0) || 0) - (Date.parse(articleTs(a) || a.published_at || 0) || 0));
  const featured = selected.find((a) => a.featured);
  return featured ? [featured, ...selected.filter((a) => a !== featured)] : selected;
}

function eveningRadarItems(radars, date, boundary) {
  const radar = radars.find((r) => r.date === date);
  if (!radar) return [];
  return (radar.items || [])
    .map((i) => ({ ...i, ts: Date.parse(i.published || `${date}T00:00:00Z`) || 0 }))
    .filter((i) => i.ts && ceilEdition(i.ts) === boundary)
    .sort((a, b) => b.ts - a.ts);
}

function mdBodyToZhihu(body) {
  return body
    .replace(/^##\s+/gm, '### ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function buildMarkdown({ date, articles, radarItems }) {
  const featured = articles.find((a) => a.featured) || articles[0];
  const titleTail = featured ? `：${langOfZh(featured).title}` : '';
  const title = `猫叔的AI资讯雷达｜${dateLabel(date)}晚报${titleTail}`;
  const briefList = articles.slice(0, 6).map((a) => `- ${langOfZh(a).title}`).join('\n');
  const radarList = radarItems.slice(0, 10).map((i) => `- ${i.text_zh || i.text}`).join('\n');
  const intro = [
    `这是「猫叔的AI资讯雷达」${dateLabel(date)}晚报。`,
    '本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。',
  ].join('\n\n');

  const articleBlocks = articles.map((a, idx) => {
    const c = langOfZh(a);
    const sources = (a.sources || [])
      .map((s) => `- ${mdLink(s.title, s.url)}`)
      .join('\n');
    return [
      `## ${idx + 1}. ${c.title}`,
      c.summary,
      mdBodyToZhihu(c.body),
      sources ? `**原始信源**\n\n${sources}` : '',
      `原文链接：${mdLink(`${c.title}｜猫叔的AI资讯雷达`, `${BASE}/zh/articles/${a.slug}.html`)}`,
    ].filter(Boolean).join('\n\n');
  }).join('\n\n---\n\n');

  const radarBlock = radarItems.length
    ? [
      '## 一句话快讯',
      ...radarItems.slice(0, 14).map((i) => `- ${i.text_zh || i.text}（${mdLink(i.source || '来源', i.url)}）`),
    ].join('\n')
    : '';

  const footer = [
    '---',
    `完整日报：${mdLink(`${dateLabel(date)}晚报网页`, `${BASE}/zh/day/${date}.html`)}`,
    `历史存档：${mdLink('猫叔的AI资讯雷达存档', `${BASE}/zh/archive.html`)}`,
    '',
    '说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。',
  ].join('\n\n');

  const md = [
    `# ${title}`,
    intro,
    featured ? `**今晚重点**：${langOfZh(featured).summary}` : '',
    briefList ? `## 深度简报目录\n\n${briefList}` : '',
    radarList ? `## 快讯预览\n\n${radarList}` : '',
    articleBlocks,
    radarBlock,
    footer,
  ].filter(Boolean).join('\n\n');

  return { title, md };
}

function markdownToBasicHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let list = [];
  const flushList = () => {
    if (!list.length) return;
    out.push(`<ul>${list.map((x) => `<li>${inlineHtml(x)}</li>`).join('')}</ul>`);
    list = [];
  };
  for (const raw of lines) {
    const line = raw.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }
    if (line === '---') {
      flushList();
      out.push('<hr>');
      continue;
    }
    const h = line.match(/^(#{1,4})\s+(.+)$/);
    if (h) {
      flushList();
      const level = Math.min(h[1].length, 3);
      out.push(`<h${level}>${inlineHtml(h[2])}</h${level}>`);
      continue;
    }
    const li = line.match(/^-\s+(.+)$/);
    if (li) {
      list.push(li[1]);
      continue;
    }
    flushList();
    out.push(`<p>${inlineHtml(line)}</p>`);
  }
  flushList();
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><title></title></head><body>${out.join('\n')}</body></html>`;
}

function markdownBodyOnly(md) {
  return md.replace(/^# .*\r?\n\r?\n?/, '').trim();
}

function inlineHtml(s) {
  return escHtml(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g, '<a href="$2">$1</a>');
}

async function main() {
  if (!isEveningRun()) {
    console.log('[zhihu] 不是晚班，跳过知乎晚报草稿。');
    return;
  }
  const date = targetDate();
  const boundary = eveningBoundary(date);
  const { articles, radars } = await loadContent();
  const selectedArticles = eveningArticles(articles, boundary);
  const radarItems = eveningRadarItems(radars, date, boundary);
  if (!selectedArticles.length && !radarItems.length) {
    throw new Error(`[zhihu] ${date} 晚报没有可用内容。`);
  }

  const { title, md } = buildMarkdown({ date, articles: selectedArticles, radarItems });
  const bodyMd = markdownBodyOnly(md);
  const html = markdownToBasicHtml(md).replace('<title></title>', `<title>${escHtml(title)}</title>`);
  const bodyHtml = markdownToBasicHtml(bodyMd).replace('<title></title>', `<title>${escHtml(title)}</title>`);
  const meta = {
    platform: 'zhihu',
    type: 'evening-draft',
    date,
    title,
    body_markdown: 'latest-evening-body.md',
    body_html: 'latest-evening-body.html',
    articles: selectedArticles.map((a) => ({ slug: a.slug, title: langOfZh(a).title, url: `${BASE}/zh/articles/${a.slug}.html` })),
    radar_count: radarItems.length,
    generated_at: new Date().toISOString(),
  };

  await mkdir(OUT, { recursive: true });
  const base = join(OUT, `${date}-evening`);
  await writeFile(`${base}-title.txt`, `${title}\n`, 'utf8');
  await writeFile(`${base}.md`, md, 'utf8');
  await writeFile(`${base}-body.md`, bodyMd, 'utf8');
  await writeFile(`${base}.html`, html, 'utf8');
  await writeFile(`${base}-body.html`, bodyHtml, 'utf8');
  await writeFile(`${base}.json`, JSON.stringify(meta, null, 2), 'utf8');
  await writeFile(join(OUT, 'latest-evening-title.txt'), `${title}\n`, 'utf8');
  await writeFile(join(OUT, 'latest-evening.md'), md, 'utf8');
  await writeFile(join(OUT, 'latest-evening-body.md'), bodyMd, 'utf8');
  await writeFile(join(OUT, 'latest-evening.html'), html, 'utf8');
  await writeFile(join(OUT, 'latest-evening-body.html'), bodyHtml, 'utf8');
  await writeFile(join(OUT, 'latest-evening.json'), JSON.stringify(meta, null, 2), 'utf8');
  console.log(`[zhihu] 已生成知乎晚报草稿：${date}，深度 ${selectedArticles.length} 篇，快讯 ${radarItems.length} 条。`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
