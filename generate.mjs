// AI 采编流水线：claude -p + WebSearch 采集全球 AI 新闻并撰写原创英文简报
import { spawn } from 'node:child_process';
import { writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');
const COUNT = Number(process.argv[2] || 5);
const today = new Date().toISOString().slice(0, 10);

function runClaude(prompt, { timeoutMs = 900000 } = {}) {
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

async function main() {
  const existing = (await readdir(CONTENT).catch(() => [])).filter((f) => f.endsWith('.json'));
  const existingTitles = [];
  for (const f of existing.slice(-30)) {
    try { existingTitles.push(JSON.parse(await (await import('node:fs/promises')).readFile(join(CONTENT, f), 'utf8')).title); } catch {}
  }

  const prompt = `You are the sole editor of "AI Pulse", an autonomous AI news site. Today is ${today}.

TASK: Use web search to find the ${COUNT} most significant AI news stories from the last 24-48 hours (models, research, policy, industry, funding — global coverage, not US-only). Then write an original English briefing for each.

RULES:
- ORIGINAL writing only. Never copy sentences from sources. Summarize and analyze in your own words.
- Each briefing: 250-450 words, neutral news-agency tone, explain why it matters in the last paragraph.
- Cite 1-3 real source URLs per story (the pages you actually found).
- Titles: specific and factual, 45-65 characters, no clickbait.
- Skip any story matching these already-published titles: ${existingTitles.length ? existingTitles.join(' | ') : '(none)'}

OUTPUT: Reply with ONLY a JSON array (no markdown fence, no commentary). Each element:
{
  "slug": "kebab-case-slug-max-6-words",
  "title": "...",
  "summary": "one-sentence standfirst, 100-158 chars",
  "body": "markdown body with ## subheadings allowed",
  "tags": ["Models" | "Research" | "Policy" | "Industry" | "Funding" | "Open Source" | "Safety"],
  "sources": [{"title": "Source page title", "url": "https://..."}],
  "date": "${today}"
}`;

  console.log(`[generate] 采编 ${COUNT} 篇，日期 ${today} …`);
  const raw = await runClaude(prompt);
  const jsonText = raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1);
  const articles = JSON.parse(jsonText);

  let saved = 0;
  for (const a of articles) {
    if (!a.slug || !a.title || !a.body) continue;
    a.date = a.date || today;
    a.tags = a.tags || [];
    a.sources = a.sources || [];
    const file = join(CONTENT, `${a.date}-${a.slug}.json`);
    await writeFile(file, JSON.stringify(a, null, 2));
    saved++;
    console.log(`  + ${a.title}`);
  }
  console.log(`[generate] 完成，保存 ${saved} 篇`);
  if (saved === 0) process.exit(1);
}

main().catch((e) => { console.error('[generate] 失败:', e.message); process.exit(1); });
