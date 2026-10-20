# 猫叔的AI资讯雷达｜10月20日晚报：深度求索开源支撑 V4.1 Flash 的推理栈

这是「猫叔的AI资讯雷达」10月20日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：深度求索开源 DeepInfer 推理框架及 deepseek-recipe，首次把最新模型背后的部分生产级服务技术交给社区。

## 深度简报目录

- 深度求索开源支撑 V4.1 Flash 的推理栈
- 美国要求联邦民用机构移除深度求索技术

## 快讯预览

- Otter.ai从General Catalyst融资3.2亿美元，用于扩展会议代理、企业工作流和国际业务。
- 一项调查发现，AI生成代码会增加调试难度、故障率和开发者理解鸿沟。
- Yelp新增AI功能，可代用户致电餐厅查询实时等位时间。
- DeepSeek表示将开源deepseek-recipe，这是其API栈使用的生产级token编解码组件。
- 据报道，Exa 3.0 Search API在八项基准测试中击败Perplexity、Brave和Parallel。
- Sakana AI为统筹更广泛产品组合，首次招聘专职产品战略与运营成员。
- Artificial Analysis显示，Ming-3.0-tts在原生语音竞技场中以1188 Elo位列开源权重模型第三。
- Inception发布Mercury 3扩散语言模型，宣称速度达每秒1068 token、上下文窗口达百万token。
- 中文报道披露，Claude新模型可跳出惯性思路，并从根源修复软件Bug。
- AI工作助手初创公司Town上线数周后融资1.08亿美元，估值达到独角兽水平。

## 1. 深度求索开源支撑 V4.1 Flash 的推理栈

深度求索开源 DeepInfer 推理框架及 deepseek-recipe，首次把最新模型背后的部分生产级服务技术交给社区。

深度求索开源了 DeepInfer 推理框架，并同步更新 deepseek-recipe。公司称，DeepInfer 正是支撑 DeepSeek-V4.1-Flash 生产服务的核心软件之一。此次开放的不只是一个模型适配器，还包括优化内核、混合专家并行、推测解码、异步调度、确定性采样和结构化输出等能力。

### 开放了什么

DeepInfer 面向 DeepSeek-V4.1-Flash 的大规模离线推理，集成 FlashMLA、DeepGEMM、DeepEP、TileKernels 和定制 TileLang 内核，同时支持注意力数据并行、上下文并行及专家并行负载均衡。项目还提供基于置信度的验证调度和有界重放机制，用于减少解码与预填充开销。

目前支持 NVIDIA SM100 GPU 和华为昇腾 950 NPU，采用 Apache 2.0 许可证。不过它还不是完整的托管服务平台：KV 缓存管理、完整的预填充/解码分离，以及多副本之间的负载均衡，仍需要用户自行补齐。

同步更新的 deepseek-recipe 是一套 Rust 与 Python 工具，用于把常见 API 请求转换为 DeepSeek 所需的提示和响应格式。10 月 20 日版本新增 V4、V4.1 模型版本识别、结构化输出、显式特殊 token 处理和前缀续写支持。

### 为什么重要

这次发布把竞争焦点从“谁开放了模型权重”进一步推向“谁能把模型稳定、低成本地跑起来”。深度求索公开了通常藏在内部的生产推理细节，为云厂商、国家级算力中心和自部署团队复现其吞吐设计提供了更直接的起点。限制也很明确：项目依赖新一代加速器和较强的系统工程能力，关键服务层并未全部包含。但它仍可能推动 DeepSeek 生态的性能优化，并让推理基础设施本身成为开源竞争的新战场。

**原始信源**

- [DeepSeek DeepInfer GitHub repository](https://github.com/deepseek-ai/DeepInfer)
- [DeepSeek deepseek-recipe changelog](https://github.com/deepseek-ai/deepseek-recipe/blob/main/CHANGELOG.md)
- [DeepSeek official announcement on X](https://x.com/deepseek_ai/status/2112476496283775135)

原文链接：[深度求索开源支撑 V4.1 Flash 的推理栈｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/deepseek-opens-deepinfer-inference-stack.html)

---

## 2. 美国要求联邦民用机构移除深度求索技术

美国国土安全部要求联邦民用机构移除深度求索及其衍生产品，并禁止采购相关技术。

美国国土安全部要求联邦民用机构从信息技术系统中移除深度求索产品及相关实现，并禁止这些机构继续采购深度求索及其关联产品。禁令范围还延伸至使用深度求索技术开发的第三方服务。

### 禁令覆盖范围

这项措施通过《联邦公报》发布，依据的是联邦采购安全委员会相关机制。它针对的是联邦行政部门的民用机构，不适用于普通公众，也不是对私人企业或消费者使用深度求索的全面禁令。文件援引供应链和国家安全风险，包括敏感信息可能被传输至中国，以及软件安全方面的担忧。

文件措辞明显超出“禁止访问聊天机器人”的范围。机构需要移除深度求索产品、关联方产品，以及集成深度求索实现的第三方工具。对于承包商和内部应用而言，即使最终用户看不到 DeepSeek 品牌，也可能需要重新审查底层模型来源。

需要注意的是，相关命令此前已经签署，但在本期窗口内通过《联邦公报》正式公开，使其成为政府采购和技术清退体系中的正式记录。中国方面随后批评这一决定，认为这是华盛顿与北京技术竞争进一步升级的表现。

### 为什么重要

短期影响主要集中在美国联邦市场，并不会让全球开发者无法下载或运行深度求索模型。真正值得关注的是它形成的制度先例：美国政府正在把一个广泛传播的开放模型视作供应链风险，并将限制延伸到基于该模型构建的下游产品。此举可能迫使承包商建立更严格的模型来源记录，也会让各国政府更加重视权重、服务和衍生应用的技术溯源。深度求索仍然“可获得”，但在受监管公共部门中的“可使用性”正在下降。

**原始信源**

- [Federal Register notice on DeepSeek products](https://www.federalregister.gov/d/2026-21447)
- [Associated Press report on the federal ban](https://apnews.com/article/2bffa5b0131808735280b2c0e6f0d856)

原文链接：[美国要求联邦民用机构移除深度求索技术｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/us-orders-deepseek-removal-federal-systems.html)

## 一句话快讯
- Otter.ai从General Catalyst融资3.2亿美元，用于扩展会议代理、企业工作流和国际业务。（[Otter.ai](https://otter.ai/blog/general-catalyst-backs-otter-ais-voice-ai-ambitions-with-320m-growth-investment)）
- 一项调查发现，AI生成代码会增加调试难度、故障率和开发者理解鸿沟。（[InfoQ 中文](https://www.infoq.cn/article/ywvgVDVLsSU7r47Jk6lq?utm_source=rss&utm_medium=article)）
- Yelp新增AI功能，可代用户致电餐厅查询实时等位时间。（[TechCrunch](https://techcrunch.com/2026/10/20/yelp-can-now-call-on-your-behalf-to-check-wait-times-at-a-restaurant/)）
- DeepSeek表示将开源deepseek-recipe，这是其API栈使用的生产级token编解码组件。（[X / DeepSeek](https://x.com/deepseek_ai/status/2112476501065286085)）
- 据报道，Exa 3.0 Search API在八项基准测试中击败Perplexity、Brave和Parallel。（[MarkTechPost](https://www.marktechpost.com/2026/10/20/exa-3-0-search-api-lite/)）
- Sakana AI为统筹更广泛产品组合，首次招聘专职产品战略与运营成员。（[X / Sakana AI](https://x.com/SakanaAILabs/status/2112392712637100095)）
- Artificial Analysis显示，Ming-3.0-tts在原生语音竞技场中以1188 Elo位列开源权重模型第三。（[X / Artificial Analysis](https://x.com/ArtificialAnlys/status/2112389528426033564)）
- Inception发布Mercury 3扩散语言模型，宣称速度达每秒1068 token、上下文窗口达百万token。（[Inception](https://www.inceptionlabs.ai/blog/introducing-mercury-3)）
- 中文报道披露，Claude新模型可跳出惯性思路，并从根源修复软件Bug。（[量子位](https://www.qbitai.com/2026/10/504314.html)）
- AI工作助手初创公司Town上线数周后融资1.08亿美元，估值达到独角兽水平。（[SiliconANGLE](https://siliconangle.com/2026/10/19/ai-work-assistant-startup-town-secures-unicorn-status-after-raising-108m-just-weeks-after-launching/)）
- Nace AI推出Drex Max多模态决策模型，计算机操作智能体评测得分为67.59。（[MarkTechPost](https://www.marktechpost.com/2026/10/19/nace-ai-drex-max-multimodal-decision-model/)）
- Amazon Bedrock为Anthropic Claude模型加入结构化输出，可按指定模式返回结果。（[AWS Machine Learning](https://aws.amazon.com/blogs/machine-learning/structured-outputs-for-anthropic-claude-models-on-amazon-bedrock/)）

---

完整日报：[10月20日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-10-20.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。