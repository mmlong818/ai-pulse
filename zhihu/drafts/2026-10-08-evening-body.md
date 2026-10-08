这是「猫叔的AI资讯雷达」10月8日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：谷歌云发布 Gemini Agent，试图用一个统一入口协调知识工作、内容创作、编程及专用子智能体。

## 深度简报目录

- 谷歌云推出 Gemini Agent，瞄准企业通用工作智能体
- 阶跃星辰开放 Step 5 Preview，接入多款编程工具
- 韩国多家银行遭袭，调查指向AI渗透工具
- Perplexity发布支持图文检索的新嵌入模型

## 快讯预览

- 英伟达介绍了H-Company如何利用NVIDIA Dynamo优化计算机使用智能体的视觉语言模型服务。
- 联想开启搭载英伟达RTX Spark N1X超级芯片的Yoga Pro 15笔记本盲约。
- Mooncake被介绍为支撑高性能强化学习系统中轨迹数据与模型权重同步的基础设施。
- Perplexity工程师因DynamoDB成本和性能不理想，耗时两个月用Rust自研替代系统。
- 一名少年在AI导航建议下登山遇险，最终由直升机实施救援。
- Lovart对比展示称，Nano Banana 2.1的人像光照和皮肤纹理优于GPT Images 2.5。
- Manus重启北京办公室并大规模招聘，释放出重新加码中国业务的信号。
- Sakana AI开放Insider通讯注册，内容涵盖产品发布、研究更新、活动和周边。
- 《麻省理工科技评论》认为，近期机器人AI突破短期内不太可能改变日常生活。
- Architect推出Liquid Inference，以实时竞价方式动态分配大模型推理容量。

## 1. 谷歌云推出 Gemini Agent，瞄准企业通用工作智能体

谷歌云发布 Gemini Agent，试图用一个统一入口协调知识工作、内容创作、编程及专用子智能体。

谷歌云在 10 月 8 日举行的 Gemini at Work 活动上发布 Gemini Agent，将其定位为面向企业工作的通用智能体。

### 从聊天助手转向任务代理

谷歌称，用户可以直接给 Gemini Agent 设定目标，而不必逐步描述操作流程。它能够回答问题、处理知识工作、生成内容，并编写或运行代码；产品也将连接 Gemini Enterprise、Workspace 以及第三方服务。

谷歌展示的案例已经超出传统问答。比如，经理收到要求制作项目进展演示文稿的邮件后，可以把任务交给 Gemini，由系统结合工作区上下文整理材料。若用户要求安排一次会议，智能体还可以根据聊天空间成员、历史邮件和日历信息推断参与者，并启动协调流程。

谷歌同时强调 Gemini Agent 能调用专用子智能体。这意味着它试图成为企业工具和模型之上的编排层，而不只是又一个聊天窗口。

### 为什么重要

这次发布的战略意义在于，谷歌希望 Gemini 成为员工访问企业数据、软件和自动化流程的统一入口。它将直接挑战微软 Copilot、Salesforce 智能体平台，以及越来越多企业级工作流编排产品。

真正的难点仍在执行。通用智能体必须准确理解公司语境、遵守权限边界，并在面对模糊指令时避免执行高成本或不可逆操作。谷歌拥有 Workspace 与云基础设施这一优势，但更大的行动权限也意味着更大的失误面。若 Gemini Agent 能稳定运行，企业 AI 的竞争重点将从单个助手的能力，转向谁能安全协调整条工作流程。

**原始信源**

- [Google Cloud Press Corner — Gemini at Work 2026](https://www.googlecloudpresscorner.com/gemini-at-work-2026)
- [Google Cloud announces Gemini agent as universal AI agent for work](https://9to5google.com/2026/10/08/gemini-agent-google-cloud/)
- [谷歌云发布 Gemini Agent](https://www.ithome.com/1/010/706.htm)

原文链接：[谷歌云推出 Gemini Agent，瞄准企业通用工作智能体｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/google-gemini-agent-universal-work.html)

---

## 2. 阶跃星辰开放 Step 5 Preview，接入多款编程工具

阶跃星辰宣布 Step 5 Preview 已通过 OpenRouter 及多款编程工具上线，并向部分开发者提供一周免费使用。

中国 AI 公司阶跃星辰宣布，Step 5 Preview 已通过 OpenRouter 接入 OpenCode、Cline、Nous Research 和 Kilo Code 等编程工具，并为参与平台提供为期一周的免费访问。

### 从发布模型到进入开发现场

这次更新的关键不只是模型可用，而是它直接进入开发者已经使用的工具。阶跃星辰没有把预览版限制在独立聊天产品或自有界面中，而是借助模型聚合平台和编程智能体生态扩大分发。

公司同步发布了模型概览、基准测试信息、技术规格和 API 文档，并将 Step 5 Preview 面向智能体及编程场景进行介绍。不过，目前公开信息还不足以证明它在独立评测中处于领先位置。

通过 OpenRouter，开发者可以更方便地把 Step 5 Preview 与其他供应商的模型放在同一工作流中比较。对于希望拓展国际开发者市场的中国实验室而言，这种接入方式很重要，因为延迟、价格、兼容性和稳定可用性，往往和基准分数一样决定采用率。

### 为什么重要

阶跃星辰选择开发者基础设施作为发布渠道，说明模型的可获得性与集成能力正在成为国际化策略的一部分。模型竞争也正在从公开演示转向真实编程工具和智能体编排层：只有进入这些工作流，实验室才能更快获得实际使用反馈。

当然，Step 5 Preview 仍不是已确认的开放权重发布，免费体验期也不能代表长期价格。阶跃星辰还需要证明模型的可靠性、文档质量以及合作平台之外的持续供应能力。但从开发者工作流切入，确实比单纯发布一份模型公告更有机会形成真实使用量。

**原始信源**

- [StepFun — Step 5 Preview now live on OpenRouter and coding tools](https://x.com/StepFun_ai/status/2108182763002278158)
- [StepFun — Step 5 Preview overview and technical documentation](https://x.com/StepFun_ai/status/2108182766877843714)

原文链接：[阶跃星辰开放 Step 5 Preview，接入多款编程工具｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/stepfun-step-5-preview-openrouter.html)

---

## 3. 韩国多家银行遭袭，调查指向AI渗透工具

CrowdStrike称，一名攻击者将开源AI渗透工具ARTEX与多款大模型结合，入侵韩国多家金融机构。

CrowdStrike将一轮针对韩国金融机构的疑似攻击活动，与开源AI辅助渗透测试工具ARTEX及多款大语言模型联系起来。该公司称，相关活动发生在9月底至10月初，调查结果则在本期时间窗内公布。

据CrowdStrike分析，攻击者把ARTEX与DeepSeek V4.1-Flash、GLM-5.3和Grok 4.6结合使用，并通过Claude Code开展操作。研究人员在暴露的攻击基础设施中发现了工具配置文件、模型会话记录和记忆文件。AI可能被用于侦察、漏洞发现、攻击路径规划及脚本执行，而不是只承担某一个孤立环节。

韩国多家银行此前已报告外围系统遭入侵，包括面向贷款经纪人的查询服务和员工移动支持系统。新韩银行称约2.5万名客户受到影响，其他机构报告的泄露规模较小。目前，调查人员尚未确认攻击者身份、受影响总人数，也未证明这轮事件全部由同一操作者实施。

这起事件的重要性，不在于证明AI能够独立攻破银行，而在于它展示了一种现实可行的攻击流程：单个操作者可以把专用工具与通用模型串联起来，同时推进多个目标。事件也暴露出一个防守盲区——面向外部的业务支持系统，往往比核心银行系统更薄弱。归因仍未定案，但金融机构已经获得了一份值得立即演练的攻击样本。

**原始信源**

- [Chinese-speaking hacker possibly linked to AI-driven attacks on S. Korean banks: report](https://en.yna.co.kr/view/AEN20261008002200320?section=national%2Fnational)
- [CrowdStrike finds AI-driven hacks on South Korean banks](https://securitybrief.asia/story/crowdstrike-finds-ai-driven-hacks-on-south-korean-banks)
- [AI-powered attacks on banks expose technological lag in Korea's financial cyber defenses](https://www.koreatimes.co.kr/business/banking-finance/20261007/explainer-how-ai-emerged-in-koreas-bank-hacking-crisis)

原文链接：[韩国多家银行遭袭，调查指向AI渗透工具｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/ai-agents-south-korean-bank-breaches.html)

---

## 4. Perplexity发布支持图文检索的新嵌入模型

Perplexity推出0.6B和9B两款迟交互嵌入模型，让文本、图像与渲染PDF页面进入同一检索空间。

Perplexity发布pplx-embed-v2-late嵌入模型系列，包含两款迟交互模型，目标是在统一表示空间中检索文本、图像和渲染后的文档页面。该产品承接公司此前推出的上下文嵌入模型，进一步把竞争推进到搜索和智能体系统背后的检索层。

与把整篇文档或查询压缩成单一向量的做法不同，这两款模型会为输入保留多个向量。这样一来，查询中的不同部分可以分别匹配页面中的不同区域，从而保留单向量检索容易丢失的局部细节。Perplexity还表示，模型支持文本到图像检索，包括直接搜索渲染后的PDF页面，而不必先把每一页完整转换成可读取文本。

此次发布包含一款6亿参数的查询编码器和一款90亿参数的索引模型。Perplexity的设计明显将两者分工：较小模型负责查询侧调用，较大模型用于建立搜索索引。对实际部署而言，这意味着查询端可以保持较轻，而更昂贵的计算主要发生在离线或索引阶段。

这不是一场显眼的通用大模型发布，却击中了AI搜索和智能体能否找到可靠证据的基础环节。多模态检索有望改善图表、页面布局和图像密集报告的访问效果，但最终收益仍取决于索引成本、延迟、授权和独立评测。它释放出的战略信号很明确：模型竞争正深入检索栈，而更好的表示方式会影响后续每一次生成调用。

**原始信源**

- [Multimodal embeddings beyond a single vector](https://www.perplexity.ai/sr-Cyrl-ME/hub/blog/multimodal-embeddings-beyond-a-single-vector)
- [We're releasing pplx-embed-v2-late](https://community.perplexity.ai/c/announcements/9)
- [Perplexity AI Releases pplx-embed-v2-late](https://www.marktechpost.com/2026/10/07/perplexity-ai-releases-pplx-embed-v2-late-a-0-6b-edge-model-and-a-9b-model-scoring-92-4-on-madqa/)

原文链接：[Perplexity发布支持图文检索的新嵌入模型｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/perplexity-multimodal-embedding-models.html)

## 一句话快讯
- 英伟达介绍了H-Company如何利用NVIDIA Dynamo优化计算机使用智能体的视觉语言模型服务。（[X / NVIDIA AI](https://x.com/NVIDIAAI/status/2108150471089426730)）
- 联想开启搭载英伟达RTX Spark N1X超级芯片的Yoga Pro 15笔记本盲约。（[量子位](https://www.qbitai.com/2026/10/502020.html)）
- Mooncake被介绍为支撑高性能强化学习系统中轨迹数据与模型权重同步的基础设施。（[InfoQ中文](https://www.infoq.cn/article/akexM07HzNrRJzmjYNml?utm_source=rss&utm_medium=article)）
- Perplexity工程师因DynamoDB成本和性能不理想，耗时两个月用Rust自研替代系统。（[InfoQ中文](https://www.infoq.cn/article/4AMw7Bt3UHqw48qmQTpS?utm_source=rss&utm_medium=article)）
- 一名少年在AI导航建议下登山遇险，最终由直升机实施救援。（[The Decoder](https://the-decoder.com/teens-ai-guided-mountain-hike-ends-with-a-helicopter-rescue-and-a-lesson-in-common-sense/)）
- Lovart对比展示称，Nano Banana 2.1的人像光照和皮肤纹理优于GPT Images 2.5。（[X](https://x.com/lovart_ai/status/2108130028882165910)）
- Manus重启北京办公室并大规模招聘，释放出重新加码中国业务的信号。（[量子位](https://www.qbitai.com/2026/10/502009.html)）
- Sakana AI开放Insider通讯注册，内容涵盖产品发布、研究更新、活动和周边。（[X / Sakana AI](https://x.com/SakanaAILabs/status/2108123416079544619)）
- 《麻省理工科技评论》认为，近期机器人AI突破短期内不太可能改变日常生活。（[MIT Technology Review](https://www.technologyreview.com/2026/10/08/1145923/ai-breakthroughs-in-robotics-wont-change-your-life-any-time-soon/)）
- Architect推出Liquid Inference，以实时竞价方式动态分配大模型推理容量。（[MarkTechPost](https://www.marktechpost.com/2026/10/08/architect-launches-liquid-inference-a-real-time-auction-for-llm-inference/)）
- Dreamina在电影发源地拉西约塔举办活动，邀请100位创作者展示100种电影想象。（[X](https://x.com/dreamina_ai/status/2108114711086854301)）
- 《麻省理工科技评论》探讨了如何为自主工业AI建立更安全的部署路径。（[MIT Technology Review](https://www.technologyreview.com/2026/10/08/1144020/building-a-safer-path-to-autonomous-industrial-ai/)）
- Tripo展示了生成3D资产并导入Quest 3、通过手部追踪进行交互的工作流。（[X](https://x.com/tripoai/status/2108101078084706616)）
- MiniMax称H3生成的动作效果两个月后仍受欢迎，并预告后续更新。（[X](https://x.com/MiniMax_AI/status/2108066697353801907)）

---

完整日报：[10月8日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-10-08.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。