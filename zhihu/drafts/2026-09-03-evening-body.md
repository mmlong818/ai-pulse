这是「猫叔的AI资讯雷达」9月3日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：据Perplexity测试，这款面向苹果芯片的Rust与Metal专用引擎，在M5 Max上运行千问模型的速度最高较MLX-LM提升1.35倍。

## 深度简报目录

- Perplexity 发布 Lily，本地千问推理提速最高1.35倍

## 快讯预览

- 《麻省理工科技评论》发布指南，讨论企业如何将智能体试点从孤立实验扩展至生产运营。
- Cursor 推出早期测试版代码托管平台 Origin，支持智能体和团队建仓、镜像 GitHub 项目及管理拉取请求。
- Anthropic 与 Lambda 签署价值350亿美元的基础设施协议，以扩充支撑 Claude 的算力。
- Sakana AI 探讨了如何以系统韧性及核威慑历史经验作为国防人工智能治理基础。
- Meshy 与 SHAKE4 宣布在东京举办免费但需审核的游戏行业交流会，承接东京电玩展参会人群。
- Genspark 将 Gemini 3.8 Flash 接入 AI Chat、Code Agent 和 Claw 三款产品。
- 海螺 AI 发布生成视频演示，为普通物体构造了一段全新的“幕后花絮”场景。
- 万相 Wan 3.0 登顶 Artificial Analysis 视频编辑榜，并在带音频文生视频榜位列第二。
- Baseten 发布开放权重模型 GLM-5.3 Fast，面向要求更高吞吐量的低延迟应用。
- Replit 为所有新项目启用项目分析，并允许智能体建议与应用场景匹配的自定义指标。

## 1. Perplexity 发布 Lily，本地千问推理提速最高1.35倍

据Perplexity测试，这款面向苹果芯片的Rust与Metal专用引擎，在M5 Max上运行千问模型的速度最高较MLX-LM提升1.35倍。

### 为单一模型量身打造

Perplexity 发布了本地推理服务器 Lily，专门用于在苹果芯片上运行 Qwen3.6-35B-A3B，并表示将于近期开放源代码。它以 Rust 管理模型加载、会话状态和生成流程，通过自定义 Metal 内核执行计算，并提供精简版 OpenAI 兼容聊天接口；整个推理链路不依赖 PyTorch，也不经过苹果的通用框架 MLX。

Lily 目前只接受一个指定的四位量化检查点。Qwen3.6-35B-A3B 总参数量为350亿，但每个词元仅激活约30亿参数：系统从256个专家中选择八个，并同时调用一个共享专家。量化后的模型文件为19.4GB，网络结构则由十层完整注意力与30层 Gated DeltaNet 循环层组成。Perplexity 据此固定结构，针对数据搬运、任务调度和计算内核逐项优化。

### 提速明显，适用面仍窄

Perplexity 在配备40核 GPU 和128GB统一内存的 M5 Max MacBook Pro 上测试称，在256至12.8万词元的不同长度下，Lily 的提示词处理吞吐量平均为 MLX-LM 的1.23倍，生成吞吐量平均为1.35倍。在提示词和生成上下文均约4000词元时，两项速度分别达到每秒5749.9和186.6词元；MLX-LM 对应成绩为4737.5和140.9。

这些增益主要来自让专家路由和循环状态持续留在 GPU、融合运算以减少中间数据读写，并根据上下文长度切换注意力执行路径。一次失败尝试同样值得注意：推测解码在单请求场景下反而让速度下降18%，原因是候选词元形成了低效计算形状，并分散了对专家权重的访问。

这仍是一项由开发者自行完成、范围严格受限的对比。Perplexity 表示，Lily 要求 M5 及更新芯片、macOS 26和指定量化模型，不支持其他尺寸的千问模型、稠密模型，也不兼容常见的 GGUF、AWQ或GPTQ格式。由于源代码尚未公开，外部开发者目前还无法复现实测或检查具体实现。

这项发布的意义在于，本地 AI 的下一阶段性能提升可能更多依赖模型架构、运行时与具体设备的协同设计，而非完全交给通用框架。Lily 的官方测试显示专用路线可能带来可观收益，但在代码正式开放前，加上目前仅支持单一模型，它能否扩展为长期可用的平台仍有待验证。

**原始信源**

- [Optimizing On-Device Inference for Apple Silicon](https://www.perplexity.ai/hub/blog/optimizing-on-device-inference-for-apple-silicon)

原文链接：[Perplexity 发布 Lily，本地千问推理提速最高1.35倍｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/perplexity-lily-apple-silicon-inference.html)

## 一句话快讯
- 《麻省理工科技评论》发布指南，讨论企业如何将智能体试点从孤立实验扩展至生产运营。（[MIT Technology Review](https://www.technologyreview.com/2026/09/03/1142868/scaling-agentic-ai-pilots-across-the-enterprise/)）
- Cursor 推出早期测试版代码托管平台 Origin，支持智能体和团队建仓、镜像 GitHub 项目及管理拉取请求。（[InfoQ 中文](https://www.infoq.cn/article/labxcNbT15HapoWw69lq)）
- Anthropic 与 Lambda 签署价值350亿美元的基础设施协议，以扩充支撑 Claude 的算力。（[The Decoder](https://the-decoder.com/anthropic-ramps-up-claude-infrastructure-with-35-billion-lambda-deal/)）
- Sakana AI 探讨了如何以系统韧性及核威慑历史经验作为国防人工智能治理基础。（[X / Sakana AI](https://x.com/SakanaAILabs/status/2095412226047770679)）
- Meshy 与 SHAKE4 宣布在东京举办免费但需审核的游戏行业交流会，承接东京电玩展参会人群。（[X / Meshy](https://x.com/MeshyAI/status/2095406444564852983)）
- Genspark 将 Gemini 3.8 Flash 接入 AI Chat、Code Agent 和 Claw 三款产品。（[X / Genspark](https://x.com/genspark_ai/status/2095369742194450555)）
- 海螺 AI 发布生成视频演示，为普通物体构造了一段全新的“幕后花絮”场景。（[X / Hailuo AI](https://x.com/Hailuo_AI/status/2095364148612010298)）
- 万相 Wan 3.0 登顶 Artificial Analysis 视频编辑榜，并在带音频文生视频榜位列第二。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2095349174799888760)）
- Baseten 发布开放权重模型 GLM-5.3 Fast，面向要求更高吞吐量的低延迟应用。（[X / Baseten](https://x.com/baseten/status/2095338689492578693)）
- Replit 为所有新项目启用项目分析，并允许智能体建议与应用场景匹配的自定义指标。（[X / Replit](https://x.com/Replit/status/2095314533548167240)）
- Hugging Face 展示了通过100步 GRPO 训练，提升3.5亿参数模型结构化输出能力的方法。（[Hugging Face](https://huggingface.co/blog/grpo-with-trl-ifstruct)）
- Hugging Face 推出 Funes，为编程智能体提供由用户掌控的持久化记忆方案。（[Hugging Face](https://huggingface.co/blog/funes)）
- Hugging Face 使用 TRL 与 OpenEnv 训练编程模型，使其生成可渲染水彩风格图像的程序。（[Hugging Face](https://huggingface.co/blog/train-to-paint-with-code)）
- Qwen 开发者开源本地优先的工作区搜索工具 zg，整合 ripgrep、BM25、向量检索和智能体接口。（[GitHub](https://github.com/zvec-ai/zvec-grep)）

---

完整日报：[9月3日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-09-03.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。