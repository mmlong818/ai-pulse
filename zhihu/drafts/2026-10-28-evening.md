# 猫叔的AI资讯雷达｜10月28日晚报：蚂蚁开源 Ling-3.1 Flash，瞄准持续工作的个人智能体

这是「猫叔的AI资讯雷达」10月28日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：蚂蚁百灵发布 Ling-3.1 Flash 1019，强化长程推理、工具调用、跨会话记忆和复杂工作流执行能力。

## 深度简报目录

- 蚂蚁开源 Ling-3.1 Flash，瞄准持续工作的个人智能体
- Genspark推出持久化机器环境，让智能体可长期运行

## 快讯预览

- Dreamina 发布网球主题 AI 僵尸短片，并附上教程与提示词供创作者复用。
- Mistral 称 Voxtral Mini Transcribe 3 在 Voice Arena 的说话人分离与 ASR 榜单上排名第二。
- OpenAI 介绍 Legora：其法律平台称，内部 NDA 审查占用时间已从约20%降至不到1%。
- ElevenLabs 与 Asociación ELA 合作，帮助 ALS 患者、教授 Aníbal 重建声音以继续授课。
- Anthropic 将取消新员工编程面试，更重视实际主动性和创业思维，而非传统履历。
- Polymathic AI 与普林斯顿研究者发布 FlashMap，据称可让推测式 LLM 解码提速6.14倍。
- Sakana AI 宣布将在日本 Gartner IT Symposium/Xpo 2026 展示 Marlin、Fugu 与 Namazu。
- 一篇新论文提出同时衡量节省时间与遗漏缺陷，指出更快产出仍可能增加总工作量。
- 一篇安全论文发现，事后型 MCP 提示注入在测试模型—服务器组合中的成功率达62.64%至100%。
- 小米研究者介绍 OmniBrain-0：一种统一操控、导航、进度跟踪与故障恢复的轻量具身智能体。

## 1. 蚂蚁开源 Ling-3.1 Flash，瞄准持续工作的个人智能体

蚂蚁百灵发布 Ling-3.1 Flash 1019，强化长程推理、工具调用、跨会话记忆和复杂工作流执行能力。

蚂蚁集团百灵大模型团队于10月28日开源 Ling-3.1-flash-1019，并同步开放 Ling-3.1-flash-base，目标是让个人智能体能够跨会话持续推进任务，而不只是即时回答问题。

### 更新了什么

1019版本重点强化多步骤执行、工具使用和长期任务推进能力。百灵称，该版本在 Artificial Analysis Intelligence Index v4.3.2 中获得44分，比上一版提高3分；在知识工作、流程自动化、科学推理等测试中也有所提升，其中 AutomationBench-AA 从62%升至68%。

基础模型采用 MIT 许可证开放，开发者可以继续预训练、适配私有知识和业务流程，或自行开展后训练。百灵披露，Ling-3.1 Flash 总参数量为5600亿，每个Token激活约250亿参数，宣传上下文长度最高达100万Token。其视觉语言版本目前已用于蚂蚁的灵光个人助理，但尚未公开发布。

### 为什么重要

这次发布的价值，在于它与一个具体的亚洲产品周期直接相连：灵光近期升级后加入跨会话记忆、后台任务调度和独立云主机。要支撑这些功能，模型必须能够维持目标、处理过程中的失败，并判断何时调用工具。因此，公开权重提供的是持续运行的个人和企业智能体底座，而不只是又一个聊天模型。

需要保留的疑问是可复现性。最亮眼的评测数据来自模型方，1019检查点本身也大到令本地部署门槛不低。它能否真正改变开发者选择，仍取决于推理生态、长时间运行稳定性，以及外部团队能否在百灵应用之外复现这些成绩。

**原始信源**

- [智能指数得分创新高！蚂蚁百灵开源Ling-3.1-flash-1019](https://www.infoq.cn/article/wIuu0NSaLSaqJJpXVExD)
- [Ling-3.1-flash-1019 on Hugging Face](https://huggingface.co/inclusionAI/Ling-3.1-flash-1019/tree/main)
- [Ling-3.1 Flash model card](https://huggingface.co/inclusionAI/Ling-3.1-flash)

原文链接：[蚂蚁开源 Ling-3.1 Flash，瞄准持续工作的个人智能体｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/ant-ling-31-flash-1019-open-source.html)

---

## 2. Genspark推出持久化机器环境，让智能体可长期运行

Genspark公布面向智能体的隔离机器环境，支持独立内核、持久状态、回滚和按运行时长计费。

Genspark于10月28日公布了一套面向AI智能体的新执行模式：智能体不再只是共享应用中的短时进程，而是可以运行在拥有独立内核、文件系统、端口和开发工具的隔离机器环境中。

### 从会话走向机器

公司称，这类“Box”可以基于任意Docker镜像在不到半秒内启动，并保留依赖包和预热缓存。智能体可以按照任务需要持续运行，包括开发服务器、爬虫和持续数日的后台任务。智能体空闲时，Box会冻结，计算费用停止，但磁盘状态仍然保留。

Genspark还强调了对长期运行智能体十分关键的控制能力：用户可以复制一个环境、连同记忆一起保存，或者回滚到此前的保存点。这样一来，智能体工作区就不再是一次性聊天会话，而成为可以恢复和复用的执行成果。

### 为什么重要

这项产品透露出智能体基础设施正在发生变化。当智能体开始承担软件开发、研究和自动化任务，单次对话之外的运行环境就变成瓶颈：状态必须持续保存，失败需要可逆，后台执行也不能无休止地消耗资源。Genspark用隔离、冻结和回滚直接回应了这些问题。

不过，目前公开信息仍主要是产品方描述，尚不足以证明它在密钥保护、网络滥用、多租户隔离和状态损坏恢复方面的可靠性。商业模式同样有待观察：如果活跃运行期间计算费用是主要成本，长时间任务可能迅速变贵。尽管如此，把智能体抽象成带生命周期管理的机器，影响力可能高于又一个聊天式代理界面。

**原始信源**

- [Genspark: A real machine, not a process](https://x.com/genspark_ai/status/2115412502293229757)
- [Genspark: Fork and roll back](https://x.com/genspark_ai/status/2115412518025957769)
- [Genspark: Runs as long as the task does](https://x.com/genspark_ai/status/2115412510069403911)

原文链接：[Genspark推出持久化机器环境，让智能体可长期运行｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/genspark-persistent-agent-machines.html)

## 一句话快讯
- Dreamina 发布网球主题 AI 僵尸短片，并附上教程与提示词供创作者复用。（[X / Dreamina AI](https://x.com/dreamina_ai/status/2115381504209793041)）
- Mistral 称 Voxtral Mini Transcribe 3 在 Voice Arena 的说话人分离与 ASR 榜单上排名第二。（[X / Mistral AI](https://x.com/MistralAI/status/2115380768394379474)）
- OpenAI 介绍 Legora：其法律平台称，内部 NDA 审查占用时间已从约20%降至不到1%。（[OpenAI](https://openai.com/index/legora-agentic-operating-system-for-legal-work/)）
- ElevenLabs 与 Asociación ELA 合作，帮助 ALS 患者、教授 Aníbal 重建声音以继续授课。（[X / ElevenLabs](https://x.com/ElevenLabs/status/2115374286273950186)）
- Anthropic 将取消新员工编程面试，更重视实际主动性和创业思维，而非传统履历。（[Latent Space](https://latent.space/p/ainews-anthropic-ends-coding-interviews/)）
- Polymathic AI 与普林斯顿研究者发布 FlashMap，据称可让推测式 LLM 解码提速6.14倍。（[MarkTechPost](https://www.marktechpost.com/2026/10/28/flashmap-flow-map-speculative-decoding/)）
- Sakana AI 宣布将在日本 Gartner IT Symposium/Xpo 2026 展示 Marlin、Fugu 与 Namazu。（[X / Sakana AI](https://x.com/SakanaAILabs/status/2115349465360126111)）
- 一篇新论文提出同时衡量节省时间与遗漏缺陷，指出更快产出仍可能增加总工作量。（[arXiv](https://arxiv.org/abs/2610.35942)）
- 一篇安全论文发现，事后型 MCP 提示注入在测试模型—服务器组合中的成功率达62.64%至100%。（[arXiv](https://arxiv.org/abs/2610.36108)）
- 小米研究者介绍 OmniBrain-0：一种统一操控、导航、进度跟踪与故障恢复的轻量具身智能体。（[arXiv](https://arxiv.org/abs/2610.36013)）
- Meshy 展示 Blender MCP：智能体可通过对话生成带材质模型、布置场景并完成渲染。（[X / Meshy AI](https://x.com/MeshyAI/status/2115289899008221243)）
- Artificial Analysis 发布 Intelligence Index v5，加入更重的知识工作、编码任务及独立进步指数。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2115265198093435022)）
- 甲骨文引入SambaNova SN50 RDU系统，为客户提供GPU之外更多元的AI算力组合。（[IT之家](https://www.ithome.com/1/018/744.htm)）
- 甲骨文将谷歌TPU引入云平台，并增加ChatGPT集成，扩展企业AI的跨云选择。（[SiliconANGLE](https://siliconangle.com/2026/10/27/oracle-brings-googles-tpus-to-its-cloud-adds-chatgpt-integrations/)）

---

完整日报：[10月28日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-10-28.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。