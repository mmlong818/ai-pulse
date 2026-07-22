// 为已有文章补中文版本（缺 title_zh/body_zh 的批量翻译，claude -p 完成）
import { spawn } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');

function runClaude(prompt) {
  return new Promise((resolve, reject) => {
    const child = spawn('claude', ['-p', '--output-format', 'text'], { shell: true, windowsHide: true, timeout: 600000 });
    let out = '', err = '';
    child.stdout.on('data', (d) => (out += d));
    child.stderr.on('data', (d) => (err += d));
    child.on('error', reject);
    child.on('close', (code) => (code === 0 && out.trim() ? resolve(out.trim()) : reject(new Error(err.slice(0, 200) || `exit ${code}`))));
    child.stdin.write(prompt);
    child.stdin.end();
  });
}

const files = (await readdir(CONTENT)).filter((f) => f.endsWith('.json'));
const pending = [];
for (const f of files) {
  const a = JSON.parse(await readFile(join(CONTENT, f), 'utf8'));
  if (!a.body_zh) pending.push({ file: f, a });
}
console.log(`[backfill] 待翻译 ${pending.length} 篇`);

for (let i = 0; i < pending.length; i += 3) {
  const batch = pending.slice(i, i + 3);
  const prompt = `把以下英文 AI 新闻简报翻成中文。要求：新闻语体、像中文科技媒体原生稿件而非翻译腔；正文保留 markdown 结构。
只输出 JSON 数组，不要任何其他文字。每个元素：{"slug": "...", "title_zh": "...", "summary_zh": "...", "body_zh": "..."}

${JSON.stringify(batch.map(({ a }) => ({ slug: a.slug, title: a.title, summary: a.summary, body: a.body })))}`;
  const raw = await runClaude(prompt);
  const translations = JSON.parse(raw.slice(raw.indexOf('['), raw.lastIndexOf(']') + 1));
  for (const t of translations) {
    const item = batch.find(({ a }) => a.slug === t.slug);
    if (!item || !t.body_zh) continue;
    Object.assign(item.a, { title_zh: t.title_zh, summary_zh: t.summary_zh, body_zh: t.body_zh });
    await writeFile(join(CONTENT, item.file), JSON.stringify(item.a, null, 2));
    console.log(`  ✓ ${t.title_zh}`);
  }
}
console.log('[backfill] 完成');
