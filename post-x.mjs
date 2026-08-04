// 自动发帖：OAuth 1.0a 签名调用 X API v2（发帖 $0.015/条，含链接 $0.20/条）
// 用法: node post-x.mjs verify | post "文本" | delete <tweet_id> | daily
import { createHmac, randomBytes } from 'node:crypto';
import { execSync } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const CONTENT = join(ROOT, 'content');
const BASE = 'https://mmlong818.github.io/ai-pulse';
const EB_ANCHOR = 11 * 3600000;
const EB_HALF = 12 * 3600000;
const forcedEdition = (process.env.AIPULSE_FORCE_EDITION || process.env.AIPULSE_EDITION || '').toLowerCase();
const forcedEditionDate = process.env.AIPULSE_EDITION_DATE || new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10);

function currentBeijingDate() {
  return forcedEdition ? forcedEditionDate : new Date(Date.now() + 8 * 3600000).toISOString().slice(0, 10);
}

function forcedEditionInstant() {
  if (forcedEdition !== 'morning' && forcedEdition !== 'evening') return null;
  const localTime = forcedEdition === 'morning' ? '07:00:00+08:00' : '19:00:00+08:00';
  return new Date(`${forcedEditionDate}T${localTime}`);
}

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
  bearer: env('X_BEARER_TOKEN') || env('TWITTER_BEARER_TOKEN'),
};

const pct = (s) => encodeURIComponent(s).replace(/[!*'()]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());

function oauthHeader(method, url) {
  const parsed = new URL(url);
  const p = {
    oauth_consumer_key: CREDS.key,
    oauth_nonce: randomBytes(16).toString('hex'),
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_token: CREDS.token,
    oauth_version: '1.0',
  };
  const signatureParams = { ...p };
  for (const [key, value] of parsed.searchParams) signatureParams[key] = value;
  const paramStr = Object.keys(signatureParams).sort().map((k) => `${pct(k)}=${pct(signatureParams[k])}`).join('&');
  const baseUrl = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  const baseStr = [method.toUpperCase(), pct(baseUrl), pct(paramStr)].join('&');
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

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function readApi(path) {
  if (!CREDS.bearer) return api('GET', path);
  const res = await fetch(`https://api.x.com/2${path}`, {
    headers: { authorization: `Bearer ${CREDS.bearer}` },
    signal: AbortSignal.timeout(30000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`X API ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
  return data;
}

async function pickToday() {
  const files = (await readdir(CONTENT)).filter((f) => f.endsWith('.json'));
  const today = currentBeijingDate(); // 与 generate.mjs 的北京日期归档一致
  let radar = null, fallback = null;
  const articles = [];
  for (const f of files) {
    const a = JSON.parse(await readFile(join(CONTENT, f), 'utf8'));
    if (f.startsWith('radar-')) { if (a.date === today) radar = a; continue; }
    if (a.date !== today) continue;
    articles.push(a);
    if (!fallback) fallback = a;
  }
  if (!articles.length) throw new Error('当天无内容可发');
  // 当班 = 一次生成的时间簇。强制指定早/晚报时，必须取对应班次，避免标题与内容错位。
  const forced = forcedEditionInstant();
  const anchor = forced ? forced.getTime() : Math.max(...articles.map((a) => Date.parse(a.published_at) || 0));
  const batch = articles.filter((a) => Math.abs((Date.parse(a.published_at) || 0) - anchor) <= 30 * 60000);
  if (!batch.length) throw new Error('指定班次无内容可发');
  const featured = batch.find((a) => a.featured) || batch[0] || fallback;
  return { featured, batch, radar };
}

// X 加权长度：CJK/全角/emoji 记 2，其余记 1；URL 固定折算 23
const xLen = (s) => [...s].reduce((n, c) => n + (c.codePointAt(0) > 0x10ff ? 2 : 1), 0);

function headlineText(text) {
  return String(text || '').replace(/(?<![:/@])\b([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)\.([A-Za-z]{2,})(?=\b)/g, '$1 $2');
}

function postUrl(lang) {
  const date = currentBeijingDate();
  return lang === 'zh' ? `${BASE}/zh/day/${date}.html` : `${BASE}/day/${date}.html`;
}

const floorEdition = (ms) => Math.floor((ms - EB_ANCHOR) / EB_HALF) * EB_HALF + EB_ANCHOR;
const ceilEdition = (ms) => Math.ceil((ms - EB_ANCHOR) / EB_HALF) * EB_HALF + EB_ANCHOR;

function radarTs(item, fallbackDate) {
  const p = item?.published || fallbackDate;
  return Date.parse(String(p || '').includes('T') ? p : `${p}T00:00:00Z`) || 0;
}

function radarItemsForEdition(radar, edition) {
  if (!radar?.items?.length) return [];
  const boundary = floorEdition(edition.getTime());
  return radar.items.filter((item) => {
    const ts = radarTs(item, radar.date);
    return ts && ceilEdition(ts) === boundary;
  });
}

function countLabel(lang, briefingCount, radarCount) {
  const total = briefingCount + radarCount;
  if (lang === 'zh') return `${total}条：${briefingCount}篇深度+${radarCount}条快讯`;
  return `${total} items: ${briefingCount} briefings + ${radarCount} quick hits`;
}

function postCheckDelayMs() {
  const rawMs = env('AIPULSE_X_CHECK_DELAY_MS');
  if (rawMs) return Math.max(0, Number(rawMs) || 0);
  const rawMin = env('AIPULSE_X_CHECK_DELAY_MIN');
  return Math.max(0, Number(rawMin || 5) || 0) * 60000;
}

function sameUrl(a, b) {
  return String(a || '').replace(/\/$/, '') === String(b || '').replace(/\/$/, '');
}

function tweetUrlTarget(urlEntity) {
  return urlEntity?.expanded_url || urlEntity?.unwound_url || urlEntity?.url || '';
}

async function checkPublicUrl(url) {
  let lastError = '';
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { 'user-agent': 'Twitterbot/1.0' },
        redirect: 'follow',
        signal: AbortSignal.timeout(30000),
      });
      if (res.ok) return;
      lastError = `HTTP ${res.status}`;
    } catch (error) {
      lastError = error.message;
    }
    if (attempt < 3) await sleep(10000);
  }
  throw new Error(`日报页不可访问: ${url} (${lastError})`);
}

async function checkPostedTweet({ id, lang, expectedUrl }) {
  const label = lang === 'zh' ? '中文帖' : '英文帖';
  const tweet = await readApi(`/tweets/${id}?tweet.fields=created_at,text,entities`);
  const urls = tweet.data?.entities?.urls || [];
  const targets = urls.map(tweetUrlTarget).filter(Boolean);
  const hasExpectedUrl = targets.some((url) => sameUrl(url, expectedUrl));
  const extraUrls = targets.filter((url) => !sameUrl(url, expectedUrl) && !url.startsWith('https://t.co/'));
  if (!hasExpectedUrl) throw new Error(`${label}缺少日报链接: ${expectedUrl}`);
  if (extraUrls.length) throw new Error(`${label}出现额外链接: ${extraUrls.join(', ')}`);

  await checkPublicUrl(expectedUrl);
  const expectedEntity = urls.find((url) => sameUrl(tweetUrlTarget(url), expectedUrl));
  if (expectedEntity?.status && expectedEntity.status >= 400) {
    console.log(`[post-x] ${label} X 卡片状态暂为 ${expectedEntity.status}，但页面直连正常: ${expectedUrl}`);
  }
  console.log(`[post-x] ${label}检查通过: https://x.com/i/status/${id}`);
}

function queuePostCheck(pending, lang, id) {
  const delayMs = postCheckDelayMs();
  const expectedUrl = postUrl(lang);
  pending.push({ id, lang, expectedUrl, due: Date.now() + delayMs });
  console.log(`[post-x] ${Math.round(delayMs / 60000)} 分钟后检查${lang === 'zh' ? '中文' : '英文'}帖: ${expectedUrl}`);
}

async function runDueChecks(pending) {
  for (let i = 0; i < pending.length;) {
    if (pending[i].due > Date.now()) { i++; continue; }
    const item = pending.splice(i, 1)[0];
    await checkPostedTweet(item);
  }
}

async function waitWithChecks(ms, pending) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    const nextDue = pending.length ? Math.min(...pending.map((item) => item.due)) : end;
    await sleep(Math.max(0, Math.min(nextDue, end) - Date.now()));
    await runDueChecks(pending);
  }
}

async function drainChecks(pending) {
  while (pending.length) {
    pending.sort((a, b) => a.due - b.due);
    await sleep(Math.max(0, pending[0].due - Date.now()));
    await runDueChecks(pending);
  }
}

function editionInstant({ featured, batch }) {
  const forced = forcedEditionInstant();
  if (forced) return forced;
  const times = [featured, ...batch]
    .map((a) => Date.parse(a.published_at || a.published || `${a.date}T00:00:00Z`))
    .filter(Boolean);
  return new Date(Math.max(...times));
}

function localParts(date, timeZone, locale) {
  const parts = Object.fromEntries(new Intl.DateTimeFormat(locale, {
    timeZone,
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    hour12: false,
  }).formatToParts(date).map((p) => [p.type, p.value]));
  return { month: Number(parts.month), day: Number(parts.day), hour: Number(parts.hour) };
}

function composeText(lang, picks) {
  const { featured, batch, radar } = picks;
  const edition = editionInstant(picks);
  const radarCount = radarItemsForEdition(radar, edition).length;
  const label = countLabel(lang, batch.length, radarCount);
  let head, star, others, url;
  if (lang === 'zh') {
    const { month, day, hour } = localParts(edition, 'Asia/Shanghai', 'zh-CN');
    head = `⚡ AI专注速报 · ${month}月${day}日${hour < 12 ? '早报' : '晚报'}（${label}）`;
    star = `★ ${headlineText(featured.title_zh || featured.title)}`;
    others = batch.filter((a) => a.slug !== featured.slug).map((a) => `· ${headlineText(a.title_zh || a.title)}`);
    url = postUrl('zh');
  } else {
    // 英文帖按美东时间：北京 7:00 班 = 美东前一天晚上（Evening），北京 19:00 班 = 美东当天早上（Morning）
    const etHour = Number(edition.toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }));
    const dateStr = edition.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' });
    head = `⚡ AI Focus Bulletin · ${etHour < 12 ? 'Morning' : 'Evening'} Edition, ${dateStr} (${label})`;
    star = `★ ${headlineText(featured.title)}`;
    others = batch.filter((a) => a.slug !== featured.slug).map((a) => `· ${headlineText(a.title)}`);
    url = postUrl('en');
  }
  // 帖子直接承载当班内容：推荐 + 尽量多的其余简报标题，装不下为止（280 加权额度，URL 记 23，留 3 余量）
  const lines = [head, '', star];
  let used = xLen(lines.join('\n')) + 1 + 23 + 3;
  for (const line of others) {
    if (used + xLen(line) + 1 > 280) break;
    lines.push(line);
    used += xLen(line) + 1;
  }
  return lines.join('\n') + '\n' + url;
}

const [cmd, arg, arg2] = process.argv.slice(2);
const needsOAuth = ['verify', 'post', 'delete', 'daily'].includes(cmd);
if (needsOAuth && (!CREDS.key || !CREDS.token)) { console.error('[post-x] 发布凭证缺失，跳过'); process.exit(0); }
if (cmd === 'check' && !CREDS.bearer && (!CREDS.key || !CREDS.token)) { console.error('[post-x] 读取凭证缺失，跳过'); process.exit(0); }

if (cmd === 'verify') {
  const me = await api('GET', '/users/me');
  console.log('[post-x] 验证成功:', '@' + me.data.username, '(', me.data.name, ')');
} else if (cmd === 'post') {
  const d = await api('POST', '/tweets', { text: arg });
  console.log('[post-x] 已发帖:', `https://x.com/i/status/${d.data.id}`);
} else if (cmd === 'delete') {
  if (!arg) throw new Error('缺少 tweet id');
  await api('DELETE', `/tweets/${arg}`);
  console.log('[post-x] 已删除:', `https://x.com/i/status/${arg}`);
} else if (cmd === 'check') {
  if (!arg) throw new Error('缺少 tweet id');
  const lang = arg2 === 'en' ? 'en' : 'zh';
  await checkPostedTweet({ id: arg, lang, expectedUrl: postUrl(lang) });
} else if (cmd === 'daily') {
  const picks = await pickToday();
  const pendingChecks = [];
  const zh = await api('POST', '/tweets', { text: composeText('zh', picks) });
  console.log('[post-x] 中文帖已发布:', `https://x.com/i/status/${zh.data.id}`);
  queuePostCheck(pendingChecks, 'zh', zh.data.id);
  if (env('AIPULSE_POST_EN') !== '0') {
    const gapMin = Number(env('AIPULSE_POST_GAP_MIN') || 10);
    console.log(`[post-x] ${gapMin} 分钟后发布英文帖…`);
    await waitWithChecks(gapMin * 60000, pendingChecks);
    const en = await api('POST', '/tweets', { text: composeText('en', picks) });
    console.log('[post-x] 英文帖已发布:', `https://x.com/i/status/${en.data.id}`);
    queuePostCheck(pendingChecks, 'en', en.data.id);
  }
  await drainChecks(pendingChecks);
} else if (cmd === 'preview') {
  const picks = await pickToday();
  console.log(composeText('zh', picks), '\n---\n', composeText('en', picks));
} else {
  console.log('用法: verify | post "文本" | delete <tweet_id> | check <tweet_id> [zh|en] | daily | preview');
}
