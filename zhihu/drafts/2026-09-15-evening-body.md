这是「猫叔的AI资讯雷达」9月15日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：北京中关村学院团队公开ZGCM-1的权重、数据配方、代码、检查点和训练日志，展示代理群协作训练大模型的完整流程。

## 深度简报目录

- 七名博士生开源完整7B大模型训练链路
- Meta研究：字节级蒸馏或在扩展后超越Token模型
- OpenAI、Anthropic与xAI支持独立评测标准AEF-1

## 快讯预览

- Recraft 展示 V4 风格的六枚成套产品图标，覆盖家具、时尚和未来感物件。
- 据报道，苹果正基于 Google Gemini 重做 Siri，但新版助手不会在欧盟提供。
- Meshy 展示了一个藏在宝箱内的《奥德赛》主题场景，由 GPT-6 Astra 与 Meshy API 共同生成。
- InfoQ 介绍了通过 Trace 对生产流量进行实时评估的 Agent 可观测实践。
- 海螺展示 MiniMax Design：只需一份创意简报和一块画布，就能协同完成整套制作流程。
- Qdrant 预告一种能通过自身运行历史持续改进的研究 Agent，并接入 n8n 工作流。
- 腾讯混元展示 EvolveScaler，让 Agent 阅读 40 天 RPG 日志并回答跳过关键节点后的反事实问题。
- Agent-net 开源 Webagent，这是一个用 Go 构建、可将网站变成受控 AI Agent 的工具。
- Artificial Analysis 将 GPT-Live-1 Sol low 排在对话偏好第 3，Elo 为 1053，任务成功率为 90.9%。
- 阿里通义万相表示，高效 AI 视频制作应从 360p 逐步迭代到 1080p，而非依赖完美提示词。

## 1. 七名博士生开源完整7B大模型训练链路

北京中关村学院团队公开ZGCM-1的权重、数据配方、代码、检查点和训练日志，展示代理群协作训练大模型的完整流程。

### 发生了什么

北京中关村学院团队发布了从零训练的7B稠密语言模型ZGCM-1。此次开源不仅包括模型权重，还覆盖预训练、中期训练和后训练阶段的检查点、训练代码、分阶段数据与配方，以及Weights & Biases训练日志。项目由7名博士生在约3个月内完成，数据处理、实验运行、集群管理和评测等环节由数百个软件代理协助完成。

论文介绍了支持256K上下文的训练方案，包括门控滑动窗口与全注意力交错结构、FP8 Muon优化器、逐步扩展上下文长度，以及把交互轨迹改写成马尔可夫决策过程的中期训练方法。团队称，该设计让16K预训练的达到目标损失速度提升约4.2倍。

### 为什么重要

ZGCM-1的意义不在于一款7B模型已经取代前沿系统，而在于它把通常隐藏在技术报告背后的工程过程完整摊开。公开的检查点和日志让研究者能够追踪能力在哪个阶段形成、训练在哪些环节失败，以及代理究竟怎样参与研发。

团队称，ZGCM-1在通用基准上接近同规模模型，并在部分数学推理和代理搜索测试中与更大得多的模型竞争。不过，这些结果仍需要独立复现，测试集选择也会影响结论。

更大的信号来自研发方式本身：代理群正在压缩过去需要大团队完成的一部分模型开发工作。ZGCM-1为开源社区提供了一个可复盘的“AI研发AI”案例，而不只是又一张难以解释的成绩单。

**原始信源**

- [7名博士生仅用3个月从零训练7B大模型：代码+数据+训练日志全公开](https://www.qbitai.com/2026/09/489227.html)
- [ZGCM-1: A Fully Open and Extremely Efficient Foundation Model for Math and Agentic Search](https://arxiv.org/abs/2609.13356)

原文链接：[七名博士生开源完整7B大模型训练链路｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/zgcm-1-open-7b-model.html)

---

## 2. Meta研究：字节级蒸馏或在扩展后超越Token模型

Meta与华盛顿大学研究者发现，字节级蒸馏模型起步较慢，却可能在更大训练规模下取得更高能力上限并降低教师分布存储压力。

### 研究提出了什么

Meta FAIR与华盛顿大学研究者探讨了一条不同的小模型训练路线：让学生模型按字节学习教师模型的知识，而不是直接复制教师的Token词表。知识蒸馏的一个现实难题是，Token词表往往包含超过10万个候选项，完整保存教师的概率分布成本很高，实际操作通常只能保留一部分高概率Token。

研究提出的方法把Token概率转换成字节级训练目标。一种方法会沿着匹配的字节前缀累加概率；另一种方法加入明确的Token结束标记，使学生能够保留教师Token边界的信息。由于单个字节只有256种可能，完整概率分布比大规模Token分布更容易存储。

### 实验说明了什么

团队以Llama 3 8B作为教师，比较了Token模型与字节模型在监督训练和蒸馏训练下的表现。字节模型在较低计算量阶段学习更慢，但论文根据缩放曲线推算，带Token结束标记的字节蒸馏方案可能达到高于传统Token蒸馏的下游准确率上限，预测差距约为4个百分点。

不过，这仍是外推结果，并非已经验证的部署优势。字节模型需要生成更多预测步骤，其中一个表现最好的方案训练计算量也更高；论文尚未完成等推理成本下的公平比较。

### 为什么重要

这项工作挑战了“分词只是工程细节”的默认看法。如果更大规模实验能够复现其缩放趋势，字节级学生模型或许能降低蒸馏数据保存成本，也减少对教师模型专有Tokenizer的依赖。眼下更准确的结论是：Token模型仍然拥有早期效率优势，但小模型训练可能存在一条更慢起步、长期上限更高的路线。

**原始信源**

- [Meta新研究：字节模型蒸馏后，天花板破了](https://www.qbitai.com/2026/09/489337.html)
- [Meta新研究：字节模型蒸馏后，天花板破了](https://aitntnews.com/newDetail.html?newId=29367)

原文链接：[Meta研究：字节级蒸馏或在扩展后超越Token模型｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/meta-byte-level-distillation.html)

---

## 3. OpenAI、Anthropic与xAI支持独立评测标准AEF-1

AI评测论坛发布AEF-1标准，要求第三方披露模型访问权限、利益冲突、分析自主性、方法透明度与法律安全港。

### 一套评测流程标准出现

AI评测论坛发布了AEF-1，试图为先进AI系统的独立第三方评测建立最低运行条件。OpenAI、Anthropic和xAI等主要模型公司支持这一标准，外部评测机构也参与了制定过程。

AEF-1覆盖五个方面：评测者是否获得了足够的技术访问权限和资源；利益冲突是否得到控制；分析工作是否保持自主；方法和结果是否透明；敏感信息是否受到保护。标准要求评测者说明测试过的模型配置、可用资源、相关利益冲突、发布限制，以及任何未满足标准的地方。它还建议，开发者应为评测者在约定范围内的测试行为提供法律安全港。

### 为什么这些细节重要

前沿模型安全评测经常存在一个问题：公开报告会说明“测了什么”，却不清楚交代评测者究竟拿到了多少权限，开发者又能否影响结论。AEF-1试图把这些问题变成可以核对的清单。

标准建议，对具有明显新颖性的系统，评测应预留足够时间来排查访问问题、设计测试、执行实验、分析结果并反复调整。对于许多新系统，它把20个工作日视为常见的最低参考，但实际时间仍取决于系统和风险类型。

### 尚未解决的独立性问题

AEF-1是自愿标准，而控制模型访问权限的公司也参与定义“足够访问”应当是什么，这天然带来独立性疑问。它只有在评测机构公开遵循情况与例外、实验室向评测者提供接近部署版本的真实权限，并且采购方或监管机构把这些披露视为证据而非宣传时，才会真正产生影响。

眼下，它的价值主要是制度性的：为第三方评测者提供一套共同语言，说明一项安全结论是否独立、可复现且获得了合理资源。

**原始信源**

- [AEF-1 Standard Emerges for Third Party Evaluators](https://www.latent.space/p/ainews-aef-1-standard-emerges-for)
- [AEF-1: Minimum Operating Conditions for Independent Third Party AI Evaluations](https://aievaluatorforum.org/AEF_1_Minimum_Operating_Conditions_for_Independent_AI_Evaluations.pdf)
- [AI Evaluator Forum: Minimum Operating Conditions](https://aievaluatorforum.org/initiatives/minimum-operating-conditions)

原文链接：[OpenAI、Anthropic与xAI支持独立评测标准AEF-1｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/aef-1-ai-evaluation-standard.html)

## 一句话快讯
- Recraft 展示 V4 风格的六枚成套产品图标，覆盖家具、时尚和未来感物件。（[Recraft](https://x.com/recraftai/status/2099809062447718511)）
- 据报道，苹果正基于 Google Gemini 重做 Siri，但新版助手不会在欧盟提供。（[The Decoder](https://the-decoder.com/apple-brings-a-fully-revamped-siri-built-on-googles-gemini-but-not-to-the-eu/)）
- Meshy 展示了一个藏在宝箱内的《奥德赛》主题场景，由 GPT-6 Astra 与 Meshy API 共同生成。（[Meshy](https://x.com/MeshyAI/status/2099804182551429209)）
- InfoQ 介绍了通过 Trace 对生产流量进行实时评估的 Agent 可观测实践。（[InfoQ 中文](https://www.infoq.cn/article/556HrGKWUqWSg7NM3YT3?utm_source=rss&utm_medium=article)）
- 海螺展示 MiniMax Design：只需一份创意简报和一块画布，就能协同完成整套制作流程。（[Hailuo AI](https://x.com/Hailuo_AI/status/2099764177036583304)）
- Qdrant 预告一种能通过自身运行历史持续改进的研究 Agent，并接入 n8n 工作流。（[Qdrant](https://x.com/qdrant_engine/status/2099759236326842486)）
- 腾讯混元展示 EvolveScaler，让 Agent 阅读 40 天 RPG 日志并回答跳过关键节点后的反事实问题。（[Tencent Hunyuan](https://x.com/TencentHunyuan/status/2099748549281939558)）
- Agent-net 开源 Webagent，这是一个用 Go 构建、可将网站变成受控 AI Agent 的工具。（[MarkTechPost](https://www.marktechpost.com/2026/09/14/agent-net-open-sources-webagent-a-go-harness-that-turns-any-website-into-a-guarded-ai-agent/)）
- Artificial Analysis 将 GPT-Live-1 Sol low 排在对话偏好第 3，Elo 为 1053，任务成功率为 90.9%。（[Artificial Analysis](https://x.com/ArtificialAnlys/status/2099698259812139317)）
- 阿里通义万相表示，高效 AI 视频制作应从 360p 逐步迭代到 1080p，而非依赖完美提示词。（[Alibaba Wan](https://x.com/Alibaba_Wan/status/2099697688044560810)）
- Tripo 展示了一个由 Astra 与 Tripo 在一天内于虚幻引擎中完成的黑暗奇幻原型。（[Tripo](https://x.com/tripoai/status/2099684583524704271)）
- 7 名博士生据称用 3 个月从零训练出 7B 大模型，并公开代码、数据与训练日志。（[量子位](https://www.qbitai.com/2026/09/489227.html)）
- Nuance Labs 融资 5000 万美元，旨在让 AI 虚拟人表现更自然、减少违和感。（[SiliconANGLE AI](https://siliconangle.com/2026/09/14/nuance-labs-bags-50m-in-funding-to-fix-the-awkwardness-of-ai-avatars/)）
- Canva 发布三步流程，利用个人照片和 Magic Layers 制作杂志风格封面。（[Canva](https://x.com/canva/status/2099665809274732839)）

---

完整日报：[9月15日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-09-15.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。