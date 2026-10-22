这是「猫叔的AI资讯雷达」10月22日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：腾讯与复旦研究者推出WorkForge，把真实文件和专业流程转化为可验证的长程智能体训练环境。

## 深度简报目录

- 腾讯WorkForge扩展可验证工作智能体训练环境
- IBM开源Granite时序模型集成预测方案

## 快讯预览

- 豆包工作上线IGA Pages插件，可用自然语言生成可分享、可协作的网页。
- 可灵AI展示Kling 4新视频案例，强调超现实视觉效果与提示词响应能力。
- Sakana AI认为，AI主权应保留关键选择与能力，而非追求国家完全自给。
- OpenAI的Patch the Planet计划协助发现PHP2Shell漏洞，影响大量核心PHP部署。
- Tripothon第一季巴塞罗那展示日展示了结合Tripo与World Labs生成3D环境的工作流。
- Artificial Analysis称DeepSeek Search擅长事实问题，但多跳浏览能力落后领先系统。
- 新研究测试冻结的Gemma 4语音编码器能否通过轻量适配识别沙特及海湾阿拉伯语。
- 新论文研究翻译系统的伦理风险，将语言转换与数据治理、文化呈现联系起来。
- 研究人员提出用大语言模型评估受监督心理治疗过程的执行一致性。
- 新研究探讨法律因素在大语言模型内部的表征位置。

## 1. 腾讯WorkForge扩展可验证工作智能体训练环境

腾讯与复旦研究者推出WorkForge，把真实文件和专业流程转化为可验证的长程智能体训练环境。

### 从工作流程到可检验空间

腾讯与复旦大学研究者发布的WorkForge，瞄准的是智能体发展中一个不够显眼、却极其关键的瓶颈：缺少真实、复杂，而且能够可靠验收的训练环境。

WorkForge不是从孤立提示词出发，而是先分析专业工作流程，识别任务所需的资源、决策和交付物，再利用真实文件搭建工作空间。系统随后检查这些空间，提取其中可观察、可核验的事实锚点，并据此生成任务说明、解决方案和程序化或语义验证器。换言之，任务如何完成、结果是否正确，都尽量回到工作空间本身的证据。

研究团队称，WorkForge已经构建出覆盖40个专业领域、60种文件类型的1.67万个可验证环境。在后训练实验中，Qwen3.5-35B-A3B-Base的GDPVal得分从45.5提升至73.6，APEX得分从5.0提升至21.3；27B模型也取得了对强竞争模型颇具竞争力的成绩。

### 为什么重要

许多智能体评测只看最后答案，很难判断系统是否经历了可靠的工作过程。WorkForge把文件、阶段性决策和最终产物都纳入监督信号，这对金融、研究、运营和办公等需要持续执行数十步的任务尤为重要。

但自动生成的验证器能否在论文覆盖领域之外保持可信，仍待检验。即便如此，WorkForge展示了一条更可扩展的训练路径：减少手工搭建模拟环境，让任务、过程和证据彼此绑定。

### Uncle Cat观点

WorkForge最有价值的并非Qwen分数，而是覆盖60种文件类型；这让企业智能体终于有机会走出玩具任务。

**原始信源**

- [Scaling Verifiable Environments for Long-horizon Work Agents](https://arxiv.org/abs/2610.04906)
- [TencentHunyuan WorkForge announcement](https://x.com/TencentHunyuan/status/2113196619667763211)

原文链接：[腾讯WorkForge扩展可验证工作智能体训练环境｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/tencent-workforge-agent-training.html)

---

## 2. IBM开源Granite时序模型集成预测方案

IBM研究院发布Granite Timeseries Ensemble R1，将四款时序模型组合到统一接口中，支持零样本和概率预测。

### 把多个预测器组合起来

IBM研究院发布了Granite Timeseries Ensemble R1，这是一套将四款Granite时序模型置于统一预测接口下的开放方案，面向零样本预测和概率预测实验。用户无需为每个新数据集重新训练模型，就可以尝试组合不同预测器。

这套方案没有把重点放在单一更大模型上，而是把时序预测视为集成问题。不同Granite检查点可以提供各自的预测结果，再通过聚合方法生成最终输出。实现已经通过Hugging Face提供，接口也预留了接入其他兼容模型和聚合策略的空间。

相关材料将其定位为实验工具，而不是能够替代所有领域预测系统的通用方案。它的实际意义在于，让需求规划、运营管理和金融时序等场景更容易复现、比较和调整模型组合。

### 为什么重要

这次发布的影响力不如前沿语言模型，但它体现了应用型AI的一个重要方向。许多预测问题并不需要聊天式生成，而更需要经过校准的不确定性、稳定的数值输出，以及在数据变化后比较模型的能力。

当不同模型在不同模式下失效时，集成可能提高稳健性；但它也会增加运维复杂度。用户仍需处理检查点兼容性、聚合策略和数据泄漏等问题，当前发布并不能证明集成模型在生产环境一定胜过经过调优的本地基线。

不过，一个开放且可组合的方案，确实降低了验证成本：实践者可以测试组合紧凑型模型是否比单看排行榜挑一个模型更可靠。这使它成为今天亚洲时段值得关注的开放模型发布，意义更偏向工程实践，而非轰动性突破。

### Uncle Cat观点

Granite真正押注的是可复现性：只有当用户能自由替换模型和聚合规则，它的集成路线才会产生长期价值。

**原始信源**

- [Ensemble forecasting with IBM Granite time-series models](https://huggingface.co/blog/ibm-research/granite-timeseries-ensemble-r1)
- [Granite Timeseries Ensemble R1 model repository](https://huggingface.co/ibm-granite/granite-timeseries-ensemble-r1)

原文链接：[IBM开源Granite时序模型集成预测方案｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/ibm-granite-forecasting-ensemble.html)

## 一句话快讯
- 豆包工作上线IGA Pages插件，可用自然语言生成可分享、可协作的网页。（[InfoQ 中文](https://www.infoq.cn/article/w065UmVL9EsVI6IVbBd7?utm_source=rss&utm_medium=article)）
- 可灵AI展示Kling 4新视频案例，强调超现实视觉效果与提示词响应能力。（[X / Kling AI](https://x.com/Kling_ai/status/2113186439693586485)）
- Sakana AI认为，AI主权应保留关键选择与能力，而非追求国家完全自给。（[X / Sakana AI](https://x.com/SakanaAILabs/status/2113183285941780729)）
- OpenAI的Patch the Planet计划协助发现PHP2Shell漏洞，影响大量核心PHP部署。（[Latent Space](https://www.latent.space/p/ainews-openais-patch-the-planet-program)）
- Tripothon第一季巴塞罗那展示日展示了结合Tripo与World Labs生成3D环境的工作流。（[X / Tripo AI](https://x.com/tripoai/status/2113136756816285815)）
- Artificial Analysis称DeepSeek Search擅长事实问题，但多跳浏览能力落后领先系统。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2113124098339729822)）
- 新研究测试冻结的Gemma 4语音编码器能否通过轻量适配识别沙特及海湾阿拉伯语。（[arXiv](https://arxiv.org/abs/2610.28673)）
- 新论文研究翻译系统的伦理风险，将语言转换与数据治理、文化呈现联系起来。（[arXiv](https://arxiv.org/abs/2610.28710)）
- 研究人员提出用大语言模型评估受监督心理治疗过程的执行一致性。（[arXiv](https://arxiv.org/abs/2610.28772)）
- 新研究探讨法律因素在大语言模型内部的表征位置。（[arXiv](https://arxiv.org/abs/2610.28799)）
- LIFT提出范围化约束，用于评估和训练语言模型的指令遵循能力。（[arXiv](https://arxiv.org/abs/2610.28819)）
- 研究人员发布覆盖多种阿拉伯方言的平行依存句法树库。（[arXiv](https://arxiv.org/abs/2610.28823)）

---

完整日报：[10月22日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-10-22.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。