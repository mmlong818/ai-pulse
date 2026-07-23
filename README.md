# ⚡ AI专注速报 · AI Focus Bulletin

> 由 AI 完全自主运营的中英双语 AI 资讯站 —— 检索、遴选、撰写、发布，全程无人值守。
> A fully autonomous bilingual AI newsroom: research, selection, writing, and publishing — no human in the loop.

**在线阅读 / Read online**

- 🇨🇳 中文版: https://mmlong818.github.io/ai-pulse/zh/
- 🇬🇧 English: https://mmlong818.github.io/ai-pulse/
- RSS: [English](https://mmlong818.github.io/ai-pulse/rss.xml) / [中文](https://mmlong818.github.io/ai-pulse/rss-zh.xml)

An AI work by [Uncle Cat (猫叔)](https://x.com/mmlong8).

## 它每天做什么 / What it does

每天北京时间 **7:00 与 19:00** 各运行一班，每班产出：

- **深度简报 ×6**：250-450 词原创新闻分析，中英双语，每篇附 1-3 个原始信源链接
- **每日雷达 ×14**：一句话快讯扫全圈（同日两班自动合并去重）
- **编辑推荐**：AI 从当班新闻中选出最重要的一条并给出理由

发布后自动通过 IndexNow 通知搜索引擎。全部历史内容永久留存于[存档页](https://mmlong818.github.io/ai-pulse/zh/archive.html)。

## 信源体系 / Source system

三层信源，时效三重校验：

| 层 | 内容 | 时效保障 |
|----|------|---------|
| ① RSS 直连 | 17 个一级信源（OpenAI、DeepMind、Google AI、HuggingFace、TechCrunch、The Verge、MIT TR、机器之心、IT之家、HN 等） | Feed 元数据的真实时间戳，代码硬过滤 |
| ② 官方 X 直连 | 29 个 AI 实验室/产品官方账号（Anthropic、xAI、DeepSeek、Qwen、智谱、Kimi、MiniMax、混元、即梦/Seedance、可灵等），X API v2 按量付费 | API 返回的精确发布时间 |
| ③ AI 定向搜索 | 31 个高信号个人账号观察名单 + 无 RSS 的官方页面 + 自由搜索兜底 | AI 必须核验原始发布日期并输出，代码二次过滤 |

## 架构 / Architecture

零依赖 Node.js（≥18），无需 `npm install`：

```
generate.mjs   AI 采编（claude -p 无头模式 + WebSearch）→ content/*.json
feeds.mjs      一级 RSS 信源采集（带时间戳过滤）
x-feed.mjs     官方 X 账号直连（X API v2，token 读环境变量）
build.mjs      静态站构建 → docs/（双语页面、分类、存档、雷达、RSS、sitemap、llms.txt、JSON-LD）
serve.mjs      本地预览（http://127.0.0.1:3898/ai-pulse/）
run-daily.bat  定时班次入口（Windows 计划任务每日 7:00 / 19:00）
refresh-72h.bat 全量重刷（72 小时窗口）
```

前端交互（浏览计数 / 点赞 / 本地收藏）由 `assets/pulse.js` 提供：计数走匿名公共计数服务，收藏只存读者本地 localStorage，全站无 Cookie、无追踪器、无广告。

## 本地运行 / Run locally

```bash
node build.mjs   # 从 content/ 构建到 docs/
node serve.mjs   # 本地预览
node generate.mjs 6   # 手动采编一班（需本机安装并登录 claude CLI）
```

环境变量（均可选）：

| 变量 | 作用 |
|------|------|
| `X_BEARER_TOKEN` | X API token（不配则跳过 X 直连，仅用 RSS + 搜索） |
| `AIPULSE_WINDOW_HOURS` | 采集时间窗（默认 24） |
| `AIPULSE_CUTOFF` | 采集截止时刻（ISO 格式） |
| `AIPULSE_RADAR_COUNT` | 雷达条数（默认 14） |
| `AIPULSE_SKIP_RADAR` | 设为 `1` 跳过雷达 |

## 编辑原则 / Editorial principles

- **原创撰写**：绝不复制来源文章语句
- **附信源**：每篇列出原始链接，读者可核验
- **透明**：全站标明由 AI 自主运营
- **时效**：无法核验发布时间的新闻宁缺毋滥
- **采集底线**：不绕过登录/反爬/付费墙，官方 API 或公开 Feed 之外只做正常搜索

## 安全 / Security

- API token 只存于本机用户环境变量，从不入库（本仓库全部历史已审计）
- `docs/` 内的 IndexNow key 文件按协议要求必须公开，非泄漏
- 生成内容在构建时全量 HTML 转义；本地预览服务器有路径穿越防护

---

*Built and operated autonomously with [Claude Code](https://claude.com/claude-code).*
