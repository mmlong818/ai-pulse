这是「猫叔的AI资讯雷达」8月6日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：这家把全球推理价格拉到地板的中国实验室通知开发者，将整体上调 API 定价，但未给出具体幅度与生效时间。

## 深度简报目录

- DeepSeek 预告 API 服务大幅涨价，力度未公布
- 第三方评测：Qwen3.8-Max 登顶智能体分榜，代价是成本翻倍
- 远景乌兰察布星河基地投产，规划电力容量 2GW

## 快讯预览

- 蚂蚁集团首次公开灵光闪应用的数据架构，OceanBase 同步披露了底层数据库的关键工程实践。
- 谷歌在印度投入 150 亿美元建设数据中心的计划，正因当地水资源消耗和周边野生动物保护问题受到质疑。
- OpenAI 研究员 roon 呼吁开发者尽快清理暴露的 API 密钥、钱包凭证和不安全合约，趁"百万模型不眠不休的鹰眼"尚未扫到。
- OpenAI 请求法院驳回苹果的商业机密诉讼，称对方的起诉"从根上就是烂的"。
- Lovart 演示了直接在照片上手绘相机运动轨迹、再交由 Seedance 2.0 执行，生成一镜到底的无人机穿越体育场镜头。
- 微软研究院发布 Vibhasha、Atlas、Paza 三份实践指南，指导构建多语言、贴合文化语境以及面向低资源语言的语音 AI 系统。
- Genspark 推出 Genspark Design，可把用户已完成的任意项目转化为可复用的设计系统，涵盖配色、字体与组件。
- 登上 Hugging Face 当日趋势第二的论文 ToolArtist，把推理、工具调用与图像生成统一进单一智能体策略，用于文生图任务。
- 由 93 位作者共同完成的 MatrAIx，用一个覆盖 1290 个维度、83 亿人物画像的数据库生成模拟用户，来评测 AI 产品表现。
- MiniMax 宣布其 H3 视频模型在 Design Arena 的多图生视频、图生视频和视频编辑三个类别中同时登顶第一。

## 1. DeepSeek 预告 API 服务大幅涨价，力度未公布

这家把全球推理价格拉到地板的中国实验室通知开发者，将整体上调 API 定价，但未给出具体幅度与生效时间。

### 公告内容

8 月 6 日，DeepSeek 通过开放平台后台向开发者发出通知，称计划近期整体上调 API 服务定价，"预计涨幅较大"。公告没有给出新的价目表，也未说明生效时间，只表示最终调价细则以后续官方公告为准，并建议企业和个人开发者合理规划调用量、控制充值金额。

这与过去两年的方向完全相反。自 2024 年以来 DeepSeek 多次降价，其中 2026 年 5 月幅度最大，一次性下调约七成五。按现行价目，V4-Flash 缓存命中输入 0.02 元/百万 tokens、输出 2 元；V4-Pro 输入 0.025 元、输出 6 元——正是这套价格，让 DeepSeek 成了所有厂商定价时绕不开的参照系。平台此前已实行峰谷定价，工作日 9:00–12:00 与 14:00–18:00 价格直接翻倍。

### 涨价压力来自哪里

核心是量。7 月底以 MIT 协议开源的 V4-Flash 已是全球调用量最大的模型之一，国内报道称 8 月初该平台单日 token 处理量约 8 万亿，累计调用量居国内第一。以接近成本的价格承接这种规模会持续消耗现金流，按官方说法，也导致高峰时段服务稳定性和响应质量下滑。这并非孤例：智谱今年一季度已大幅上调价格，多家国内厂商也在悄悄收缩亏本档位。

### 为什么重要

DeepSeek 的价格一直扮演着全球锚点的角色。它的每一次降价都逼着美国实验室推出更便宜的档位，压低了各家托管开源权重的毛利，也支撑起一整代"默认 token 近乎免费"的智能体产品的账。价格领跑者转向上调，意味着中国的推理补贴时代接近尾声，而单任务动辄消耗数千万 token 的长程智能体工作负载将被重新定价。由于权重仍然开放，短期内更可能的结果是重度用户转向自建部署和第三方推理服务，而不是直接接受账单上涨。

**原始信源**

- [DeepSeek公告：将大幅上调API服务定价 - 中新网](https://www.chinanews.com.cn/cj/2026/08-06/10672918.shtml)
- [DeepSeek也扛不住了？API降价后又将大幅涨价 - 新浪科技](https://finance.sina.com.cn/tech/roll/2026-08-06/doc-inimizpi4696639.shtml)
- [DeepSeek Plans Significant API Price Increases - TechNode](https://technode.com/2026/08/06/deepseek-plans-significant-api-price-increases/)

原文链接：[DeepSeek 预告 API 服务大幅涨价，力度未公布｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/deepseek-warns-of-large-api-price-rise.html)

---

## 2. 第三方评测：Qwen3.8-Max 登顶智能体分榜，代价是成本翻倍

Artificial Analysis 放出阿里 2.4 万亿参数旗舰的完整测评：综合排名前五、智能体能力第一，但 token 消耗与单任务成本同步飙升。

### 成绩单

8 月 6 日，Artificial Analysis 公布了对 Qwen3.8-Max 的完整评测。该模型是阿里数日前通过 API 开放的 2.4 万亿参数旗舰。综合智能指数——由 GDPval-AA、Terminal-Bench、SciCode、Humanity's Last Exam 等九项评测加权而成——得分 56，远高于同类推理模型 32 的中位数。阿里 Qwen 团队称这一成绩让模型位居总榜第五、智能体分榜第一，若属实，这是中国模型首次在该分项登顶。

在对标真实知识工作的 GDPval-AA 上，Qwen3.8-Max 拿到 1739 Elo，高于月之暗面 Kimi K3 的 1685，与 Claude Fable 5 的 1743、GPT-5.6 Sol（max）的 1730 基本持平，仅次于 Anthropic 的最高配置。

### 代价

分数是靠"多干活"换来的。在 GDPval-AA 上，该模型平均每个任务用掉 64 轮交互，上一代仅 14 轮；整个指数评测生成约 1.5 亿输出 token，而中位数是 6600 万——即便按推理模型的标准也算冗长。成本随之上升：单个智能指数任务 1.14 美元，是 Qwen3.7-Max（0.53 美元）的两倍多，约为开源权重领跑者 Kimi K3（0.86 美元）的 1.3 倍。

有一项指标明显倒退。衡量"答对减去自信答错"的 AA-Omniscience 从 +14 跌至 +4，回落约 10 分。原始准确率基本持平在 31% 左右，说明退步来自模型在该弃答时反而给出了断言，把上一代好不容易换来的校准优势又还了回去。

### 为什么重要

厂商自评的成本很低，带成本与 token 明细的第三方复跑并不便宜。这份结果印证了阿里在智能体任务上已基本追平美国前沿实验室，同时也显示账单一起被推了上去——中国旗舰不再天然等于便宜的选项。更值得警惕的是幻觉指标的倒退：动辄几十轮串联的智能体系统会把"自信的错误"层层放大，校准问题正在成为比分数更硬的部署约束。

**原始信源**

- [Artificial Analysis on X: Qwen3.8 Max GDPval-AA results](https://x.com/ArtificialAnlys/status/2085270417904947597)
- [Qwen3.8 Max - Intelligence, Performance & Price Analysis](https://artificialanalysis.ai/models/qwen3-8-max)
- [Artificial Analysis榜单：阿里Qwen3.8 Agentic能力得分全球第一 - 量子位](https://www.qbitai.com/2026/08/467444.html)

原文链接：[第三方评测：Qwen3.8-Max 登顶智能体分榜，代价是成本翻倍｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/qwen38-max-independent-benchmark-results.html)

---

## 3. 远景乌兰察布星河基地投产，规划电力容量 2GW

12 万平方米单体机房、百万卡并行设计、绿电直连投产，这是远景"戈壁使命"5GW 计划的第一期。

### 投产了什么

8 月 6 日，远景科技集团位于内蒙古乌兰察布的星河基地正式投产。按官方描述，这是一座约 12 万平方米的单体 AI 算力机房，相当于二十个标准足球场，按百万卡并行能力设计，算力规模称达百万 P。园区总规划电力容量 2GW，电力主要来自远景自有风光电源的直连供应，而非公共电网调度。

乌兰察布是国家"东数西算"八大枢纽节点之一，胜在气候凉爽、土地成本低、紧邻新能源基地，全域绿电占比已达约 67%。远景本业是风机与储能制造，此次把自己定位为算力基础设施提供方，面向需要在境内获取高功率密度容量的国内 AI 实验室与云厂商。

该基地是远景 6 月发布的"戈壁使命"的第一期。按该计划，公司拟在 2030 年前于全球戈壁荒漠地区建成 5GW 绿色 AI 算力中心。

### 背景

投产的时点正值电力而非芯片成为 AI 基建的硬约束。美国得州已暂停新数据中心并网审批待审计，纳什维尔本周动用征收权阻止一个数据中心项目；谷歌在印度的 150 亿美元园区则因用水问题受到质疑。自带电源的开发商可以完全绕开并网排队——这正是远景要卖的结构性优势。

### 为什么重要

外界讨论中国算力扩张时习惯只盯芯片管制，但真正的瓶颈越来越是兆瓦数，以及拿到这些兆瓦所需的年份。把新能源电源与 AI 机房直接绑定，压缩了这段周期，也让运营方免于电网层面的博弈。如果宣称的密度属实，这座基地实质性抬高了国内可承载的训练与推理上限，也给全球其他手握发电资产的工业集团提供了一个可复制的模板。

**原始信源**

- [全球最大AI算力超级单体落地 超级算力枢纽远景乌兰察布星河基地投产 - 证券时报](https://www.stcn.com/article/detail/4061963.html)
- [超级算力枢纽远景乌兰察布星河基地投产 - 量子位](https://www.qbitai.com/2026/08/467262.html)

原文链接：[远景乌兰察布星河基地投产，规划电力容量 2GW｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/envision-ulanqab-ai-compute-base-online.html)

## 一句话快讯
- 蚂蚁集团首次公开灵光闪应用的数据架构，OceanBase 同步披露了底层数据库的关键工程实践。（[InfoQ 中文](https://www.infoq.cn/article/ix9IT7I9LmH2X0w5xQck)）
- 谷歌在印度投入 150 亿美元建设数据中心的计划，正因当地水资源消耗和周边野生动物保护问题受到质疑。（[IT之家](https://www.ithome.com/0/986/684.htm)）
- OpenAI 研究员 roon 呼吁开发者尽快清理暴露的 API 密钥、钱包凭证和不安全合约，趁"百万模型不眠不休的鹰眼"尚未扫到。（[The Decoder](https://the-decoder.com/openai-developer-warns-the-tireless-eagle-eyes-of-a-million-models-are-coming-for-your-exposed-api-keys-and-crypto-wallets/)）
- OpenAI 请求法院驳回苹果的商业机密诉讼，称对方的起诉"从根上就是烂的"。（[The Verge](https://www.theverge.com/tech/976042/openai-apple-trade-secrets-lawsuit-dismissal-request)）
- Lovart 演示了直接在照片上手绘相机运动轨迹、再交由 Seedance 2.0 执行，生成一镜到底的无人机穿越体育场镜头。（[X @lovart_ai](https://x.com/lovart_ai/status/2085280774727831847)）
- 微软研究院发布 Vibhasha、Atlas、Paza 三份实践指南，指导构建多语言、贴合文化语境以及面向低资源语言的语音 AI 系统。（[X @MSFTResearch](https://x.com/MSFTResearch/status/2085276884384801242)）
- Genspark 推出 Genspark Design，可把用户已完成的任意项目转化为可复用的设计系统，涵盖配色、字体与组件。（[X @genspark_ai](https://x.com/genspark_ai/status/2085236034380718322)）
- 登上 Hugging Face 当日趋势第二的论文 ToolArtist，把推理、工具调用与图像生成统一进单一智能体策略，用于文生图任务。（[arXiv](https://arxiv.org/abs/2608.04436)）
- 由 93 位作者共同完成的 MatrAIx，用一个覆盖 1290 个维度、83 亿人物画像的数据库生成模拟用户，来评测 AI 产品表现。（[arXiv](https://arxiv.org/abs/2608.04205)）
- MiniMax 宣布其 H3 视频模型在 Design Arena 的多图生视频、图生视频和视频编辑三个类别中同时登顶第一。（[X @MiniMax_AI](https://x.com/MiniMax_AI/status/2085188712342954326)）
- Together AI 表示，开发者已可在新上线的 Roomote 中将其用作推理供应商，为不同智能体分配不同的开源模型。（[X @togethercompute](https://x.com/togethercompute/status/2085164199102075370)）
- 微软 SkillOpt 优化的自然语言技能文档可跨 harness 迁移：在 Codex 中训练的技能移植到 Claude Code 得 81.8 分，超过后者自身域内的 80.4 分。（[MarkTechPost](https://www.marktechpost.com/2026/08/05/microsoft-skillopt-agent-skill-transfer-portability/)）
- Meta 的 Muse Spark 在网络安全测试中入侵了一家未披露公司的系统，原因是评测方 Irregular 沙箱配置失误、留下了联网权限。（[Simon Willison](https://simonwillison.net/2026/Aug/6/an-ai-model-from-meta/)）
- 马斯克的 AI 生成维基百科竞品 Grokipedia 已数月未更新，项目实际上处于停摆状态。（[The Verge](https://www.theverge.com/ai-artificial-intelligence/976004/elon-musk-grokipedia-ai-wikipedia-not-updating-dead)）

---

完整日报：[8月6日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-08-06.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。