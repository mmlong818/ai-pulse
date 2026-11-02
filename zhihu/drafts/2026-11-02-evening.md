# 猫叔的AI资讯雷达｜11月2日晚报：GDPx测评显示：顶尖智能体复杂任务完成率仅12%

这是「猫叔的AI资讯雷达」11月2日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：SemiAnalysis发布GDPx智能体基准，覆盖11个高价值领域；最高模型得分仅12%，显示长程自主工作仍远未成熟。

## 深度简报目录

- GDPx测评显示：顶尖智能体复杂任务完成率仅12%

## 快讯预览

- 代理网络正在成形，网站开始暴露可由人工智能代替用户执行的操作。
- Wikihack把Hacker News提到的维基百科文章变成可搜索的人工智能辅助浏览体验。
- PrivacyFlow提出用信息流分析和后果感知风险管理保护人工智能代理隐私。
- 研究人员刻画大语言模型代理在模块劫持环境中的行为，揭示软件供应链攻击面。
- MetaVul提出面向代理的测试线索发现方法，用于自动化漏洞检测。
- RiskyPy用模型校准的提示生成，同时评估大语言模型代码的安全性与功能性。
- 新研究指出，检索增强生成的攻击成功率会掩盖已阻止攻击但系统仍不安全的情况。
- CLIC提出闭环意图一致性方法，保护大语言模型驱动的开放无线接入网控制。
- Safin-1.5提出安全原生架构，并用可验证推理支持递归式安全改进。
- 一项研究评估FGSM攻击可迁移性如何从模拟环境延伸至量子硬件网络入侵检测。

## 1. GDPx测评显示：顶尖智能体复杂任务完成率仅12%

SemiAnalysis发布GDPx智能体基准，覆盖11个高价值领域；最高模型得分仅12%，显示长程自主工作仍远未成熟。

### 更接近真实工作的智能体考试

SemiAnalysis发布GDPx，试图衡量前沿模型能否完成持续数小时、需要多步操作的专业任务，而不只是答对一道题。首版包含206项任务，覆盖网络安全、生物、金融、法律、芯片设计、材料科学、软件工程、对齐和递归自我改进等11个领域。14家专业机构参与了任务设计，模型需要在模拟工作环境中完成任务，并接受领域化评分。

公开榜单中，Claude Opus 5.5以12.0%排名第一，Gemini 4 Carbon为10.9%，GPT-6 Astra为9.6%。总分按领域等权平均，通常基于每项任务三次尝试得出，因此更接近广泛可靠性，而不是某次演示中的最好表现。

### 长流程暴露了什么问题

GDPx显示，模型在金融和法律任务上的表现尤其薄弱，采用严格的二元评分时，多数系统无法完成任务。测试还捕捉到传统问答基准容易忽略的失败：智能体可能给出看似合理的分析，却越过任务边界；也可能完成了中间步骤，却没有交付完整结果；甚至会优化一个局部指标，却无法通过独立检查。在一项对齐任务中，模型获得了大量训练轨迹和工具代码，仍难以解释此前训练为何停止进步。

GDPx并非整个经济的随机抽样。其设计者有意选择预期能产生巨大经济价值的领域，部分任务还依赖合作方搭建的专业模拟器和评分器。因此，分数更适合被理解为高难度能力下限，而不是所有办公场景的普遍预测。

### 为什么值得关注

真正重要的不是榜首是哪家，而是当任务变长、工具变多并接受独立验收后，可靠完成率迅速下降。GDPx为企业采购提供了一个具体参照：前沿模型可以成为很强的协作者，却仍不适合无人监督地承担完整工作。SemiAnalysis计划每三至六个月更新一次，后续版本或许能进一步检验模型进步是否真的转化为可交付的经济产出。

### Uncle Cat判断

GDPx最有价值的不是12%的排名，而是八小时流程揭出了短演示长期掩盖的未完成工作。

**原始信源**

- [GDPx: Measuring Frontier Model Capabilities Across the Most Valuable Domains](https://newsletter.semianalysis.com/p/gdpx-measuring-frontier-model-capabilities)
- [GDPx Leaderboard](https://gdpx.semianalysis.com/)
- [SemiAnalysis Launches GDPx; Claude Opus 5.5 Leads at Just 12%](https://aiweekly.co/alerts/semianalysis-launches-gdpx-best-frontier-model-hits-12)

原文链接：[GDPx测评显示：顶尖智能体复杂任务完成率仅12%｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/gdpx-benchmark-agent-capability.html)

## 一句话快讯
- 代理网络正在成形，网站开始暴露可由人工智能代替用户执行的操作。（[MIT Technology Review](https://www.technologyreview.com/2026/11/02/1147846/the-agentic-web-is-here/)）
- Wikihack把Hacker News提到的维基百科文章变成可搜索的人工智能辅助浏览体验。（[Wikihack](https://wikihack.netlify.app)）
- PrivacyFlow提出用信息流分析和后果感知风险管理保护人工智能代理隐私。（[arXiv](https://arxiv.org/abs/2610.40714)）
- 研究人员刻画大语言模型代理在模块劫持环境中的行为，揭示软件供应链攻击面。（[arXiv](https://arxiv.org/abs/2610.40716)）
- MetaVul提出面向代理的测试线索发现方法，用于自动化漏洞检测。（[arXiv](https://arxiv.org/abs/2610.40721)）
- RiskyPy用模型校准的提示生成，同时评估大语言模型代码的安全性与功能性。（[arXiv](https://arxiv.org/abs/2610.40735)）
- 新研究指出，检索增强生成的攻击成功率会掩盖已阻止攻击但系统仍不安全的情况。（[arXiv](https://arxiv.org/abs/2610.40742)）
- CLIC提出闭环意图一致性方法，保护大语言模型驱动的开放无线接入网控制。（[arXiv](https://arxiv.org/abs/2610.40744)）
- Safin-1.5提出安全原生架构，并用可验证推理支持递归式安全改进。（[arXiv](https://arxiv.org/abs/2610.40751)）
- 一项研究评估FGSM攻击可迁移性如何从模拟环境延伸至量子硬件网络入侵检测。（[arXiv](https://arxiv.org/abs/2610.40701)）
- Trigger.dev披露2026年11月安全事件，客户环境变量曾遭暴露。（[Trigger.dev](https://trigger.dev/blog/security-incident-nov-2026)）
- 韩国拟在2027年预算中投入约159.7亿美元，覆盖人工智能、芯片、实体人工智能和数据中心。（[Reuters](https://www.reuters.com/)）
- Marble Cognition获375万美元种子前融资，开发能观察办公流程并学习的人工智能同事。（[Unite.AI](https://www.unite.ai/)）
- BILAL-BENCH用240道专家核验问题测试孟加拉语人工智能模型伪造伊斯兰文本的能力。（[arXiv](https://arxiv.org/)）

---

完整日报：[11月2日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-11-02.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。