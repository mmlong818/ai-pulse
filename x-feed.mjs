// 官方 X 账号直连信源：X API v2 按量付费（约 $0.005/条读取），每轮 39 账号 × 5 条 ≈ $1.0
import { readFile, writeFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { join } from 'node:path';

const ROOT = new URL('.', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const ID_CACHE = join(ROOT, 'x-ids.json');

// 官方池 core 账号（第一方发布源头）+ 用户 2026-07-22 从关注列表挑选的官方/产品号
const HANDLES = [
  'OpenAI', 'AnthropicAI', 'GoogleDeepMind', 'GoogleAI', 'AIatMeta', 'xai',
  'MistralAI', 'deepseek_ai', 'Alibaba_Qwen', 'ZhipuAI', 'huggingface',
  'perplexity_ai', 'cursor_ai', 'LangChainAI',
  'claudeai', 'OpenAIDevs', 'Kimi_Moonshot', 'Zai_org', 'arena',
  'midjourney', 'Kling_ai', 'runwayml', 'ManusAI',
  // 国产模型厂商补全（2026-07-22 已验证官号）
  'MiniMax_AI', 'Hailuo_AI', 'TencentHunyuan', 'dreamina_ai', 'StepFun_ai', 'PixVerse_',
  // AIGC 补充（图像/视频/音频生成，2026-07-23）
  'pika_labs', 'LumaLabsAI', 'ElevenLabs', 'SunoMusic', 'StabilityAI', 'bfl_ml', 'ideogram_ai',
  // Agent 领域（产品/框架，2026-07-23）
  'cognition', 'crewAIInc', 'llama_index',
];

function getToken() {
  if (process.env.X_BEARER_TOKEN) return process.env.X_BEARER_TOKEN;
  try {
    const t = execSync(
      `powershell -NoProfile -Command "[Environment]::GetEnvironmentVariable('X_BEARER_TOKEN','User')"`,
      { windowsHide: true }).toString().trim();
    return t || null;
  } catch { return null; }
}

async function api(path, token) {
  const res = await fetch(`https://api.x.com/2${path}`, {
    headers: { authorization: `Bearer ${token}` },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`X API ${res.status}`);
  return res.json();
}

async function resolveIds(token) {
  try {
    const cached = JSON.parse(await readFile(ID_CACHE, 'utf8'));
    if (HANDLES.every((h) => cached[h])) return cached;
  } catch {}
  const data = await api(`/users/by?usernames=${HANDLES.join(',')}`, token);
  const map = {};
  for (const u of data.data || []) map[u.username] = u.id;
  await writeFile(ID_CACHE, JSON.stringify(map, null, 2));
  return map;
}

export async function fetchXHeadlines({ hours = 48, perAccount = 5, until = null } = {}) {
  const token = getToken();
  if (!token) return [];
  const untilMs = until ? until.getTime() : Date.now();
  const cutoff = untilMs - hours * 3600000;

  const ids = await resolveIds(token);
  const results = await Promise.allSettled(Object.entries(ids).map(async ([handle, id]) => {
    const data = await api(`/users/${id}/tweets?max_results=${perAccount}&exclude=retweets,replies&tweet.fields=created_at`, token);
    return (data.data || []).map((t) => ({
      source: `X @${handle}`,
      tier: 'x-official',
      title: t.text.replace(/\s+/g, ' ').slice(0, 160),
      link: `https://x.com/${handle}/status/${t.id}`,
      date: new Date(t.created_at),
    })).filter((i) => i.date.getTime() >= cutoff && i.date.getTime() <= untilMs);
  }));
  const items = [];
  results.forEach((r, idx) => {
    if (r.status === 'fulfilled') items.push(...r.value);
    else console.error(`  [x-feed] @${Object.keys(ids)[idx] || idx} 失败: ${r.reason?.message}`);
  });
  items.sort((a, b) => b.date - a.date);
  return items;
}

// 直接运行时打印摘要（调试用）
if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop())) {
  const items = await fetchXHeadlines();
  console.log(`48h 内官方 X 动态 ${items.length} 条`);
  for (const i of items.slice(0, 12)) console.log(` ${i.date.toISOString().slice(5, 16)} [${i.source}] ${i.title.slice(0, 80)}`);
}
