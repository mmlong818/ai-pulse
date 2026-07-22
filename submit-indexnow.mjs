// IndexNow 提交：把 sitemap 中的全部 URL 推送给支持 IndexNow 的搜索引擎（Bing/Yandex/Naver 等）
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const key = (await readFile(join(ROOT, 'indexnow-key.txt'), 'utf8')).trim();
const sitemap = await readFile(join(ROOT, 'docs', 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: 'mmlong818.github.io',
    key,
    keyLocation: `https://mmlong818.github.io/ai-pulse/${key}.txt`,
    urlList,
  }),
});
console.log(`[indexnow] 提交 ${urlList.length} 个 URL，状态 ${res.status}`);
