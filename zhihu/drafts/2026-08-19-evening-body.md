这是「猫叔的AI资讯雷达」8月19日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：Cerebras 表示，第四代系统通过三颗 WSE-3 Turbo 处理器和重新设计的机架级平台，将推理速度最高提升至 CS-3 的两倍。

## 深度简报目录

- Cerebras CS-4 搭载三颗 WSE-3 Turbo，加速大模型推理

## 快讯预览

- MiniMax Design 推出设计智能体，可根据简短指令完成完整设计，无需编写数万字提示词。
- 一款人形机器人在2026世界机器人大会上展示了主办方所称的全球首次全自主完整乒乓球对局。
- Relativity Networks 融资2200万美元，计划将面向高带宽数据中心的新型高速光纤技术商业化。
- 腾讯混元公布 Hyra 的四项新数学进展，其中包括提高三维 Blaschke–Lebesgue 问题的通用下界。
- Qdrant 介绍其可过滤 HNSW 索引如何在过滤条件下保持图连通性，而非仅在查询阶段补救搜索。
- 曾参与 MiniMax 大规模智能体基础设施建设的核心工程负责人阿岛已离职。
- Lovart 接入 Seedance 2.5，并展示了用一句提示词生成30秒彩铅风格视频的工作流。
- Kimi 发布金融分析师教程，演示实时投资者看板、财务模型更新等三类常见投研工作流。
- 研究人员提出默认拒绝执行的智能体运行时治理方案，在智能体跨越行动边界时核验来源并实施控制。
- SkillEffect 提出面向智能体工具的受检降级机制，旨在有限内存条件下维持工具执行的可靠性。

## 1. Cerebras CS-4 搭载三颗 WSE-3 Turbo，加速大模型推理

Cerebras 表示，第四代系统通过三颗 WSE-3 Turbo 处理器和重新设计的机架级平台，将推理速度最高提升至 CS-3 的两倍。

### 围绕 WSE-3 Turbo 的系统级升级

Cerebras 在 Supernova 大会上发布第四代计算系统 CS-4。该系统搭载三颗新的 WSE-3 Turbo 处理器，并非简单让 CS-3 的原有晶圆以更高频率运行。按照 Cerebras 的介绍，CS-4 是一个新的机架级平台，同时升级了处理器、晶圆间通信、供电、散热和输入输出系统。

在 Cerebras 公布的 GPT-OSS 演示中，CS-4 的生成速度达到每秒4465个 Token，CS-3 为每秒2308个 Token；公司给出的传统 GPU 系统对照值为每秒131个 Token。这些均为厂商披露的数据，尚未经过独立复现，实际表现会随模型、工作负载和服务配置而变化。

Cerebras 表示，CS-4 的推理性能最高可达到 CS-3 的两倍，每瓦 Token 总吞吐量最高可达到 CS-3 的十倍。这些数字来自公司针对特定工作负载进行的内部测试和推算，不能直接视为所有生产环境中的普遍表现。

### 面向拆分式推理的模块化机架

CS-4 是首个采用 Cerebras Nexus 机架级架构的系统。其后置 Wafer-Scale Backpack 模块围绕每颗晶圆整合供电转换、直接液冷、高速输入输出和控制电子元件。Cerebras 称，该模块的零部件数量减少50%，制造自动化程度提高60%，并可把部署时间从数天缩短至数小时。

CS-4 还原生支持拆分式推理，让不同硬件分别处理提示词预填充和逐 Token 生成。Cerebras 列出的预填充平台包括 AMD Helios 和 AWS Trainium；模型状态随后可传输至 CS-4，执行对延迟更敏感的解码。因此，这项能力并不限于与 AMD 搭配，运营商也可采用 GPU 或其他 ASIC 处理预填充阶段。

Cerebras 表示，CS-4 可将晶圆间通信延迟降至最低约2微秒，并让参数规模超过10万亿的模型实现每秒1000个以上 Token。后一项数字来自公司根据内部测试所作的推算，并非已经由第三方独立验证的实测结果。

### 为何重要

CS-4 表明，推理性能提升可以来自处理器、互连、供电、散热和机架设计的协同升级，而不只是依赖新的半导体制程。其架构也反映出行业正日益重视让不同类型的硬件分别承担预填充和解码任务。

Cerebras 表示，首批 CS-4 将于2026年第三季度开始出货。其速度、总体吞吐量、能耗和经济性在真实工作负载中的表现，仍有待独立生产测试确认。

**原始信源**

- [Introducing Cerebras CS-4: The Fastest AI Just Got Faster](https://www.cerebras.ai/blog/introducing-cerebras-cs-4)
- [Cerebras Supernova 2026](https://www.cerebras.ai/supernova)

原文链接：[Cerebras CS-4 搭载三颗 WSE-3 Turbo，加速大模型推理｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/cerebras-cs4-doubles-inference-speed.html)

## 一句话快讯
- MiniMax Design 推出设计智能体，可根据简短指令完成完整设计，无需编写数万字提示词。（[MiniMax Hailuo on X](https://x.com/Hailuo_AI/status/2090025566531735648)）
- 一款人形机器人在2026世界机器人大会上展示了主办方所称的全球首次全自主完整乒乓球对局。（[量子位](https://www.qbitai.com/2026/08/475907.html)）
- Relativity Networks 融资2200万美元，计划将面向高带宽数据中心的新型高速光纤技术商业化。（[TechCrunch](https://techcrunch.com/2026/08/19/relativity-networks-raises-22-million-to-bring-a-faster-kind-of-fiber-to-data-centers/)）
- 腾讯混元公布 Hyra 的四项新数学进展，其中包括提高三维 Blaschke–Lebesgue 问题的通用下界。（[Tencent Hunyuan on X](https://x.com/TencentHunyuan/status/2090002485771751690)）
- Qdrant 介绍其可过滤 HNSW 索引如何在过滤条件下保持图连通性，而非仅在查询阶段补救搜索。（[Qdrant on X](https://x.com/qdrant_engine/status/2089999409404957029)）
- 曾参与 MiniMax 大规模智能体基础设施建设的核心工程负责人阿岛已离职。（[量子位](https://www.qbitai.com/2026/08/475869.html)）
- Lovart 接入 Seedance 2.5，并展示了用一句提示词生成30秒彩铅风格视频的工作流。（[Lovart on X](https://x.com/lovart_ai/status/2089985412232319204)）
- Kimi 发布金融分析师教程，演示实时投资者看板、财务模型更新等三类常见投研工作流。（[Moonshot AI on X](https://x.com/Kimi_Moonshot/status/2089979521412034787)）
- 研究人员提出默认拒绝执行的智能体运行时治理方案，在智能体跨越行动边界时核验来源并实施控制。（[arXiv](https://arxiv.org/abs/2608.16891)）
- SkillEffect 提出面向智能体工具的受检降级机制，旨在有限内存条件下维持工具执行的可靠性。（[arXiv](https://arxiv.org/abs/2608.17007)）
- 据通义千问公布，Qwen3.8-27B 在 Harvey 法律智能体基准的开放权重模型中排名第一。（[Alibaba Qwen on X](https://x.com/Alibaba_Qwen/status/2089922175507865795)）
- 据通义千问公布，Qwen3.8-27B 发布四天后登上 Cline 模型排行榜首位。（[Alibaba Qwen on X](https://x.com/Alibaba_Qwen/status/2089919106522976337)）
- Ollama 开始面向其云服务订阅用户逐步开放月之暗面 Kimi K3 模型。（[Ollama on X](https://x.com/ollama/status/2089914983840989255)）
- 谷歌与航空业机构合作，利用人工智能辅助航班规划，减少会加剧气候变暖的飞机凝结尾迹。（[SiliconANGLE](https://siliconangle.com/2026/08/18/google-partners-with-the-aviation-industry-to-try-and-prevent-climate-warming-contrails-with-ai/)）

---

完整日报：[8月19日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-08-19.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。