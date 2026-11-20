# 猫叔的AI资讯雷达｜11月20日晚报：腾讯开放 Hy4 权重：7700亿参数支持百万上下文

这是「猫叔的AI资讯雷达」11月20日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：腾讯正式公开混元 Hy4 权重与系统卡，这款7700亿参数多模态模型支持百万级上下文，并同步登陆 Together AI。

## 深度简报目录

- 腾讯开放 Hy4 权重：7700亿参数支持百万上下文
- Signal 禁止手机 AI 助手读取私密聊天画面
- Sakana AI 成立面向公共利益的安全研究团队

## 快讯预览

- 谷歌发布 Gemini 4 Argon，面向机器人控制、仿真与策略优化。
- GitHubNext 预览面向协作开发的实时批注与模型即时反馈能力。
- Dreamina 以新创作者案例展示 Seedance 2.5 的 4K 电影级视频输出。
- Agnes Agent 据称最高提效 14 倍，并将成本降至原来的二十七分之一。
- 一篇论文发现，当能力差距过大时，人机互利关系会变得不稳定。
- 《Training Language Models for Introspective Oversight》提出让模型检查自身推理、辅助监督的方法。
- 一篇论文从 token 层面研究 Agent 编程系统中的热量、熵与错误分布。
- HardwareDx 提出用于数据中心机器维修诊断的基础图模型系统。
- RFBench 提出基于仿真的多模态基准，用于被动射频布局设计与理解。
- Inhabitant 提出长时程 Agent 框架，以空间控制和量化反馈处理人与场景交互。

## 1. 腾讯开放 Hy4 权重：7700亿参数支持百万上下文

腾讯正式公开混元 Hy4 权重与系统卡，这款7700亿参数多模态模型支持百万级上下文，并同步登陆 Together AI。

腾讯正式发布混元 Hy4 的开放权重和系统卡，标志着这款旗舰混合专家模型从“可通过腾讯产品使用”进入开发者可独立部署、检查和研究的阶段。Hy4 总参数量达到7700亿，每次激活约490亿参数，上下文窗口约为100万词元。

### 发布了什么

Hy4 支持文本与图像输入、工具调用和结构化输出，主要面向代码编写、电脑操作、文档处理和长程智能体任务。腾讯在发布材料中强调了模型的防御性网络安全能力，并称通过训练数据筛选和安全评估限制攻击性漏洞利用能力。模型也已登陆 Together AI，开发者无需自行准备完整推理集群即可进行测试。

腾讯在11月4日宣布 Hy4 正式推出时，曾表示权重和系统卡将在随后发布。当时它主要还是一个由腾讯产品和 API 托管的模型；此次公开权重，才是外部团队能够真正复现、部署和审查它的关键节点。

### 为什么重要

7700亿参数意味着 Hy4 并不是面向普通个人电脑的轻量模型，初期用户更可能是云服务商、研究机构和具备大型显存资源的企业。不过，原生视觉能力与百万级上下文，使它在长文档、代码仓库和多模态智能体任务中具备现实吸引力。

Together AI 的同步托管降低了评估门槛，系统卡则为安全研究提供了更多依据。真正尚未验证的是：Hy4 的基准成绩能否稳定迁移到腾讯产品之外，以及公开许可证和完整运行材料对开发者究竟有多大自由度。

**原始信源**

- [Tencent Hy4 open-weight release announcement](https://x.com/TencentHunyuan/status/2123625549147070538)
- [Tencent Hy4 is live on Together AI](https://www.together.ai/blog/tencent-hy4)
- [Tencent launches Hy4](https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/)

原文链接：[腾讯开放 Hy4 权重：7700亿参数支持百万上下文｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/tencent-hy4-open-weights.html)

---

## 2. Signal 禁止手机 AI 助手读取私密聊天画面

Signal 将在 iOS 和 Android 上拦截 AI 助手截取聊天画面，把操作系统级智能体的数据权限问题推到台前。

Signal 表示将调整移动端应用，阻止操作系统内置的 AI 助手截取或读取私人聊天内容。iOS 27 版本中，Signal 将在应用内禁止截图；在 Android 上，当检测到 AI 助手试图查看应用画面时，则会启用屏幕安全保护。

### 新的隐私边界

Signal 面临的并不是端到端加密被破解，而是消息已经在用户设备上解密并显示之后，可能被拥有屏幕读取、辅助功能或类似权限的系统级智能体看到。助手可以读取渲染后的文字、生成摘要，甚至将内容留在 Signal 加密链路之外。

Signal 特别点名了正在深度整合进移动系统的 Siri AI 和 Gemini Intelligence。公司称，当拦截机制触发时，部分设备会向用户弹窗，并允许用户根据场景关闭保护。这一做法延续了 Signal 此前在 Windows 11 上阻止 Microsoft Recall 截取聊天截图的决定。

### 为什么重要

Signal 的动作把一个原本偏抽象的隐私问题，变成了应用开发者与操作系统平台之间的直接冲突。端到端加密可以保护传输过程和服务器数据，却无法单独决定一个获得系统信任的助手能否看到屏幕。随着智能体从回答问题转向跨应用执行任务，这个区别会越来越关键。

眼下的保护仍然有边界。基于检测的拦截依赖平台行为，未必覆盖所有辅助功能路径、远程控制机制或未来的系统级助手。更大的问题是治理：开发者需要一种可靠、统一的方式声明某类内容不得暴露给 AI 智能体，用户也需要知道哪些系统权限可能绕过应用自己的防护。

**原始信源**

- [Signal is Serious About Protecting Your Privacy](https://signal.org/blog/protecting-your-privacy/)
- [Reuters: Signal restricts screenshots to block AI agents](https://ca.investing.com/news/stock-market-news/exclusivesignal-restricts-screenshots-to-block-ai-agents-from-reading-messages-4971651)

原文链接：[Signal 禁止手机 AI 助手读取私密聊天画面｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/signal-blocks-mobile-ai-agents.html)

---

## 3. Sakana AI 成立面向公共利益的安全研究团队

日本 Sakana AI 启动独立安全研究团队，聚焦 AI 网络防御、可复现实验以及智能体自身的安全风险。

日本 Sakana AI 宣布成立独立的 Security Research Group，面向公共利益研究 AI 驱动的网络防御以及人工智能系统自身的安全问题。该团队将与 Sakana 的商业业务分开运作，并计划公开论文、可复现实验基准和工程实践指南。

### 三个研究方向

团队目前围绕三个问题展开工作。第一，利用 AI 预防整类软件漏洞，并验证自动修复是否真正有效。第二，研究防御型 AI 智能体能否在不同组织之间以机器速度协同。第三，评估如何保护防御人员所使用的 AI 智能体，避免它们成为新的攻击入口。

Sakana 表示，研究将与政府、企业和学术机构合作，同时承认网络安全研究的双重用途风险：帮助防守方理解漏洞的发现，也可能被攻击者利用。团队在成立公告中提到，漏洞披露数量正在快速上升，并提出用多个系统协同工作的“集体智能”提升防御韧性。

该团队正在东京招聘技术人员，并强调初期将优先公开研究，而不是把成果封闭在商业产品内部。公开路线有利于外部研究者检查方法，但也带来漏洞披露时机、评测独立性以及哪些技术细节可以安全发布等问题。

### 为什么重要

这条消息的价值不在于立即推出一个安全产品，而在于它试图建立一种新的研究组织方式。前沿模型越来越擅长寻找软件缺陷、编写接近漏洞利用的代码和操作工具，而防御方仍常常分散在不同机构，拥有不完整的数据和不一致的修补流程。Sakana 关注的是跨组织协同与可复现研究，而不是单一安全套件。

最终成效取决于它能否获得真实事件数据、接受独立评估，并谨慎处理双重用途发现。如果团队能证明多智能体防御确实提高响应速度，同时没有制造新的攻击面，这种模式可能影响日本及其他国家部署 AI 网络安全研究的方式。

**原始信源**

- [Introducing Sakana AI’s Security Research Group](https://sakana.ai/security-research-group/)
- [Sakana AI Security Research Group hiring page](https://sakana.ai/careers/member-of-technical-staff-security-research-group/)

原文链接：[Sakana AI 成立面向公共利益的安全研究团队｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/sakana-ai-security-research-group.html)

## 一句话快讯
- 谷歌发布 Gemini 4 Argon，面向机器人控制、仿真与策略优化。（[InfoQ 中文](https://www.infoq.cn/article/S4LH5Z9zcbLokm5uNSKR)）
- GitHubNext 预览面向协作开发的实时批注与模型即时反馈能力。（[X @GitHubNext](https://x.com/GitHubNext/status/2123716112575819847)）
- Dreamina 以新创作者案例展示 Seedance 2.5 的 4K 电影级视频输出。（[X @dreamina_ai](https://x.com/dreamina_ai/status/2123713099828207888)）
- Agnes Agent 据称最高提效 14 倍，并将成本降至原来的二十七分之一。（[量子位](https://www.qbitai.com/2026/11/511582.html)）
- 一篇论文发现，当能力差距过大时，人机互利关系会变得不稳定。（[arXiv](https://arxiv.org/abs/2611.23322)）
- 《Training Language Models for Introspective Oversight》提出让模型检查自身推理、辅助监督的方法。（[arXiv](https://arxiv.org/abs/2611.23365)）
- 一篇论文从 token 层面研究 Agent 编程系统中的热量、熵与错误分布。（[arXiv](https://arxiv.org/abs/2611.23375)）
- HardwareDx 提出用于数据中心机器维修诊断的基础图模型系统。（[arXiv](https://arxiv.org/abs/2611.23398)）
- RFBench 提出基于仿真的多模态基准，用于被动射频布局设计与理解。（[arXiv](https://arxiv.org/abs/2611.23410)）
- Inhabitant 提出长时程 Agent 框架，以空间控制和量化反馈处理人与场景交互。（[arXiv](https://arxiv.org/abs/2611.25005)）
- MAWAM 提出用于协同操作的多 Agent 世界—动作模型。（[arXiv](https://arxiv.org/abs/2611.25105)）
- 一篇论文报告，传统规划器在部分驾驶任务中有时优于学习型规划器。（[arXiv](https://arxiv.org/abs/2611.25138)）
- Reject and Report 提出适用于生成图像模型、可证明伪造且难以察觉的水印方案。（[arXiv](https://arxiv.org/abs/2611.25226)）
- Simon Willison 警告，令牌欺诈正在利用 AI 工作流与凭据体系实施攻击。（[Simon Willison](https://simonwillison.net/2026/Nov/20/token-fraud-is-here-and-its-bad/)）

---

完整日报：[11月20日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-20.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。