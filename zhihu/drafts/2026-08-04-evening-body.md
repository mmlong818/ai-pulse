这是「猫叔的AI资讯雷达」8月4日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：腾讯混元新一代语音识别模型上线，普通话、英语、粤语词错率均约 3%，已在腾讯云开放 API，元宝端免费可用。

## 深度简报目录

- 腾讯混元发布 Hy ASR 3.0 preview，元宝已首发上线
- 通义万相上线实时功能，摄像头画面可即时转风格

## 快讯预览

- OpenAI 反击苹果商业机密诉讼，公布 iMessage 聊天记录，显示苹果员工在工程师离职后仍多次向其索要内部信息，称问题出在苹果自身的权限管理。
- Reflex 以 Apache-2.0 协议开源 Python 图表库 XY：Rust 后端加 WebGL2 渲染，从 1 万点到 1 亿点均保持约 0.08 秒渲染与可交互。
- Recraft 展示 V4.1 的材质替换能力：在保持物体造型不变的前提下更换材质，强调这不是重新生成一张图，而是给同一设计换一套物理逻辑。
- 堪萨斯大学数学家在 24 小时内驳回 OpenAI 号称攻破 Connes 刚性猜想的证明：她逐行核对 3.7 万行 Lean 4 代码，发现构造的一个群不满足前提条件。
- OpenAI 在纽约哈德逊河谷为内容创作者办的高端"夏令营"引发争议：每晚房费超 2000 美元、活动主打采蜜绘画等田园项目，多位网红事后删帖。
- MarkTechPost 详解基于英伟达 SkillSpector 与 LangGraph 的智能体技能安全审计流水线，可在部署前检出 shell 注入、凭据窃取与 MCP 攻击，并输出 SARIF 报告卡关 CI。
- 端侧物理 AI 公司联汇科技完成数亿元融资，前海母基金领投、杭州政府产业基金等跟投；其 Homer AI 已服务近 10 万视障用户。
- Y Combinator 以 MIT 协议开源多人协作智能体框架 QM，可在 Slack 与网页运行，为每位成员和房间提供隔离的记忆、文件、权限与沙箱环境。
- MiniMax 反驳"H3 视频模型在部分地区不能合法使用"的说法，称该模型可获授权在美国、欧盟、英国与韩国部署。
- 一项针对 414 台公网 MCP 服务器的动态审计发现 68 个可上报漏洞，91.8% 未启用 OAuth 认证，另有 687 个工具实例可无限制执行 shell 命令。

## 1. 腾讯混元发布 Hy ASR 3.0 preview，元宝已首发上线

腾讯混元新一代语音识别模型上线，普通话、英语、粤语词错率均约 3%，已在腾讯云开放 API，元宝端免费可用。

腾讯混元团队 8 月 4 日发布新一代语音识别模型 Hy ASR 3.0 preview，其定位不是传统意义上的声学识别管线，而是把语音识别直接架在大模型的语言能力之上。

### 发布了什么

按混元的说法，Hy ASR 3.0 preview 复用了自家 Hy3 基座模型的语言理解能力，用它去消解纯声学解码解决不了的歧义——同音词、专有名词、行业术语，以及只有结合前几句话才能判断的表述。腾讯把这一变化概括为：从「逐字转写」走向「理解上下文、判断场景、一次给出结果」。

公开测试集上，团队给出的词错率为普通话 3.34%、英语 2.62%、粤语 3.12%。在内部评测中，混元称该模型在通用识别、方言识别、上下文理解和复杂声学场景鲁棒性四个维度上，词错率均低于对比系统。粤语及更广泛的方言覆盖是这次重点强调的方向，而这恰恰是中文语音产品长期以来的薄弱环节。

该模型走的是商业服务路线，并未开源权重。目前已在腾讯云官网开放 API，面向智能客服、语音搜索、内容理解等场景；腾讯自家的元宝已首发接入，用户可免费体验方言识别、结合上下文纠错以及嘈杂环境下的稳定转写。

### 为什么重要

语音识别正在悄悄变成语音智能体的关键底座：智能体的工具调用可靠性上限，取决于它拿到的那份转写文本——一个听错的订单号或地址，会顺着整条链路一路错到底。把识别过程交给大模型的语言先验来兜底，腾讯下的注和阿里 Qwen ASR 系列、xAI 语音栈近期的选择是同一个：转写精度的瓶颈已经从声学转到了语义。

发布节奏同样值得注意。腾讯一边把模型免费塞进元宝，一边在云上按量计费开放 API——这是国内厂商拉开发者的惯用双轨打法。而粤语、方言的词错率已接近普通话水平，也让腾讯在香港与东南亚市场更有底气：在那些地方，多语言与语码混用是常态，而不是长尾特例。

**原始信源**

- [Tencent Hunyuan on X: Hy ASR 3.0 preview drops today](https://x.com/TencentHunyuan/status/2084579829303615497)
- [腾讯混元Hy ASR 3.0 preview：让语音识别理解上下文 — 量子位](https://www.qbitai.com/2026/08/465973.html)
- [腾讯混元发布语音识别模型 Hy ASR 3.0 preview，元宝已首发上线 — 新浪科技](https://finance.sina.com.cn/tech/digi/2026-08-04/doc-inimcxxc4039738.shtml)

原文链接：[腾讯混元发布 Hy ASR 3.0 preview，元宝已首发上线｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/tencent-hunyuan-hy-asr-3-preview.html)

---

## 2. 通义万相上线实时功能，摄像头画面可即时转风格

万相发布 Real-time 实时功能套件，首个能力 Camera-to-Image 可把手机摄像头实时画面即时转成风格化图像，首发主打二次元。

阿里万相团队 8 月 4 日宣布推出全新的 Real-time 实时功能套件，首发能力名为 Camera-to-Image：打开设备摄像头，眼前的真实画面即时被改写成风格化图像，官方演示展示的是实时转成二次元画风的效果。团队称功能已可直接体验，并给出了产品入口，而非排队等候名单。

### 和以往有什么不同

万相（阿里通义万相生成式视觉产品线的对外名称）此前的交付形态一直是典型的异步流程：提交提示词或参考图，等任务跑完，再取走文件。Camera-to-Image 把这套循环整个翻了过来——用户不再是「构思一个镜头然后等渲染」，而是举起摄像头，让模型变成一层跑在连续输入流上的滤镜。这个形态更接近 Krea、Decart 等团队和少数研究组在做的「交互级延迟生成」，而不是万相更为人熟知的文生视频赛道。

阿里将 Camera-to-Image 描述为 Real-time 套件的第一项能力，意味着同一名目下还会有后续功能。目前官方尚未公布延迟指标、分辨率上限、定价，以及该功能背后调用的是哪一版万相模型，已知信息均来自团队自身的发布内容。

### 为什么重要

实时生成是一条分界线：跨过去，生成式视觉就从「生产工具」变成了「交互界面」。能跑在摄像头帧率上的模型，才能接进直播、流媒体、相机应用、虚拟试穿，最终接进眼镜——这些都是批量生成到不了的场景，而它们的分发权掌握在平台方手里，不在创作工具创业公司手里。阿里恰好是少数同时握有有竞争力的视频模型家族和数亿级消费端入口的公司。

真正的看点在成本。交互式生成意味着按帧付推理费而不是按片付，这会逼出激进的蒸馏和极少的采样步数。如果万相能在这样的算力预算下、在消费级硬件或廉价推理上守住可接受的画质，同一套技术就能反哺其批量视频产品，也会给 AIGC 领域的同行画出一条新的下限。

**原始信源**

- [Alibaba Wan on X: Meet Camera-to-Image, part of our new Real-time feature suite](https://x.com/Alibaba_Wan/status/2084481142661746976)
- [Alibaba Wan on X: Try it now](https://x.com/Alibaba_Wan/status/2084481145115439473)

原文链接：[通义万相上线实时功能，摄像头画面可即时转风格｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/wan-real-time-camera-to-image.html)

## 一句话快讯
- OpenAI 反击苹果商业机密诉讼，公布 iMessage 聊天记录，显示苹果员工在工程师离职后仍多次向其索要内部信息，称问题出在苹果自身的权限管理。（[The Decoder](https://the-decoder.com/openai-fires-back-at-apples-trade-secret-lawsuit-with-chat-logs-showing-apple-employees-kept-texting-their-former-colleague/)）
- Reflex 以 Apache-2.0 协议开源 Python 图表库 XY：Rust 后端加 WebGL2 渲染，从 1 万点到 1 亿点均保持约 0.08 秒渲染与可交互。（[MarkTechPost](https://www.marktechpost.com/2026/08/04/reflex-open-sources-xy/)）
- Recraft 展示 V4.1 的材质替换能力：在保持物体造型不变的前提下更换材质，强调这不是重新生成一张图，而是给同一设计换一套物理逻辑。（[X @recraftai](https://x.com/recraftai/status/2084573222641512717)）
- 堪萨斯大学数学家在 24 小时内驳回 OpenAI 号称攻破 Connes 刚性猜想的证明：她逐行核对 3.7 万行 Lean 4 代码，发现构造的一个群不满足前提条件。（[量子位](https://www.qbitai.com/2026/08/465792.html)）
- OpenAI 在纽约哈德逊河谷为内容创作者办的高端"夏令营"引发争议：每晚房费超 2000 美元、活动主打采蜜绘画等田园项目，多位网红事后删帖。（[量子位](https://www.qbitai.com/2026/08/466032.html)）
- MarkTechPost 详解基于英伟达 SkillSpector 与 LangGraph 的智能体技能安全审计流水线，可在部署前检出 shell 注入、凭据窃取与 MCP 攻击，并输出 SARIF 报告卡关 CI。（[MarkTechPost](https://www.marktechpost.com/2026/08/04/building-an-advanced-ai-skill-security-auditing-pipeline-with-nvidia-skillspector-langgraph-yara-rules-sarif-and-ci-policy-gates/)）
- 端侧物理 AI 公司联汇科技完成数亿元融资，前海母基金领投、杭州政府产业基金等跟投；其 Homer AI 已服务近 10 万视障用户。（[量子位](https://www.qbitai.com/2026/08/465785.html)）
- Y Combinator 以 MIT 协议开源多人协作智能体框架 QM，可在 Slack 与网页运行，为每位成员和房间提供隔离的记忆、文件、权限与沙箱环境。（[MarkTechPost](https://www.marktechpost.com/2026/08/03/y-combinator-open-sources-qm-multiplayer-ai-agent-harness/)）
- MiniMax 反驳"H3 视频模型在部分地区不能合法使用"的说法，称该模型可获授权在美国、欧盟、英国与韩国部署。（[X @MiniMax_AI](https://x.com/MiniMax_AI/status/2084490811652333633)）
- 一项针对 414 台公网 MCP 服务器的动态审计发现 68 个可上报漏洞，91.8% 未启用 OAuth 认证，另有 687 个工具实例可无限制执行 shell 命令。（[arXiv](https://arxiv.org/abs/2608.00150)）
- PixVerse 展示用 PixVerse Canvas 制作的"天台到办公室"连贯镜头，称画面物理表现足够扎实，连手提袋的摆动都符合真实运动规律。（[X @PixVerse_](https://x.com/PixVerse_/status/2084474358144422385)）
- Sakana AI 宣布本月成为日本 AI 机器人协会（AIRoA）正式会员，将在 RSI Lab 框架下与其合作推进世界模型与物理 AI 的研发。（[X @SakanaAILabs](https://x.com/SakanaAILabs/status/2084469966880084396)）
- Together AI 上线 DeepSeek V4 Flash 生产级推理服务，主打终端、代码仓库与全栈编码能力提升，以及面向长时运行智能体的更强工具调用。（[X @togethercompute](https://x.com/togethercompute/status/2084438456890019970)）
- Palantir 二季度营收 19 亿美元、同比增长 93%，利润 11 亿美元；CEO Alex Karp 在股东信中抨击前沿 AI 实验室企图垄断生产资料，称其带有"马克思主义色彩"。（[TechCrunch](https://techcrunch.com/2026/08/03/after-killer-quarter-palantir-ceo-alex-karp-calls-ai-industry-marxist/)）

---

完整日报：[8月4日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-08-04.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。