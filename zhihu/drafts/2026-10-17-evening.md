# 猫叔的AI资讯雷达｜10月17日晚报：DeepSeek发布V4.1 Flash-1017并开放模型权重

这是「猫叔的AI资讯雷达」10月17日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：DeepSeek上线V4.1 Flash-1017开放权重版本，同时开放搜索与抓取API，把模型升级延伸到智能体基础设施。

## 深度简报目录

- DeepSeek发布V4.1 Flash-1017并开放模型权重

## 快讯预览

- QCon上海一场演讲探讨了持续从现实学习、而非只依赖静态数据集的人工智能系统。
- Latent Space最新一期AI News讨论高品位测试者，以及专家用户如何塑造产品质量。
- 可灵发布短视频，展示无需喷枪即可完成烹饪火焰效果。
- 可灵分享另一段Kling 4短片，将奇幻意象与怀旧视觉元素结合。
- 微软公布据称拥有2万亿参数的 MAI-Base-2，旨在推进其前沿 AI 布局。
- Vals AI推出科学指数，将生物数据分析、机制发现和科学工作流三项智能体测试合并评估。
- RapidCanvas融资2900万美元扩展企业托管人工智能应用，累计融资达到5250万美元。
- Channel Works推出AI版产品，并在CoS和ALF Marketing结束测试后采用按额度计费。
- IBM发布Granite Switch 4.1，在Apache 2.0许可下整合聊天、决策、安全和英语语音转写模型。
- Google在美国搜索和Gemini中推出Universal Cart，可跨零售商追踪价格、库存和结账选项。

## 1. DeepSeek发布V4.1 Flash-1017并开放模型权重

DeepSeek上线V4.1 Flash-1017开放权重版本，同时开放搜索与抓取API，把模型升级延伸到智能体基础设施。

### 发生了什么

DeepSeek于10月17日发布DeepSeek-V4.1-Flash-1017，并同步更新官网和App中的模型。新版本已在Hugging Face和ModelScope开放下载，采用MIT许可证，性质上是一次公开权重发布，而不只是API服务端更新。

模型卡显示，这是一轮针对V4.1 Flash的定向升级。DeepSeek称，新模型在推理、编程、智能体任务和视觉基准上均有提升，同时减少输出长度、缩短任务完成时间。其公布的成绩包括Terminal-Bench 4.0的42.3分、DeepSWE v1.1的77.0分、NL2Repo-Bench的68.2分，以及Automation-Bench的60.5分。模型继续支持百万上下文和多模态输入。

### 为什么值得关注

这次发布的战略意义在于，DeepSeek把通常分开宣布的三层能力放到了一起：大规模模型升级、可下载权重，以及自有搜索基础设施。模型卡显示，该模型总参数规模约7630亿，但架构只在生成过程中激活其中一小部分。部署它仍然需要很强的硬件条件，不过MIT许可证和本地推理说明，为模型服务商、研究机构和大型企业提供了绕开DeepSeek托管服务的选择。

DeepSeek还宣布向所有用户开放自研Search与Fetch API。公司称，其搜索引擎每天处理数亿次请求，并通过机制过滤SEO垃圾、搜索操纵和低质量生成内容。不过，这些规模和质量说法尚缺乏独立验证，服务的实际价值仍取决于延迟、地区可用性和排序准确率。

对开放模型市场而言，真正重要的并非某一个基准分数的上涨，而是DeepSeek把模型权重、面向智能体的评测，以及第一方检索能力连接成了一套可部署方案。这可能进一步压低只靠模型访问或推理价格竞争的服务商空间；但7630亿参数的体量，也意味着经济可行的部署仍可能集中在超大规模算力运营者手中。

### 猫叔判断

DeepSeek把MIT权重和Search、Fetch放进同一套产品里，棋下得很重；但7630亿参数能否被大规模经济部署，仍是硬门槛。

**原始信源**

- [DeepSeek API Docs Change Log](https://api-docs.deepseek.com/updates/)
- [DeepSeek-V4.1-Flash-1017 Model Card](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017)
- [DeepSeek-V4.1-Flash-1017 Repository](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017/tree/main)

原文链接：[DeepSeek发布V4.1 Flash-1017并开放模型权重｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/deepseek-v41-flash-1017.html)

## 一句话快讯
- QCon上海一场演讲探讨了持续从现实学习、而非只依赖静态数据集的人工智能系统。（[InfoQ 中文](https://www.infoq.cn/article/JMZ6WUx4a4cVqAwhwviU)）
- Latent Space最新一期AI News讨论高品位测试者，以及专家用户如何塑造产品质量。（[Latent Space](https://www.latent.space/p/ainews-high-taste-testers-ep-1)）
- 可灵发布短视频，展示无需喷枪即可完成烹饪火焰效果。（[X / Kling AI](https://x.com/Kling_ai/status/2111313170900160528)）
- 可灵分享另一段Kling 4短片，将奇幻意象与怀旧视觉元素结合。（[X / Kling AI](https://x.com/Kling_ai/status/2111311579371143636)）
- 微软公布据称拥有2万亿参数的 MAI-Base-2，旨在推进其前沿 AI 布局。（[SiliconANGLE](https://siliconangle.com/2026/10/16/microsoft-reveals-cutting-edge-mai-base-2-model-with-2t-parameters/)）
- Vals AI推出科学指数，将生物数据分析、机制发现和科学工作流三项智能体测试合并评估。（[AI Open Wire](https://www.aiopenwire.com/)）
- RapidCanvas融资2900万美元扩展企业托管人工智能应用，累计融资达到5250万美元。（[AI Open Wire](https://www.aiopenwire.com/)）
- Channel Works推出AI版产品，并在CoS和ALF Marketing结束测试后采用按额度计费。（[AI Open Wire](https://www.aiopenwire.com/)）
- IBM发布Granite Switch 4.1，在Apache 2.0许可下整合聊天、决策、安全和英语语音转写模型。（[AI Open Wire](https://www.aiopenwire.com/)）
- Google在美国搜索和Gemini中推出Universal Cart，可跨零售商追踪价格、库存和结账选项。（[AI Open Wire](https://www.aiopenwire.com/)）
- 阿斯利康向insitro支付4000万美元首付款，开展最高价值14.6亿美元的人工智能药物发现合作。（[AI Open Wire](https://www.aiopenwire.com/)）
- Anthropic在新加坡设立办公室，并与政府签署涵盖评估、事故响应、人才和采用的人工智能安全备忘录。（[AI Open Wire](https://www.aiopenwire.com/)）
- Bind AI融资1000万美元后推出保险工作流服务，自动处理投保、报价、方案和承保流程。（[AI Open Wire](https://www.aiopenwire.com/)）
- Othello融资800万美元，开发不加入会议、而是在通话中实时叠加提示的人工智能销售教练。（[AI Open Wire](https://www.aiopenwire.com/)）

---

完整日报：[10月17日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-10-17.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。