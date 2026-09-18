这是「猫叔的AI资讯雷达」9月18日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：阿里新模型原生处理文本、图像、音频和视频，并结合工具调用，面向长上下文多模态 Agent 工作流。

## 深度简报目录

- 阿里发布 Qwen3.8-Omni-Flash，支持百万 Token 上下文
- Sakana AI 成立 Frontier Intelligence Group，探索 Transformer 之外的路径

## 快讯预览

- Atria AI 发布 Dawn Preview，定位为可将研究问题转化为可验证结果的智能体基础模型。
- Meshy 推出模板，可分别用人物和宠物照片生成交换体型的趣味 3D 场景。
- 腾讯 WorkBuddy 5.5.6 现可生成带云数据库、文件存储、注册登录和 AI 调用的全栈网页应用。
- 腾讯正在内测 Chatterfly 输入法，可理解上下文并替用户执行任务。
- Hailuo AI 预告更快速的故事板工作流，旨在压缩生成视频的前期视觉规划。
- AReaL 2.0 介绍了一套在线强化学习闭环，让智能体能够在使用过程中持续改进。
- 一篇分析文章盘点了 2026 年适用于本地语言模型的开源智能体运行框架。
- The Decoder 报道称，中美专家呼吁制定共同规则，禁止 AI 控制核武器。
- Recraft 展示 V4 Styles，可依据单张参考图生成多样化角色、物体和场景。
- Mistral 表示，调查未发现其系统遭未授权访问的证据。

## 1. 阿里发布 Qwen3.8-Omni-Flash，支持百万 Token 上下文

阿里新模型原生处理文本、图像、音频和视频，并结合工具调用，面向长上下文多模态 Agent 工作流。

### 一个模型处理长程多媒体任务

阿里 Qwen 团队于 9 月 18 日发布 Qwen3.8-Omni-Flash。这款原生全模态模型可在同一系统中接收文本、图像、音频和视频输入，并支持最高 100 万 Token 的上下文窗口，目前已通过千问平台和云服务提供。

根据 Qwen 官方模型文档，该模型构建于 Qwen3.8-Flash-Next 架构之上，目标不是单纯理解媒体内容，而是服务于具备执行能力的生产力场景。适用方向包括编程、知识工作、图形界面交互、视频剪辑、音乐视频制作、影视流程、旁白、多媒体摘要以及音视频对话。它还支持双声道和四声道空间音频理解，并兼容 DashScope 与 OpenAI 协议。

Qwen 将这次发布定义为感知、推理和工具调用的整合。其意义在于，当前不少多媒体系统仍把转录、视觉分析、规划和执行拆分给多个组件。一个模型如果能够检查长视频、定位关键片段、同时理解语音与画面、进行推理并调用工具，就可能降低制作流程中的编排成本。

### 为什么重要

这次发布强化了中国模型厂商在实用多模态 Agent 领域的竞争力。百万 Token 上下文很醒目，但更困难的问题是：模型能否在长视频、嘈杂音频和多轮工具调用中持续保持稳定。Qwen 最终的竞争优势，将取决于生产环境中的可靠性和价格，而不是上下文数字本身。

**原始信源**

- [Model releases - QwenCloud](https://docs.qwencloud.com/changelog/models)
- [Alibaba Qwen announces Qwen3.8-Omni-Flash](https://x.com/Alibaba_Qwen/status/2100785962414702599)
- [阿里发布 Qwen3.8-Omni-Flash 全模态模型](https://www.ithome.com/1/004/049.htm)

原文链接：[阿里发布 Qwen3.8-Omni-Flash，支持百万 Token 上下文｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/qwen38-omni-flash-launches.html)

---

## 2. Sakana AI 成立 Frontier Intelligence Group，探索 Transformer 之外的路径

日本 Sakana AI 成立新研究集体，探索生物启发、持续学习等可能通向新型智能的技术路线。

### 有意押注规模化之外

Sakana AI 于 9 月 18 日宣布成立 Frontier Intelligence Group，在当前 Transformer 加规模化的主流路线之外，系统探索其他通向智能的可能性。该团队源自公司内部研究人员的非正式讨论，如今已形成定期会议机制，并邀请外部研究者参与，支持更长期、更具 speculative 性质的研究。

Sakana 认为，现有系统仍受到多项根本限制：会自信地产生错误信息，在真正陌生的情境中表现不稳，运行能耗较高，而且需要大量数据才能学习。因此，团队将研究重点放在商业模型开发中经常被放到次要位置的问题上，包括人类如何从极少样本中实现系统泛化、系统能否通过局部学习规则处理长期信用分配，以及训练是否必须依赖去相关的数据批次。

该团队吸收了进化算法、计算神经科学、认知心理学和其他自然启发方向的思路。Sakana 强调，这并不意味着要在计算机中复制人脑，也不要求所有项目都模仿生物，而是希望保留一种研究环境，让研究人员能够在商业价值尚不明确时继续追踪非主流想法。

### 为什么重要

这不是一次模型发布，也没有新的榜单成绩。它的意义在于制度层面：一家日本前沿 AI 公司明确为可能挑战当前竞赛假设的研究保留空间。最终结果可能只是一些有趣实验，也可能形成新的技术路径；在一个越来越擅长渐进式扩展的行业里，这种探索本身回应了真实缺口。Sakana 仍需证明，研究自由能否带来持久技术优势，而不只是更有吸引力的理念宣言。

**原始信源**

- [Introducing Sakana AI’s Frontier Intelligence Group](https://sakana.ai/frontier-intelligence-group/)
- [Sakana AI Frontier Intelligence Group announcement](https://x.com/SakanaAILabs/status/2100780326737858715)

原文链接：[Sakana AI 成立 Frontier Intelligence Group，探索 Transformer 之外的路径｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/sakana-frontier-intelligence-group.html)

## 一句话快讯
- Atria AI 发布 Dawn Preview，定位为可将研究问题转化为可验证结果的智能体基础模型。（[X / InternLM](https://x.com/intern_lm/status/2100896041939968221)）
- Meshy 推出模板，可分别用人物和宠物照片生成交换体型的趣味 3D 场景。（[X / MeshyAI](https://x.com/MeshyAI/status/2100895106169761938)）
- 腾讯 WorkBuddy 5.5.6 现可生成带云数据库、文件存储、注册登录和 AI 调用的全栈网页应用。（[IT之家](https://www.ithome.com/1/004/283.htm)）
- 腾讯正在内测 Chatterfly 输入法，可理解上下文并替用户执行任务。（[IT之家](https://www.ithome.com/1/004/273.htm)）
- Hailuo AI 预告更快速的故事板工作流，旨在压缩生成视频的前期视觉规划。（[X / Hailuo AI](https://x.com/Hailuo_AI/status/2100889471218831450)）
- AReaL 2.0 介绍了一套在线强化学习闭环，让智能体能够在使用过程中持续改进。（[InfoQ 中文](https://www.infoq.cn/article/x2FmIeCkeDYUV66BNj3g?utm_source=rss&utm_medium=article)）
- 一篇分析文章盘点了 2026 年适用于本地语言模型的开源智能体运行框架。（[MarkTechPost](https://www.marktechpost.com/2026/09/18/best-open-source-agent-harnesses-for-local-llms-in-2026/)）
- The Decoder 报道称，中美专家呼吁制定共同规则，禁止 AI 控制核武器。（[The Decoder](https://the-decoder.com/us-and-china-experts-push-for-shared-rules-banning-ai-control-over-nuclear-weapons/)）
- Recraft 展示 V4 Styles，可依据单张参考图生成多样化角色、物体和场景。（[X / Recraft](https://x.com/recraftai/status/2100857888151310789)）
- Mistral 表示，调查未发现其系统遭未授权访问的证据。（[X / Mistral AI](https://x.com/MistralAI/status/2100824200126529725)）
- MiniMax 成为新加坡电信 AI Pass 的 AI 合作伙伴，支持 SkillsFuture AI 订阅计划。（[X / MiniMax AI](https://x.com/MiniMax_AI/status/2100800958729220505)）
- 据报道，Manus 重生仅 17 天后估值便翻倍。（[量子位](https://www.qbitai.com/2026/09/491764.html)）
- Genspark 调整 Plus 和 Pro 会员权益，增加每周额度，价格保持不变至 12 月。（[X / Genspark AI](https://x.com/genspark_ai/status/2100740257855791176)）
- OpenAI 为桌面应用加入用量分析，可查看任务、子智能体和聊天对 Codex 消耗的贡献。（[X / OpenAI Developers](https://x.com/OpenAIDevs/status/2100733364877803741)）

---

完整日报：[9月18日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-09-18.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。