// 本地预览：以 /ai-pulse/ 路径前缀模拟 GitHub Pages 环境
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = new URL('./docs', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const PORT = 3898;
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.png': 'image/png' };

http.createServer(async (req, res) => {
  let path = req.url.split('?')[0].replace(/^\/ai-pulse/, '');
  if (path === '' || path.endsWith('/')) path += 'index.html';
  try {
    const content = await readFile(join(ROOT, path));
    res.writeHead(200, { 'content-type': MIME[extname(path)] || 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404, { 'content-type': 'text/plain' });
    res.end('not found');
  }
}).listen(PORT, '127.0.0.1', () => console.log(`The Attention Post 预览: http://127.0.0.1:${PORT}/ai-pulse/`));
