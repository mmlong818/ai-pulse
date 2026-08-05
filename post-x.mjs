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
  return lang === 'zh' ? `${BASE}/zh/radar/${date}.html` : `${BASE}/radar/${date}.html`;
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

function storyTitle(article, lang) {
  return headlineText(lang === 'zh' ? article.title_zh || article.title : article.title || article.title_zh);
}

function cleanLine(text) {
  return headlineText(text)
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[。.!?？；;，,、：:]+$/, '');
}

function trimWeighted(text, max, suffix = '…') {
  const value = cleanLine(text || '');
  if (xLen(value) <= max) return value;
  const suffixLen = xLen(suffix);
  let out = '';
  for (const ch of value) {
    if (xLen(out + ch) + suffixLen > max) break;
    out += ch;
  }
  return out.trimEnd().replace(/[。.!?？；;，,、：:]+$/, '') + suffix;
}

function insightFor(lang, featured) {
  const text = lang === 'zh'
    ? featured.featured_reason_zh || featured.summary_zh || featured.featured_reason || featured.summary
    : featured.featured_reason || featured.summary || featured.featured_reason_zh || featured.summary_zh;
  return trimWeighted(text, lang === 'zh' ? 84 : 94);
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
  throw new Error(`引用页不可访问: ${url} (${lastError})`);
}

function metaContent(html, key) {
  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`<meta\\s+(?:property|name)=["']${escaped}["']\\s+content=["']([^"']+)["']`, 'i');
  return html.match(re)?.[1] || '';
}

async function fetchAsTwitterbot(url) {
  const res = await fetch(url, {
    headers: { 'user-agent': 'Twitterbot/1.0' },
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
  });
  const text = await res.text().catch(() => '');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return text;
}

async function checkXCardReady(url) {
  const html = await fetchAsTwitterbot(url);
  const card = metaContent(html, 'twitter:card');
  const title = metaContent(html, 'twitter:title') || metaContent(html, 'og:title');
  const image = metaContent(html, 'twitter:image') || metaContent(html, 'og:image');
  if (!card || !title || !image) {
    throw new Error(`missing card meta card=${card || '-'} title=${title ? 'yes' : 'no'} image=${image || '-'}`);
  }
  const img = await fetch(image, {
    headers: { 'user-agent': 'Twitterbot/1.0' },
    redirect: 'follow',
    signal: AbortSignal.timeout(30000),
  });
  if (!img.ok) throw new Error(`card image HTTP ${img.status}: ${image}`);
}

async function waitForXCardReady(lang) {
  const url = postUrl(lang);
  const maxMs = Math.max(0, Number(env('AIPULSE_X_CARD_WAIT_MIN') || 10) || 0) * 60000;
  const start = Date.now();
  let lastError = '';
  for (;;) {
    try {
      await checkXCardReady(url);
      console.log(`[post-x] ${lang === 'zh' ? '中文' : '英文'} X 引用页卡片已就绪: ${url}`);
      return;
    } catch (error) {
      lastError = error.message || String(error);
      if (Date.now() - start >= maxMs) break;
      await sleep(15000);
    }
  }
  throw new Error(`${lang === 'zh' ? '中文' : '英文'} X 引用页卡片未就绪: ${url} (${lastError})`);
}

async function checkPostedTweet({ id, lang, expectedUrl }) {
  const label = lang === 'zh' ? '中文链接回复' : '英文链接回复';
  const tweet = await readApi(`/tweets/${id}?tweet.fields=created_at,text,entities`);
  const urls = tweet.data?.entities?.urls || [];
  const targets = urls.map(tweetUrlTarget).filter(Boolean);
  const hasExpectedUrl = targets.some((url) => sameUrl(url, expectedUrl));
  const extraUrls = targets.filter((url) => !sameUrl(url, expectedUrl) && !url.startsWith('https://t.co/'));
  if (!hasExpectedUrl) throw new Error(`${label}缺少引用页链接: ${expectedUrl}`);
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
  console.log(`[post-x] ${Math.round(delayMs / 60000)} 分钟后检查${lang === 'zh' ? '中文' : '英文'}链接回复: ${expectedUrl}`);
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
  let head, lead, take, question, otherPrefix, maxTitle;
  if (lang === 'zh') {
    const { month, day, hour } = localParts(edition, 'Asia/Shanghai', 'zh-CN');
    head = `⚡ 猫叔AI雷达 · ${month}月${day}日${hour < 12 ? '早报' : '晚报'}（${label}）`;
    lead = `最值得盯：${trimWeighted(storyTitle(featured, lang), 82)}`;
    take = `猫叔判断：${insightFor(lang, featured)}`;
    question = '你觉得哪条最值得继续追？';
    otherPrefix = '另外：';
    maxTitle = 78;
  } else {
    const etHour = Number(edition.toLocaleString('en-US', { timeZone: 'America/New_York', hour: 'numeric', hour12: false }));
    const dateStr = edition.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' });
    head = `⚡ Uncle Cat AI Radar · ${dateStr} ${etHour < 12 ? 'Morning' : 'Evening'} (${batch.length + radarCount} items)`;
    lead = `Watch: ${trimWeighted(storyTitle(featured, lang), 92)}`;
    take = `Uncle Cat's read: ${insightFor(lang, featured)}`;
    question = 'What should we track next?';
    otherPrefix = 'Also: ';
    maxTitle = 90;
  }

  const lines = [head, '', lead, take];
  const others = batch.filter((a) => a.slug !== featured.slug);
  for (const item of others) {
    const line = `${otherPrefix}${trimWeighted(storyTitle(item, lang), maxTitle)}`;
    if (xLen([...lines, line, '', question].join('\n')) > 280) break;
    lines.push(line);
  }
  if (xLen([...lines, '', question].join('\n')) <= 280) lines.push('', question);
  return lines.join('\n');
}

function composeLinkReply(lang) {
  const url = postUrl(lang);
  return lang === 'zh'
    ? `完整来源、发布时间和全部快讯在这里：\n${url}`
    : `Sources, timestamps, and the full radar:\n${url}`;
}

async function postTweet(text, replyToId) {
  const body = { text };
  if (replyToId) body.reply = { in_reply_to_tweet_id: replyToId };
  return api('POST', '/tweets', body);
}

async function publishLang(lang, picks, pendingChecks) {
  await waitForXCardReady(lang);
  const main = await postTweet(composeText(lang, picks));
  console.log(`[post-x] ${lang === 'zh' ? '中文主帖' : '英文主帖'}已发布:`, `https://x.com/i/status/${main.data.id}`);
  const reply = await postTweet(composeLinkReply(lang), main.data.id);
  console.log(`[post-x] ${lang === 'zh' ? '中文链接回复' : '英文链接回复'}已发布:`, `https://x.com/i/status/${reply.data.id}`);
  queuePostCheck(pendingChecks, lang, reply.data.id);
  return { main, reply };
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
  await publishLang('zh', picks, pendingChecks);
  if (env('AIPULSE_POST_EN') !== '0') {
    const gapMin = Number(env('AIPULSE_POST_GAP_MIN') || 10);
    console.log(`[post-x] ${gapMin} 分钟后发布英文帖…`);
    await waitWithChecks(gapMin * 60000, pendingChecks);
    await publishLang('en', picks, pendingChecks);
  }
  await drainChecks(pendingChecks);
} else if (cmd === 'preview') {
  const picks = await pickToday();
  console.log('[中文主帖]\n' + composeText('zh', picks));
  console.log('\n[中文首条回复]\n' + composeLinkReply('zh'));
  console.log('\n---\n[English main]\n' + composeText('en', picks));
  console.log('\n[English first reply]\n' + composeLinkReply('en'));
} else {
  console.log('用法: verify | post "文本" | delete <tweet_id> | check <tweet_id> [zh|en] | daily | preview');
}
