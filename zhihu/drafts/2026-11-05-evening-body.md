这是「猫叔的AI资讯雷达」11月5日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：百度开源文心5.5 Flash Base，采用稀疏架构与超长上下文，为中国开放权重模型竞争加入新的大规模选手。

## 深度简报目录

- 百度开源2800亿参数文心5.5 Flash Base

## 快讯预览

- 据报道，谷歌用 Gemini 4 Argon 一夜优化了 ADK 代码库的 20 万行代码。
- Dreamina Originals 宣布 AI 电影项目《Beautiful Malice》的首映日期。
- AICon 北京专题介绍了利用 Skill 门禁与 Harness 防护，对 AI 编程代理实施增量风险管控。
- Google AI Research 发布 Agile Deliberation，用于处理主观图像分类中的模糊判断。
- XROGO 在 CeMAT ASIA 发布机器人到岗计划，重点检验机器人在真实工作场景中的价值。
- Meshy 推出新流程，可将普通照片转换为可编辑的低浮雕或高浮雕 3D 资产。
- Luma 推出 Photo Reframe，可将图片扩展到海报、店铺页面和社交媒体所需的不同画幅。
- OpenAI 发布社区协议与政策蓝图，涉及未来算力园区的能源、用水、招聘和问责。
- OpenAI 表示，研究人员借助一项投入 120 万美元的 AI 安全行动，发现 Linux 内核 948 个漏洞。
- 据报道，苹果削减员工内部 AI 使用预算，以收紧实验性支出。

## 1. 百度开源2800亿参数文心5.5 Flash Base

百度开源文心5.5 Flash Base，采用稀疏架构与超长上下文，为中国开放权重模型竞争加入新的大规模选手。

### 发生了什么

百度在北京白天时段发布了开放权重模型文心5.5 Flash Base。该模型总参数量据报道达到2800亿，每个Token约激活140亿参数；预训练使用了3.35万亿Token，训练上下文长度为128K，微调和推理阶段支持最长100万Token上下文。

这次发布的关键，不只是参数规模，而是百度把新一代基础模型从托管API体系中拿出来，交给外部开发者和研究者使用。开发者可以研究权重、进行适配和微调，并将其与其他中国及海外开放模型直接比较。稀疏架构意味着总参数量不能简单等同于单次推理成本，但部署仍然需要较大的显存规模和工程投入。

### 为什么重要

随着开发者越来越重视可控部署、本地化运行和微调自由度，百度的动作让中国开放权重模型市场又多了一个重要来源。它也给研究界提供了一个新样本，用来检验大规模混合专家架构能否在保持实际可部署性的同时，把规模优势转化为能力优势。

需要保留的疑问是许可证和可复现性。开放权重不等于可以无条件商用，榜单成绩也需要围绕推理、代码、多语言和长上下文检索进行独立验证。它最终能否产生广泛影响，还取决于中国云平台、推理服务商和开发者社区是否能降低部署门槛。

因此，百度争夺的不只是模型分数，也是在争取让文心成为其他团队可以长期依赖的基础设施。

**原始信源**

- [百度开源文心5.5 Flash Base，多基准测试刷新同尺寸模型SOTA](https://www.qbitai.com/2026/11/507787.html)
- [ERNIE 5.5 Flash Base release page](https://ernie.baidu.com/release/ernie-5-5-flash-base/)
- [ERNIE 5.5 Flash Base technical details](https://www.orcarouter.ai/ko/blog/ernie-5-5-flash-base-open-weights-license)

原文链接：[百度开源2800亿参数文心5.5 Flash Base｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/baidu-ernie-55-flash-base.html)

## 一句话快讯
- 据报道，谷歌用 Gemini 4 Argon 一夜优化了 ADK 代码库的 20 万行代码。（[InfoQ 中文](https://www.infoq.cn/article/u4fAoAH5vZPCV4TVqAcO?utm_source=rss&utm_medium=article)）
- Dreamina Originals 宣布 AI 电影项目《Beautiful Malice》的首映日期。（[X / Dreamina](https://x.com/dreamina_ai/status/2118297272601793010)）
- AICon 北京专题介绍了利用 Skill 门禁与 Harness 防护，对 AI 编程代理实施增量风险管控。（[InfoQ 中文](https://www.infoq.cn/article/XieGrL5pws7jG1zxKPle?utm_source=rss&utm_medium=article)）
- Google AI Research 发布 Agile Deliberation，用于处理主观图像分类中的模糊判断。（[MarkTechPost](https://www.marktechpost.com/2026/11/04/google-agile-deliberation-subjective-image-classifiers/)）
- XROGO 在 CeMAT ASIA 发布机器人到岗计划，重点检验机器人在真实工作场景中的价值。（[量子位](https://www.qbitai.com/2026/11/507767.html)）
- Meshy 推出新流程，可将普通照片转换为可编辑的低浮雕或高浮雕 3D 资产。（[X / Meshy](https://x.com/MeshyAI/status/2118182479630856194)）
- Luma 推出 Photo Reframe，可将图片扩展到海报、店铺页面和社交媒体所需的不同画幅。（[X / Luma AI](https://x.com/LumaLabsAI/status/2118161379731677274)）
- OpenAI 发布社区协议与政策蓝图，涉及未来算力园区的能源、用水、招聘和问责。（[OpenAI](https://openai.com/index/setting-new-standard-responsible-ai-infrastructure)）
- OpenAI 表示，研究人员借助一项投入 120 万美元的 AI 安全行动，发现 Linux 内核 948 个漏洞。（[量子位](https://www.qbitai.com/2026/11/507697.html)）
- 据报道，苹果削减员工内部 AI 使用预算，以收紧实验性支出。（[TechCrunch](https://techcrunch.com/2026/11/04/apple-is-reportedly-cutting-budgets-for-its-internal-ai-usage/)）
- Nothing CEO 裴宇称，公司首款无屏 AI 设备将于 12 月发布。（[IT之家](https://www.ithome.com/1/022/507.htm)）
- 华为宣布昇腾已实现 0 Day 支持，可部署月之暗面 2.8 万亿参数 Kimi K3.1 Pro。（[IT之家](https://www.ithome.com/1/022/502.htm)）
- Anthropic 协助研究人员建立包含 96 个细菌蛋白副本的三维库，以加快实验研究。（[IT之家](https://www.ithome.com/1/022/501.htm)）
- Baseten 发布 Router，称其编码成本较 Opus 5.5 低 72%，且各阈值均优于随机路由。（[X / Baseten](https://x.com/baseten/status/2118124250770911432)）

---

完整日报：[11月5日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-05.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。