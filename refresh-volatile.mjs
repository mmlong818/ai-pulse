// Refresh volatile roster/signatory claims before publishing.
// This catches fast-moving stories where membership lists or signature counts change after the first article.
import { spawn } from 'node:child_process';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');
const DAYS = Number(process.env.AIPULSE_VOLATILE_DAYS || 4);
const MAX = Number(process.env.AIPULSE_VOLATILE_MAX || 8);
const today = new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10);

const VOLATILE_RE = /signator|signature|signed|did not sign|not sign|absent|not among|member|founding|joined|coalition|alliance|roster|名单|签署|签名|联署|未签|缺席|未列名|成员|创始|联盟|阵营/i;

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
      else reject(new Error(err.trim().slice(0, 500) || `claude exited ${code}`));
    });
    child.stdin.write(prompt);
    child.stdin.end();
  });
}

function extractJson(raw) {
  const start = raw.indexOf('[');
  const end = raw.lastIndexOf(']');
  if (start < 0 || end < start) throw new Error('No JSON array in auditor output');
  return raw.slice(start, end + 1).replace(/\u0000/g, '').trim();
}

async function parseJson(raw) {
  const text = extractJson(raw);
  try {
    return JSON.parse(text);
  } catch (firstError) {
    console.error(`[volatile] JSON parse failed, repairing: ${firstError.message}`);
    const repairedRaw = await runClaude(`Repair the following invalid JSON array into strict valid JSON.
Do not add, remove, rewrite, translate, summarize, or explain any content.
Return ONLY the repaired JSON array.

${text}`);
    try {
      return JSON.parse(extractJson(repairedRaw));
    } catch (secondError) {
      throw new Error(`JSON repair failed: ${secondError.message}`);
    }
  }
}

const dayKey = (name, article) => {
  const m = name.match(/^(\d{4}-\d{2}-\d{2})-/);
  return article?.date || m?.[1] || '1970-01-01';
};

async function candidates() {
  const cutoff = new Date(Date.parse(today + 'T00:00:00Z') - (DAYS - 1) * 86400000).toISOString().slice(0, 10);
  const files = (await readdir(CONTENT)).filter((f) => f.endsWith('.json') && !f.startsWith('radar-')).sort().reverse();
  const out = [];
  for (const file of files) {
    let article;
    try {
      article = JSON.parse(await readFile(join(CONTENT, file), 'utf8'));
    } catch {
      continue;
    }
    if (dayKey(file, article) < cutoff) continue;
    const text = [article.title, article.summary, article.body, article.title_zh, article.summary_zh, article.body_zh]
      .filter(Boolean).join('\n');
    if (!VOLATILE_RE.test(text)) continue;
    out.push({ file, article });
    if (out.length >= MAX) break;
  }
  return out;
}

function promptFor(items) {
  return `You are the pre-publication freshness auditor for AI Focus Bulletin. Today is ${today}.

TASK:
Audit the JSON articles below for volatile factual claims that can change after publication, especially:
- signatories, signature counts, supporters, absences, holdouts
- alliance/coalition members, founding lists, joining status
- phrases like "did not sign", "absent", "not among", "remains absent", "joined", "members include"

Use WebSearch and WebFetch to verify the latest public status from primary sources when possible. If a claim is stale or merges two different rosters, rewrite the article JSON so it is current and precise.

Important editorial rule:
- Keep separate entities separate. For example, an Open Secure AI Alliance member list is not the same thing as the "Open Weights and American AI Leadership" policy-letter signatory list.
- Prefer cautious wording when a source confirms one list but not another.
- Preserve slug, date, published, published_at, tags, featured unless a factual correction directly requires changing them.
- Keep the same JSON shape. Keep both English and Chinese fields updated with equivalent facts.
- Do not add markdown fences or commentary.

Return ONLY a JSON array. For each input item:
{
  "file": "same file name",
  "status": "ok" | "updated",
  "reason": "short reason",
  "article": { ...full article JSON when status is updated; omit when ok }
}

ARTICLES:
${JSON.stringify(items, null, 2)}`;
}

async function main() {
  const items = await candidates();
  if (!items.length) {
    console.log('[volatile] no recent volatile articles');
    return;
  }
  console.log(`[volatile] auditing ${items.length} recent volatile article(s)`);
  const result = await parseJson(await runClaude(promptFor(items)));
  let changed = 0;
  for (const r of result) {
    if (!r || !r.file) continue;
    if (r.status !== 'updated') {
      console.log(`  ok ${r.file}${r.reason ? ` - ${r.reason}` : ''}`);
      continue;
    }
    const original = items.find((x) => x.file === r.file);
    if (!original) throw new Error(`Auditor returned unknown file: ${r.file}`);
    const article = r.article;
    if (!article || article.slug !== original.article.slug) throw new Error(`Unsafe update for ${r.file}: missing or changed slug`);
    await writeFile(join(CONTENT, r.file), JSON.stringify(article, null, 2));
    changed++;
    console.log(`  updated ${r.file}${r.reason ? ` - ${r.reason}` : ''}`);
  }
  console.log(`[volatile] complete, updated ${changed}`);
}

main().catch((e) => {
  console.error('[volatile] failed:', e.message);
  process.exit(1);
});
