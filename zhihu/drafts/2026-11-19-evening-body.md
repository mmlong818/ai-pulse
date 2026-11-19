这是「猫叔的AI资讯雷达」11月19日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：Canva新增AI控制项，允许用户关闭生成式功能并限制AI参与程度，让“是否使用AI”成为明确的产品设置。

## 深度简报目录

- Canva上线AI关闭选项，把生成式功能选择权交还用户
- 面壁智能称MiniCPM全球下载量突破7000万次

## 快讯预览

- Bug0 发布 QA Agent，利用缓存的 Playwright 回放自动化执行回归测试。
- Recraft 展示了利用 V4 Styles 工作流、围绕单一参考图生成多种视觉方向的能力。
- Mistral 与 ClickHouse 宣布在巴黎举办一日黑客松，参与技术包括 Le Chonk、Timestral 和 Langfuse。
- Deemos 展示了将图片转换为具备艺术家风格、适合游戏使用拓扑结构的低模 3D 模型。
- 新论文发现，提高思维链可控性可能反而降低对其过程的可监测性。
- 新论文报告称，大语言模型可在一种提出的训练流程下重写自身权重。
- FieldGuide 提出面向智能体文档探索的语料地图，目标是降低令牌消耗。
- ACaM 提出用自动化能力建模来评估和保护智能体人工智能系统。
- CrisisBench 推出危机咨询 AI 评测套件，用于测试相关系统的安全与能力表现。
- Nutrient 数据提取 API 可按用户模式返回 JSON，并为每个字段提供引用和置信度。

## 1. Canva上线AI关闭选项，把生成式功能选择权交还用户

Canva新增AI控制项，允许用户关闭生成式功能并限制AI参与程度，让“是否使用AI”成为明确的产品设置。

### 从默认嵌入到明确选择

Canva 11月19日宣布推出新的 AI 控制项，用户可以关闭生成式 AI 功能，也可以限制 AI 在创作流程中的参与程度。公司将其描述为一种可调节的选择：用户可以完全使用 AI 辅助，也可以只启用部分功能，或回到更传统的手工设计方式。

这并不意味着 Canva 正在放弃 AI。过去一年，Canva 的产品方向明显转向对话式设计、自动排版、图像生成、品牌智能和代理式工作流。此次变化的关键，是把这些能力的“可用性”与平台本身的基础设计工具分开。

对于学校、受监管行业、品牌团队和内容创作者来说，这一调整具有实际意义。同一个组织可能希望用 AI 加快内部草稿制作，却不愿让 AI 介入客户交付或敏感项目。控制项也让一个长期被隐藏在隐私设置中的问题变得更直接：什么时候 AI 会被调用，用户能控制到什么程度？

不过，关闭生成式功能并不自动解决所有数据问题。设置是否覆盖历史内容、协作项目、模板和关联产品，仍取决于 Canva 的具体实现。用户还需要看到更清晰的说明，了解内容如何存储、审核，以及是否会被用于未来模型改进。

### 为什么重要

Canva 正在把 AI 同意机制变成可见的产品能力。随着创意软件越来越像代理，能否轻松拒绝自动化，可能成为平台信任和企业采购的重要标准。

### 猫叔判断

真正重要的不是多了一个开关，而是Canva承认“默认使用AI”也应当允许用户撤回。

**原始信源**

- [Canva: Your creativity, your call — introducing AI Controls](https://x.com/canva/status/2123393385461432339)
- [The Verge: Canva adds an AI ‘off’ button](https://www.theverge.com/ai-artificial-intelligence/1037126/canva-ai-features-off-button)

原文链接：[Canva上线AI关闭选项，把生成式功能选择权交还用户｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/canva-adds-ai-controls.html)

---

## 2. 面壁智能称MiniCPM全球下载量突破7000万次

面壁智能披露MiniCPM系列全球下载量超过7000万次，并公布其在政务、银行、语音交互和离线应用中的落地案例。

### 小模型开始按部署范围竞争

面壁智能11月19日披露，截至2026年11月，MiniCPM系列开源模型全球累计下载量已超过7000万次。公司同时公布了一批来自老挝、马来西亚、肯尼亚、法国和美国的应用案例。

这些案例的共同点，不是追求云端旗舰模型的最高分，而是强调模型能否在本地运行。面壁智能称，基于高效模型架构的助手已接入老挝国家政务通讯系统；马来西亚企业将 VoxCPM2 语音模型用于多语种实时交互；肯尼亚一家银行则在本地数据湖中结合端侧模型和智能体框架完成信贷风控流程。此外，还有法国开发者用 MiniCPM5-1B 制作离线步行助手，美国开发者将 MiniCPM-o-4.5 与 VoxCPM2 结合，用于浏览器内的互动故事应用。

需要注意的是，7000万是公司披露的下载量，并不等于活跃用户、生产流量或实际部署数量。下载统计可能包含重复拉取、镜像、测试和未继续使用的项目。涉及国家政务系统和银行的案例，也需要相关机构进一步确认，才能视为经过审计的生产案例。

即便如此，这条消息仍反映出一个重要变化：小型多模态模型的竞争标准，正从公开榜单成绩扩展到手机、汽车、私有服务器和弱连接环境中的实际可用性。内存占用、量化、延迟和多语言能力，正在变成与参数规模同等重要的指标。

### 为什么重要

如果这些部署能够持续运行，MiniCPM说明开源高效模型可以进入云端API难以覆盖的地区和行业。真正需要观察的，是下载热度能否转化为长期本地运营。

### 猫叔判断

7000万下载尚未经过独立审计，但老挝政务和肯尼亚银行案例说明，小模型的部署限制正可能变成竞争壁垒。

**原始信源**

- [ModelBest official statement on MiniCPM downloads and deployments](https://weibo.com/2/detail/5367041642204826)
- [OpenBMB: MiniCPM ecosystem and download figures](https://openbmb.cn/blog/gotc-2026)
- [OpenBMB MiniCPM repository changelog](https://github.com/OpenBMB/MiniCPM-V/blob/main/docs/changelog_en.md)

原文链接：[面壁智能称MiniCPM全球下载量突破7000万次｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/minicpm-reaches-70-million-downloads.html)

## 一句话快讯
- Bug0 发布 QA Agent，利用缓存的 Playwright 回放自动化执行回归测试。（[InfoQ 中文](https://www.infoq.cn/article/eO0w7sdaGClvppFqwt5j)）
- Recraft 展示了利用 V4 Styles 工作流、围绕单一参考图生成多种视觉方向的能力。（[X / Recraft](https://x.com/recraftai/status/2123370766905344441)）
- Mistral 与 ClickHouse 宣布在巴黎举办一日黑客松，参与技术包括 Le Chonk、Timestral 和 Langfuse。（[X / Mistral AI](https://x.com/MistralAI/status/2123339999244636509)）
- Deemos 展示了将图片转换为具备艺术家风格、适合游戏使用拓扑结构的低模 3D 模型。（[X / DeemosTech](https://x.com/DeemosTech/status/2123318964965294527)）
- 新论文发现，提高思维链可控性可能反而降低对其过程的可监测性。（[arXiv](https://arxiv.org/abs/2611.21799)）
- 新论文报告称，大语言模型可在一种提出的训练流程下重写自身权重。（[arXiv](https://arxiv.org/abs/2611.21885)）
- FieldGuide 提出面向智能体文档探索的语料地图，目标是降低令牌消耗。（[arXiv](https://arxiv.org/abs/2611.21647)）
- ACaM 提出用自动化能力建模来评估和保护智能体人工智能系统。（[arXiv](https://arxiv.org/abs/2611.23507)）
- CrisisBench 推出危机咨询 AI 评测套件，用于测试相关系统的安全与能力表现。（[arXiv](https://arxiv.org/abs/2611.21622)）
- Nutrient 数据提取 API 可按用户模式返回 JSON，并为每个字段提供引用和置信度。（[MarkTechPost](https://www.marktechpost.com/2026/11/18/nutrient-data-extraction-api-citations-confidence/)）
- Google Cloud 称，AlphaEvolve 与 Gemini 4 让一项调优后的编码技能在未见任务上提升 5%。（[X / Google Cloud](https://x.com/GoogleCloudTech/status/2123234809354846702)）
- Vercel 推出 Board，为人类与智能体共享任务、协作构建软件工厂提供安全消息板。（[X / Vercel](https://x.com/vercel/status/2123234769236619673)）
- Tripo 为 Apple Vision Pro 项目提供空间资产，把二维照片转换成沉浸式三维场景。（[X / Tripo](https://x.com/tripoai/status/2123227692208476515)）
- GitHub推出公开预览连接器，让Copilot一次接入经验证的MCP服务并跨客户端复用。（[X / GitHub](https://x.com/github/status/2123217310752342095)）

---

完整日报：[11月19日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-19.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。