这是「猫叔的AI资讯雷达」9月1日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：经历数据迁移和短暂停服后，Manus正式完成与Meta的拆分，创始团队继续掌舵这家通用智能体公司。

## 深度简报目录

- Manus结束与Meta拆分，正式恢复独立运营
- Ollama取消时段限额，云服务改按词元计费

## 快讯预览

- 努比亚 NaviX Ultra 智能体手机已在中国获入网许可，将于本月上市并内置字节跳动豆包助手。
- DataAgent 获得1000万美元种子前融资，推出可在客户 Kubernetes 集群内诊断并修复生产故障的智能体。
- Anthropic 宣布永久提高 Claude 使用额度25%，但部分用户称新计量方式反而降低了实际可用量。
- 阿里巴巴称，面向真实商业任务的 CommerceAgentBench 中，Qwen3.8-Max 在开放权重模型里综合表现最佳。
- Gradium 将新语音合成模型设为默认版本，称其困难样本通过率达81%，首段音频中位延迟为216毫秒。
- Ollama 已支持开箱即用地启动 Muse Code 编程智能体框架，可连接本地或云端模型。
- GitHub 表示，Copilot 应用现可让用户从 AI 对话直接转入开发工作，无需切换界面。
- Together AI 将9月专用 H100 推理价格从每小时5.49美元降至3.99美元，新旧部署均自动适用。
- 英国央行行长警告，集中化的 AI 风险敞口及相互关联的融资可能放大金融体系冲击。
- 苹果提交证据称，一名前员工加入 OpenAI 前转移了机密芯片资料，其中包括一份电路原理图。

## 1. Manus结束与Meta拆分，正式恢复独立运营

经历数据迁移和短暂停服后，Manus正式完成与Meta的拆分，创始团队继续掌舵这家通用智能体公司。

### 拆分正式落地

Manus宣布正式恢复独立运营，为一段罕见的所有权动荡画上阶段性句号。此前，Meta对Manus的收购在监管压力下被要求撤回。创始人肖弘、联合创始人张涛和首席科学家季逸超将继续领导公司。

这次公告意味着此前公布的过渡方案已经成为运营事实。部分用户在拆分期间需要备份并恢复数据，相关账户还经历了短暂的服务中断。Manus表示，已备份的数据没有恢复截止期限；未受此次调整影响的用户则无需操作。

这场拆分的复杂性并不止于公司股权。智能体产品的价值与用户历史记录、既有任务和外部工具权限密切相关，因此服务从一个运营主体转移到另一个主体时，还必须处理数据合规与连续性问题。路透社8月曾报道，为满足特定司法辖区的监管要求，部分用户在Meta于2025年12月完成收购后产生的数据需要删除。换言之，Manus不仅更换了法律和所有权结构，也不得不围绕新结构重建部分产品数据链路。

### 重新掌握产品方向

Manus目前将自己定位为独立的通用智能体实验室。公司称，未来产品将更深入嵌入日常工作流程，更直接地连接外部服务，并在获得授权后更主动地替用户执行任务。不过，本次公告没有同步发布新模型、融资安排或详细股权结构，这些承诺仍有待具体产品验证。

这件事的重要性在于，一笔规模达数十亿美元、已经完成的AI收购最终被逆转，而被收购公司仍继续运营。Manus由此成为一个少见案例，展示跨境监管如何在交易完成后继续改变AI公司的所有权、数据处理和产品可用范围。恢复独立只是第一步；接下来需要证明的是，在失去Meta的资本和基础设施支持后，它能否继续维持全球分发与产品迭代速度。

**原始信源**

- [Manus Resumes Independent Operations](https://manus.im/blog/manus-resumes-independent-operations)
- [AI startup Manus to resume independent operations as deal with Meta unwinds](https://www.investing.com/news/stock-market-news/ai-startup-manus-to-resume-independent-operations-as-deal-with-meta-unwinds-4852256)

原文链接：[Manus结束与Meta拆分，正式恢复独立运营｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/manus-resumes-independent-operations.html)

---

## 2. Ollama取消时段限额，云服务改按词元计费

Ollama以公开词元价格和月度积分池取代难以预测的GPU时长限制，并正式开放团队套餐。

### 从模糊时段转向可计算用量

Ollama为新签约的Pro、Max和Team套餐启用按词元计费，取代此前基于GPU使用时间以及五小时、每周窗口的限额方式。现有订阅者可以保留旧套餐，也可以主动切换至新规则。

Pro套餐每月收费20美元，包含60美元使用积分；Max每月100美元，包含300美元积分。新开放的Team套餐每月500美元，为不限人数的团队提供共享的1000美元积分池。积分每月刷新且不能结转；用完后，用户可以继续按照相同的公开词元价格付费，无需等待使用窗口重置。

免费套餐也有所扩大，用户每月可获得少量积分，用于指定的入门模型；如需调用完整模型目录，可以直接充值，无需先购买订阅。Ollama称平台不收取额外服务费，并会在账户中列出每次请求的具体成本。

### 从本地工具走向标准化云服务

这次调整让以本地运行开放模型起家的Ollama进一步进入云端推理市场。其云服务可以连接Claude Code、Codex等编程智能体，也提供直接调用接口。Ollama表示，请求由美国和欧洲的专用基础设施处理，少量Qwen模型还可选择新加坡节点；平台实行零数据保留，不记录提示词，也不会使用客户数据训练模型。

这项变化之所以值得关注，是因为持续运行的编程智能体往往会产生波动很大的词元消耗。相比GPU时间，按词元计费更便于比较不同模型和供应商，也更容易制定预算和审计成本。不过，Pro和Max所含积分达到订阅费三倍、Team达到两倍，并不自动意味着优惠；真正的价值仍取决于各模型的公开单价能否长期保持竞争力。新方案已经提高了可预测性，最终是否更省钱，则要由逐模型价格表决定。

**原始信源**

- [Ollama's transparent pricing](https://ollama.com/blog/transparent-pricing)
- [Ollama Pricing](https://ollama.com/pricing)

原文链接：[Ollama取消时段限额，云服务改按词元计费｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/ollama-adopts-token-pricing.html)

## 一句话快讯
- 努比亚 NaviX Ultra 智能体手机已在中国获入网许可，将于本月上市并内置字节跳动豆包助手。（[IT之家](https://www.ithome.com/0/997/105.htm)）
- DataAgent 获得1000万美元种子前融资，推出可在客户 Kubernetes 集群内诊断并修复生产故障的智能体。（[SiliconANGLE](https://siliconangle.com/2026/09/01/dataagent-raises-10m-to-let-ai-fix-production-faults-inside-kubernetes-clusters/)）
- Anthropic 宣布永久提高 Claude 使用额度25%，但部分用户称新计量方式反而降低了实际可用量。（[量子位](https://www.qbitai.com/2026/09/482406.html)）
- 阿里巴巴称，面向真实商业任务的 CommerceAgentBench 中，Qwen3.8-Max 在开放权重模型里综合表现最佳。（[Alibaba Qwen on X](https://x.com/Alibaba_Qwen/status/2094641743056732205)）
- Gradium 将新语音合成模型设为默认版本，称其困难样本通过率达81%，首段音频中位延迟为216毫秒。（[MarkTechPost](https://www.marktechpost.com/2026/08/31/gradium-ai-releases-new-default-tts-model-81-0-hard-case-pass-rate-at-216-ms-time-to-first-audio/)）
- Ollama 已支持开箱即用地启动 Muse Code 编程智能体框架，可连接本地或云端模型。（[Ollama on X](https://x.com/ollama/status/2094622506720391454)）
- GitHub 表示，Copilot 应用现可让用户从 AI 对话直接转入开发工作，无需切换界面。（[GitHub on X](https://x.com/github/status/2094608833255493900)）
- Together AI 将9月专用 H100 推理价格从每小时5.49美元降至3.99美元，新旧部署均自动适用。（[Together AI on X](https://x.com/togethercompute/status/2094583517015376237)）
- 英国央行行长警告，集中化的 AI 风险敞口及相互关联的融资可能放大金融体系冲击。（[SiliconANGLE](https://siliconangle.com/2026/08/31/bank-of-england-governor-warns-of-ai-related-financial-system-risks/)）
- 苹果提交证据称，一名前员工加入 OpenAI 前转移了机密芯片资料，其中包括一份电路原理图。（[TechCrunch](https://techcrunch.com/2026/08/31/apple-shares-shocking-evidence-against-former-employee-accused-of-stealing-company-data-for-openai/)）
- Keenable 开源搜索基准 NEEDLE，每小时重建新闻查询，并以统一协议评测15个搜索接口。（[MarkTechPost](https://www.marktechpost.com/2026/08/31/keenable-ai-open-sources-needle-a-live-search-benchmark-that-rebuilds-its-query-set-every-hour/)）
- Pika 使用相同输入生成手袋广告，对比了 Gemini Omni 1.1 Flash、Seedance 2.5 与 Wan 3.0。（[Pika on X](https://x.com/pika_labs/status/2094566257584705740)）
- Agent Arena 在超过8700项智能体任务上测得 Qwen3.8-Flash-Next 净提升2.4%，开放模型排名第七。（[Agent Arena on X](https://x.com/arena/status/2094566204488962483)）
- Vercel 的 v0 已接入 Claude Design，可把设计转化为全栈应用并直接部署上线。（[v0 on X](https://x.com/v0/status/2094565387690234305)）

---

完整日报：[9月1日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-09-01.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。