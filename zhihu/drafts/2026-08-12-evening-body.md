这是「猫叔的AI资讯雷达」8月12日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：Ling 3.0 Tiny 总参数量为 79 亿、每个 token 仅激活 13 亿参数，瞄准低成本本地部署与高频智能体任务。

## 深度简报目录

- 蚂蚁发布稀疏小模型 Ling 3.0 Tiny
- Solar Pro 4 同时登上 Arena 三类榜单

## 快讯预览

- Mistral 推出欧盟境内数据处理和付费优先访问服务，但区域路由不覆盖部分功能，优先可用性也不作保证。
- 腾讯混元发布研究，评估能够修改自身的 AI 智能体是否真正获得改进，以提高自进化效果衡量的可靠性。
- 小米 MiLM Plus 推出 PROVE，将两项符合人类感知的视频物体移除指标与真实世界视频基准结合起来。
- AEROBAT 自动完成智能体行为研究流程，围绕 12 种目标行为生成 79 项假设，并执行了 23,512 轮模拟。
- MESA 通过按任务选择多种记忆结构，使长程智能体记忆性能提升 8.5%，同时比全结构方案少用 41% 的证据令牌。
- FACT 利用失败动作训练世界—动作模型，减少偏向成功结果的未来幻觉，并改善仿真及真实双臂操作表现。
- MarkNull 在没有可感知画质损失的情况下，将 AI 图像水印比特准确率降至 53.14%，并成功攻破 Google SynthID-Image。
- 一种确定性流式防护机制成功拦截所有补全预设危险词对的文本块，但研究者强调其覆盖范围刻意保持狭窄。
- 研究者归纳了八类由大模型介导的传统网络攻击，发现风险同时取决于应用架构和模型行为。
- 一项实证研究分析了思维链何时能够改善推理，以及串行处理深度何时反而成为性能瓶颈。

## 1. 蚂蚁发布稀疏小模型 Ling 3.0 Tiny

Ling 3.0 Tiny 总参数量为 79 亿、每个 token 仅激活 13 亿参数，瞄准低成本本地部署与高频智能体任务。

### 用稀疏激活压低推理门槛

蚂蚁集团 InclusionAI 团队发布开放权重模型 Ling 3.0 Tiny。该模型总参数量为 79 亿，但处理每个 token 时只激活约 13 亿参数，试图借助混合专家架构，在保留较强能力的同时降低推理所需的计算量和内存带宽，更适合资源受限的部署环境。

第三方评测机构 Artificial Analysis 在 4.1.1 版 Intelligence Index 中给出 25 分。按该机构的结果，Ling 3.0 Tiny 已进入较强的小型开放权重模型行列，但绝对能力与前沿大模型仍有明显距离。在用于考察模型是否会自信编造答案的 Omniscience Index 上，它得到负 19 分；对于这一体量的模型，评测方认为表现相对不错。

不过，它的实际效率并不能只看激活参数量。Artificial Analysis 统计发现，Ling 3.0 Tiny 完成每项 Intelligence Index 任务平均会生成约 5.1 万个输出 token，高于 Ling 3.0 Flash 的约 3.6 万个，也比 Nemotron 3.5 Lightning 和同类 Qwen 模型等高效选手多约 65%。每个 token 的计算成本虽然较低，但如果推理链明显更长，节省下来的算力可能被更高的总 token 消耗、延迟和服务时间部分抵消。

### 为何重要

Ling 3.0 Tiny 为竞争迅速升温的百亿参数以下市场增加了一个中国选手。这类模型的主要价值并非争夺旗舰聊天机器人榜首，而是进入本地助手、高并发智能体和垂直系统：在这些场景中，延迟、隐私和运营成本通常比极限能力更重要。它偏长的推理轨迹也再次说明，企业选型不能只比较参数规模或单 token 价格，还应衡量完成整项任务所需的总成本。后续在不同硬件上的延迟、显存占用和单任务成本测试，将决定其稀疏架构能否转化为真实优势。

**原始信源**

- [Artificial Analysis: Ling 3.0 Tiny release and evaluation](https://x.com/ArtificialAnlys/status/2087371367884956099)
- [Artificial Analysis: Ling 3.0 Tiny token usage](https://x.com/ArtificialAnlys/status/2087371372683243750)
- [Artificial Analysis: Ling 3.0 Tiny Omniscience score](https://x.com/ArtificialAnlys/status/2087371370397409422)

原文链接：[蚂蚁发布稀疏小模型 Ling 3.0 Tiny｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/ling-3-tiny-efficient-open-model.html)

---

## 2. Solar Pro 4 同时登上 Arena 三类榜单

Upstage 成为首家同时进入 Arena 智能体、网页开发代码和通用文本榜单的韩国实验室。

### 韩国大模型取得更完整的公开评测席位

韩国 Upstage 的 Solar Pro 4 已进入 Arena 旗下三类公开榜单：Agent Arena、Code Arena: WebDev 与 Text Arena。Arena 表示，Upstage 由此成为首家在这三个类别中均有模型上榜的韩国实验室，覆盖通用对话、网页软件开发以及调用工具完成任务等不同能力。

这次上榜的意义更多来自覆盖面，而非某一个具体名次。Text Arena 主要汇集用户对通用回答的偏好判断；Code Arena: WebDev 关注模型能否生成可运行的网页界面；Agent Arena 则让模型使用网页搜索、文件系统和终端，完成更长、更复杂的现实任务。最后一类测试的不只是单轮回答质量，还包括规划、工具操作以及在中间步骤出错后的恢复能力。

不过，Arena 的公告本身并不能证明 Solar Pro 4 已在三个类别中领先所有前沿模型。公开榜单会随着投票和任务样本增加而变化，模型在统一测试框架内的表现，也不一定能直接反映企业实际使用时的成本、延迟和稳定性。因此，更稳妥的解读是：Solar Pro 4 已进入具备独立可见度的竞争梯队，而不是已经取得综合能力第一。

### 为何重要

亚洲前沿模型竞争长期主要围绕中国实验室展开，日本和韩国厂商在国际视野中的存在感相对有限。一款韩国模型同时进入通用、编程和智能体评测，扩大了区域竞争版图，也让开发者有更多理由评估来自不同亚洲市场的替代方案。Agent Arena 尤其值得关注，因为行业竞争正在从单轮问答转向借助工具完成多步骤工作。如果 Upstage 能在评测表现之外继续提供可靠的韩语能力、可预测的价格和企业部署方案，Solar Pro 4 的战略价值就可能超越榜单名次本身。

**原始信源**

- [Arena: Solar Pro 4 debuts across three leaderboards](https://x.com/arena/status/2087340884413264314)
- [Arena: How Agent Arena evaluates models](https://x.com/arena/status/2087340888385360094)

原文链接：[Solar Pro 4 同时登上 Arena 三类榜单｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/solar-pro-4-arena-debut.html)

## 一句话快讯
- Mistral 推出欧盟境内数据处理和付费优先访问服务，但区域路由不覆盖部分功能，优先可用性也不作保证。（[The Decoder](https://the-decoder.com/mistral-now-offers-eu-data-processing-and-priority-access-but-both-come-with-important-limits/)）
- 腾讯混元发布研究，评估能够修改自身的 AI 智能体是否真正获得改进，以提高自进化效果衡量的可靠性。（[Tencent Hunyuan on X](https://x.com/TencentHunyuan/status/2087444616832594022)）
- 小米 MiLM Plus 推出 PROVE，将两项符合人类感知的视频物体移除指标与真实世界视频基准结合起来。（[MarkTechPost](https://www.marktechpost.com/2026/08/11/xiaomis-milm-plus-releases-prove-perception-aligned-object-removal-metrics-rc-s-and-rc-t-with-a-real-world-video-benchmark/)）
- AEROBAT 自动完成智能体行为研究流程，围绕 12 种目标行为生成 79 项假设，并执行了 23,512 轮模拟。（[arXiv](https://arxiv.org/abs/2608.10030)）
- MESA 通过按任务选择多种记忆结构，使长程智能体记忆性能提升 8.5%，同时比全结构方案少用 41% 的证据令牌。（[arXiv](https://arxiv.org/abs/2608.10108)）
- FACT 利用失败动作训练世界—动作模型，减少偏向成功结果的未来幻觉，并改善仿真及真实双臂操作表现。（[arXiv](https://arxiv.org/abs/2608.10232)）
- MarkNull 在没有可感知画质损失的情况下，将 AI 图像水印比特准确率降至 53.14%，并成功攻破 Google SynthID-Image。（[arXiv](https://arxiv.org/abs/2608.10166)）
- 一种确定性流式防护机制成功拦截所有补全预设危险词对的文本块，但研究者强调其覆盖范围刻意保持狭窄。（[arXiv](https://arxiv.org/abs/2608.10279)）
- 研究者归纳了八类由大模型介导的传统网络攻击，发现风险同时取决于应用架构和模型行为。（[arXiv](https://arxiv.org/abs/2608.10281)）
- 一项实证研究分析了思维链何时能够改善推理，以及串行处理深度何时反而成为性能瓶颈。（[arXiv](https://arxiv.org/abs/2608.09942)）
- 研究者提出闭环农业大模型助手，结合传感器数据、领域知识和反馈驱动的建议服务数字农业。（[arXiv](https://arxiv.org/abs/2608.09949)）
- Qwen 已将其 Qwen-Image-3.0 图像生成模型接入 OpenArt，供用户在线试用。（[Alibaba Qwen on X](https://x.com/Alibaba_Qwen/status/2087382849972547730)）
- Qwen 表示，Qwen3.8-Max 在 Legal Research Bench 法律研究排行榜上由第 22 名升至第 4 名。（[Alibaba Qwen on X](https://x.com/Alibaba_Qwen/status/2087382811921854827)）
- Ollama 现在可在 JetBrains 开发环境中充当 GitHub Copilot 的本地模型提供方。（[Ollama on X](https://x.com/ollama/status/2087352262268170319)）

---

完整日报：[8月12日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-08-12.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。