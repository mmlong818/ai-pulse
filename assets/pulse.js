// AI Pulse 交互层：浏览计数（CounterAPI，匿名，仅计数）+ 点赞 + 本地收藏
(() => {
  const NS = 'ai-pulse-mm818';
  const API = `https://api.counterapi.dev/v1/${NS}`;
  const slug = document.body.dataset.slug || '';
  const lang = document.body.dataset.lang || 'en';
  const t = lang === 'zh'
    ? { views: '次阅读', like: '点赞', liked: '已赞', fav: '收藏', faved: '已收藏', siteViews: '全站累计阅读', empty: '还没有收藏。在任意文章页点「☆ 收藏」即可加入。', favTitle: '我的收藏' }
    : { views: 'views', like: 'Like', liked: 'Liked', fav: 'Save', faved: 'Saved', siteViews: 'total page views', empty: 'Nothing saved yet. Tap “☆ Save” on any briefing to keep it here.', favTitle: 'Saved briefings' };

  const hit = (name) => fetch(`${API}/${name}/up`).then((r) => r.json()).catch(() => null);
  const peek = (name) => fetch(`${API}/${name}`).then((r) => r.json()).catch(() => null);
  const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n));

  // ---- 浏览计数 ----
  hit('site').then((d) => {
    const el = document.getElementById('siteViews');
    if (el && d) el.textContent = `${fmt(d.count)} ${t.siteViews}`;
  });
  if (slug) {
    hit(`v-${slug}`).then((d) => {
      const el = document.getElementById('viewCount');
      if (el && d) el.textContent = `${fmt(d.count)} ${t.views}`;
    });
  }

  // ---- 点赞（全局计数 + 本地防重复）----
  const likeBtn = document.getElementById('likeBtn');
  if (likeBtn && slug) {
    const key = `aipulse:liked:${slug}`;
    const render = (count, liked) => {
      likeBtn.textContent = `${liked ? '❤' : '♡'} ${liked ? t.liked : t.like}${count != null ? ` · ${fmt(count)}` : ''}`;
      likeBtn.classList.toggle('active', liked);
    };
    render(null, !!localStorage.getItem(key));
    peek(`like-${slug}`).then((d) => render(d ? d.count : null, !!localStorage.getItem(key)));
    likeBtn.addEventListener('click', () => {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, '1');
      hit(`like-${slug}`).then((d) => render(d ? d.count : null, true));
    });
  }

  // ---- 收藏（纯本地）----
  const FKEY = 'aipulse:favs';
  const favs = () => { try { return JSON.parse(localStorage.getItem(FKEY)) || []; } catch { return []; } };
  const favBtn = document.getElementById('favBtn');
  if (favBtn && slug) {
    const render = (saved) => {
      favBtn.textContent = `${saved ? '★' : '☆'} ${saved ? t.faved : t.fav}`;
      favBtn.classList.toggle('active', saved);
    };
    render(favs().some((f) => f.slug === slug));
    favBtn.addEventListener('click', () => {
      let list = favs();
      const saved = list.some((f) => f.slug === slug);
      if (saved) list = list.filter((f) => f.slug !== slug);
      else list.push({ slug, title: document.querySelector('.article h1')?.textContent || slug, url: location.pathname, date: document.querySelector('time')?.getAttribute('datetime') || '' });
      localStorage.setItem(FKEY, JSON.stringify(list));
      render(!saved);
    });
  }

  // ---- 收藏页渲染 ----
  const favList = document.getElementById('favList');
  if (favList) {
    const list = favs().slice().reverse();
    favList.innerHTML = list.length
      ? list.map((f) => `<article class="card"><div class="card-meta"><time>${f.date}</time></div><h2><a href="${f.url}">${f.title.replace(/</g, '&lt;')}</a></h2></article>`).join('')
      : `<p class="fav-empty">${t.empty}</p>`;
  }
})();
