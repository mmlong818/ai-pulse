// 自动发帖：OAuth 1.0a 签名调用 X API v2（发帖 $0.015/条，含链接 $0.20/条）
// 用法: node post-x.mjs verify | post "文本" | daily
import { createHmac, randomBytes } from 'node:crypto';
import { execSync } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');
const BASE = 'https://mmlong818.github.io/ai-pulse';

function env(name) {
  if (process.env[name]) return process.env[name];
  try {
    return execSync(`powershell -NoProfile -Command "[Environment]::GetEnvironmentVariable('${name}','User')"`,
      { windowsHide: true }).toString().trim() || null;
  } catch { return null; }
}
const CREDS = {
  key: env('X_API_KEY'), keySecret: env('X_API_SECRET'),
  token: env('X_ACCESS_TOKEN'), tokenSecret: env('X_ACCESS_SECRET'),
};

const pct = (s) => encodeURIComponent(s).replace(/[!*'()]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());

function oauthHeader(method, url) {
  const p = {
    oauth_consumer_key: CREDS.key,
    oauth_nonce: randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: CREDS.token,
    oauth_version: '1.0',
  };
  const paramStr = Object.keys(p).sort().map((k) => `${pct(k)}=${pct(p[k])}`).join('&');
  const baseStr = [method.toUpperCase(), pct(url), pct(paramStr)].join('&');
  const signKey = `${pct(CREDS.keySecret)}&${pct(CREDS.tokenSecret)}`;
  p.oauth_signature = createHmac('sha1', signKey).update(baseStr).digest('base64');
  return 'OAuth ' + Object.keys(p).sort().map((k) => `${pct(k)}="${pct(p[k])}"`).join(', ');
}

async function api(method, path, body) {
  const url = `https://api.x.com/2${path}`;
  const res = await fetch(url, {
    method,
    headers: { authorization: oauthHeader(method, url), 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(30000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`X API ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
  return data;
}

async function pickToday() {
  const files = (await readdir(CONTENT)).filter((f) => f.endsWith('.json'));
  const today = new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10); // 与 generate.mjs 的北京日期归档一致
  let featured = null, radar = null;
  for (const f of files) {
    const a = JSON.parse(await readFile(join(CONTENT, f), 'utf8'));
    if (f.startsWith('radar-')) { if (a.date === today) radar = a; continue; }
    if (a.date === today && (a.featured || !featured)) featured = a.featured ? a : featured || a;
  }
  if (!featured) throw new Error('当天无内容可发');
  return { featured, radar };
}

function composeText(lang, { featured, radar }) {
  const now = new Date();
  const morning = now.getHours() < 12;
  if (lang === 'zh') {
    const dateStr = `${now.getMonth() + 1}月${now.getDate()}日`;
    const edition = morning ? '早报' : '晚报';
    const radarLine = radar ? `📡 今日雷达 ${radar.items.length} 条快讯\n` : '';
    return `⚡ AI专注速报 · ${dateStr}${edition}\n\n★ ${featured.title_zh || featured.title}\n${radarLine}\n${BASE}/zh/`;
  }
  const dateStr = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const edition = morning ? 'Morning Edition' : 'Evening Edition';
  const radarLine = radar ? `📡 Daily Radar: ${radar.items.length} quick hits\n` : '';
  return `⚡ AI Focus Bulletin · ${edition}, ${dateStr}\n\n★ ${featured.title}\n${radarLine}\n${BASE}/`;
}

const [cmd, arg] = process.argv.slice(2);
if (!CREDS.key || !CREDS.token) { console.error('[post-x] 凭证缺失，跳过'); process.exit(0); }

if (cmd === 'verify') {
  const me = await api('GET', '/users/me');
  console.log('[post-x] 验证成功:', '@' + me.data.username, '(', me.data.name, ')');
} else if (cmd === 'post') {
  const d = await api('POST', '/tweets', { text: arg });
  console.log('[post-x] 已发帖:', `https://x.com/i/status/${d.data.id}`);
} else if (cmd === 'daily') {
  const picks = await pickToday();
  const zh = await api('POST', '/tweets', { text: composeText('zh', picks) });
  console.log('[post-x] 中文帖已发布:', `https://x.com/i/status/${zh.data.id}`);
  if (env('AIPULSE_POST_EN') !== '0') {
    const gapMin = Number(env('AIPULSE_POST_GAP_MIN') || 10);
    console.log(`[post-x] ${gapMin} 分钟后发布英文帖…`);
    await new Promise((r) => setTimeout(r, gapMin * 60000));
    const en = await api('POST', '/tweets', { text: composeText('en', picks) });
    console.log('[post-x] 英文帖已发布:', `https://x.com/i/status/${en.data.id}`);
  }
} else if (cmd === 'preview') {
  const picks = await pickToday();
  console.log(composeText('zh', picks), '\n---\n', composeText('en', picks));
} else {
  console.log('用法: verify | post "文本" | daily | preview');
}
