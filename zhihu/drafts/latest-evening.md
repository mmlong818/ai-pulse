# 猫叔的AI资讯雷达｜11月11日晚报：BotPsy发布，0.8B参数模型瞄准本地智能体

这是「猫叔的AI资讯雷达」11月11日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：Tether AI Research开源0.8B参数工具调用模型BotPsy，主打端侧助手，测试成绩亮眼但应用边界仍然有限。

## 深度简报目录

- BotPsy发布，0.8B参数模型瞄准本地智能体
- 人机团队完成可审计的同步辐射X射线实验

## 快讯预览

- 海螺 AI 推广 H3 Image，强调其面向机械与装备题材的图像生成能力。
- Latent Space 报道，Mercor 融资 7.5 亿美元，估值 200 亿美元，年化收入达到 30 亿美元。
- 腾讯混元还宣布 Hy4 API 已在 Atlas Cloud 上线。
- Sakana AI 聘任美国退役海军上将迈克尔·罗杰斯和前 CIA 官员汤姆·莫兰为高级顾问。
- MBZUAI 基础模型研究院发布 PAN 2，这是一个开放的 290 亿参数物理 AI 世界模型。
- MiniMax 展示 H3 代理通过 HeyGen 的 MCP 集成指挥生成电影感视频。
- Fish Audio 发布 Live 3 全双工语音模型，响应延迟据称低至 186 毫秒。
- 量子位报道，丘沃智能无人拖拉机已在新疆农田完成超过 30 厘米的深翻作业。
- MiniMax 表示，H3 Image 支持输入 16 张参考图，生成速度提升至原来的 2 至 3 倍。
- 阿里通义团队预告 Qwen4，强调更强知识、世界理解、编程和代理能力。

## 1. BotPsy发布，0.8B参数模型瞄准本地智能体

Tether AI Research开源0.8B参数工具调用模型BotPsy，主打端侧助手，测试成绩亮眼但应用边界仍然有限。

### 发生了什么

Tether AI Research发布BotPsy，这是一款基于Qwen3.5-0.8B打造的8亿参数语言模型，重点不是闲聊，而是函数调用和智能体工作流。它被设计为直接运行在本地设备上，可处理网页搜索、日历、文件、消息、购物、设备控制等边界相对明确的助手任务。

BotPsy采用四阶段后训练流程，包括监督微调、多教师在线蒸馏以及两轮强化学习。其教师模型分别专注于工具使用、推理和指令遵循。Tether称，在六项工具调用与智能体基准测试中，BotPsy击败了参与测试的最高12亿参数模型；与参数规模更大的Qwen3.5-2B-Think相比，它在其中五项测试中得分更高。相较基础模型，BFCL v4、ACEBench和τ-bench上的提升尤其明显。

该模型以Apache 2.0许可发布，提供bf16、Q8和Q4版本，并通过Hugging Face safetensors以及面向QVAC SDK和llama.cpp的GGUF文件开放。Tether还称，自动化红队测试中的不安全回答率低于基础模型，包括面对提示注入时也是如此。不过，这些结果来自发布方自己的评测，尚未有独立复现。

### 为什么重要

BotPsy的价值在于，它把优化目标从泛化聊天转向工具执行，并将规模压缩到10亿参数以内。这为手机、电脑和嵌入式设备上的本地助手提供了新路径，隐私、离线能力和硬件成本都可能因此受益。但这并不等于小模型已经能够安全管理完整的个人工作流：开发方明确将它限定在低到中等难度任务，工具调用错误仍可能带来现实后果。真正关键的是，它能否在真实API、多语言环境、权限控制和对抗输入下保持表现。

### 猫叔判断

BotPsy真正值得盯的不是8亿参数，而是仍达21%的不安全回答率，本地工具权限还不能自动放行。

**原始信源**

- [BotPsy: On-Device Personal Assistant with a Sub-Billion-Parameter Agentic Language Model](https://huggingface.co/blog/qvac/botpsy)
- [BotPsy Tests How Far a 0.8B On-Device Tool Agent Can Go](https://huggingface.blog/blog/qvac-botpsy/)

原文链接：[BotPsy发布，0.8B参数模型瞄准本地智能体｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/botpsy-local-agent.html)

---

## 2. 人机团队完成可审计的同步辐射X射线实验

一项新研究记录人类与编码智能体如何协作开展自主X射线实验，并量化决策、错误与科学产出的分工。

### 发生了什么

来自布鲁克海文、伯克利、阿贡国家实验室和宾夕法尼亚大学的研究人员发表研究，记录人机团队开展纳米颗粒超晶格同步辐射X射线实验的过程。系统由人类科学家、负责统筹的智能体，以及承担分析、可视化和实验控制等任务的编码智能体组成。

在三次实验中，团队运行闭环流程：智能体修改代码、选择测量方案，并根据不断变化的目标调整工作；人类则保留最终批准权。每次实验持续100至133分钟，涵盖校准、分析和准备等环节。研究没有只给出一个成功率，而是通过对话记录追踪每项决策，并将其与代码修改、测量结果和修正动作对应起来。

审计结果显示，人类提出了约五分之一至四分之一的记录想法，但在最终被采用的想法中，人类约有40%至47%做出了首次决策。智能体提出了大量方案，但其想法最终转化为经过验证的实验结果的比例低于人类提出的方案。错误处理同样并不对称：智能体在部分环节能够修复相当一部分自身错误，而人类造成的错误更难被稳定发现和修正。

### 为什么重要

这项研究的价值在于，它把科学自治视为组织和问责问题，而不是单纯的模型能力竞赛。在真实实验室里，一段看似合理的代码远远不够；研究者还必须知道谁提出了动作、谁批准了动作、决策依据是什么，以及错误如何被修复。当实验昂贵、涉及安全风险或难以复现时，这条链路尤其关键。

研究仍局限于一类X射线实验，智能体也运行在经过精心设计且有人监督的环境中，不能据此证明自主实验室能够跨仪器、跨学科泛化。但它为审计记录和审批边界提供了少见的实证依据，这些机制应当先于更高风险的科学自动化部署。

### 猫叔判断

最有价值的是100至133分钟的完整实验日志：智能体正在成为可量化的科研协作者，但从想法到结果仍由人类审批把关。

**原始信源**

- [Auditable Human-Agent Teams for Autonomous X-ray Experimentation](https://arxiv.org/abs/2611.12933)

原文链接：[人机团队完成可审计的同步辐射X射线实验｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/auditable-xray-agent-teams.html)

## 一句话快讯
- 海螺 AI 推广 H3 Image，强调其面向机械与装备题材的图像生成能力。（[X / Hailuo AI](https://x.com/Hailuo_AI/status/2120464131077857630)）
- Latent Space 报道，Mercor 融资 7.5 亿美元，估值 200 亿美元，年化收入达到 30 亿美元。（[Latent Space](https://latent.space/p/ainews-mercor-750m-series-d-at-20b-valuation-3b-run-rate/)）
- 腾讯混元还宣布 Hy4 API 已在 Atlas Cloud 上线。（[X / Tencent Hunyuan](https://x.com/TencentHunyuan/status/2120447531113144571)）
- Sakana AI 聘任美国退役海军上将迈克尔·罗杰斯和前 CIA 官员汤姆·莫兰为高级顾问。（[X / Sakana AI Labs](https://x.com/SakanaAILabs/status/2120425780626989293)）
- MBZUAI 基础模型研究院发布 PAN 2，这是一个开放的 290 亿参数物理 AI 世界模型。（[MarkTechPost](https://www.marktechpost.com/2026/11/10/mbzuai-ifm-releases-pan-2-an-open-29b-world-model/)）
- MiniMax 展示 H3 代理通过 HeyGen 的 MCP 集成指挥生成电影感视频。（[X / MiniMax AI](https://x.com/MiniMax_AI/status/2120389347841323105)）
- Fish Audio 发布 Live 3 全双工语音模型，响应延迟据称低至 186 毫秒。（[MarkTechPost](https://www.marktechpost.com/2026/11/10/fish-audio-live-3-full-duplex-voice-model/)）
- 量子位报道，丘沃智能无人拖拉机已在新疆农田完成超过 30 厘米的深翻作业。（[量子位](https://www.qbitai.com/2026/11/509052.html)）
- MiniMax 表示，H3 Image 支持输入 16 张参考图，生成速度提升至原来的 2 至 3 倍。（[X / MiniMax AI](https://x.com/MiniMax_AI/status/2120361706085515116)）
- 阿里通义团队预告 Qwen4，强调更强知识、世界理解、编程和代理能力。（[X / Alibaba Qwen](https://x.com/Alibaba_Qwen/status/2120335993643684315)）
- AWS 将 Kimi K3.1 Pro 接入 Amazon Bedrock，企业用户现可调用该模型。（[AWS Machine Learning](https://aws.amazon.com/blogs/machine-learning/introducing-kimi-k3-1-pro-on-amazon-bedrock/)）
- AWS 发布 LangGraph 与 Bedrock AgentCore 教程，演示如何利用网页搜索构建每日依赖监控 Agent。（[AWS Machine Learning](https://aws.amazon.com/blogs/machine-learning/build-a-daily-dependency-watcher-with-langgraph-and-amazon-bedrock-agentcore-web-search/)）
- Meta FAIR 发布 e-means，并集成进 FAISS；其达到 Lloyd k-means 同等效果仅需 1.4–2.6 个 epoch。（[MarkTechPost](https://www.marktechpost.com/2026/11/10/meta-fair-e-means-k-means-faiss/)）
- Canva 将 Craft 生成式设计能力开放为 API，开发者现在可以把它集成进自己的产品。（[Canva](https://x.com/canva/status/2120293849277112579)）

---

完整日报：[11月11日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-11.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。