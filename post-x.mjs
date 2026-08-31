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

const X_CREDENTIAL_ENV = new Set([
  'X_API_KEY',
  'X_API_SECRET',
  'X_ACCESS_TOKEN',
  'X_ACCESS_SECRET',
  'X_BEARER_TOKEN',
  'TWITTER_BEARER_TOKEN',
]);

function storedUserEnv(name) {
  try {
    return execSync(`powershell -NoProfile -Command "[Environment]::GetEnvironmentVariable('${name}','User')"`,
      { windowsHide: true }).toString().trim() || null;
  } catch { return null; }
}

function env(name) {
  const stored = storedUserEnv(name);
  if (X_CREDENTIAL_ENV.has(name)) return stored || process.env[name] || null;
  return process.env[name] || stored;
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

const TRANSIENT_X_STATUS = new Set([429, 500, 502, 503, 504]);
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function parseMaybeJson(text) {
  if (!text) return {};
  try { return JSON.parse(text); } catch { return { raw: text.slice(0, 200) }; }
}

async function api(method, path, body, options = {}) {
  const retries = options.retries ?? 4;
  const url = `https://api.x.com/2${path}`;
  let lastError = '';
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        method,
        headers: { authorization: oauthHeader(method, url), 'content-type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(30000),
      });
      const data = parseMaybeJson(await res.text().catch(() => ''));
      if (res.ok) return data;
      lastError = `X API ${res.status}: ${JSON.stringify(data).slice(0, 200)}`;
      if (!TRANSIENT_X_STATUS.has(res.status) || attempt === retries) throw new Error(lastError);
    } catch (error) {
      if (lastError && !TRANSIENT_X_STATUS.has(Number(lastError.match(/^X API (\d+)/)?.[1] || 0))) throw error;
      if (!lastError && method.toUpperCase() === 'POST') throw error;
      lastError = lastError || `X API request failed: ${error?.message || error}`;
      if (attempt === retries) throw new Error(lastError);
    }
    const delay = Math.min(60000, 5000 * 2 ** attempt);
    console.log(`[post-x] X API 临时失败，${Math.round(delay / 1000)} 秒后重试 ${attempt + 1}/${retries}: ${lastError}`);
    await sleep(delay);
    lastError = '';
  }
}

async function readApi(path) {
  if (!CREDS.bearer) return api('GET', path);
  const url = `https://api.x.com/2${path}`;
  let lastError = '';
  for (let attempt = 0; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { authorization: `Bearer ${CREDS.bearer}` },
        signal: AbortSignal.timeout(30000),
      });
      const data = parseMaybeJson(await res.text().catch(() => ''));
      if (res.ok) return data;
      lastError = `X API ${res.status}: ${JSON.stringify(data).slice(0, 200)}`;
      if (!TRANSIENT_X_STATUS.has(res.status) || attempt === 4) throw new Error(lastError);
    } catch (error) {
      if (lastError && !TRANSIENT_X_STATUS.has(Number(lastError.match(/^X API (\d+)/)?.[1] || 0))) throw error;
      lastError = lastError || `X API read failed: ${error?.message || error}`;
      if (attempt === 4) throw new Error(lastError);
    }
    const delay = Math.min(60000, 5000 * 2 ** attempt);
    console.log(`[post-x] X API 检查临时失败，${Math.round(delay / 1000)} 秒后重试 ${attempt + 1}/4: ${lastError}`);
    await sleep(delay);
    lastError = '';
  }
}

async function pickToday() {
  const files = (await readdir(CONTENT)).filter((f) => f.endsWith('.json'));
  const today = currentBeijingDate(); // 与 generate.mjs 的北京日期归档一致
  const radars = [];
  let fallback = null;
  const articles = [];
  for (const f of files) {
    const a = JSON.parse(await readFile(join(CONTENT, f), 'utf8'));
    if (f.startsWith('radar-')) { radars.push(a); continue; }
    articles.push(a);
    if (!fallback || String(a.published_at || '') > String(fallback.published_at || '')) fallback = a;
  }
  // 当班 = 一次生成的时间簇。强制指定早/晚报时，必须取对应班次，避免标题与内容错位。
  const forced = forcedEditionInstant();
  const articleTimes = articles.filter((a) => a.date === today).map((a) => Date.parse(a.published_at) || 0).filter(Boolean);
  const anchor = forced ? forced.getTime() : (articleTimes.length ? Math.max(...articleTimes) : floorEdition(Date.now()));
  const edition = new Date(anchor);
  const boundary = floorEdition(anchor);
  const bjHour = Number(edition.toLocaleString('en-US', { timeZone: 'Asia/Shanghai', hour: 'numeric', hour12: false }));
  // 早报聚合最近两个班次（约 24 小时）；晚报只发布本班新增，避免与早报重复。
  const boundaries = new Set(bjHour < 12 ? [boundary, boundary - EB_HALF] : [boundary]);
  const batch = articles.filter((a) => boundaries.has(floorEdition(Date.parse(a.published_at || '') || 0)));
  const currentBatch = batch.filter((a) => floorEdition(Date.parse(a.published_at || '') || 0) === boundary);
  const radarBatch = radars.flatMap((radar) => (radar.items || []).filter((item) => {
    const ts = radarTs(item, radar.date);
    return ts && boundaries.has(ceilEdition(ts));
  }));
  const currentRadar = radarBatch.filter((item) => ceilEdition(radarTs(item, today)) === boundary);
  if (!batch.length && !radarBatch.length) throw new Error('指定班次无内容可发');
  const featured = currentBatch.find((a) => a.featured) || currentBatch[0]
    || radarAsFeatured(currentRadar[0] || radarBatch[0], today, edition)
    || batch.find((a) => a.featured) || batch[0] || fallback;
  return { featured, batch, radarItems: radarBatch, edition };
}

// X 加权长度：CJK/全角/emoji 记 2，其余记 1；URL 固定折算 23
const xLen = (s) => [...s].reduce((n, c) => n + (c.codePointAt(0) > 0x10ff ? 2 : 1), 0);

function headlineText(text) {
  return String(text || '').replace(/(?<![:/@])\b([A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)\.([A-Za-z]{2,})(?=\b)/g, '$1 $2');
}

function postUrl(lang, edition = forcedEditionInstant() || new Date()) {
  const bjHour = Number(edition.toLocaleString('en-US', { timeZone: 'Asia/Shanghai', hour: 'numeric', hour12: false }));
  if (bjHour < 12) return lang === 'zh' ? `${BASE}/zh/` : `${BASE}/`;
  const date = edition.toLocaleDateString('en-CA', { timeZone: 'Asia/Shanghai' });
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

function radarAsFeatured(item, date, edition) {
  if (!item) return null;
  const publishedAt = item.published && String(item.published).includes('T')
    ? item.published
    : edition.toISOString();
  return {
    slug: `radar-lead-${date}`,
    title: item.text || item.text_zh || 'AI radar update',
    title_zh: item.text_zh || item.text || 'AI 快讯',
    summary: item.text || item.text_zh || '',
    summary_zh: item.text_zh || item.text || '',
    featured_reason: 'This edition is radar-only, so the lead quick hit carries the post.',
    featured_reason_zh: '本班没有深度简报，用快讯里最有讨论度的一条领发。',
    cat_take_en: item.cat_take_en || item.text || '',
    cat_take_zh: item.cat_take_zh || item.text_zh || item.text || '',
    tags: [item.tag].filter(Boolean),
    date,
    published: item.published || publishedAt,
    published_at: edition.toISOString(),
    sources: item.url ? [{ title: item.source || 'Source', url: item.url }] : [],
  };
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

function articleBlob(article) {
  return [
    article.slug,
    article.title, article.title_zh,
    article.summary, article.summary_zh,
    article.featured_reason, article.featured_reason_zh,
    ...(article.tags || []),
  ].filter(Boolean).join(' ').toLowerCase();
}

function hasAny(article, terms) {
  const blob = articleBlob(article);
  return terms.some((term) => blob.includes(term.toLowerCase()));
}

function takeFor(lang, article) {
  if (lang === 'zh') {
    const generated = cleanLine(article.cat_take_zh || '').replace(/^猫叔[：:]\s*/, '');
    const fallback = cleanLine(article.featured_reason_zh || article.summary_zh || storyTitle(article, 'zh'));
    return `猫叔：${trimWeighted(generated || fallback, 92)}`;
  }
  const generated = cleanLine(article.cat_take_en || '').replace(/^Uncle Cat[：:]\s*/i, '');
  const fallback = cleanLine(article.featured_reason || article.summary || storyTitle(article, 'en'));
  return `Uncle Cat: ${trimWeighted(generated || fallback, 120)}`;
}

function hookFor(lang, article) {
  if (lang !== 'zh') return 'Watch';
  const moneyHit = hasAny(article, ['funding', 'ipo', 'valuation', 'acquire', 'acquisition', 'deal', 'billion', '融资', '估值', '收购', '上市', '交易', '亿美元', '亿元']);
  if (moneyHit && hasAny(article, ['down', 'discount', 'below', '亏', '低于', '折价', '缩水', '贱卖'])) return '亏了亏了';
  if (moneyHit) return '好多钱啊';

  const rules = [
    { hit: ['outage', 'incident', 'breach', 'bug', 'lawsuit', 'court', 'ban', 'halt', '事故', '宕机', '漏洞', '法院', '禁令', '叫停', '撤销'], label: '谁的锅' },
    { hit: ['ceo', 'quit', 'quits', 'exit', 'exits', 'resign', 'leaves', 'leadership', 'brain drain', '卸任', '离职', '换帅', '掌舵人', '核心研究者'], label: '爆炸信息' },
    { hit: ['jailbreak', 'security', 'safety', 'cyber', 'eval', '越狱', '安全', '网络安全', '评测翻车'], label: '谁的锅' },
    { hit: ['price', 'cost', 'cheaper', 'cut', 'saving', 'throughput', '降价', '成本', '便宜', '省钱', '吞吐'], label: '赚了赚了' },
    { hit: ['open-source', 'open source', 'open-weight', 'weights', 'apache', 'mit license', '开源', '权重', '许可证'], label: '坐稳了' },
    { hit: ['compute', 'data center', 'datacenter', 'power', 'grid', 'capacity', 'chip', 'silicon', 'gpu', '算力', '数据中心', '电力', '并网', '芯片', '显卡'], label: '坐稳了' },
    { hit: ['benchmark', 'leaderboard', 'arena', 'index', 'rank', 'score', '榜单', '排名', '分数'], label: '有点意思' },
    { hit: ['video', 'image', 'audio', 'aigc', 'runway', 'flux', 'pika', 'canva', '视频', '图像', '音频', '生成'], label: '哇哦' },
    { hit: ['policy', 'regulation', 'white house', 'ai act', '监管', '政策', '白宫', '法案'], label: '？？？' },
  ];
  return rules.find((item) => hasAny(article, item.hit))?.label || '有点意思';
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

async function waitForXCardReady(lang, url = postUrl(lang)) {
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
  const label = lang === 'zh' ? '中文主帖链接' : '英文主帖链接';
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

function queuePostCheck(pending, lang, id, expectedUrl = postUrl(lang)) {
  const delayMs = postCheckDelayMs();
  pending.push({ id, lang, expectedUrl, due: Date.now() + delayMs });
  console.log(`[post-x] ${Math.round(delayMs / 60000)} 分钟后检查${lang === 'zh' ? '中文' : '英文'}主帖链接: ${expectedUrl}`);
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

function editionInstant({ featured, batch, edition }) {
  if (edition) return edition;
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
  const { featured, batch, radarItems = [] } = picks;
  const edition = editionInstant(picks);
  const radarCount = radarItems.length;
  const label = countLabel(lang, batch.length, radarCount);
  let head, lead, take, question, linkLabel, otherPrefix, maxTitle;
  if (lang === 'zh') {
    const { month, day, hour } = localParts(edition, 'Asia/Shanghai', 'zh-CN');
    head = `⚡ 猫叔AI雷达 · ${month}月${day}日${hour < 12 ? '早报' : '晚报'}（${label}）`;
    lead = `${hookFor(lang, featured)}：${trimWeighted(storyTitle(featured, lang), 82)}`;
    take = takeFor(lang, featured);
    question = '你觉得哪条最值得继续追？';
    linkLabel = '完整简报：';
    otherPrefix = '另外：';
    maxTitle = 78;
  } else {
    const bjHour = Number(edition.toLocaleString('en-US', { timeZone: 'Asia/Shanghai', hour: 'numeric', hour12: false }));
    const dateStr = edition.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'Asia/Shanghai' });
    head = `⚡ Uncle Cat AI Radar · ${dateStr} ${bjHour < 12 ? 'Morning' : 'Evening'} (${batch.length + radarCount} items)`;
    lead = `Watch: ${trimWeighted(storyTitle(featured, lang), 92)}`;
    take = takeFor(lang, featured);
    question = 'What should we track next?';
    linkLabel = 'Full edition:';
    otherPrefix = 'Also: ';
    maxTitle = 90;
  }

  const linkLine = `${linkLabel} ${postUrl(lang, edition)}`;
  const lines = [head, '', lead, take];
  const others = batch.filter((a) => a.slug !== featured.slug);
  for (const item of others) {
    const line = `${otherPrefix}${trimWeighted(storyTitle(item, lang), maxTitle)}`;
    if (xLen([...lines, line, '', question, linkLine].join('\n')) > 280) break;
    lines.push(line);
  }
  if (xLen([...lines, '', question, linkLine].join('\n')) <= 280) lines.push('', question);
  lines.push(linkLine);
  return lines.join('\n');
}

async function postTweet(text, replyToId) {
  const body = { text };
  if (replyToId) body.reply = { in_reply_to_tweet_id: replyToId };
  return api('POST', '/tweets', body);
}

async function publishLang(lang, picks, pendingChecks) {
  const expectedUrl = postUrl(lang, editionInstant(picks));
  await waitForXCardReady(lang, expectedUrl);
  const main = await postTweet(composeText(lang, picks));
  console.log(`[post-x] ${lang === 'zh' ? '中文主帖' : '英文主帖'}已发布:`, `https://x.com/i/status/${main.data.id}`);
  queuePostCheck(pendingChecks, lang, main.data.id, expectedUrl);
  return { main, reply: null };
}

const [cmd, arg, arg2] = process.argv.slice(2);
const needsOAuth = ['verify', 'post', 'reply', 'delete', 'daily'].includes(cmd);
if (needsOAuth && (!CREDS.key || !CREDS.token)) { console.error('[post-x] 发布凭证缺失，跳过'); process.exit(0); }
if (cmd === 'check' && !CREDS.bearer && (!CREDS.key || !CREDS.token)) { console.error('[post-x] 读取凭证缺失，跳过'); process.exit(0); }

if (cmd === 'verify') {
  const me = await api('GET', '/users/me');
  if (CREDS.bearer) {
    await readApi(`/users/by/username/${encodeURIComponent(me.data.username)}`);
    console.log('[post-x] OAuth 写入凭据和 Bearer 读取凭据验证成功:', '@' + me.data.username, '(', me.data.name, ')');
  } else {
    console.log('[post-x] OAuth 写入凭据验证成功（未配置 Bearer Token）:', '@' + me.data.username, '(', me.data.name, ')');
  }
} else if (cmd === 'post') {
  const d = await api('POST', '/tweets', { text: arg });
  console.log('[post-x] 已发帖:', `https://x.com/i/status/${d.data.id}`);
} else if (cmd === 'reply') {
  if (!arg || !arg2) throw new Error('缺少 tweet id 或回复文本');
  const d = await api('POST', '/tweets', { text: arg2, reply: { in_reply_to_tweet_id: arg } });
  console.log('[post-x] 已回复:', `https://x.com/i/status/${d.data.id}`);
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
  console.log('\n---\n[English main]\n' + composeText('en', picks));
} else {
  console.log('用法: verify | post "文本" | reply <tweet_id> "文本" | delete <tweet_id> | check <tweet_id> [zh|en] | daily | preview');
}
