# 猫叔的AI资讯雷达｜10月12日晚报：华为 Memento 3 靠递归学习通关 25 款游戏

这是「猫叔的AI资讯雷达」10月12日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：华为 Memento 3 通关 ARC-AGI-3 全部 25 款游戏，以外部世界模型学习规则，操作次数比人类少约 56%。

## 深度简报目录

- 华为 Memento 3 靠递归学习通关 25 款游戏
- 智谱灰度测试 GLM-5.3-Highspeed，传输速度达 490 tokens/s

## 快讯预览

- 据报道，Google DeepMind的AlphaProof Nexus解决了数十个开放数学问题，并获得同行评审。
- Sakana AI联合加州大学伯克利研究人员提出通过多智能体自监督实现递归式自我改进。
- 技术创新研究院发布Falcon-ASR阿拉伯语语音模型，参数量16亿，报告词错误率20.92%。
- BotMan AI利用知识图谱改造遗留系统，并在软件迁移过程中连接企业数据。
- Milvus宣布将在Tokyo AI分享可靠智能体实践，主题包括记忆、执行状态与恢复。
- SWE-Duel提出可自扩展竞技场，通过不断加难的软件工程任务评估编程智能体。
- SpireBench通过测试智能体模型在《杀戮尖塔》中的表现，评估长期战略决策能力。
- 一篇新论文研究语言模型的自我保全行为，考察系统是否会抵抗关闭或替换。
- 研究人员系统梳理针对人工智能智能体的攻击方式，涵盖工具调用和自主执行带来的漏洞。
- EliteTable提出用于可执行控制策略的自我改进程序搜索，目标是提升自动决策系统能力。

## 1. 华为 Memento 3 靠递归学习通关 25 款游戏

华为 Memento 3 通关 ARC-AGI-3 全部 25 款游戏，以外部世界模型学习规则，操作次数比人类少约 56%。

华为诺亚方舟实验室与伦敦大学学院研究团队表示，智能体系统 Memento 3 已完成 ARC-AGI-3 公共测试集中的 25 款游戏、183 个关卡，并拿到 100 分的 RHAE 成绩。系统总计执行 7518 次操作，而人类完成同一批关卡需要 17135 次；此前最强基线则用了 8347 次。

### 把学习放到模型之外

Memento 3 的核心方法被称为“代码即模型”。智能体探索陌生游戏时，会持续维护一份规则手册，同时把对环境的假设写成可执行的 Python 代码。它先在内部世界模型中推演动作，再把预测画面与真实观察逐格比较；一旦出现偏差，就修改规则和代码。

这种递归自我改进并不依赖重新训练底层模型，而是通过积累、校正外部知识实现。在一项实验中，同时维护两个相互竞争的世界模型后，某款游戏的通关操作次数从 899 次降至 597 次。研究团队还使用类似 Git 的版本管理记录每次修改，必要时可以回滚错误假设。

### 探索完成后交给程序执行

最有说服力的演示来自 Atari《乒乓》。Claude Opus 5 先探索游戏规律并完善运动模型，之后由基于该模型生成的程序独立运行，不再调用语言模型，连续三局均以 21 比 0 获胜。没有世界模型、只根据画面逐步决策的基线，表现几乎和随机操作一样。

这项工作的重要性，在于它把智能体学习的重点从参数更新转向可检查的任务记忆与模拟器。但它还不能证明递归自我改进已具备普适性：实验环境规则紧凑，探索阶段仍依赖昂贵的前沿模型。更现实的价值，是为“先学习、再验证、最后低成本执行”的智能体架构提供了一个可复现案例。

**原始信源**

- [华为AI靠RSI通关25款游戏！操作次数比人类少56%](https://www.qbitai.com/2026/10/502654.html)
- [Memento 3 research paper](https://arxiv.org/abs/2610.11794)

原文链接：[华为 Memento 3 靠递归学习通关 25 款游戏｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/huawei-memento-recursive-game-learning.html)

---

## 2. 智谱灰度测试 GLM-5.3-Highspeed，传输速度达 490 tokens/s

智谱据报在 Zcode 灰度开放 GLM-5.3-Highspeed，用户实测接近每秒 490 tokens，但尚未正式发布模型。

智谱似乎正在其编程产品 Zcode 中灰度测试新模型 GLM-5.3-Highspeed。量子位报道称，部分订阅用户已获得体验资格；一名用户晒出的测试结果显示，模型生成速度接近每秒 490 tokens。

### 这是速度信号，不是正式发布

如果这一吞吐量能够稳定复现，它将明显高于智谱近期推出的 GLM-5.3-FlashX。后者此前宣称最高速度为每秒 200 tokens；按 490 tokens/s 计算，生成 1 万 tokens 的纯输出阶段约需 20 秒，可能改变长代码任务和智能体工作流的交互节奏。

但目前证据仍然有限。490 tokens/s 来自用户截图，而非统一公开基准；量子位用自己的账号测试时也没有获得访问权限。报道所称模型只向随机抽中的 Zcode 用户开放，智谱尚未公开权重、API 文档、价格或可复现实测。

模型目录信息显示，它可能拥有 100 万 tokens 上下文、131072 tokens 最大输出，以及低、高、最高三档思考强度。不过，这些规格与普通版 GLM-5.3 的信息相近，暂时只能视为待确认配置，不能当作正式产品文档。

### 为什么仍值得关注

如果高速度不是局部演示效果，而能在真实调用中维持，它会特别适合需要反复调用模型、且单次输出较长的编程智能体。当模型质量已经够用时，缩短等待时间可能比再提高一点榜单分数更直接地影响使用体验，也会迫使竞争对手围绕“多久得到可用结果”展开竞争。

现阶段真正可靠的事实，是智谱正在尝试把高速推理能力嵌入编码产品。490 tokens/s 仍是未经独立验证的灰度数据；在官方公布访问条件和第三方测量前，它代表技术方向，而不是已经成熟的市场能力。

**原始信源**

- [智谱新模型，490 tokens/s！](https://www.qbitai.com/2026/10/502649.html)

原文链接：[智谱灰度测试 GLM-5.3-Highspeed，传输速度达 490 tokens/s｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/zhipu-glm-highspeed-gray-release.html)

## 一句话快讯
- 据报道，Google DeepMind的AlphaProof Nexus解决了数十个开放数学问题，并获得同行评审。（[The Decoder](https://the-decoder.com/google-deepminds-alphaproof-nexus-solved-dozens-of-open-math-problems-and-actually-got-peer-reviewed/)）
- Sakana AI联合加州大学伯克利研究人员提出通过多智能体自监督实现递归式自我改进。（[Sakana AI](https://x.com/SakanaAILabs/status/2109547739034108168)）
- 技术创新研究院发布Falcon-ASR阿拉伯语语音模型，参数量16亿，报告词错误率20.92%。（[MarkTechPost](https://www.marktechpost.com/2026/10/11/tii-falcon-asr-arabic-speech-recognition/)）
- BotMan AI利用知识图谱改造遗留系统，并在软件迁移过程中连接企业数据。（[SiliconANGLE](https://siliconangle.com/2026/10/11/botman-ai-uses-knowledge-graphs-for-legacy-modernization-neo4jdatatoknowledge/)）
- Milvus宣布将在Tokyo AI分享可靠智能体实践，主题包括记忆、执行状态与恢复。（[X / Milvus](https://x.com/milvusio/status/2109443140239458474)）
- SWE-Duel提出可自扩展竞技场，通过不断加难的软件工程任务评估编程智能体。（[arXiv](https://arxiv.org/abs/2610.12569)）
- SpireBench通过测试智能体模型在《杀戮尖塔》中的表现，评估长期战略决策能力。（[arXiv](https://arxiv.org/abs/2610.12596)）
- 一篇新论文研究语言模型的自我保全行为，考察系统是否会抵抗关闭或替换。（[arXiv](https://arxiv.org/abs/2610.12602)）
- 研究人员系统梳理针对人工智能智能体的攻击方式，涵盖工具调用和自主执行带来的漏洞。（[arXiv](https://arxiv.org/abs/2610.12524)）
- EliteTable提出用于可执行控制策略的自我改进程序搜索，目标是提升自动决策系统能力。（[arXiv](https://arxiv.org/abs/2610.12536)）
- Know What You Don’t Know提出演化生成空间的智能体数据合成方法，用于闭环学习。（[arXiv](https://arxiv.org/abs/2610.12593)）
- Fly-by-Code提出用于空中操作的具身编程智能体，结合主动视觉与物理反馈。（[arXiv](https://arxiv.org/abs/2610.12549)）
- SpireBench、SWE-Duel等论文显示，智能体评测正转向持久性、策略性和现实交互能力。（[arXiv](https://arxiv.org/abs/2610.12561)）
- Cloudflare发布Apache-2.0许可的30B-A3B模型Clef-omni，可在一次调用中评估文本、图像、音频和视频。（[MarkTechPost](https://www.marktechpost.com/2026/10/11/cloudflare-clef-omni-multimodal-decision-model/)）

---

完整日报：[10月12日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-10-12.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。