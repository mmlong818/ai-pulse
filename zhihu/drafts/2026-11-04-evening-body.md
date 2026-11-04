这是「猫叔的AI资讯雷达」11月4日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：腾讯正式推出混元 Hy4，强化视觉理解、长上下文和多步智能体任务，并计划在近日公开模型权重与系统卡。

## 深度简报目录

- 腾讯发布混元 Hy4，首次加入视觉理解能力
- 魔芯发布 MoWorld 2.0，推进可交互四维世界模型
- 狮子山实验室发布 Lion-ER，聚焦具身推理效率

## 快讯预览

- Mistral称，133个智能体使用Mistral Large 4完成Django代码测绘、漏洞发现、攻击测试和修复。
- 虎鲸文娱上线鲸锐AI平台，宣称可将娱乐行业AI视频单分钟制作成本降低30%以上。
- 海螺AI称，H3在语言测试中口语与写作两项均取得满分。
- Meshy发布Meshy N1完整技术报告，披露其最新3D生成模型背后的系统设计。
- Deemos展示Blender在iPhone Duo上运行，并结合Hyper3D WorldGen将单张图片转换为可编辑3D场景。
- 腾讯WeVisOne-VL将目标检测、OCR、分割和抠图整合进一个视觉语言模型。
- Pinecone加入Fireworks AI Frontier Ecosystem，以Pinecone Nexus支持开放模型检索与编译知识工作流。
- openJiuwen Agent-Memory加入视听双流记忆，让智能体从长视频中检索关键事件并减少遗漏。
- Sakana AI在Gartner IT Symposium/Xpo 2026现场展示Marlin、Fugu和Namazu项目。
- Luma推出Character Sheet，可将参考图生成保持一致性的角色表，用于探索不同视角与设计。

## 1. 腾讯发布混元 Hy4，首次加入视觉理解能力

腾讯正式推出混元 Hy4，强化视觉理解、长上下文和多步智能体任务，并计划在近日公开模型权重与系统卡。

腾讯正式发布新一代混元大模型 Hy4，将其定位为面向编程、办公、科研和长程智能体任务的通用模型。

Hy4 首次为混元系列加入视觉理解能力。腾讯称，模型可以处理图像、分析复杂图表，并完成依赖视觉信息的数学推理；同时，指令遵循、长上下文理解、工具调用和多步骤任务能力也得到增强。

这次发布的关键在于，Hy4 先以产品形态上线，正式开放权重尚未完成。腾讯表示，模型权重和系统卡将在未来几天公布。因此，今天的发布扩大了通过腾讯产品和云服务使用模型的范围，但严格来说，还不能算一次新的开放权重发布。

Hy4 的另一个优势是分发渠道。模型将进入 WorkBuddy、CodeBuddy 等产品，并可通过腾讯云 TokenHub 以优惠价格调用。这让它能够直接进入企业办公和开发流程，而不只是停留在榜单或开发者预览阶段。

真正值得观察的是，宣传中的提升能否经受独立测试。此前 Hy4 预览版已经拥有大规模混合专家结构和超长上下文，因此本次升级的价值不应只看参数规模，而要看视觉任务准确性，以及长时间运行的智能体是否稳定。如果腾讯按计划公开权重和系统卡，Hy4 可能成为这一轮中国开放模型竞争中最有影响力的发布之一。

**原始信源**

- [Tencent Launches Hy4, Joining the Ranks of the World's Leading Open-Source AI Models](https://en.prnasia.com/releases/apac/tencent-launches-hy4-joining-the-ranks-of-the-world-s-leading-open-source-ai-models-554689.shtml)
- [Tencent Launches Hy4](https://www.tencent.com.cn/zh-hk/newsroom/)
- [Tencent Releases and Open-Sources Tencent Hy4 preview](https://www.tencent.com/tencent-releases-and-open-sources-tencent-hy4-preview/)

原文链接：[腾讯发布混元 Hy4，首次加入视觉理解能力｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/tencent-hy4-visual-open-model.html)

---

## 2. 魔芯发布 MoWorld 2.0，推进可交互四维世界模型

魔芯科技推出基于昇腾原生的 MoWorld 2.0，试图把物理规律、实时渲染和可复用四维资产结合起来。

中国初创公司魔芯科技发布 MoWorld 2.0。这是一款基于华为昇腾原生构建的 4D 世界模型，发布地点为世界互联网大会相关人工智能论坛。

魔芯称，模型能够处理重力、弹力、浮力、光照、柔体、流体、刚体和热力等多种物理因素，并输出可以反复调用的 4D 高斯资产。这些资产既能用于仿真，也能实时渲染，供下游应用继续编辑和调用。

与主要追求画面逼真的视频生成系统相比，世界模型需要解决更难的问题：场景必须在时间上保持一致，物体在被推动、抬起、照射或置于不同环境时，也要作出符合规律的响应。魔芯表示，MoWorld 2.0 在动态场景理解、物理交互、实时推理和空间资产生成方面都有提升，但目前尚未公布足够的标准化结果，无法判断这些能力能否广泛复现。

它的“昇腾原生”定位同样值得关注。这意味着中国的世界模型团队可能正在从硬件基础设施出发设计模型，而不是先在海外芯片上训练、再考虑国产硬件适配。对于机器人、文旅、地理信息和工业仿真等场景，这种路线可能带来实际影响。

不过，MoWorld 2.0 目前仍更像一个重要信号，而不是已经被验证的通用模拟器。后续需要看到可重复的物理交互演示、延迟数据、模型获取方式，以及与其他世界模型的公开比较。它真正的价值，在于显示中国团队正在从视频生成迈向可交互、可编辑、能被机器人和软件智能体利用的环境建模。

**原始信源**

- [让AI深度理解多种物理要素：魔芯科技4D世界模型MoWorld 2.0乌镇首发](https://www.36kr.com/p/4055132476232838)
- [魔芯科技发布基于华为昇腾原生的4D世界模型 MoWorld 2.0](https://www.ithome.com/1/022/424.htm)

原文链接：[魔芯发布 MoWorld 2.0，推进可交互四维世界模型｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/moworld-2-4d-world-model.html)

---

## 3. 狮子山实验室发布 Lion-ER，聚焦具身推理效率

招商局狮子山人工智能实验室推出 Lion-ER-35B-A3B，强调围绕机器人能力缺口设计数据，而非单纯扩大训练规模。

招商局狮子山人工智能实验室发布具身推理模型 Lion-ER-35B-A3B，目标是帮助机器人理解并执行真实世界任务。该模型没有把单纯增加通用训练数据作为主要路线，而是强调围绕能力缺口构建数据引擎。

实验室介绍称，Lion-ER 会先明确机器人需要掌握的能力，再通过评测发现模型短板，针对性地生成或筛选数据，随后继续训练和复测。这形成了“能力目标—评测—补数据—迭代”的闭环，而不是把数据集规模直接当作进步指标。

从命名看，模型总参数量为 350 亿，激活参数约 30 亿，可能采用混合专家架构，以较低的单次推理成本保留更大的模型容量。公开演示重点放在物理世界推理和任务完成判断上，其中包括模型在多次尝试后仍能判断任务“尚未完成”的案例。

这一点对具身智能尤其重要。语言模型可以流畅描述一个动作，却不一定知道动作是否真的成功；机器人则必须识别缺步骤、发现失败，并只有在环境状态满足条件时才宣布完成。能够在正确时机说“还没完成”，有时比生成漂亮指令更具实用价值。

Lion-ER 目前还不是一个已经被充分验证的基准突破。公开资料对硬件、数据集、部署延迟以及与主流具身模型的对比披露有限。它更值得关注的地方，可能是数据方法：如果按能力设计数据确实优于盲目扩充规模，那么较小激活参数的模型会更容易部署到中国机器人平台。这个判断仍需要独立、可复现的评测来确认。

**原始信源**

- [不靠堆砌数据，让机器人看懂真实物理世界](https://www.qbitai.com/2026/11/507586.html)
- [Lion-ER-35B-A3B具身推理模型介绍](https://www.m.aitntnews.com/newDetail.html?newId=30923)

原文链接：[狮子山实验室发布 Lion-ER，聚焦具身推理效率｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/lion-er-embodied-reasoning.html)

## 一句话快讯
- Mistral称，133个智能体使用Mistral Large 4完成Django代码测绘、漏洞发现、攻击测试和修复。（[X / Mistral AI](https://x.com/MistralAI/status/2117925908572991748)）
- 虎鲸文娱上线鲸锐AI平台，宣称可将娱乐行业AI视频单分钟制作成本降低30%以上。（[量子位](https://www.qbitai.com/2026/11/507567.html)）
- 海螺AI称，H3在语言测试中口语与写作两项均取得满分。（[X / Hailuo AI](https://x.com/Hailuo_AI/status/2117864294041944152)）
- Meshy发布Meshy N1完整技术报告，披露其最新3D生成模型背后的系统设计。（[X / Meshy AI](https://x.com/MeshyAI/status/2117862960978948143)）
- Deemos展示Blender在iPhone Duo上运行，并结合Hyper3D WorldGen将单张图片转换为可编辑3D场景。（[X / Deemos Technology](https://x.com/DeemosTech/status/2117854419803140446)）
- 腾讯WeVisOne-VL将目标检测、OCR、分割和抠图整合进一个视觉语言模型。（[MarkTechPost](https://www.marktechpost.com/2026/11/03/tencent-wevisone-vl-vision-language-model/)）
- Pinecone加入Fireworks AI Frontier Ecosystem，以Pinecone Nexus支持开放模型检索与编译知识工作流。（[X / Pinecone](https://x.com/pinecone/status/2117816247371055202)）
- openJiuwen Agent-Memory加入视听双流记忆，让智能体从长视频中检索关键事件并减少遗漏。（[量子位](https://www.qbitai.com/2026/11/507533.html)）
- Sakana AI在Gartner IT Symposium/Xpo 2026现场展示Marlin、Fugu和Namazu项目。（[X / Sakana AI](https://x.com/SakanaAILabs/status/2117806486172860793)）
- Luma推出Character Sheet，可将参考图生成保持一致性的角色表，用于探索不同视角与设计。（[X / Luma Labs AI](https://x.com/LumaLabsAI/status/2117801252918632787)）
- Artificial Analysis发布人格排名，显示专有模型在真实性、实用性和结构性上平均高于开放权重模型。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2117787343667040279)）
- Artificial Analysis上线AA-Robotics专门页面，用于评估面向机器人的人工智能系统。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2117786855634870688)）
- Artificial Analysis 将六项能力指数升级至 2.0，并与 Intelligence Index 5.0 的评测对齐。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2117780641618207006)）
- Pika 表示，H3 Flex 权重发布不到一天，社区已构建出支持两步草稿生成的 Turbo LoRA。（[X / Pika](https://x.com/pika_labs/status/2117772839642386856)）

---

完整日报：[11月4日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-04.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。