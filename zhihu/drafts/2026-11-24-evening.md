# 猫叔的AI资讯雷达｜11月24日晚报：百度开源文心5.5 Flash，2800亿参数模型向全球开放

这是「猫叔的AI资讯雷达」11月24日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：百度以 Apache 2.0 协议发布文心5.5 Flash Preview 权重，支持百万上下文，为全球开发者提供新的高性能开源基线。

## 深度简报目录

- 百度开源文心5.5 Flash，2800亿参数模型向全球开放
- 腾讯混元发布第三代开源机器翻译模型 Hy-MT3
- Sakana AI成立应用研究实验室，首攻金融经济复杂系统

## 快讯预览

- Pinterest 用大模型替代多阶段聚类，最大提速来自减少推理调用次数。
- Dreamina 公布 AI Motion Studio 活动获奖者，显示其继续押注创作者驱动的短视频生成。
- Meshy 开放 Liquid 测试版，并与 VITURE 合作，将生成式 3D 资产带入扩展现实体验。
- Qwen 展示 Qwen4 Max 与 Pendev 的整合，将设计系统工作流与生成式创作辅助结合。
- Amazon Bedrock 发布 Trusted Access API，并预览 Anthropic 的企业安全监控与数据控制方案。
- Simon Willison 发布 datasette-agent 0.7a1，让大模型智能体能够查询并操作 Datasette 数据库。
- Artificial Analysis 发布智能体框架对比，显示编码模型在不同环境中的工具调用和 token 消耗差异显著。
- 蚂蚁集团开源 OceanLake 核心引擎，打造融合数据湖与数仓架构的 AI 数据平台。
- Deemos 宣布可通过 fal.ai 使用图像、文本和网格输入生成低多边形资产。
- Besimple 在 Baseten Training 上微调 Nemotron 3.5 Transcribe，在 MedDictate 医学术语测试中达到 0.87% 错误率。

## 1. 百度开源文心5.5 Flash，2800亿参数模型向全球开放

百度以 Apache 2.0 协议发布文心5.5 Flash Preview 权重，支持百万上下文，为全球开发者提供新的高性能开源基线。

### 发生了什么

百度正式开源文心5.5 Flash Preview，采用 Apache 2.0 协议，并在 Hugging Face、ModelScope 提供模型权重及配套资源。模型支持 vLLM、SGLang 等主流推理框架。此次事件的关键不只是“发布预览版”，而是权重和下载渠道已经公开，开发者可以自行部署、微调和适配。

据百度及量子位披露，该模型总参数量达到 2800 亿，采用混合专家架构，每个 Token 激活约 140 亿参数，上下文长度最高可达 100 万 Token。它面向编程、3D 建模、知识工作和内容创作等场景。在 CodeArena WebDev 榜单中，文心5.5 Flash Preview 以 1668 分位列开源模型第二。

### 为什么重要

这次发布把一款来自中国实验室的大型模型加入全球可获得的开放权重供给。大总参数量、较低激活规模、超长上下文和宽松许可证的组合，为研究人员提供了本地部署和行业微调的空间，也减少了对封闭 API 使用规则的依赖。

不过，榜单成绩仍需要更多独立复测。“Preview”意味着稳定性、服务成本、多语言表现以及非定向评测中的可靠性尚未完全明确。即便采用稀疏架构，部署所需硬件也不会轻松。真正提升其行业分量的，是权重和许可证同时开放：在模型获取权与部署自主性日益重要的当下，它为全球开源社区增加了一条来自中国的高能力基线。

**原始信源**

- [文心 5.5 Flash Preview正式开源，采用 Apache 2.0 协议](https://www.qbitai.com/2026/11/512354.html)
- [ERNIE 5.5 Flash Preview on Hugging Face](https://huggingface.co/baidu/ERNIE-5.5-Flash-Preview)

原文链接：[百度开源文心5.5 Flash，2800亿参数模型向全球开放｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/ernie-55-flash-open-weights.html)

---

## 2. 腾讯混元发布第三代开源机器翻译模型 Hy-MT3

腾讯混元推出第三代开源翻译模型 Hy-MT3，重点提升准确性、完整性、指令遵循和多语言覆盖范围。

### 发生了什么

腾讯混元宣布推出第三代开源机器翻译模型 Hy-MT3。官方信息显示，新一代模型重点改善翻译准确性和完整性，并提升对用户指令的遵循能力，同时扩大语言覆盖范围。

这次消息由腾讯混元官方账号在北京时间白天发布，属于本期选题窗口。需要注意的是，目前公开信息仍然有限，尚未完整披露参数规模、系统化评测结果以及与上一代模型的许可证差异，因此不能仅凭公告对其性能做过度推断。

### 为什么重要

翻译是 AI 基础设施中影响广泛、却经常被低估的一层。更强的开放模型可以降低开发者对少数闭源服务商的依赖，让多语言功能更便宜，也便于围绕行业术语、隐私要求和离线部署进行适配。Hy-MT3 强调指令遵循，也意味着它的目标可能不止是逐句翻译，还包括受控改写、格式保留和接入业务工作流。

它的价值更偏向生态基础设施，而不是单纯争夺榜单名次。开放翻译模型可以服务客服、搜索、文档、教育，以及需要跨语言运行的智能体。最终表现仍取决于语言对覆盖、推理延迟、许可证，以及法律、医疗和低资源语言等复杂场景的实测。在更多技术细节公开前，Hy-MT3 是一项值得关注的开放发布，但还不能据此断言翻译质量差距已经被填平。

**原始信源**

- [Tencent Hunyuan official Hy-MT3 announcement](https://x.com/TencentHunyuan/status/2125170622049485093)

原文链接：[腾讯混元发布第三代开源机器翻译模型 Hy-MT3｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/tencent-hy-mt3-translation.html)

---

## 3. Sakana AI成立应用研究实验室，首攻金融经济复杂系统

日本 Sakana AI 成立应用研究实验室，计划用智能体系统建模金融和经济等复杂现实环境，首个项目聚焦金融领域。

### 发生了什么

日本 Sakana AI 宣布成立 Applied Research Lab，专门把公司的研究成果应用于大型、复杂的现实系统。实验室的首个项目聚焦金融与经济，公司表示未来还可能扩展到其他领域。

Sakana 的出发点并不是把一个语言模型智能体当成万能解题器。公司认为，市场和经济必须被表示为由多个单元、关系及相互影响组成的系统。人类专家负责提出真正重要的问题并判断结果，智能体则负责以更大规模实施、测试和迭代模型，把原本需要大量人工完成的工作加速起来。

### 为什么重要

这不是新一代前沿模型，也不是面向大众的产品发布。它的重要性在于一种部署思路：Sakana 试图把智能体从孤立的任务执行，推进到对复杂环境进行结构化建模。金融是一个高难度起点，因为模型即使技术上精巧，也可能在历史关系失效时给出经济含义错误的结论。

这项计划同时暴露了尚未解决的瓶颈。智能体可以生成并测试大量假设，却不会自动知道哪些变量值得关注、哪些关系具有因果性，也无法保证模型表现不是数据造成的假象。Sakana 明确保留专家对问题选择和结果判断的参与，这比“智能体自主预测经济”更可信，但也意味着短期产品更可能是专家增强工具，而非替代专家。它最终是否重要，要看能否在真实决策中持续带来可复现的改进，而不是制造更多模拟结果。

**原始信源**

- [Introducing the Sakana AI Applied Research Lab](https://sakana.ai/applied-research-lab/)
- [Sakana AI official announcement](https://x.com/SakanaAILabs/status/2125046221631086970)

原文链接：[Sakana AI成立应用研究实验室，首攻金融经济复杂系统｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/sakana-applied-research-lab.html)

## 一句话快讯
- Pinterest 用大模型替代多阶段聚类，最大提速来自减少推理调用次数。（[InfoQ 中文](https://www.infoq.cn/article/vaEUVvWD9AIaFXZhzSMH)）
- Dreamina 公布 AI Motion Studio 活动获奖者，显示其继续押注创作者驱动的短视频生成。（[X / Dreamina AI](https://x.com/dreamina_ai/status/2125152415381139524)）
- Meshy 开放 Liquid 测试版，并与 VITURE 合作，将生成式 3D 资产带入扩展现实体验。（[X / MeshyAI](https://x.com/MeshyAI/status/2125144895509934486)）
- Qwen 展示 Qwen4 Max 与 Pendev 的整合，将设计系统工作流与生成式创作辅助结合。（[X / Alibaba Qwen](https://x.com/Alibaba_Qwen/status/2125121515465461969)）
- Amazon Bedrock 发布 Trusted Access API，并预览 Anthropic 的企业安全监控与数据控制方案。（[AWS Machine Learning Blog](https://aws.amazon.com/blogs/machine-learning/introducing-the-amazon-bedrock-trusted-access-api-with-anthropics-enterprise-frontier-safeguards-and-enterprise-data-controls/)）
- Simon Willison 发布 datasette-agent 0.7a1，让大模型智能体能够查询并操作 Datasette 数据库。（[Simon Willison](https://simonwillison.net/2026/Nov/24/datasette-agent/)）
- Artificial Analysis 发布智能体框架对比，显示编码模型在不同环境中的工具调用和 token 消耗差异显著。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2125069750414045505)）
- 蚂蚁集团开源 OceanLake 核心引擎，打造融合数据湖与数仓架构的 AI 数据平台。（[量子位](https://www.qbitai.com/2026/11/512330.html)）
- Deemos 宣布可通过 fal.ai 使用图像、文本和网格输入生成低多边形资产。（[X / DeemosTech](https://x.com/DeemosTech/status/2125041613970055521)）
- Besimple 在 Baseten Training 上微调 Nemotron 3.5 Transcribe，在 MedDictate 医学术语测试中达到 0.87% 错误率。（[X / Baseten](https://x.com/baseten/status/2125028331821404646)）
- Together AI 上线 DeepSeek V4.1 Flash，面向编码代理，输入百万 token 0.60 美元、输出 2.40 美元。（[X / Together AI](https://x.com/togethercompute/status/2125027182313672761)）
- AWS 展示 Strands Decider v2 31B，在六项公开文本基准平均得分 82.1，图像任务得分 90.1。（[X / AWS Developers](https://x.com/awsdevelopers/status/2125015675382985077)）
- Sierra 完成 17.5 亿美元 F 轮融资，年化收入已超过 4 亿美元，客户覆盖半数《财富》50 强。（[SiliconANGLE](https://siliconangle.com/2026/11/23/ai-agent-provider-sierra-closes-1-75b-investment-amid-rapid-revenue-growth/)）
- OpenAI 表示，GPT-6 Cyber 协助验证了 948 个可能授予本地 root 权限的 Linux 内核漏洞，并生成待审查补丁。（[X / OpenAI](https://x.com/OpenAI/status/2125007927098699827)）

---

完整日报：[11月24日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-24.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。