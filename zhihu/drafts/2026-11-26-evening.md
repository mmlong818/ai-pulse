# 猫叔的AI资讯雷达｜11月26日晚报：英伟达暂停向四个东南亚国家发运AI服务器

这是「猫叔的AI资讯雷达」11月26日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：据报道，英伟达要求合作伙伴暂停向四个东南亚国家发运搭载其芯片的AI服务器，美国对华算力管制正延伸至海外数据中心。

## 深度简报目录

- 英伟达暂停向四个东南亚国家发运AI服务器
- 腾讯开源DFly2，最高可让Hy4推理提速4.2倍
- Sakana AI为研究智能体Marlin新增两种深度模式

## 快讯预览

- 讯飞介绍其语音大模型如何从语音基座延伸至实际语音应用和服务。
- 具微科技展示潘多拉支撑机器人，可在90秒内自动换装并完成补能。
- 美国42名州检察长正试图阻止Character.AI出售用户聊天数据。
- Qwen宣布Qwen-Audio-3.1新增多语种能力，重点增强对中文方言的支持。
- Fireworks上线Thinking Machines的Inkling 2 Small微调支持，并称其BrowseComp得分达90.2%。
- 据报道，语音AI公司ElevenLabs正寻求新一轮融资，估值目标达330亿美元。
- Together Link展示Claude Code分流GitHub问题，并启动三个子智能体执行修复。
- Artificial Analysis将Sand AI的4800亿参数MAGI-2列为图生视频第一，与Dreamina Seedance 2.5统计持平。
- GitHub 宣布 Copilot Day 将于 12 月 15 日回归，活动包含 Copilot 构建者和开发者的分享。

## 1. 英伟达暂停向四个东南亚国家发运AI服务器

据报道，英伟达要求合作伙伴暂停向四个东南亚国家发运搭载其芯片的AI服务器，美国对华算力管制正延伸至海外数据中心。

据《金融时报》和路透报道，英伟达已要求制造合作伙伴暂停向马来西亚、新加坡、泰国和印度尼西亚发运搭载其处理器的AI服务器。此举发生在美国收紧先进AI芯片出口规则之后，相关国家被华盛顿视为可能向中国转运芯片的节点。

### 管制开始覆盖算力落点

此次影响的不是单独出售的加速卡，而是戴尔、超微等厂商组装的完整服务器系统。据报道，四国部分客户已收到通知，待发订单暂时不能离厂，英伟达及合作伙伴正在重新核对合规要求。

新措施针对的是此前管制留下的一条现实通道。中国企业无法直接购买受限芯片后，可以转而租用东南亚数据中心的算力；而新加坡、马来西亚、泰国和印度尼西亚凭借网络连接、电力条件及地理位置，已经成为区域云计算基础设施的重要落点。

目前尚不清楚暂停会持续多久。它可能只是企业为适应新规而采取的临时措施，但影响已经出现：当地云服务商和AI开发者面临扩容、交付以及高端训练算力供应的不确定性。据报道，一个与字节跳动有关的新加坡云项目已经受到干扰。

### 为什么重要

这并不只是一次物流延迟，而是出口管制从“禁止卖给谁”进一步转向“算力部署在哪里、由谁租用、服务器之后流向何处”。这会提高东南亚数据中心的合规成本，也迫使英伟达更直接地管理过去支撑区域增长的销售渠道。

如果限制长期存在，中国开发者可能加快国产加速器、非美国供应链和高效模型架构的投入。对整个行业而言，这释放出一个明确信号：一座位于中国境外的AI集群，也可能被纳入对华技术管制的实际范围。

**原始信源**

- [Nvidia halts server shipments to four Southeast Asian countries, FT reports](https://www.investing.com/news/stock-market-news/nvidia-halts-server-shipments-to-four-southeast-asian-countries-ft-reports-5052112)
- [Nvidia halts server shipments to Malaysia, Singapore, Thailand, and Indonesia after tighter US export controls](https://the-decoder.com/nvidia-halts-server-shipments-to-malaysia-singapore-thailand-and-indonesia-after-tighter-us-export-controls/)
- [Changes to § 742.6 Regional Stability](https://public-inspection.federalregister.gov/2026-23529.pdf)

原文链接：[英伟达暂停向四个东南亚国家发运AI服务器｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/nvidia-southeast-asia-server-halt.html)

---

## 2. 腾讯开源DFly2，最高可让Hy4推理提速4.2倍

腾讯混元开源Hy4 flash的推测解码草稿模型DFly2，称在长上下文和智能体任务中最高可带来4.2倍推理加速。

腾讯混元团队开源了DFly2，这是一套为Hy4 flash设计的推测解码草稿模型。团队在11月26日发布的信息中称，DFly2面向长上下文和智能体任务，最高可实现4.2倍推理加速。

### 它解决的是什么瓶颈

推测解码会先让一个更小的草稿模型预测多个后续Token，再由大模型一次性验证。如果草稿足够准确，大模型就能一轮接受多个Token，从而减少成本较高的串行解码步骤。DFly2的目标，就是让Hy4 flash在长提示词、反复调用工具的智能体工作流中更高效。

腾讯同时宣布，Hy4 flash已经上线Fireworks AI，由后者提供生产级推理基础设施。Hy4 flash还在OpenCode上限时免费开放，显示腾讯正把模型分发、开发者试用和推理优化放在同一套推广策略中。

4.2倍是峰值数据，并不代表所有场景都能达到同样效果。实际收益取决于草稿接受率、提示词结构、输出长度、硬件、批处理方式以及外围智能体框架。长上下文应用还可能受内存带宽和工具调用延迟限制，而不只是生成速度。

### 为什么重要

这次发布说明，开放模型的竞争重点正在从单一权重扩展到完整推理栈。决定一个大模型能否进入真实产品的，不只是模型本身，也包括它在服务器上的运行成本。只要草稿预测足够准确，推测解码就能在不重新训练主模型的情况下压低服务费用。

对智能体开发者而言，这一点尤其关键，因为多步骤工作流会放大每一次生成延迟。如果DFly2在真实流量和多样提示词下仍能接近最佳结果，Hy4 flash在编程、研究和工具调用任务中的竞争力可能明显提升。现在尚未确定的是，这种加速能否脱离受控测试，稳定延续到生产环境。

**原始信源**

- [Tencent Hunyuan announces DFly2 speculative decoding drafter](https://x.com/TencentHunyuan/status/2125928146113585468)
- [Hy4 flash is now live on Fireworks AI](https://x.com/TencentHunyuan/status/2125828452519739677)

原文链接：[腾讯开源DFly2，最高可让Hy4推理提速4.2倍｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/tencent-dfly2-speeds-hy4.html)

---

## 3. Sakana AI为研究智能体Marlin新增两种深度模式

Sakana AI升级战略研究智能体Marlin，加入更快的多角度分析、广域探索模式，并重做PowerPoint导出能力。

Sakana AI更新了战略研究智能体Marlin，新增Twilight 2.0和Midnight 2.0两种模式。公司称，Twilight 2.0面向更快速的多角度分析，Midnight 2.0则用于扩大检索范围、寻找不易被发现的新线索；此次更新还大幅改进了Microsoft PowerPoint导出效果。

### 从回答问题转向完成研究流程

Marlin原有的Sunlight模式仍作为轻量选项保留。新的模式结构让用户可以在速度、广度和深度之间做选择，而不是把研究简化成一次通用的“提问—回答”。Sakana用海洋的不同深度来命名这些模式，表达逐步深入调查的产品思路。

PowerPoint能力的变化同样值得关注。研究智能体往往能找到有价值的材料，却在最后一步失分：结果无法整理成高管、客户或同事可以直接审阅的文档。更成熟的幻灯片导出能力，意味着Marlin正在从对话式研究界面转向以具体业务交付物为终点的工作流工具。

不过，公告没有提供标准化基准、价格对比，也没有详细说明不同模式背后的模型和工具。因此，目前还难以判断改进主要来自搜索质量、执行时间、任务编排，还是展示层工程。

### 为什么重要

Sakana正把Marlin放在研究自动化场景中竞争，而不是只和通用聊天机器人比较。这使它更贴近咨询、分析和战略团队的实际需求：先完成有来源的探索，再交付一份可以展示的材料。

真正需要观察的是，新模式能否缩短研究时间，同时不增加无依据结论和冗长内容。更好的幻灯片生成会提高采用率，但也可能让薄弱判断更容易被传播。Marlin最终的价值，不取决于模式名称是否新颖，而取决于用户能否检查证据、追踪智能体过程，并清楚区分“发现线索”和“完成验证”。

**原始信源**

- [Sakana Marlin Update: Twilight 2.0 and Midnight 2.0](https://sakana.ai/marlin-update-2/)
- [Sakana AI adds Twilight 2.0 and Midnight 2.0 research modes to Marlin](https://dailyai.report/story/911eec1f-d2ea-4407-bd8d-9dbd8c7afb54)

原文链接：[Sakana AI为研究智能体Marlin新增两种深度模式｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/sakana-marlin-research-modes.html)

## 一句话快讯
- 讯飞介绍其语音大模型如何从语音基座延伸至实际语音应用和服务。（[InfoQ 中文](https://www.infoq.cn/minibook/h1BlHGoTKyeLgs0KmAhe?utm_source=rss&utm_medium=article)）
- 具微科技展示潘多拉支撑机器人，可在90秒内自动换装并完成补能。（[量子位](https://www.qbitai.com/2026/11/512972.html)）
- 美国42名州检察长正试图阻止Character.AI出售用户聊天数据。（[The Verge](https://www.theverge.com/policy/1042620/character-ai-sale-state-ags-block-selling-users-chats)）
- Qwen宣布Qwen-Audio-3.1新增多语种能力，重点增强对中文方言的支持。（[X / Alibaba Qwen](https://x.com/Alibaba_Qwen/status/2125798914490249411)）
- Fireworks上线Thinking Machines的Inkling 2 Small微调支持，并称其BrowseComp得分达90.2%。（[X / Fireworks AI](https://x.com/FireworksAI_HQ/status/2125787413784174730)）
- 据报道，语音AI公司ElevenLabs正寻求新一轮融资，估值目标达330亿美元。（[SiliconANGLE](https://siliconangle.com/2026/11/25/voice-ai-startup-elevenlabs-reportedly-seeking-new-funding-at-33b-valuation/)）
- Together Link展示Claude Code分流GitHub问题，并启动三个子智能体执行修复。（[X / Together Compute](https://x.com/togethercompute/status/2125760937156399484)）
- Artificial Analysis将Sand AI的4800亿参数MAGI-2列为图生视频第一，与Dreamina Seedance 2.5统计持平。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2125759745655210113)）
- GitHub 宣布 Copilot Day 将于 12 月 15 日回归，活动包含 Copilot 构建者和开发者的分享。（[X / GitHub](https://x.com/github/status/2125754695679344797)）

---

完整日报：[11月26日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-26.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。