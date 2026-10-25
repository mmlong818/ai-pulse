# 猫叔的AI资讯雷达｜10月25日晚报：英伟达开源Flora，机器人视频标注成本降125倍

这是「猫叔的AI资讯雷达」10月25日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：英伟达开源机器人数据引擎Flora，称其每天可处理20万小时数据，标注成本约为GPT-6 Astra的八百分之一。

## 深度简报目录

- 英伟达开源Flora，机器人视频标注成本降125倍

## 快讯预览

- Linux基金会报告称，AI让编码提速52%，但四分之一PR已被视为AI垃圾。
- Jack Clark将自我改进AI的预测提前至2027年，递归能力增长的时间表被压缩。
- Anthropic称，随着模型独立处理复杂推理能力增强，单个强Agent现在可胜过多个子Agent。
- InfoQ的Java近期综述提到LangChain4j，并同时覆盖Grails、Open Liberty、GlassFish、Infinispan和Spock更新。
- 据报道，Meta未执行与博索纳罗偏袒有关的巴西法院命令，引发平台问责与AI时代信息权力疑问。
- Eric Schmidt将OpenAI和Anthropic比作争夺稀缺AI资源的现代殖民贸易公司。
- 据报道，OpenAI最高提供九折优惠，以争夺Anthropic的大客户。
- OpenMobile-2显示，开源手机Agent在移动操作基准上已接近闭源系统。
- 可灵官方账号号召创作者开始使用Kling 4，释放出强化创作者视频工作流的信号。
- 微软开源Agensh，这是一个面向最多1024个Agent协同的多Agent运行框架。

## 1. 英伟达开源Flora，机器人视频标注成本降125倍

英伟达开源机器人数据引擎Flora，称其每天可处理20万小时数据，标注成本约为GPT-6 Astra的八百分之一。

### 发生了什么

英伟达发布了Flora，一套面向机器人训练的数据引擎，目标是把机器人和人类示范视频转换为结构化训练数据。系统结合时间片段切分、视频描述和奖励标注，能够从长视频中识别动作、子任务与结果，而不是把整段素材当作无法拆分的序列。

英伟达称，Flora已用于GR00T机器人模型的数据流程，并在512块GB300 GPU上达到每天处理约20万小时数据的规模。按照英伟达内部对比，Flora在多项标注任务上接近GPT-6 Astra，同时每小时机器人视频的标注成本约为0.72美元，而后者约为88美元。

### 为什么重要

机器人研发真正稀缺的并不只是原始视频，而是把视频转换成可靠动作标签的能力。更低的标注成本，可能让高校、中小型机器人公司和开放研究团队构建自己的专用数据集，不再完全依赖少数大模型实验室整理的数据。

这次发布也把竞争推向了数据工程层。Flora并不是机器人控制器，输出用于安全关键训练前仍需人工或程序校验。它的许可证限制，以及在陌生机器人形态上的标注质量，也可能影响商业部署。不过，英伟达公开这套流程，为物理人工智能研究提供了可复现的起点，并可能降低机器人学习中长期被忽视的一项成本。

### 猫叔判断

比125倍便宜更值得关注的是每天20万小时的生产规模；若外部团队能复现其中一部分，机器人数据就不再只是大厂资源。

**原始信源**

- [Flora: An Open Model Suite for Scaling Robotics Data Engines](https://research.nvidia.com/labs/gear/flora/)
- [nvidia/Flora-TempSeg model card](https://huggingface.co/nvidia/Flora-TempSeg)
- [Nvidia open-sources Flora to make robot video labeling 125x cheaper than GPT-6 Astra](https://the-decoder.com/nvidia-open-sources-flora-to-make-robot-video-labeling-125x-cheaper-than-gpt-6-astra/)

原文链接：[英伟达开源Flora，机器人视频标注成本降125倍｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/nvidia-flora-robot-data-engine.html)

## 一句话快讯
- Linux基金会报告称，AI让编码提速52%，但四分之一PR已被视为AI垃圾。（[InfoQ 中文](https://www.infoq.cn/article/9TSuUDxrUSGS26XTA2yB)）
- Jack Clark将自我改进AI的预测提前至2027年，递归能力增长的时间表被压缩。（[The Decoder](https://the-decoder.com/anthropic-co-founder-jack-clark-moves-his-prediction-for-self-improving-ai-forward-to-2027/)）
- Anthropic称，随着模型独立处理复杂推理能力增强，单个强Agent现在可胜过多个子Agent。（[The Decoder](https://the-decoder.com/anthropic-says-one-ai-agent-beats-many-subagents-now-that-models-can-handle-complexity-alone/)）
- InfoQ的Java近期综述提到LangChain4j，并同时覆盖Grails、Open Liberty、GlassFish、Infinispan和Spock更新。（[InfoQ 中文](https://www.infoq.cn/article/BHWP4JJDeExZZWsifFlg)）
- 据报道，Meta未执行与博索纳罗偏袒有关的巴西法院命令，引发平台问责与AI时代信息权力疑问。（[Panama American Dispatch](https://www.panamericandispatch.org/p/meta-ignores-brazilian-court-order)）
- Eric Schmidt将OpenAI和Anthropic比作争夺稀缺AI资源的现代殖民贸易公司。（[The Decoder](https://the-decoder.com/ex-google-ceo-eric-schmidt-calls-openai-and-anthropic-modern-colonial-trading-companies/)）
- 据报道，OpenAI最高提供九折优惠，以争夺Anthropic的大客户。（[The Decoder](https://the-decoder.com/openai-offers-discounts-up-to-90-percent-to-poach-anthropics-biggest-customers/)）
- OpenMobile-2显示，开源手机Agent在移动操作基准上已接近闭源系统。（[The Decoder](https://the-decoder.com/openmobile-2-proves-open-source-smartphone-agents-can-rival-proprietary-models/)）
- 可灵官方账号号召创作者开始使用Kling 4，释放出强化创作者视频工作流的信号。（[X / Kling AI](https://x.com/Kling_ai/status/2114208342914617549)）
- 微软开源Agensh，这是一个面向最多1024个Agent协同的多Agent运行框架。（[MarkTechPost](https://www.marktechpost.com/2026/10/24/microsoft-agensh-multi-agent-harness-1024-agents/)）
- Cognition开源Devin插件，帮助修复与PHP2Shell、Node.js和GitLab相关的漏洞。（[MarkTechPost](https://www.marktechpost.com/2026/10/24/cognition-devin-vulnerability-fixes-plugin-php2shell-nodejs-gitlab/)）
- Saluki 27B展示了面向工具调用的两比特Qwen量化，目标是降低编码Agent部署成本。（[MarkTechPost](https://www.marktechpost.com/2026/10/24/underdog-saluki-27b-coding-guide-llama-cpp/)）
- Cerebras详解了如何将层分布到多片芯片上，以部署万亿参数模型。（[Cerebras](https://www.cerebras.ai/blog/how-we-deploy-trillion-parameter-frontier-models-on-cerebras)）
- 山东大学研究发现，编码Agent框架可能让成本翻三倍，而基准准确率差距不到两个百分点。（[AI Tools Recap](https://aitoolsrecap.com/ai-news-today)）

---

完整日报：[10月25日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-10-25.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。