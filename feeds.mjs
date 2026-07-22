// 一级信源采集：直连 RSS/Atom，自带真实发布时间（时效与信源质量的根本保障）
const FEEDS = [
  { name: 'OpenAI', url: 'https://openai.com/news/rss.xml', tier: 'official' },
  { name: 'Google DeepMind', url: 'https://deepmind.google/blog/rss.xml', tier: 'official' },
  { name: 'Google AI', url: 'https://blog.google/technology/ai/rss/', tier: 'official' },
  { name: 'Hugging Face', url: 'https://huggingface.co/blog/feed.xml', tier: 'official' },
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/', tier: 'media' },
  { name: 'The Verge AI', url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', tier: 'media' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/', tier: 'media' },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/', tier: 'media' },
  { name: 'Ars Technica AI', url: 'https://arstechnica.com/ai/feed/', tier: 'media' },
  { name: 'The Decoder', url: 'https://the-decoder.com/feed/', tier: 'media' },
  { name: '机器之心', url: 'https://www.jiqizhixin.com/rss', tier: 'media' },
  { name: 'IT之家', url: 'https://www.ithome.com/rss/', tier: 'media' },
  { name: 'MarkTechPost', url: 'https://www.marktechpost.com/feed/', tier: 'media' },
  { name: 'Apple ML Research', url: 'https://machinelearning.apple.com/rss.xml', tier: 'official' },
  { name: 'Hacker News 热门', url: 'https://hnrss.org/frontpage?points=100', tier: 'community' },
  { name: 'Simon Willison', url: 'https://simonwillison.net/atom/everything/', tier: 'expert' },
  { name: 'Lilian Weng', url: 'https://lilianweng.github.io/index.xml', tier: 'expert' },
];

const pick = (xml, ...res) => {
  for (const re of res) {
    const m = xml.match(re);
    if (m) return m[1].trim();
  }
  return '';
};
const clean = (s) => s
  .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/\s+/g, ' ').trim();

function parseFeed(xml, feed) {
  const blocks = [...xml.matchAll(/<(?:item|entry)[\s>]([\s\S]*?)<\/(?:item|entry)>/g)].map((m) => m[1]);
  return blocks.map((b) => {
    const title = clean(pick(b, /<title[^>]*>([\s\S]*?)<\/title>/));
    const link = pick(b, /<link[^>]*href=["']([^"']+)["']/, /<link[^>]*>([\s\S]*?)<\/link>/).replace(/<!\[CDATA\[|\]\]>/g, '').trim();
    const dateRaw = pick(b, /<pubDate>([\s\S]*?)<\/pubDate>/, /<published>([\s\S]*?)<\/published>/, /<updated>([\s\S]*?)<\/updated>/, /<dc:date>([\s\S]*?)<\/dc:date>/);
    const date = dateRaw ? new Date(dateRaw) : null;
    return { source: feed.name, tier: feed.tier, title, link, date };
  }).filter((i) => i.title && i.link && i.date && !isNaN(i.date));
}

export async function fetchFreshHeadlines({ hours = 48, maxPerFeed = 8, until = null } = {}) {
  const untilMs = until ? until.getTime() : Date.now();
  const cutoff = untilMs - hours * 3600000;
  const results = await Promise.allSettled(FEEDS.map(async (feed) => {
    const res = await fetch(feed.url, {
      headers: { 'user-agent': 'Mozilla/5.0 (AI Focus Bulletin feed reader)' },
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return parseFeed(await res.text(), feed)
      .filter((i) => i.date.getTime() >= cutoff && i.date.getTime() <= untilMs)
      .slice(0, maxPerFeed);
  }));
  const items = [];
  results.forEach((r, idx) => {
    if (r.status === 'fulfilled') items.push(...r.value);
    else console.error(`  [feeds] ${FEEDS[idx].name} 失败: ${r.reason?.message || r.reason}`);
  });
  items.sort((a, b) => b.date - a.date);
  return items;
}

// 直接运行时打印摘要（调试用）
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop())) {
  const items = await fetchFreshHeadlines();
  const bySource = {};
  for (const i of items) bySource[i.source] = (bySource[i.source] || 0) + 1;
  console.log(`48h 内共 ${items.length} 条：`, bySource);
  for (const i of items.slice(0, 10)) console.log(` ${i.date.toISOString().slice(0, 10)} [${i.source}] ${i.title.slice(0, 70)}`);
}
