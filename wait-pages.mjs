// Wait until GitHub Pages serves the exact site version that was just pushed.
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const BASE = (process.env.AIPULSE_BASE || 'https://mmlong818.github.io/ai-pulse').replace(/\/$/, '');
const CHECK_PATH = (process.env.AIPULSE_PAGES_CHECK_PATH || 'zh/index.html').replace(/^\/+/, '');
const TIMEOUT_MS = positiveNumber(process.env.AIPULSE_PAGES_WAIT_MS, 12 * 60_000);
const INTERVAL_MS = positiveNumber(process.env.AIPULSE_PAGES_POLL_MS, 10_000);

function positiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalize(text) {
  return text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim();
}

function fingerprint(text) {
  return createHash('sha256').update(normalize(text)).digest('hex');
}

const expected = await readFile(join(ROOT, 'docs', ...CHECK_PATH.split('/')), 'utf8');
const expectedHash = fingerprint(expected);
const deadline = Date.now() + TIMEOUT_MS;
let attempt = 0;
let lastError = '';

while (Date.now() < deadline) {
  attempt += 1;
  const url = `${BASE}/${CHECK_PATH}?deploy=${expectedHash.slice(0, 12)}-${attempt}`;
  try {
    const response = await fetch(url, {
      cache: 'no-store',
      headers: { 'cache-control': 'no-cache' },
      signal: AbortSignal.timeout(Math.min(20_000, INTERVAL_MS)),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const actualHash = fingerprint(await response.text());
    if (actualHash === expectedHash) {
      console.log(`[pages] 已上线最新版本：${CHECK_PATH}（等待 ${Math.round((TIMEOUT_MS - (deadline - Date.now())) / 1000)} 秒）`);
      process.exit(0);
    }
    lastError = `线上仍是旧版本（${actualHash.slice(0, 12)}）`;
  } catch (error) {
    lastError = error?.message || String(error);
  }

  if (attempt === 1 || attempt % 6 === 0) {
    console.log(`[pages] 等待上线：${lastError}`);
  }
  await new Promise((resolve) => setTimeout(resolve, INTERVAL_MS));
}

throw new Error(`[pages] 等待 GitHub Pages 上线超时：${lastError || '状态未知'}`);
