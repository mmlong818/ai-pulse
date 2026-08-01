这是「猫叔的AI资讯雷达」8月1日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：OpenAI 公布下一代主力模型家族 Astra，同时放出十项长期未解的数学与理论计算机科学难题解法，全部附带 Lean 形式化证明。

## 深度简报目录

- OpenAI 以十项数学新成果揭幕新模型 Astra
- 慕尼黑法院判 Suno 训练与输出双重侵权
- Supabase 开源编程智能体实战评测套件 Evals

## 快讯预览

- 全程无遥操机器人比赛全国决赛在北京开赛，200 多支队伍同场竞技冲击冠军。
- Sakana AI 开放「Sakana AI Insider」订阅登记，作为这家东京研究实验室对外发布动态的渠道。
- 一位刚离职的 OpenAI 员工公开喊话前同事：想套现就赶紧套，别等 IPO，并提示估值风险。
- 李飞飞旗下 World Labs 收购 SceniX，物理 AI 训练正从「采集真实数据」转向大规模「造世界」。
- Ollama 已在其云端上线 DeepSeek-V4-Flash-0731，让本地优先的用户也能直接调用这一版增强的智能体能力。
- 黄仁勋称此前不玩 X 是因为自己太内向，如今为了 AI 必须站出来公开发声。
- LlamaIndex 宣布将于 8 月 4 至 6 日参展拉斯维加斯 Ai4 大会，Jerry Liu 将发表演讲，并在展区设置展台。
- 欧莱雅首次亮相 WAIC，展示生成式 AI 美妆顾问与美发魔镜，并称已有 7.3 万名员工完成生成式 AI 培训。
- Runway 宣布 Grok Imagine Video 1.5 已上线其平台，创作者可与 Runway 自有工具搭配使用 xAI 的视频模型。
- LMArena 称 DeepSeek-V4-Flash-High 在前端代码竞技场得 1586 分，总榜第七、开源第三，并重塑了性价比帕累托前沿。

## 1. OpenAI 以十项数学新成果揭幕新模型 Astra

OpenAI 公布下一代主力模型家族 Astra，同时放出十项长期未解的数学与理论计算机科学难题解法，全部附带 Lean 形式化证明。

OpenAI 周五公布了被其称为「下一代主力模型家族」的 Astra，发布方式颇为特别：一次性放出十项数学与理论计算机科学的研究成果，每项都附带 Lean 形式化证明和思维链推演过程。

### 放出了什么

OpenAI 表示，这些数学论证由 Astra 的内部版本给出，人类研究员再用同一个模型把结果整理成论文。十个问题横跨高维几何、编码理论、群论、量子复杂性、格密码与极值组合。其中包括：把球堆积密度的上界推进到 Cohn–Elkies 阈值、在给定最小距离下对二元码规模上界的指数级改进，以及对冯·诺依曼代数中 Connes 刚性猜想的反证。

最受关注的一项是构造出非 sofic 群——一个不满足 Gromov 可逼近条件的无限有限表现群，解决了他 1999 年提出、悬置至今的问题。OpenAI 研究员 Sébastien Bubeck 在 X 上称，十份证明全部配有可机器校验的 Lean 证书，并同步开放了 `openai/ten-proofs` 仓库。OpenAI 称这十个问题至少十年无人推进，多数问题空置时间更久。

### 定位与成本

OpenAI 把 Astra 定义为面向长周期任务的模型类别，可协调多个智能体连续工作数小时甚至数天，与现有 Sol、Terra、Luna 三档并列，最终产品命名尚未确定。研究员 Noam Brown 称这是科学推理能力的重要一步，并强调单题投入并不高——十项成果按 API 价格折算约合 2000 美元。曼彻斯特大学的 Thomas Bloom 等审阅者认为结果分量不小。OpenAI 表示自己对准确性负责，但把数学论证本身的功劳归于模型。

### 为何重要

此前 AI 在开放数学问题上的贡献多是小幅改进界或辅助人类主导的证明。一次拿出十项悬置十年以上的成果，配上让「能否验证」这一质疑失效的 Lean 证书，成本又只在数千美元量级，性质已经不同。这也为 Astra 的上线定下调子：OpenAI 称它将是美国新框架下首个需经政府审查才能公开发布的模型，这份能力清单既是科研成绩，也是一份监管说明书。

**原始信源**

- [Ten advances in mathematics and theoretical computer science | OpenAI](https://openai.com/index/ten-advances-in-mathematics/)
- [OpenAI announces its "next major model" Astra by dropping ten previously unsolved math solutions](https://the-decoder.com/openai-announces-its-next-major-model-astra-by-dropping-ten-previously-unsolved-math-solutions/)
- [Sébastien Bubeck on X: nonsofic groups exist](https://x.com/SebastienBubeck/status/2083456300692979886)

原文链接：[OpenAI 以十项数学新成果揭幕新模型 Astra｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/openai-astra-ten-math-proofs.html)

---

## 2. 慕尼黑法院判 Suno 训练与输出双重侵权

德国慕尼黑第一地方法院认定 AI 音乐生成工具 Suno 在训练与生成两端均构成侵权，并驳回其美式「合理使用」抗辩；Suno 称不认同判决，正评估包括上诉在内的选项。

德国慕尼黑第一地方法院 7 月 31 日裁定，AI 音乐生成工具 Suno 侵犯了德国音乐著作权集体管理组织 GEMA 所持有的版权，且训练环节与输出环节均需承担责任。

### 法院认定了什么

法院认为，Suno 的模型「记住」了 GEMA 曲库中的六首歌曲，涉及 Kristina Bach、Frank Farian 等人的作品。当输入歌名、风格标签和歌词、但不给出具体音乐参数时，系统生成的内容被法院认定与原作受保护部分构成实质性相似。责任归于 Suno 而非用户：训练素材由公司挑选，导致记忆现象的架构也由公司设计。

Suno 曾以美国「合理使用」抗辩。法院直接适用美国法审查这一主张并予以否定，认为四项要素全部不利于该公司，并与此前美国相关诉讼作出区分——本案中训练素材通过用户可获取的输出重新浮现。卷宗还显示 Suno 使用「录制抓取」工具从 YouTube 提取音频，绕过了平台的 Rolling Cipher 保护措施；这一行为在版权争议之外单独构成违法。

Suno 已作出回应，称不认同该判决，认为其建立在对自家技术、平台实际使用方式以及美国法律适用的错误理解之上，并表示正在评估包括上诉在内的一切可选方案。GEMA 首席执行官 Tobias Holzmüller 则表示，判决表明建立在窃取知识产权之上的 AI 模型不受法律保护，AI 提供方必须获得授权。该判决尚未生效。

### 为何重要

这是首个在输入与输出两端同时认定生成式音乐公司承担责任的实质判决，而且发生在一个并不存在合理使用制度的司法辖区——法院仍完整走了一遍美国的四要素检验，并判定不成立。对音乐生成产品而言，「记忆」认定是更棘手的一环：它把训练数据泄漏这一原本偏学术的隐忧，变成了权利人只需几条提示词就能演示的责任标准。绕过技术保护措施的情节更让局面雪上加霜，因为这类主张与法院如何看待模型训练完全无关。

现实后果是，任何在德国上线的音乐模型都面临一套明确的检验标准，欧洲其他地区的权利人也拿到了可复制的诉讼模板。Suno 表示正在权衡的上诉，将决定这套论证能走多远；但无论结果如何，它势必被慕尼黑之外广泛引用——包括正在美国推进类似诉讼的三大唱片公司。

**原始信源**

- [German court rules AI music generator Suno violated copyrights, rejects fair use defense](https://the-decoder.com/german-court-rules-ai-music-generator-suno-violated-copyrights-rejects-fair-use-defense/)
- [GEMA wins court ruling on breach of copyright by AI music firm Suno — Music Week](https://www.musicweek.com/publishing/read/gema-wins-court-ruling-on-breach-of-copyright-by-ai-music-firm-suno/094644)
- [Suno Held Liable for Infringing German Song Copyrights in Landmark Court Ruling — Billboard](https://www.billboard.com/pro/suno-liable-gema-german-copyright-lawsuit/)

原文链接：[慕尼黑法院判 Suno 训练与输出双重侵权｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/munich-court-suno-copyright-ruling.html)

---

## 3. Supabase 开源编程智能体实战评测套件 Evals

Supabase 发布 Apache-2.0 协议的 Evals 基准，在真实数据库、认证与部署任务上给 Claude Code、Codex 与 OpenCode 打分。

Supabase 开源了 Evals——一套衡量编程智能体在其平台上完成真实工作能力的基准测试，框架与首轮成绩均以 Apache-2.0 协议放在 `supabase/evals` 仓库中。

### 怎么测

这套测试不是静态提示词，而是在容器化的 Supabase 环境中跑真实场景，并从三个维度切分覆盖面：产品（数据库、认证、存储、边缘函数）、主题（行级安全、安全配置、数据迁移、原生 SQL）和工作阶段（构建、部署、排查、修复）。评分混用确定性检查（迁移是否成功执行、策略是否真的限制了访问）与难以断言部分的 LLM 裁判打分。

在构建阶段任务上，Claude Code 搭配 Opus 5 以及搭配 Kimi K3 均在不加载任何 Supabase 专用 skills 的情况下拿到 100%。中小模型对这类脚手架的依赖明显更重：Sonnet 5 从 78% 提升到 100%，GPT-5.6 Sol 从 89% 到 100%，GPT-5.4 mini 从 78% 到 89%。Supabase 对此的总结是：skills 对最强模型作用最小，对最弱模型作用最大。

失败分析可能比榜单本身更有价值。智能体普遍倾向手写迁移脚本而不用声明式 schema 文件，验证认证时也倾向手动核对而非调用现成库——两种习惯都能通过测试，却会在生产环境出问题。查文档的行为差异也很大：Codex 每个场景约读 8 篇文档，Claude Code 只读约 2 篇。

### 为何重要

多数智能体基准测的是代码能不能跑。这套测的是智能体是否按平台维护者认可的方式操作一个具体的生产平台，更接近团队真正会外包出去的工作。这也给其他基础设施厂商提供了可复制的范式：平台方最有资格定义自家产品上的「正确做法」，把它写成可运行的 Apache-2.0 测试集，等于把文档变成可执行规范。

skills 的结果也切中当下关于智能体能力来源的争论。如果一份写得好的 skill 文件能为中档模型补上 22 个百分点的差距，那么很大一部分看起来像模型能力的东西其实是上下文工程——而这恰恰是更便宜的那一半。

**原始信源**

- [Supabase Releases Evals: an Open Source Benchmark That Scores Claude Code, Codex and OpenCode on Real Supabase Tasks](https://www.marktechpost.com/2026/08/01/supabase-releases-evals-an-open-source-benchmark-that-scores-claude-code-codex-and-opencode-on-real-supabase-tasks/)

原文链接：[Supabase 开源编程智能体实战评测套件 Evals｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/supabase-open-source-agent-evals.html)

## 一句话快讯
- 全程无遥操机器人比赛全国决赛在北京开赛，200 多支队伍同场竞技冲击冠军。（[IT之家](https://www.ithome.com/0/984/608.htm)）
- Sakana AI 开放「Sakana AI Insider」订阅登记，作为这家东京研究实验室对外发布动态的渠道。（[X @SakanaAILabs](https://x.com/SakanaAILabs/status/2083466234016976956)）
- 一位刚离职的 OpenAI 员工公开喊话前同事：想套现就赶紧套，别等 IPO，并提示估值风险。（[量子位](https://www.qbitai.com/2026/08/464693.html)）
- 李飞飞旗下 World Labs 收购 SceniX，物理 AI 训练正从「采集真实数据」转向大规模「造世界」。（[量子位](https://www.qbitai.com/2026/08/464532.html)）
- Ollama 已在其云端上线 DeepSeek-V4-Flash-0731，让本地优先的用户也能直接调用这一版增强的智能体能力。（[X @ollama](https://x.com/ollama/status/2083411055284232268)）
- 黄仁勋称此前不玩 X 是因为自己太内向，如今为了 AI 必须站出来公开发声。（[量子位](https://www.qbitai.com/2026/08/464452.html)）
- LlamaIndex 宣布将于 8 月 4 至 6 日参展拉斯维加斯 Ai4 大会，Jerry Liu 将发表演讲，并在展区设置展台。（[X @llama_index](https://x.com/llama_index/status/2083389543521062990)）
- 欧莱雅首次亮相 WAIC，展示生成式 AI 美妆顾问与美发魔镜，并称已有 7.3 万名员工完成生成式 AI 培训。（[量子位](https://www.qbitai.com/2026/08/464364.html)）
- Runway 宣布 Grok Imagine Video 1.5 已上线其平台，创作者可与 Runway 自有工具搭配使用 xAI 的视频模型。（[X @runwayml](https://x.com/runwayml/status/2083364502544978295)）
- LMArena 称 DeepSeek-V4-Flash-High 在前端代码竞技场得 1586 分，总榜第七、开源第三，并重塑了性价比帕累托前沿。（[X @arena](https://x.com/arena/status/2083348755559207047)）
- Genspark 回顾了在帕洛阿尔托总部举办的社区共建之夜，由其湾区「Genspark Genius」成员主持。（[X @genspark_ai](https://x.com/genspark_ai/status/2083344526010466716)）
- xAI 升级 Grok Imagine Video 1.5：最多支持七张参考图、跨镜头声音一致性、纯文本生视频，并原生输出 1080p。（[TestingCatalog](https://www.testingcatalog.com/xai-adds-character-references-and-1080p-to-imagine-video-1-5/)）
- Simon Willison 表示无状态 MCP 重新激起了他对该协议的兴趣，并由此写出了 mcp-explorer 与 datasette-mcp。（[Simon Willison](https://simonwillison.net/2026/Jul/31/stateless-mcp/)）
- Willison 同时发布 llm-mcp-client 0.1a0 预览版插件，让其 LLM 命令行工具可以调用 MCP 服务器提供的工具。（[Simon Willison](https://simonwillison.net/2026/Jul/31/llm-mcp-client/)）

---

完整日报：[8月1日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-08-01.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。