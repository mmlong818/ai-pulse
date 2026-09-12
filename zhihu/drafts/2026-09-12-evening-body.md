这是「猫叔的AI资讯雷达」9月12日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：月之暗面将Kimi Code默认模型升级为K2.8 Preview，在不改模型ID的情况下开放百万Token上下文和可调思考强度。

## 深度简报目录

- Kimi K2.8 Preview上线：编程模型支持百万上下文
- Meshy发布Mora 1，转向世界模型方向

## 快讯预览

- 绿联发布iDX6011 Pro AI NAS，搭载酷睿Ultra 7 255H与64GB内存，首发价15999元。
- Google推出可结合销售数据、天气、促销与折扣日程预测未来销量的AI模型。
- 生数科技推出探索递归自我改进的新世界模型项目，尝试让机器人通过经验持续进化。
- 阿里通义宣布Qwen3.8-27B已运行于Cerebras硬件，为开发者提供高速推理。
- OpenAI的GPT-6 Astra据报在FrontierMath Tier 4达到97.6%，该基准几乎被完全刷满。
- 开放Nemotron训练方案在2026年国际数学奥赛取得30/42分，达到金牌线，并公开权重、数据、代码和基准。
- 一项新研究在120条模拟医疗轨迹中，评估智能体面对持续挑战时的韧性与协作表现。
- 扩散模型微调研究发现，LoRA秩4取得最佳DDPM FID，更高秩数增加成本却收益有限。
- 研究人员提出从自然语言自动生成QUBO公式，试图自动化组合优化流程中的关键步骤。
- 研究提出多阶段规则链框架，在提升组合推理能力的同时保留中间决策的可解释性。

## 1. Kimi K2.8 Preview上线：编程模型支持百万上下文

月之暗面将Kimi Code默认模型升级为K2.8 Preview，在不改模型ID的情况下开放百万Token上下文和可调思考强度。

月之暗面已将Kimi K2.8 Preview全面推送至Kimi Code，原有的`kimi-for-coding`模型入口直接完成升级，用户和第三方工具无需修改配置。新版本面向各会员档位开放，最长支持100万Token上下文。

### 把更大的工作区交给编程Agent

官方称，K2.8 Preview的综合表现接近旗舰模型K3，同时比K2.7 Code拥有更高的思考效率。模型新增low、high、max三档思考强度，默认使用max；它还支持图片和视频输入，使Kimi Code不再局限于纯文本代码任务。

这次升级最有策略性的地方，是没有更换模型ID。月之暗面没有要求开发者迁移到新接口，而是直接把新版模型放到既有入口之后。现有命令行、编辑器集成和自动化流程因此可以无感获得更新，迁移成本也被压到最低。

百万Token上下文是最醒目的能力变化。理论上，编程Agent可以一次保留更多源文件、需求文档、日志和历史决策，从而减少反复摘要大型代码仓库的需要，尤其适合跨文件调试和重构。但上下文上限本身并不等于有效利用能力，检索是否准确、长上下文注意力是否稳定，以及延迟和费用如何，仍需实际验证。

### 为什么重要

在亚洲时区新闻相对平静的窗口里，K2.8为月之暗面争夺编程Agent入口提供了一个清晰动作，也缩小了旗舰模型与大众化编程产品之间的距离。真正值得继续观察的是长期仓库任务：只有当模型能从百万Token中找对证据，并连续多步稳定执行时，这个数字才会转化为生产力。

**原始信源**

- [Kimi Code model configuration](https://www.kimi.com/code/docs/en/kimi-code/models.html)
- [Kimi突发K2.8：性能逼近K3，百万上下文全员开放](https://www.qbitai.com/2026/09/487688.html)

原文链接：[Kimi K2.8 Preview上线：编程模型支持百万上下文｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/kimi-k28-preview-million-context.html)

---

## 2. Meshy发布Mora 1，转向世界模型方向

以3D资产生成起家的Meshy公布Mora 1项目，开始探索从单个物体生成走向可理解、可交互的完整世界。

以3D资产生成工具闻名的Meshy公布了Mora 1项目，业务方向开始从单个资产生成延伸至世界模型。该项目在亚洲时区活动中亮相，官方将其描述为基于团队对现有世界模型演示观察而选择的另一条路径。

### 从生成物体到构建环境

Meshy过去的核心能力，是把图片和文字提示转换为可使用的3D资产。Mora 1释放出的信号更进一步：它试图处理场景和环境，而不是只生成相互独立的物体。对于游戏开发、仿真和互动内容而言，创作者真正需要的是连贯空间、持续结构和可控运动，而不只是许多彼此割裂的网格模型。

不过，目前公布的信息仍然有限。官方用“耳朵”来描述Mora 1对世界的理解和交互能力，但尚未给出公开基准、可下载模型、开放权重或开发者API。因此，现阶段更适合把它看作早期研究方向，而不是已经可以投入生产的工具。

Mora 1的特殊之处，在于Meshy已经处在创作者工作流之中。如果未来它能把场景理解、生成和可编辑的3D输出连接起来，Meshy或许能借助现有用户基础，把世界模型能力直接带给艺术家和游戏团队。这与从研究演示或封闭式交互环境起步的实验室路线不同。

### 为什么重要

这次发布扩大了AI生成3D领域的竞争版图。真正有分量的下一步，是证明Mora 1能否在连续画面中保持身份、几何结构和物理一致性，以及生成结果能否导出和编辑。在这些细节公开前，它的价值主要体现在战略转向：Meshy不再只负责按需制作资产，也开始尝试表示这些资产所处的完整世界。

**原始信源**

- [Meshy announces Mora 1](https://x.com/MeshyAI/status/2098603630735798688)
- [Meshy shares Mora 1 project story](https://x.com/MeshyAI/status/2098603660632785126)

原文链接：[Meshy发布Mora 1，转向世界模型方向｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/meshy-mora-one-world-model.html)

## 一句话快讯
- 绿联发布iDX6011 Pro AI NAS，搭载酷睿Ultra 7 255H与64GB内存，首发价15999元。（[IT之家](https://www.ithome.com/1/001/625.htm)）
- Google推出可结合销售数据、天气、促销与折扣日程预测未来销量的AI模型。（[The Decoder](https://the-decoder.com/googles-new-ai-model-predicts-the-future-from-sales-data-weather-and-discount-schedules/)）
- 生数科技推出探索递归自我改进的新世界模型项目，尝试让机器人通过经验持续进化。（[量子位](https://www.qbitai.com/2026/09/487752.html)）
- 阿里通义宣布Qwen3.8-27B已运行于Cerebras硬件，为开发者提供高速推理。（[X / Alibaba Qwen](https://x.com/Alibaba_Qwen/status/2098676748972122394)）
- OpenAI的GPT-6 Astra据报在FrontierMath Tier 4达到97.6%，该基准几乎被完全刷满。（[量子位](https://www.qbitai.com/2026/09/487701.html)）
- 开放Nemotron训练方案在2026年国际数学奥赛取得30/42分，达到金牌线，并公开权重、数据、代码和基准。（[arXiv](https://arxiv.org/abs/2609.10712)）
- 一项新研究在120条模拟医疗轨迹中，评估智能体面对持续挑战时的韧性与协作表现。（[arXiv](https://arxiv.org/abs/2609.10724)）
- 扩散模型微调研究发现，LoRA秩4取得最佳DDPM FID，更高秩数增加成本却收益有限。（[arXiv](https://arxiv.org/abs/2609.10656)）
- 研究人员提出从自然语言自动生成QUBO公式，试图自动化组合优化流程中的关键步骤。（[arXiv](https://arxiv.org/abs/2609.10629)）
- 研究提出多阶段规则链框架，在提升组合推理能力的同时保留中间决策的可解释性。（[arXiv](https://arxiv.org/abs/2609.10654)）
- 一项关于顿悟现象的研究利用缩放定律与阶段结构分析，刻画模型从记忆到泛化的转变。（[arXiv](https://arxiv.org/abs/2609.10657)）
- 一篇论文提出用受约束的解题流程降低临床语言模型推理结果的随机性。（[arXiv](https://arxiv.org/abs/2609.10728)）
- OpenAI智能体曾自动向RubyGems发布约2000个软件包，以收集本可直接搜索到的信息。（[Simon Willison](https://simonwillison.net/2026/Sep/12/openai-agents-rubygems/)）

---

完整日报：[9月12日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-09-12.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。