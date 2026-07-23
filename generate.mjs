// AI 采编流水线：深度简报（双语）+ 每日雷达快讯（双语）
import { spawn } from 'node:child_process';
import { writeFile, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fetchFreshHeadlines } from './feeds.mjs';
import { fetchXHeadlines } from './x-feed.mjs';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');
const COUNT = Number(process.argv[2] || 6);
const RADAR_COUNT = Number(process.env.AIPULSE_RADAR_COUNT || 14);
const WINDOW_H = Number(process.env.AIPULSE_WINDOW_HOURS || 48); // 采集时间窗（小时）
const SKIP_RADAR = process.env.AIPULSE_SKIP_RADAR === '1';
// 按北京日期归档：早班（7:00）与晚班（19:00）落到同一天的文件里
const today = new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10);
// 可选采集截止时间：AIPULSE_CUTOFF（ISO 格式，如 2026-07-22T18:00:00+08:00），只收此前发布的新闻
const CUTOFF = process.env.AIPULSE_CUTOFF ? new Date(process.env.AIPULSE_CUTOFF) : null;
const CUTOFF_NOTE = CUTOFF
  ? `\nCUTOFF: only include stories published BEFORE ${process.env.AIPULSE_CUTOFF}. Ignore anything published after that moment, even if significant — it belongs to the next edition.`
  : '';

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

const SOURCE_GUIDE = `SOURCE POLICY:
1. START from the CANDIDATE HEADLINES below — they come from first-tier feeds and their timestamps are already verified. Prefer them. (Some feeds carry general tech news — pick AI stories only.)
2. Use web search to (a) enrich selected stories with primary sources and detail, and (b) catch major stories the feeds missed:
   - Labs/pages without feeds: Anthropic news & research, xAI news, Mistral, DeepSeek, Alibaba/Qwen, Moonshot, Zhipu, MiniMax, ByteDance Seed (Seedance/Seedream/豆包), Tencent Hunyuan, StepFun 阶跃星辰, Vidu 生数科技, Baidu ERNIE 文心, 01.AI, Cursor blog, Hugging Face daily papers (huggingface.co/papers)
   - AIGC (image/video/audio/music generation): Midjourney, Runway, Pika, Luma AI, Kling 可灵, Wan 通义万相, Vidu 生数科技, HeyGen, Suno, Udio, ElevenLabs, Black Forest Labs (FLUX), Ideogram, Krea, Recraft, ComfyUI, Stability AI
   - 3D & world models: World Labs (Marble), Tripo, Meshy, Rodin/Hyper3D, Hunyuan3D
   - AI agents (products, coding agents, frameworks & infra): Cognition (Devin), Claude Code / Claude Agent SDK, OpenAI Agents, Manus, Genspark, Lovart, CrewAI, LlamaIndex, LangChain/LangGraph, MCP ecosystem
   - CN labs also worth checking: 讯飞星火 iFlytek Spark, 昆仑万维 Skywork 天工, 书生 InternLM (Shanghai AI Lab)
   - X (Twitter) watchlist — search for fresh posts; when a story broke on X, cite the original X post URL:
     · First-party (official announcements): @OpenAI @AnthropicAI @GoogleDeepMind @AIatMeta @xai @MistralAI @deepseek_ai @Alibaba_Qwen @ZhipuAI @huggingface @perplexity_ai @cursor_ai @LangChainAI @OpenRouter
     · Lab leaders & researchers: @sama @gdb @DarioAmodei @demishassabis @karpathy @DrJimFan @ClementDelangue @OfficialLoganK @bcherny @AndrewYNg @ylecun @drfeifei
     · High-signal commentators: @testingcatalog @rohanpaul_ai @emollick @kimmonismus @berryxia @omarsar0 @rowancheung @ArtificialAnlys @steipete @LinusEkenstam @SemiAnalysis_
     · Chinese-sphere: @dotey @xiaohu @op7418 @AYi_AInotes @shao__meng @oran_ge @FinanceYF5 @recatm
   - arXiv papers and Asia coverage (SCMP, Nikkei, 36氪)
3. Prefer primary sources (the lab's own post/paper/X thread) over secondhand reporting when available.
4. COVERAGE BALANCE: beyond frontier-model news, actively look for AIGC stories (image/video/audio/music generation — new models, creator tools, notable use) and AI-agent stories (agent products, coding agents, frameworks & infra). These two areas are currently under-covered; when significance is comparable, prefer them.`;

const digestOf = (headlines) => headlines
  .map((h) => `- ${h.date.toISOString().slice(0, 16)}Z [${h.source}] ${h.title} — ${h.link}`)
  .join('\n');

async function existingTitles() {
  const files = (await readdir(CONTENT).catch(() => [])).filter((f) => f.endsWith('.json') && !f.startsWith('radar-'));
  const titles = [];
  for (const f of files.slice(-40)) {
    try { titles.push(JSON.parse(await readFile(join(CONTENT, f), 'utf8')).title); } catch {}
  }
  return titles;
}

async function generateBriefings(skipTitles, digest) {
  const prompt = `You are the sole editor of "AI Focus Bulletin" (AI专注速报), an autonomous bilingual AI news site. Today is ${today}.

TASK: Select the ${COUNT} most significant AI news stories from the last ${WINDOW_H} hours (models, research, policy, industry, funding — global coverage, not US-only). Then write an original briefing for each, in English AND Chinese.${CUTOFF_NOTE}

${SOURCE_GUIDE}

CANDIDATE HEADLINES (first-tier feeds, timestamps verified):
${digest}

RULES:
- ORIGINAL writing only. Never copy sentences from sources. Summarize and analyze in your own words.
- FRESHNESS: verify each story's ORIGINAL publication date on the source page (search results often resurface old news). If the story broke more than ${WINDOW_H} hours ago, discard it and find another.
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
  "tags": ["Models" | "Research" | "Policy" | "Industry" | "Funding" | "Open Source" | "Safety" | "AIGC" | "Agents"],
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
    a.published_at = new Date().toISOString(); // 真实发布时刻，英文页据此换算美东日期
    a.tags = a.tags || [];
    a.sources = a.sources || [];
    await writeFile(join(CONTENT, `${a.date}-${a.slug}.json`), JSON.stringify(a, null, 2));
    saved++;
    console.log(`  + ${a.featured ? '★ ' : ''}${a.title}`);
  }
  if (saved === 0) throw new Error('简报 0 篇');
  return articles.map((a) => a.title);
}

async function generateRadar(skipTitles, digest) {
  const prompt = `You are the news-radar editor of "AI Focus Bulletin" (AI专注速报). Today is ${today}.

TASK: Collect ${RADAR_COUNT} SHORT AI news items from the last ${WINDOW_H} hours — the wider AI-circle chatter beyond the day's headline stories: product updates, notable open-source releases, papers, funding rounds, executive moves, benchmark results, policy tidbits, notable X threads. Global coverage.${CUTOFF_NOTE}

${SOURCE_GUIDE}

CANDIDATE HEADLINES (first-tier feeds, timestamps verified):
${digest}

RULES:
- Each item: ONE factual sentence in English (max 30 words) + native-quality Chinese version.
- Every item MUST have a real source URL you actually found.
- FRESHNESS IS MANDATORY: verify the ORIGINAL publication date of each item (open the source page or check the dateline; search results often resurface old news). Set "published" to the exact UTC timestamp — when the item comes from the candidate list, COPY its timestamp verbatim; otherwise use the time shown on the source page (converted to UTC), or "YYYY-MM-DD" if only a date is available. If you cannot confirm it is within the last ${WINDOW_H} hours, DISCARD the item — a shorter list is better than stale items.
- No overlap with these headline stories or recent radar items (also skip anything whose FACTS were already covered, even under a different wording): ${skipTitles.join(' | ')}
- Diverse: no more than 3 items on the same company.

OUTPUT: ONLY a JSON object (no fence, no commentary):
{
  "date": "${today}",
  "items": [
    { "text": "...", "text_zh": "...", "url": "https://...", "source": "source site name", "published": "2026-01-01T14:30:00Z (UTC; date-only YYYY-MM-DD if exact time unknown)", "tag": "Models|Research|Policy|Industry|Funding|Open Source|Safety|AIGC|Agents" }
  ]
}`;
  const radar = parseJson(await runClaude(prompt), '{', '}');
  const cutoff = new Date(Date.now() - Math.ceil(WINDOW_H / 24) * 86400000).toISOString().slice(0, 10);
  radar.items = (radar.items || []).filter((i) => i.text && i.url)
    .filter((i) => {
      if (i.published && i.published.slice(0, 10) < cutoff) { console.log(`  - 过滤旧闻(${i.published}): ${i.text_zh || i.text}`); return false; }
      return true;
    });
  if (!radar.items.length) throw new Error('雷达 0 条');
  // 按刊期归档：北京时间 19:00 为界，19:00 前发布的归当天，之后归次日（次日早班首发）
  // 早班从时间窗里捞到的前天/昨天白天条目，并入对应旧刊而不是混进今天
  const editionDay = (p) => {
    if (!p) return today;
    const day = p.includes('T')
      ? new Date(new Date(p).getTime() + 13 * 3600000).toISOString().slice(0, 10) // UTC+8 再加 5h：19:00 后翻篇
      : p; // 只有日期：视为当天 19:00 前
    return day > today ? today : day;
  };
  const byDay = new Map();
  for (const i of radar.items) {
    const day = editionDay(i.published);
    if (!byDay.has(day)) byDay.set(day, []);
    byDay.get(day).push(i);
  }
  for (const [day, items] of byDay) {
    const file = join(CONTENT, `radar-${day}.json`);
    let out = { date: day, items };
    try {
      const prev = JSON.parse(await readFile(file, 'utf8'));
      const seen = new Set(prev.items.flatMap((i) => [i.url, i.text]));
      const fresh = items.filter((i) => !seen.has(i.url) && !seen.has(i.text));
      out = { date: day, items: [...prev.items, ...fresh] };
      console.log(`  + 雷达 ${day}: 已有 ${prev.items.length} 条，新增 ${fresh.length} 条`);
    } catch {
      console.log(`  + 雷达 ${day}: 新建 ${items.length} 条`);
    }
    await writeFile(file, JSON.stringify(out, null, 2));
  }
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
  const [headlines, xItems] = await Promise.all([
    fetchFreshHeadlines({ until: CUTOFF, hours: WINDOW_H, maxPerFeed: WINDOW_H > 48 ? 12 : 8 }),
    fetchXHeadlines({ until: CUTOFF, hours: WINDOW_H, perAccount: WINDOW_H > 48 ? 8 : 5 }).catch((e) => { console.error('[generate] X 直连失败:', e.message); return []; }),
  ]);
  headlines.push(...xItems);
  headlines.sort((a, b) => b.date - a.date);
  console.log(`[generate] 一级信源候选 ${headlines.length} 条（含官方 X ${xItems.length} 条）${CUTOFF ? `（截止 ${process.env.AIPULSE_CUTOFF}）` : ''}`);
  const digest = digestOf(headlines) || '(feeds unavailable this run — rely on web search, verify dates strictly)';
  const newTitles = await generateBriefings(skip, digest);
  if (SKIP_RADAR) { console.log('[generate] 跳过雷达'); return console.log('[generate] 完成'); }
  try {
    await generateRadar([...skip.slice(-15), ...newTitles, ...(await recentRadarTexts())], digest);
  } catch (e) {
    console.error('[generate] 雷达失败（不影响简报发布）:', e.message);
  }
  console.log('[generate] 完成');
}

main().catch((e) => { console.error('[generate] 失败:', e.message); process.exit(1); });
