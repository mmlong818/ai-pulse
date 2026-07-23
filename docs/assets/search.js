// 存档页本地搜索：首次聚焦时加载索引，多关键词 AND 匹配（空格分词）
(function () {
  const box = document.getElementById('searchBox');
  const out = document.getElementById('searchResults');
  if (!box || !out) return;
  let index = null, loading = null, timer;
  const load = () => loading || (loading = fetch(box.dataset.index).then((r) => r.json()).then((d) => (index = d)));
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  box.addEventListener('focus', load, { once: true });
  box.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(async () => {
      const q = box.value.trim().toLowerCase();
      if (!q) { out.innerHTML = ''; return; }
      await load();
      const tokens = q.split(/\s+/);
      const hits = index.filter((i) => {
        const hay = (i.t + ' ' + (i.s || '')).toLowerCase();
        return tokens.every((tk) => hay.includes(tk));
      });
      out.innerHTML = hits.slice(0, 50).map((i) =>
        `<li>${i.k === 'a' ? '📰' : '⚡'} <a href="${esc(i.u)}">${esc(i.t)}</a> <span class="sr-meta">${esc(i.d)}${i.k === 'r' && i.s ? ' · ' + esc(i.s) : ''}</span></li>`).join('')
        || `<li class="sr-empty">${document.body.dataset.lang === 'zh' ? '没有匹配结果' : 'No results'}</li>`;
    }, 150);
  });
})();
