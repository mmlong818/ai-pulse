这是「猫叔的AI资讯雷达」11月6日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：中国芯片公司墨芯完成近十亿元C+轮融资，试图把DeepSeek带动的稀疏计算从模型技巧变成可规模部署的推理硬件。

## 深度简报目录

- 墨芯近十亿元融资，稀疏推理芯片走向商业化
- Physicl获1000万美元，押注机器人可用的数字世界

## 快讯预览

- 可灵发布由 Kling 4.0 驱动的赛车短片《Redline》，测试高难度运动影像生成。
- Genspark 展示 CRUSH，称其 Media Studio 仅凭剧本和视觉设定便生成完整视频。
- 开源平台 LoopForge 面向由 Coding Agent 驱动的自进化研发流程。
- AI 短剧工作室瞄准双十一电商，通过低成本制作和自动化剧本分镜流程争夺销售转化。
- Replit 称，三井住友金融租赁把原需六人六个月的开发流程缩短至一人一周。
- Thinking Machines 发布 Inkling 2 Small，采用 5940 亿参数 MoE 架构，每次激活 170 亿参数。
- GitHub 推出 Copilot Verified Proficiency，持续评估开发者在真实工作中展现的 Copilot 能力。
- Artificial Analysis 发布 Endpoint Accuracy Index 1.1，扩大对 GLM-5.3 Flash 与 Muse Spark Open 的覆盖。
- 英伟达介绍 Visa Trusted Agent Protocol，用于证明购物智能体获得用户授权。
- Krea 上线 Gemini Omni 1.2 Flash，支持 15 秒视频、更强电影化控制和多轮编辑。

## 1. 墨芯近十亿元融资，稀疏推理芯片走向商业化

中国芯片公司墨芯完成近十亿元C+轮融资，试图把DeepSeek带动的稀疏计算从模型技巧变成可规模部署的推理硬件。

### 融资与技术路线

据量子位报道，国产AI芯片公司墨芯人工智能完成近十亿元人民币C+轮融资，距离上一轮近十亿元融资仅过去约五个月。公司还称，第三季度营收实现数倍增长。

墨芯布局的是覆盖算法、编译器和加速卡的全栈稀疏推理平台。其核心方案同时利用权重稀疏和激活稀疏，尽量跳过对当前输出贡献有限的参数与计算路径。随着混合专家模型在DeepSeek之后成为效率竞争的重要方向，这类条件计算也从模型结构问题，逐渐变成芯片设计问题。

### 从跑分走向部署

墨芯称，其产品已连续三届在MLPerf Inference多个任务类别中取得领先；在遥感影像场景中，公司披露的结果包括推理吞吐提升2.88倍、模型压缩7.64倍。这些数字目前主要来自公司口径，尚不能视为独立验证，但它们体现出一个更值得关注的变化：稀疏加速正在被包装成从模型到硬件的完整商业方案，而不只是软件层优化。

公司已参与上海算力项目，并计划推出新一代SP200板卡和SECA软件栈。接下来真正需要观察的是，这些收益能否离开特定测试和遥感场景，在更多模型与客户环境中稳定复现。

### 为什么重要

这轮融资的意义，在于中国加速器公司正获得足够资本，把稀疏计算从研究热点推进到产品化阶段。若墨芯能把稀疏带来的效率转化为可预测的推理成本优势，国产芯片替代路线将获得更具体的抓手；若收益高度依赖单一工作负载，这笔融资仍只是一场架构押注，而非新品类已经成立的证明。

**猫叔判断：**近十亿元续融资值得重视，但墨芯能否走出遥感场景、让SP200稳定出货，才决定这不是又一轮跑分叙事。

**原始信源**

- [DeepSeek带火稀疏计算，国产芯片公司加速突围：这家公司又融近10亿](https://www.qbitai.com/2026/11/508155.html)
- [Moxin raises nearly 1 billion yuan in C+ financing](https://aimap.page/zh-hans/news/2026-11-06/moxin-raises-1b-c-round-in-sparse-inference-chips/)

原文链接：[墨芯近十亿元融资，稀疏推理芯片走向商业化｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/moxin-raises-sparse-inference.html)

---

## 2. Physicl获1000万美元，押注机器人可用的数字世界

Physicl完成1000万美元融资并推出Studio，试图用具备真实物理属性的合成环境，补上通用机器人训练的数据缺口。

### 押注训练环境

Physicl宣布完成1000万美元融资，由Inovia Capital领投，US Venture Partners等参与；公司同时推出首款应用Studio，用于构建物理智能训练环境。它的方向不是单纯生成看起来逼真的三维画面，而是制作能够帮助机器人学习动作的合成数据、世界模型和策略训练工具。

这一区别很关键。传统三维资产库通常提供几何形状和外观，却未必包含决定机器人能否抓取、推动、碰撞或绕行的物理属性。Physicl的产品定位集中在物理准确、可直接进入仿真的场景，以及用于训练机器人策略的真实标注和基准数据。

### 补上长尾场景

公司认为，物理智能系统最容易在罕见条件下失败：不常见的房间布局、物体摆放、光照变化、杂乱环境，以及难以在真实世界安全采集的交互。合成环境可以批量生成这些边缘案例，但前提是材质、碰撞和物体行为足够接近现实，否则机器人只是在仿真里学会了错误规律。

Studio目前仍处于私测阶段，因此这笔融资不能证明其生成的世界已经提升真实机器人的成功率。Physicl公开材料更多展示了产品方向，尚缺少可由外部复现的大规模落地结果。客户最终关心的也不是画面有多逼真，而是仿真经验能否减少昂贵的实体数据采集，并缩短机器人策略迭代周期。

### 为什么重要

这轮融资值得关注，是因为它押注了人形机器人热潮中容易被忽略的基础设施层。模型能力再强，也无法长期弥补交互数据不足。若Physicl能把具备物理属性的资产、合成长尾案例和真实硬件迁移效果连接起来，它可能成为多家机器人公司的底层数据供应商。现阶段，1000万美元只能说明资本认可这一方向，不能说明仿真到现实的鸿沟已经被填平。

**猫叔判断：**Physicl做的是材质、碰撞和真值这些笨功夫，但Studio仍在私测，真实机器人迁移效果还没有交卷。

**原始信源**

- [Physicl raises $10M and launches Studio](https://techcrunch.com/2026/11/06/physicl-raises-10m-to-make-the-digital-world-real-enough-for-robots/)
- [Physicl Insights: Physical AI training data](https://www.physicl.ai/insights)

原文链接：[Physicl获1000万美元，押注机器人可用的数字世界｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/physicl-raises-robot-worlds.html)

## 一句话快讯
- 可灵发布由 Kling 4.0 驱动的赛车短片《Redline》，测试高难度运动影像生成。（[X / Kling AI](https://x.com/Kling_ai/status/2118656417255321616)）
- Genspark 展示 CRUSH，称其 Media Studio 仅凭剧本和视觉设定便生成完整视频。（[X / Genspark](https://x.com/genspark_ai/status/2118627703473729818)）
- 开源平台 LoopForge 面向由 Coding Agent 驱动的自进化研发流程。（[InfoQ 中文](https://www.infoq.cn/article/QGaIWSgd9uwx2WGw0yFv)）
- AI 短剧工作室瞄准双十一电商，通过低成本制作和自动化剧本分镜流程争夺销售转化。（[量子位](https://www.qbitai.com/2026/11/508118.html)）
- Replit 称，三井住友金融租赁把原需六人六个月的开发流程缩短至一人一周。（[X / Replit](https://x.com/Replit/status/2118584165423796415)）
- Thinking Machines 发布 Inkling 2 Small，采用 5940 亿参数 MoE 架构，每次激活 170 亿参数。（[MarkTechPost](https://www.marktechpost.com/2026/11/05/thinking-machines-inkling-2-small-release/)）
- GitHub 推出 Copilot Verified Proficiency，持续评估开发者在真实工作中展现的 Copilot 能力。（[X / GitHub](https://x.com/github/status/2118545162670383517)）
- Artificial Analysis 发布 Endpoint Accuracy Index 1.1，扩大对 GLM-5.3 Flash 与 Muse Spark Open 的覆盖。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2118534967387185476)）
- 英伟达介绍 Visa Trusted Agent Protocol，用于证明购物智能体获得用户授权。（[X / NVIDIA AI](https://x.com/NVIDIAAI/status/2118512045201211620)）
- Krea 上线 Gemini Omni 1.2 Flash，支持 15 秒视频、更强电影化控制和多轮编辑。（[X / Krea](https://x.com/krea_ai/status/2118508716261810321)）

---

完整日报：[11月6日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-06.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。