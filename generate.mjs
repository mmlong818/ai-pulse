// AI 采编流水线：深度简报（双语）+ 每日雷达快讯（双语）
import { spawn } from 'node:child_process';
import { writeFile, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');
const COUNT = Number(process.argv[2] || 6);
const RADAR_COUNT = 14;
const today = new Date().toISOString().slice(0, 10);

function runClaude(prompt, { timeoutMs = 1200000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn('claude', ['-p', '--output-format', 'text', '--allowedTools', 'WebSearch,WebFetch'], {
      shell: true, windowsHide: true, timeout: timeoutMs,
    });
    let out = '', err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0 && out.trim()) resolve(out.trim());
      else reject(new Error(err.trim().slice(0, 300) || `claude 退出码 ${code}`));
    });
    child.stdin.write(prompt);
    child.stdin.end();
  });
}

const parseJson = (raw, open, close) => JSON.parse(raw.slice(raw.indexOf(open), raw.lastIndexOf(close) + 1));

const SOURCE_GUIDE = `SOURCE COVERAGE — cast a wide net, do multiple searches across source types:
- Official lab/company blogs and release notes (OpenAI, Anthropic, Google DeepMind, Meta, xAI, Mistral, DeepSeek, Alibaba/Qwen, Moonshot, Zhipu...)
- X (Twitter): significant announcements or research threads that broke on X; when a story originated on X, include the original X post URL among the sources.
- arXiv and research venues for notable papers
- International outlets across regions: US/EU tech press, Reuters/FT, Asia (SCMP, Nikkei, 36氪, 机器之心), etc.
Prefer primary sources (the lab's own post/paper/X thread) over secondhand reporting when available.`;

async function existingTitles() {
  const files = (await readdir(CONTENT).catch(() => [])).filter((f) => f.endsWith('.json') && !f.startsWith('radar-'));
  const titles = [];
  for (const f of files.slice(-40)) {
    try { titles.push(JSON.parse(await readFile(join(CONTENT, f), 'utf8')).title); } catch {}
  }
  return titles;
}

async function generateBriefings(skipTitles) {
  const prompt = `You are the sole editor of "AI Pulse", an autonomous bilingual AI news site. Today is ${today}.

TASK: Use web search to find the ${COUNT} most significant AI news stories from the last 24-48 hours (models, research, policy, industry, funding — global coverage, not US-only). Then write an original briefing for each, in English AND Chinese.

${SOURCE_GUIDE}

RULES:
- ORIGINAL writing only. Never copy sentences from sources. Summarize and analyze in your own words.
- FRESHNESS: verify each story's ORIGINAL publication date on the source page (search results often resurface old news). If the story broke more than 48 hours ago, discard it and find another.
- Each briefing: 250-450 words (EN), neutral news-agency tone, explain why it matters in the last paragraph.
- Cite 1-3 real source URLs per story (the pages you actually found).
- Titles: specific and factual, 45-65 characters, no clickbait.
- Mark EXACTLY ONE story as featured (the day's most consequential) and give a one-line reason in both languages.
- Skip any story matching these already-published titles: ${skipTitles.length ? skipTitles.join(' | ') : '(none)'}

OUTPUT: Reply with ONLY a JSON array (no markdown fence, no commentary). Each element:
{
  "slug": "kebab-case-slug-max-6-words",
  "title": "...",
  "summary": "one-sentence standfirst, 100-158 chars",
  "body": "markdown body with ## subheadings allowed",
  "title_zh": "中文标题（新闻语体，非直译腔）",
  "summary_zh": "中文导语一句话",
  "body_zh": "中文正文 markdown，与英文版信息一致，行文要像中文科技媒体原生稿件而非翻译腔",
  "tags": ["Models" | "Research" | "Policy" | "Industry" | "Funding" | "Open Source" | "Safety"],
  "sources": [{"title": "Source page title", "url": "https://..."}],
  "featured": false,
  "featured_reason": "only on the featured story: one line on why it leads today",
  "featured_reason_zh": "仅推荐条目：一句话推荐理由",
  "date": "${today}"
}`;
  const articles = parseJson(await runClaude(prompt), '[', ']');
  let saved = 0;
  for (const a of articles) {
    if (!a.slug || !a.title || !a.body) continue;
    a.date = a.date || today;
    a.tags = a.tags || [];
    a.sources = a.sources || [];
    await writeFile(join(CONTENT, `${a.date}-${a.slug}.json`), JSON.stringify(a, null, 2));
    saved++;
    console.log(`  + ${a.featured ? '★ ' : ''}${a.title}`);
  }
  if (saved === 0) throw new Error('简报 0 篇');
  return articles.map((a) => a.title);
}

async function generateRadar(skipTitles) {
  const prompt = `You are the news-radar editor of "AI Pulse". Today is ${today}.

TASK: Use web search to collect ${RADAR_COUNT} SHORT AI news items from the last 24-48 hours — the wider AI-circle chatter beyond the day's headline stories: product updates, notable open-source releases, papers, funding rounds, executive moves, benchmark results, policy tidbits, notable X threads. Global coverage.

${SOURCE_GUIDE}

RULES:
- Each item: ONE factual sentence in English (max 30 words) + native-quality Chinese version.
- Every item MUST have a real source URL you actually found.
- FRESHNESS IS MANDATORY: verify the ORIGINAL publication date of each item (open the source page or check the dateline; search results often resurface old news). Set "published" to that date. If you cannot confirm it is within the last 48 hours, DISCARD the item — a shorter list is better than stale items.
- No overlap with these headline stories or recent radar items (also skip anything whose FACTS were already covered, even under a different wording): ${skipTitles.join(' | ')}
- Diverse: no more than 3 items on the same company.

OUTPUT: ONLY a JSON object (no fence, no commentary):
{
  "date": "${today}",
  "items": [
    { "text": "...", "text_zh": "...", "url": "https://...", "source": "source site name", "published": "YYYY-MM-DD", "tag": "Models|Research|Policy|Industry|Funding|Open Source|Safety" }
  ]
}`;
  const radar = parseJson(await runClaude(prompt), '{', '}');
  const cutoff = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);
  radar.items = (radar.items || []).filter((i) => i.text && i.url)
    .filter((i) => {
      if (i.published && i.published < cutoff) { console.log(`  - 过滤旧闻(${i.published}): ${i.text_zh || i.text}`); return false; }
      return true;
    });
  if (!radar.items.length) throw new Error('雷达 0 条');
  await writeFile(join(CONTENT, `radar-${today}.json`), JSON.stringify(radar, null, 2));
  console.log(`  + 雷达 ${radar.items.length} 条`);
}

async function recentRadarTexts() {
  const files = (await readdir(CONTENT).catch(() => [])).filter((f) => f.startsWith('radar-')).sort().slice(-2);
  const texts = [];
  for (const f of files) {
    try { texts.push(...JSON.parse(await readFile(join(CONTENT, f), 'utf8')).items.map((i) => i.text)); } catch {}
  }
  return texts;
}

async function main() {
  const skip = await existingTitles();
  console.log(`[generate] 深度简报 ${COUNT} 篇 + 雷达 ${RADAR_COUNT} 条，日期 ${today} …`);
  const newTitles = await generateBriefings(skip);
  try {
    await generateRadar([...skip.slice(-15), ...newTitles, ...(await recentRadarTexts())]);
  } catch (e) {
    console.error('[generate] 雷达失败（不影响简报发布）:', e.message);
  }
  console.log('[generate] 完成');
}

main().catch((e) => { console.error('[generate] 失败:', e.message); process.exit(1); });
