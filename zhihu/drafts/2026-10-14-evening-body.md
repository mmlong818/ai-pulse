这是「猫叔的AI资讯雷达」10月14日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：谷歌DeepMind与新加坡GovTech发布端侧Gemma模型，在不上传聊天内容的情况下识别本地化诈骗对话。

## 深度简报目录

- 谷歌与新加坡将诈骗识别模型部署到手机端
- Meshy的3D智能体仍处于公开测试阶段

## 快讯预览

- 研究人员称，OpenAI和Google的新AI模型仍可能被诱导生成非自愿裸照。
- Scimplify融资2500万美元，利用AI挑战中国在关键材料供应链中的主导地位。
- Adobe借助Prometheus查明一块GPU连续空转11天的原因。
- SolarWinds推出Avior，将AI代理与确定性执行结合，用于企业IT运维。
- Recraft展示Recraft V4.1生成的视觉作品，涵盖冰湖、野生动物和电影感景观。
- 阶跃星辰发布首款原生智能体手机STEPX Neo，先面向创客和早期用户。
- Liquid AI发布LFM2.5-24B-A2B，采用20亿激活参数的混合专家架构，面向端侧代理。
- 无问芯穹完成高密度大容量1T4R 1Gb RRAM芯片流片，并称其为国际首款。

## 1. 谷歌与新加坡将诈骗识别模型部署到手机端

谷歌DeepMind与新加坡GovTech发布端侧Gemma模型，在不上传聊天内容的情况下识别本地化诈骗对话。

### 把反诈骗能力放进手机

谷歌DeepMind与新加坡政府科技局推出一套端侧人工智能系统，用于在用户转账或泄露凭据前识别诈骗对话。双方瞄准的是新加坡日益严重的社会工程诈骗：诈骗案件已占当地报案总数的一半以上，自2019年以来造成的损失超过40亿新加坡元。

系统采用两阶段流程。第一阶段由轻量分类器快速筛查收到的信息，发现可疑内容后，再交给经过本地诈骗语料微调的Gemma模型进行更大范围的上下文分析。模型重点识别冒充银行、政府机构和本地知名人物等操纵手法。一旦判断风险较高，手机会直接向用户发出警告。

### 为什么端侧架构值得关注

模型面向普通智能手机运行，不依赖持续的云端扫描。在端到端加密消息环境中，平台往往无法在服务器侧读取聊天内容；端侧分析既能缩短响应时间，也能减少敏感数据离开设备的机会。

据介绍，模型训练在GovTech管理的云环境中完成，使用的是匿名化诈骗报告和情报数据，不包含公民私人信息。合作方还通过合成对话和本地诈骗样本进行压力测试。该项目在新加坡国际网络安全周期间公布，被定位为政府、平台与模型供应商协作保护用户的示范。

### 为什么重要

这不只是一个新的诈骗分类器，而是在验证小型专用模型能否成为消费设备内置的安全层。它仍面临误报、电量消耗、语言覆盖和更新权归属等问题。若这些限制能够解决，端侧模型有望在不削弱端到端隐私的前提下，为即时通信增加一层防护。

**原始信源**

- [On-Device AI Against Scams: Google DeepMind & MDDI](https://deepmind.google/blog/on-device-ai-scam-detection-mddi/)
- [Google DeepMind and Singapore Government announce new AI tool to protect citizens against scams](https://deepmind.google/blog/on-device-ai-scam-detection-mddi/)

原文链接：[谷歌与新加坡将诈骗识别模型部署到手机端｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/google-singapore-on-device-scam-ai.html)

---

## 2. Meshy的3D智能体仍处于公开测试阶段

Meshy的对话式3D Agent目前仍面向Pro及以上用户进行公开测试，整合创意生成、建模与导出流程。

### 从一句话走到可用资产

Meshy的3D Agent目前仍处于公开测试阶段，面向Meshy Pro及以上用户开放。该产品试图整合过去需要多个软件完成的流程：提出创意、生成视觉参考、制作三维模型、持续修改，最后导出到打印或游戏开发工具中。

用户可以用自然语言，也可以上传照片或草图。智能体能够先提出创作方向，再批量生成概念图，把选中的方案转成三维模型，并通过对话继续调整。Meshy称，生成结果支持FBX、OBJ、GLB、USDZ、STL、BLEND、3MF和DXF等格式，覆盖游戏引擎、数字内容工具和3D打印场景。

### 它与普通文生3D有什么区别

真正值得关注的是产品边界发生了变化。早期的生成式3D工具往往只负责一次性生成一个资产，而Meshy的智能体试图连续协调多个步骤，并在步骤之间保留上下文。这使它更接近面向创作者的专业助手，而不是挂在模型前面的提示词输入框。

官方展示的应用范围包括独立游戏、产品概念、可打印物体和批量资产制作。同一套流程还可以从参考图中识别多个对象，并将它们拆分成独立模型，减少小型创作团队在前期整理素材时的手工工作。

### 仍待验证的地方

Meshy官方资料称，面向更多用户的免费试用正在筹备，但该产品目前尚未全面开放。当前测试阶段的真正考验，是对话式编排能否提升生产效率，而不只是让演示更顺滑。模型拓扑、材质准确度、结果稳定性和商业授权，都会影响它进入真实项目。Meshy最重要的主张并不是“能生成模型”，而是能把创意直接连接到可交付资产；这个主张最终要靠成品项目验证。

**原始信源**

- [Meshy AI announcement on 3D Agent availability](https://x.com/MeshyAI/status/2110285892749541475)
- [Meshy 3D Agent: Conversational 3D Creation](https://www.meshy.ai/features/3d-agent)

原文链接：[Meshy的3D智能体仍处于公开测试阶段｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/meshy-3d-agent-leaves-beta.html)

## 一句话快讯
- 研究人员称，OpenAI和Google的新AI模型仍可能被诱导生成非自愿裸照。（[Ars Technica](https://arstechnica.com/tech-policy/2026/10/openai-google-pushing-new-ai-models-easily-tricked-into-making-nudes-researchers-say/)）
- Scimplify融资2500万美元，利用AI挑战中国在关键材料供应链中的主导地位。（[TechCrunch](https://techcrunch.com/2026/10/14/scimplify-raises-25m-to-challenge-chinas-grip-on-critical-materials-with-ai/)）
- Adobe借助Prometheus查明一块GPU连续空转11天的原因。（[InfoQ中文](https://www.infoq.cn/article/AO4MbiBaYqwwCubevkpD)）
- SolarWinds推出Avior，将AI代理与确定性执行结合，用于企业IT运维。（[SiliconANGLE](https://siliconangle.com/2026/10/14/solarwinds-avior-pairs-ai-agents-with-deterministic-execution-for-enterprise-it/)）
- Recraft展示Recraft V4.1生成的视觉作品，涵盖冰湖、野生动物和电影感景观。（[X / Recraft](https://x.com/recraftai/status/2110288363706290329)）
- 阶跃星辰发布首款原生智能体手机STEPX Neo，先面向创客和早期用户。（[量子位](https://www.qbitai.com/2026/10/503244.html)）
- Liquid AI发布LFM2.5-24B-A2B，采用20亿激活参数的混合专家架构，面向端侧代理。（[MarkTechPost](https://www.marktechpost.com/2026/10/14/liquid-ai-lfm2-5-24b-a2b/)）
- 无问芯穹完成高密度大容量1T4R 1Gb RRAM芯片流片，并称其为国际首款。（[量子位](https://www.qbitai.com/2026/10/503198.html)）

---

完整日报：[10月14日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-10-14.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。