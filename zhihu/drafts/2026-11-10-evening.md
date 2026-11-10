# 猫叔的AI资讯雷达｜11月10日晚报：AlphaProof Code完成Signal加密实现形式化验证

这是「猫叔的AI资讯雷达」11月10日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：谷歌DeepMind称，AlphaProof Code已对Signal协议关键代码完成形式化验证，并向社区开放证明材料。

## 深度简报目录

- AlphaProof Code完成Signal加密实现形式化验证

## 快讯预览

- Meshy展示 Agent Skill，可把粗略草图转成完成度更高的风格化3D角色。
- Airbnb借助 Chronon 将推荐延迟从两天缩短至数秒。
- 蚂蚁灵波开源 LingBot-Touch 通用触觉基础模型，推进机器人感知触感。
- openJiuwen发布 TTSE 经验学习框架，推动智能体持续自我演进。
- 成立四个月后，物原科技 TensorWorld 融资过亿美元，押注物理真实生成世界。
- Otter AI新增跨30多种语言持续跟踪对话的能力。
- 亚马逊称，Strands Decider替代部分 Sonnet 4.6 工作负载后节省了数百万美元。
- 可灵AI以预告片宣布 Kling 4 视频模型新动态，并称旅程即将开始。
- AWS推广 Quick AI助手，强调通过技能与智能体协同完成专业任务。
- Pika称社区贡献者已让 Pika H3 Flex 推理支持 AMD GPU。

## 1. AlphaProof Code完成Signal加密实现形式化验证

谷歌DeepMind称，AlphaProof Code已对Signal协议关键代码完成形式化验证，并向社区开放证明材料。

### 发生了什么

谷歌DeepMind发布AlphaProof Code，一套面向深层形式化验证的智能体框架，并用它验证了Signal即时通信协议底层实现中的关键安全属性。此次对象不是停留在抽象层面的协议描述，而是广泛部署的真实加密代码。研究团队称，这是人工智能首次在如此深度上验证广泛使用的密码协议实现。

这套系统由人工专家与多个AI智能体协同完成，后者由Gemini Carbon驱动。研究人员先把Signal的安全目标转化为Lean形式化规范，再让智能体生成超过600万行Lean证明代码。最终结论并不由模型自行裁定，而是必须通过Lean的机器检查。

为检验系统能否识别真实缺陷，团队还在Signal代码的隔离版本中重新植入两处已修复漏洞。AlphaProof Code均判断对应实现不安全，说明它不只是生成看似合理的证明，而是能够区分正确与错误代码。

### 为什么重要

形式化验证被视为安全关键软件最严格的保障手段，但长期以来成本高、专业门槛高，通常只能覆盖较小的软件组件。AlphaProof Code显示，智能体或许能把定理证明扩展到规模更大的生产代码库。未来，医疗设备、工业控制系统和关键基础设施软件都可能成为受益对象。

当然，这一成果仍有边界。安全规范由人类专家制定并审核，论文验证的也是Signal实现中的特定范围，而非整个应用的所有属性。即便如此，真实协议、机器可检验证明以及开源材料的组合，使它明显超越了普通基准测试演示。

### 猫叔判断

600万行Lean证明很亮眼，但真正昂贵的环节仍是定义“安全”本身；AI能加速证明，却还替不了规范审查。

**原始信源**

- [Introducing AlphaProof Code: a breakthrough in verifying complex software at depth](https://deepmind.google/blog/introducing-alphaproof-code/)
- [Signal Protocol](https://signal.org/docs/)

原文链接：[AlphaProof Code完成Signal加密实现形式化验证｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/alphaproof-code-verifies-signal.html)

## 一句话快讯
- Meshy展示 Agent Skill，可把粗略草图转成完成度更高的风格化3D角色。（[X / MeshyAI](https://x.com/MeshyAI/status/2120101665705529734)）
- Airbnb借助 Chronon 将推荐延迟从两天缩短至数秒。（[InfoQ 中文](https://www.infoq.cn/article/yuRNB72KsEbjGYSkV7FY?utm_source=rss&utm_medium=article)）
- 蚂蚁灵波开源 LingBot-Touch 通用触觉基础模型，推进机器人感知触感。（[量子位](https://www.qbitai.com/2026/11/508996.html)）
- openJiuwen发布 TTSE 经验学习框架，推动智能体持续自我演进。（[量子位](https://www.qbitai.com/2026/11/508998.html)）
- 成立四个月后，物原科技 TensorWorld 融资过亿美元，押注物理真实生成世界。（[量子位](https://www.qbitai.com/2026/11/508991.html)）
- Otter AI新增跨30多种语言持续跟踪对话的能力。（[TechCrunch](https://techcrunch.com/2026/11/09/otter-ai-can-now-follow-conversations-across-30-languages/)）
- 亚马逊称，Strands Decider替代部分 Sonnet 4.6 工作负载后节省了数百万美元。（[Strands Agents](https://strandsagents.com/blog/amazon-saves-millions-replacing-sonnet-with-strands-decider/)）
- 可灵AI以预告片宣布 Kling 4 视频模型新动态，并称旅程即将开始。（[X / Kling AI](https://x.com/Kling_ai/status/2120002095105376400)）
- AWS推广 Quick AI助手，强调通过技能与智能体协同完成专业任务。（[X / AWS](https://x.com/awscloud/status/2120000119676309558)）
- Pika称社区贡献者已让 Pika H3 Flex 推理支持 AMD GPU。（[X / Pika](https://x.com/pika_labs/status/2119983824503456008)）
- Sakana AI宣布签署法国发起的人工智能安全与安保巴黎倡议。（[X / Sakana AI](https://x.com/SakanaAILabs/status/2120081508857598158)）
- Sakana AI 表示，其首席科学顾问接受日经采访，讨论当前大模型局限及发展更广泛能力的必要性。（[Sakana AI](https://x.com/SakanaAILabs/status/2119951821968151012)）
- AWS 推出面向专业工作的 AI 助手 AWS Quick，支持通过技能与智能体协同执行任务。（[AWS Machine Learning](https://aws.amazon.com/blogs/machine-learning/how-skills-and-agents-work-in-aws-quick/)）
- Together Computer 称，在 NVIDIA B200 与 B300 上，其编译器相较部分 InferenceX 配置可实现最高 2.7 倍吞吐。（[Together AI](https://x.com/togethercompute/status/2119948311474077846)）

---

完整日报：[11月10日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-10.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。