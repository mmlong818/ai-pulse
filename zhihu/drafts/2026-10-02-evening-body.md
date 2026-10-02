这是「猫叔的AI资讯雷达」10月2日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：AWS开源一款20亿参数决策模型，可在约115毫秒内返回带校准概率的选项结果，面向智能体工作流部署。

## 深度简报目录

- AWS开源Strands Decider 2B，专为智能体决策而生
- DeepSeek推出Harness桌面智能体，支持本地长期任务

## 快讯预览

- Google Research 的 Kauldron 用纯数据配置和字符串组件连接，提供易读的 JAX 训练框架。
- ServiceNow 称，合成数据将 Gemma 在 IT 服务管理智能体任务上的得分提升至 27.18%。
- 不到十人的强化学习初创公司 Halluminate 在与五大 AI 实验室中四家合作后融资 3000 万美元。
- Hugging Face 展示 SILSA，将高分辨率 3D 生成压缩为 384 个滑窗切片潜变量，同时保持拓扑结构。
- 据报道，OpenAI 完成软银 100 亿美元追加投资，使软银累计投入约 646 亿美元。

## 1. AWS开源Strands Decider 2B，专为智能体决策而生

AWS开源一款20亿参数决策模型，可在约115毫秒内返回带校准概率的选项结果，面向智能体工作流部署。

### 专门负责“选答案”的模型

AWS旗下Strands Labs发布了Strands Decider 2B。这是一款面向有限决策的开放权重模型，不以生成对话文本为目标。开发者可以向它提供一段状态信息和若干结构化问题，由模型返回选项、是非判断或评分，并同时给出概率。模型采用Apache 2.0许可，权重、训练数据和训练脚本均已公开，可在CPU、消费级GPU以及苹果芯片设备上本地运行。

Strands Decider 2B以Qwen3.5-2B为基础，移除了传统语言模型的输出头，换成用于比较候选答案的指针头。它不需要逐个生成token，而是直接评估给定选项与输入状态的匹配程度。AWS表示，当前公开版本已经历19轮主要架构迭代。

### 它要进入智能体的“控制层”

这款模型的定位，是嵌入智能体工作流，承担低延迟的判断任务。例如，它可以决定是否调用工具、把客服请求分配给哪个团队、是否拦截请求，或在不确定时转交人工。AWS称，模型在RTX 3090上的本地中位延迟约为115毫秒；在M3 MacBook上处理小任务时约为153毫秒。在JevBench测试中，它在33款同级模型中排名第三；如果排除略高于20亿参数的模型，则排名第一。

它也有明确边界：不能自由写作，无法独立处理开放式复杂问题，也不是通用推理模型的替代品。开发者必须先定义好决策空间，并在真实业务中验证概率是否可靠。

### 为什么值得关注

这次发布为开发者提供了一个许可宽松、可本地部署的智能体决策组件。若这类模型逐渐成为生成模型的固定搭档，智能体架构可能从“一个大模型包办所有工作”，转向由生成、控制和升级处理等多个专用模型协同完成。

**原始信源**

- [Introducing Strands Decider 2B: a small, open source, decision model](https://strandsagents.com/blog/introducing-strands-decider/)
- [AWS Strands Labs Releases Strands Decider 2B](https://www.marktechpost.com/2026/10/01/aws-strands-labs-releases-strands-decider-2b/)

原文链接：[AWS开源Strands Decider 2B，专为智能体决策而生｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/strands-decider-2b-open-model.html)

---

## 2. DeepSeek推出Harness桌面智能体，支持本地长期任务

DeepSeek面向macOS和Windows发布Harness桌面智能体，整合本地文件、编程、后台任务和可扩展插件。

### DeepSeek从聊天产品走向桌面智能体

DeepSeek现已面向macOS和Windows推出Harness桌面应用，将其定位为一个以本地执行为核心的智能体环境，可用于日常办公、编程和研究。它能够访问本地文件、执行后台任务、检查代码仓库，也可以通过代码启动网页界面。DeepSeek称，Harness已在全球进入公开预览阶段，并以开源方式提供。

Harness建立在Cordis架构之上，核心思路是把不同能力封装成可组合的插件。产品目前覆盖文档和表格处理、代码编辑、终端操作以及定时任务等场景，还提供Creator模式，允许用户通过对话生成并安装新插件。DeepSeek展示的示例包括制作番茄钟、分析文件，以及在开发流程中修改代码并完成验证。

### 这不是又一个基础模型发布

Harness的重点不在于推出新的模型权重，而在于成为模型的分发和执行层。它把智能体直接放到用户电脑上，使其能够读取文件、运行命令，并在后台持续处理任务。对于长时间运行的工作，这种方式可能比浏览器聊天机器人更实用；但相应地，错误也可能直接影响本地设备，而不只是造成一次错误回答。

DeepSeek的安全说明建议用户在处理不可信网页内容时，使用权限受限的虚拟机或容器。由于目前仍是预览版，插件和API接口也可能继续变化。用户需要自行管理权限、账号凭据和网络访问范围。

### 为什么值得关注

Harness让DeepSeek进入了智能体运行时这一关键层面。如今的竞争已不只是聊天模型谁更强，还包括谁能让智能体持续工作、调用更多工具，并在本地完成任务。它的开放插件架构有机会吸引开发者，但能否被日常采用，最终取决于DeepSeek能否把本地执行带来的风险控制在可接受范围内。

**原始信源**

- [DeepSeek Harness](https://www.deepseek.com/en/harness/)
- [DeepSeek Harness for desktop](https://www.deepseek.com/en/download/)
- [DeepSeek Harness Safe Use Policy](https://deepseek.com/harness/privacy/)

原文链接：[DeepSeek推出Harness桌面智能体，支持本地长期任务｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/deepseek-harness-desktop-agent.html)

## 一句话快讯
- Google Research 的 Kauldron 用纯数据配置和字符串组件连接，提供易读的 JAX 训练框架。（[MarkTechPost](https://www.marktechpost.com/2026/10/01/a-coding-guide-to-google-researchs-kauldron-configs-that-are-plain-data-components-wired-by-string-and-a-jax-trainer-you-can-read-end-to-end/)）
- ServiceNow 称，合成数据将 Gemma 在 IT 服务管理智能体任务上的得分提升至 27.18%。（[Rundowns AI](https://rundownsai.com/)）
- 不到十人的强化学习初创公司 Halluminate 在与五大 AI 实验室中四家合作后融资 3000 万美元。（[AGI Hunt](https://agihunt.info/en/daily/2026-10-02)）
- Hugging Face 展示 SILSA，将高分辨率 3D 生成压缩为 384 个滑窗切片潜变量，同时保持拓扑结构。（[Hugging Face Papers](https://huggingface.co/papers)）
- 据报道，OpenAI 完成软银 100 亿美元追加投资，使软银累计投入约 646 亿美元。（[AI Pulse](https://aipulsen.com/dag/2026-10-02?lang=en)）

---

完整日报：[10月2日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-10-02.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。