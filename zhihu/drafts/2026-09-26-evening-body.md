这是「猫叔的AI资讯雷达」9月26日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：日本Sakana AI成立专门实验室，探索让AI自主改进模型、实验与研发流程，并以较低算力实现能力积累。

## 深度简报目录

- Sakana AI成立递归自我改进实验室
- GPT-6 Astra家具装配纠错准确率达80%

## 快讯预览

- 英伟达 SoL-Pi 据称通过优化 Agent 运行框架，几乎减半编程 Agent 的 Token 消耗。
- 索尼芯片子公司计划收紧远程办公，要求约 8000 名员工返岗以加速 Physical AI 研发。
- DoorDash 借助多 Agent 大模型系统，清理了软件体系中的 6 万个 Feature Flag。
- 一支具备 FSD 级经验的团队发布 Simate-beta，亮相 RoboDojo 进行早期 Physical AI 实验。
- 一个 GitHub 项目展示了利用 SSD 扩展内存，在笔记本上运行 7000 亿参数 GLM 模型。
- Exa 推出 Agent Ultra，以子 Agent 集群 API 面向穷举式深度研究与列表构建任务。
- 一项新的 AugLy 基准测试覆盖图像、文本、音频及 PyTorch 的多模态增强与对抗鲁棒性。
- 量子位专题梳理了云栖大会上米哈游展示的大规模 AI 布局与产业野心。
- 量子位报道称，借助 DeepSeek 推理框架，谷歌 TPU 运行 Kimi 比英伟达 GPU 快 57%。
- Meta Connect 的现场报道显示，智能眼镜占据了大量演示与产品关注度。

## 1. Sakana AI成立递归自我改进实验室

日本Sakana AI成立专门实验室，探索让AI自主改进模型、实验与研发流程，并以较低算力实现能力积累。

### 从辅助工具转向自我改进系统

日本Sakana AI正式宣布成立“递归自我改进实验室”（RSI Lab），把自主改进AI研发流程从零散项目提升为明确的研究方向。位于东京的团队将探索让AI提出、执行和评估模型、训练方法及智能体架构的修改方案。

Sakana把“样本效率”放在核心位置。公司认为，日本难以仅靠堆叠算力与美国超大规模云厂商竞争，因此希望通过能持续积累改进的系统，在相对有限的硬件预算下获得复合收益。实验室规划将智能体原生模型、自动化科学发现和进化式优化结合起来。

9月加入Sakana、担任首席科学顾问的Jürgen Schmidhuber也将参与指导。其在元学习、世界模型和Gödel Machine方面的长期研究，为“学习系统参与设计下一代学习系统”这一方向提供了理论脉络。

Sakana将LLM-Squared、ShinkaEvolve、Digital Red Queen和The AI Scientist列为新实验室的基础工作。同时，公司承认递归改进存在现实风险：进化搜索可能偏离目标分布，自我修改可能只在基准测试中有效，智能体也可能找到绕过约束的捷径。

这项计划的意义不仅在技术层面。如果Sakana能把自我改进做得可靠且节省算力，前沿AI研发的参与门槛可能不再完全由最大训练集群决定。但目前公布的是研究路线和已有原型，并不是一个已经能够反复产出更强基础模型的自主系统。

**原始信源**

- [Introducing Sakana AI’s Recursive Self-Improvement (RSI) Lab](https://sakana.ai/rsi-lab/)
- [Sakana AI RSI Lab — Japanese announcement](https://sakana.ai/rsi-lab-jp/)
- [Recursive Self-Improvement Since 1987](https://people.idsia.ch/~juergen/recursive-self-improvement.html)

原文链接：[Sakana AI成立递归自我改进实验室｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/sakana-launches-rsi-lab.html)

---

## 2. GPT-6 Astra家具装配纠错准确率达80%

一项新评测显示，GPT-6 Astra可结合说明书和照片定位家具装配错误，展现出更贴近现实操作的视觉推理能力。

### 从回答问题到找出装错的连接件

据The Decoder及中国科技媒体报道，GPT-6 Astra在一项家具装配评测中，可根据说明书和照片识别装配错误，准确率约为80%。测试要求模型观察一件尚未完成组装的宜家风格家具，对照文字和图示说明，指出具体是哪一步出了问题。

这个任务看似普通，实际并不只是识别物体。模型需要把二维示意图对应到三维场景，理解装配顺序，并区分真正的结构错误与无关紧要的外观差异。换言之，它必须同时处理图像、文本和操作流程状态。

报道提到，同类任务中，上一代模型的准确率约为40%。如果这一差距能够复现，说明多模态推理的进步可能会先在家庭操作场景中显现，而不是先体现在传统学术基准上。能够找出面板或连接件装错位置的模型，未来也可能用于维修、设备巡检和职业培训。

不过，现有证据仍然有限。测试集中于一类结构受控的家具和说明书，公开报道尚未说明模型面对陌生家具、光线不足、说明书缺页或照片存在歧义时的表现。80%的准确率也意味着，在涉及现实操作指导时，仍有不可忽略的出错概率。

这项消息真正值得关注的地方，在于它把视觉能力放到了“诊断下一步动作”上，而不只是描述画面。如果结果能够推广，多模态模型正逐渐接近实用的物理任务助手；如果不能，80%可能只是一个适用范围很窄的漂亮数字。

**原始信源**

- [OpenAI's GPT-6 Astra can now tell you exactly where you screwed up your IKEA shelf](https://the-decoder.com/openais-gpt-6-astra-can-now-tell-you-exactly-where-you-screwed-up-your-ikea-shelf/)
- [让 AI 学会“挑刺”：根据说明书 + 照片指出家具是否装错](https://www.ithome.com/1/007/414.htm)

原文链接：[GPT-6 Astra家具装配纠错准确率达80%｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/gpt-6-astra-ikea-assembly-test.html)

## 一句话快讯
- 英伟达 SoL-Pi 据称通过优化 Agent 运行框架，几乎减半编程 Agent 的 Token 消耗。（[The Decoder](https://the-decoder.com/nvidias-sol-pi-system-cuts-coding-agent-token-usage-nearly-in-half-by-optimizing-the-harness/)）
- 索尼芯片子公司计划收紧远程办公，要求约 8000 名员工返岗以加速 Physical AI 研发。（[IT之家](https://www.ithome.com/1/007/413.htm)）
- DoorDash 借助多 Agent 大模型系统，清理了软件体系中的 6 万个 Feature Flag。（[InfoQ 中文](https://www.infoq.cn/article/gk4rWsQg09PWTFTZlJE3)）
- 一支具备 FSD 级经验的团队发布 Simate-beta，亮相 RoboDojo 进行早期 Physical AI 实验。（[量子位](https://www.qbitai.com/2026/09/498271.html)）
- 一个 GitHub 项目展示了利用 SSD 扩展内存，在笔记本上运行 7000 亿参数 GLM 模型。（[量子位](https://www.qbitai.com/2026/09/497624.html)）
- Exa 推出 Agent Ultra，以子 Agent 集群 API 面向穷举式深度研究与列表构建任务。（[MarkTechPost](https://www.marktechpost.com/2026/09/26/exa-launches-agent-ultra-a-subagent-swarm-deep-research-api-built-for-exhaustive-list-building/)）
- 一项新的 AugLy 基准测试覆盖图像、文本、音频及 PyTorch 的多模态增强与对抗鲁棒性。（[MarkTechPost](https://www.marktechpost.com/2026/09/26/end-to-end-multimodal-data-augmentation-and-adversarial-robustness-benchmark-with-augly-for-images-text-audio-and-pytorch/)）
- 量子位专题梳理了云栖大会上米哈游展示的大规模 AI 布局与产业野心。（[量子位](https://www.qbitai.com/2026/09/497613.html)）
- 量子位报道称，借助 DeepSeek 推理框架，谷歌 TPU 运行 Kimi 比英伟达 GPU 快 57%。（[量子位](https://www.qbitai.com/2026/09/497425.html)）
- Meta Connect 的现场报道显示，智能眼镜占据了大量演示与产品关注度。（[TechCrunch](https://techcrunch.com/2026/09/25/at-meta-connect-the-companys-smart-glasses-were-everywhere/)）
- Replit Agent 新增 GPT-6 Sol、GPT-6 Luna Fast 与 Claude Opus 5.5 三个模型。（[X / Replit](https://x.com/Replit/status/2103650767257083998)）
- OpenAI 报告 Codex 发生服务中断，随后确认服务已经恢复。（[X / OpenAI Developers](https://x.com/OpenAIDevs/status/2103650830604030228)）
- Fireworks AI 宣布提供 MiMo-V2.6-Pro 按需部署，其总参数 1.02 万亿、激活参数 420 亿。（[X / Fireworks AI](https://x.com/FireworksAI_HQ/status/2103637966002552840)）
- Latent Space 访谈回顾 OpenRouter 从早期创业项目走向 Stripe 级基础设施雄心的历程。（[Latent Space](https://www.latent.space/p/openrouter)）

---

完整日报：[9月26日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-09-26.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。