# 猫叔的AI资讯雷达｜11月21日晚报：DeepSeek V1作者公布开源本地智能体Linger

这是「猫叔的AI资讯雷达」11月21日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：Tony Zhang推出Linger，把智能体从云端和手机应用拉回个人电脑，主打本地记忆、桌面操作与多模型接入。

## 深度简报目录

- DeepSeek V1作者公布开源本地智能体Linger

## 快讯预览

- InfoQ综述认为，可靠智能体仍依赖规划、记忆、工具调用、评估与治理协同。
- Meshy展示N1 Texture工作流，可一键清理3D服装投射纹理的接缝。
- TaoDesign介绍了将设计资产转化为持续进化智能体能力的知识工程流程。
- Entire提出面向编码智能体重构Git协作方式的Git Forge概念。
- 据报道，OpenAI GPT-6.2 Astra在16项具身智能任务中的成功率较GPT-6 Astra翻倍。
- 腾讯混元团队成员在Reddit表示，更小型的Hy模型已进入路线图。
- Latent Space报道，黎曼猜想被两次独立声称在AI协助下解决。
- Meshy公布Z-Axis Awards评审阵容，成员包括3D艺术家、研究者和产业人士。
- Meshy表示，多家品牌将通过奖金、额度和工具支持Z-Axis Awards的3D创作者。
- Together AI建议，开源模型未通过评测时，应先调整提示词、推理设置、上下文和测试框架。

## 1. DeepSeek V1作者公布开源本地智能体Linger

Tony Zhang推出Linger，把智能体从云端和手机应用拉回个人电脑，主打本地记忆、桌面操作与多模型接入。

### 发生了什么

前DeepSeek V1作者、DeepSeek-VL项目负责人张博（Tony Zhang）公布了创业项目Linger。这是一款开源个人智能体，核心路线不是优先做手机应用，而是直接运行在用户自己的电脑上。

Linger可以操作现有的浏览器、邮箱和日历，任务卡住时也允许用户随时接管。它并不绑定单一模型，既能接入商业模型，也能连接本地模型。项目方称，配套的本地推理方案可让一块12GB显存的RTX 3060运行1250亿参数的Qwen3.8-Flash-Next，生成速度达到每秒45.5个token；这一说法目前仍需要独立复测。

### 为什么这条路线值得关注

Linger最激进的部分是名为“Another Me”的记忆与编排系统。它会持续整理邮箱、日历、聊天和会议内容，形成保存在本地的知识库。项目还称，系统能够根据用户反馈学习提醒偏好，并在一个会话中协调多个专门智能体。Linger在LoCoMo长期记忆基准上公布了95%的准确率，但测试设置和可复现细节尚不充分。

与把用户上下文留在服务商云端的助手不同，Linger押注的是数据不出本机、成本更可控，以及用户可以直接掌握权限边界。这意味着它要用部署复杂度换取隐私和长期控制权。

### 为什么重要

Linger不是新的前沿模型发布，项目成熟度也还不能仅凭宣传判断：公开代码、可复现实验和长期稳定性数据都仍不可缺少。但这条消息的战略意味很清楚——一位与DeepSeek模型时代相关的研究者，正在把竞争焦点转向本地智能体基础设施。未来决定产品价值的，可能是记忆、权限和桌面执行能力，而不只是榜单分数。

### Uncle Cat观点

Linger最锋利的卖点是“12GB显存跑125B模型”，但在外部用户复现每秒45.5个token之前，本地智能体优势仍只是漂亮参数，尚未成为事实。

**原始信源**

- [刚刚，DeepSeek V1作者创业项目曝光：开源Agent](https://www.qbitai.com/2026/11/511570.html)
- [刚刚，DeepSeek V1作者创业项目曝光开源Agent](https://news.sina.cn/ai/2026-11-21/detail-iniznthe3442583.d.html)

原文链接：[DeepSeek V1作者公布开源本地智能体Linger｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/deepseek-author-linger-local-agent.html)

## 一句话快讯
- InfoQ综述认为，可靠智能体仍依赖规划、记忆、工具调用、评估与治理协同。（[InfoQ中文](https://www.infoq.cn/article/TrWuo2vEZRl2xB2XXZNX)）
- Meshy展示N1 Texture工作流，可一键清理3D服装投射纹理的接缝。（[X @MeshyAI](https://x.com/MeshyAI/status/2124087932751421674)）
- TaoDesign介绍了将设计资产转化为持续进化智能体能力的知识工程流程。（[InfoQ中文](https://www.infoq.cn/article/vhoobUFbLs2hUlTBA4HZ)）
- Entire提出面向编码智能体重构Git协作方式的Git Forge概念。（[InfoQ中文](https://www.infoq.cn/article/6swrOq5xUXwVqrREwJwc)）
- 据报道，OpenAI GPT-6.2 Astra在16项具身智能任务中的成功率较GPT-6 Astra翻倍。（[量子位](https://www.qbitai.com/2026/11/511779.html)）
- 腾讯混元团队成员在Reddit表示，更小型的Hy模型已进入路线图。（[量子位](https://www.qbitai.com/2026/11/511757.html)）
- Latent Space报道，黎曼猜想被两次独立声称在AI协助下解决。（[Latent Space](https://latent.space/p/ainews-riemann-hypothesis-proved-twice-independently/)）
- Meshy公布Z-Axis Awards评审阵容，成员包括3D艺术家、研究者和产业人士。（[X @MeshyAI](https://x.com/MeshyAI/status/2123992402327441607)）
- Meshy表示，多家品牌将通过奖金、额度和工具支持Z-Axis Awards的3D创作者。（[X @MeshyAI](https://x.com/MeshyAI/status/2123992398250594640)）
- Together AI建议，开源模型未通过评测时，应先调整提示词、推理设置、上下文和测试框架。（[X @togethercompute](https://x.com/togethercompute/status/2123989999146213599)）
- Kling表示参加迈阿密Adobe MAX 2026，与全球品牌、代理商和创作者交流AI视频。（[X @Kling_ai](https://x.com/Kling_ai/status/2123974692440523068)）
- Cohere分享了一段逼真的游戏片段，似乎展示AI生成或辅助的互动内容。（[X @cohere](https://x.com/cohere/status/2123953138986356941)）
- AWS Quick新增对话式流程构建、长时工作流、多智能体编排及Meta Ads和Amplitude连接器。（[AWS](https://aws.amazon.com/blogs/machine-learning/new-in-aws-quick-more-capable-flows-an-updated-web-experience-and-agents-that-work-together/)）
- AWS 推出分布式 KV 缓存代理技能，通过跨节点共享可复用状态，降低自托管大模型的延迟与成本。（[AWS Machine Learning](https://aws.amazon.com/blogs/machine-learning/cut-self-hosted-llm-cost-and-latency-with-the-distributed-kv-caching-agent-skill/)）

---

完整日报：[11月21日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-21.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。