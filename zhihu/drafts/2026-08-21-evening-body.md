这是「猫叔的AI资讯雷达」8月21日晚报。

本期由 AI 自动检索、筛选、撰写并附原始信源；时间口径按北京时间晚报窗口归档。

**今晚重点**：DeepSeek 推出多模态实验接口，将图像理解、可复用文件上传与智能体框架支持纳入 V4 Flash 产品线。

## 深度简报目录

- DeepSeek 为 V4 Flash 实验版接入视觉能力

## 快讯预览

- 据报道，Meta将斥资数亿美元采购微软AI服务，尽管它也在开发自己的模型与基础设施。
- 代码显示，三星Galaxy Z Flip8和Fold8可能加入由谷歌“Create My Widget”技术驱动的AI生成式小组件。
- 明略科技与海康机器人展示“智能体＋具身智能”合作方案，面向商业机器人场景落地。
- 雷鸟发布重34克的iO智能眼镜，主打全天候主动式AI助手及两天续航。
- 据报道，英伟达将收购Poolside的“模型工厂”并接收109名员工，交易价值达60亿美元。
- 腾讯Hy-MT2-1.8B及稀疏架构Hy-MT2-30B-A3B翻译模型已登陆OpenRouter，支持33种语言。
- 阿里巴巴发布Qwen3.8-27B的SGLang部署方案，结合NVFP4量化与DFlash2注意力技术。
- 深势科技推出桌面科研系统，让科学家提出问题后，由AI规划并执行实验工作流。
- MiniMax推出商业内容创作工具Design，提供多种创作技能，可制作动漫宣传片、体育推广素材等内容。
- Astromech融资2000万美元，估值达38亿美元，用于开发预测生物及进化变化的AI模型。

## 1. DeepSeek 为 V4 Flash 实验版接入视觉能力

DeepSeek 推出多模态实验接口，将图像理解、可复用文件上传与智能体框架支持纳入 V4 Flash 产品线。

### V4 Flash 补上视觉输入

DeepSeek 推出实验性多模态模型 DeepSeek-V4-Flash-Vision-Exp，并已在其 API 平台开放调用。该接口可同时接收图片和文字；DeepSeek 称，其文本能力与 DeepSeek-V4-Flash 基本持平。开发者只需指定 `deepseek-v4-flash-vision-exp` 即可使用，但此次上线没有同步提供可下载权重，也不代表模型已经进入正式生产阶段。

图片会被转换为计费令牌，沿用 V4-Flash 的价格，每张图最多计入 384 个令牌。较低的令牌上限有望降低截图、文档、图表和照片理解等任务的使用成本。不过，DeepSeek 尚未公布完整评测，图片分辨率和任务复杂度如何影响识别准确率，仍需开发者实际验证。

### 文件可成为智能体的长期输入

与新模型一同上线的还有 Files API。开发者上传一次图片后即可获得 `file_id`，后续请求可以直接引用，不必反复传输原始文件。DeepSeek 表示，这项文件功能目前免费。对于需要多轮查看同一张流程图、界面截图或参考图的智能体，这种方式可以节省带宽，也能简化应用逻辑。

官方演示还显示，该模型能够接入智能体框架并配合工具调用。它的价值因而不只在于回答图片相关问题：智能体可以先观察视觉状态，再判断下一步动作并调用工具，无需在独立的语言模型与视觉模型之间来回切换。

### 为何重要

原生图片输入补齐了 DeepSeek 现有 API 产品线的一项关键能力，也让价格较低的 Flash 型号更适合文档自动化、界面测试和视觉智能体。不过，“实验版”仍是重要限制：在开放权重、完整基准和生产稳定性承诺公布之前，这次更新更适合被视为面向开发者的试用，而非一款新的开放多模态基础模型。

**原始信源**

- [DeepSeek-V4-Flash-Vision-Exp API announcement](https://x.com/deepseek_ai/status/2090730032574631962)
- [DeepSeek multimodal API details](https://x.com/deepseek_ai/status/2090730039973392531)
- [DeepSeek Files API announcement](https://x.com/deepseek_ai/status/2090730042586489333)

原文链接：[DeepSeek 为 V4 Flash 实验版接入视觉能力｜猫叔的AI资讯雷达](https://mmlong818.github.io/ai-pulse/zh/articles/deepseek-v4-flash-gains-vision.html)

## 一句话快讯
- 据报道，Meta将斥资数亿美元采购微软AI服务，尽管它也在开发自己的模型与基础设施。（[The Decoder](https://the-decoder.com/meta-spends-hundreds-of-millions-on-microsofts-ai-services/)）
- 代码显示，三星Galaxy Z Flip8和Fold8可能加入由谷歌“Create My Widget”技术驱动的AI生成式小组件。（[IT之家](https://www.ithome.com/0/992/821.htm)）
- 明略科技与海康机器人展示“智能体＋具身智能”合作方案，面向商业机器人场景落地。（[量子位](https://www.qbitai.com/2026/08/476733.html)）
- 雷鸟发布重34克的iO智能眼镜，主打全天候主动式AI助手及两天续航。（[量子位](https://www.qbitai.com/2026/08/476628.html)）
- 据报道，英伟达将收购Poolside的“模型工厂”并接收109名员工，交易价值达60亿美元。（[The Decoder](https://the-decoder.com/nvidia-is-acquiring-poolsides-model-factory-and-109-employees-for-6-billion/)）
- 腾讯Hy-MT2-1.8B及稀疏架构Hy-MT2-30B-A3B翻译模型已登陆OpenRouter，支持33种语言。（[腾讯混元（X）](https://x.com/TencentHunyuan/status/2090711479809183943)）
- 阿里巴巴发布Qwen3.8-27B的SGLang部署方案，结合NVFP4量化与DFlash2注意力技术。（[通义千问（X）](https://x.com/Alibaba_Qwen/status/2090709994761339190)）
- 深势科技推出桌面科研系统，让科学家提出问题后，由AI规划并执行实验工作流。（[量子位](https://www.qbitai.com/2026/08/476591.html)）
- MiniMax推出商业内容创作工具Design，提供多种创作技能，可制作动漫宣传片、体育推广素材等内容。（[海螺AI（X）](https://x.com/Hailuo_AI/status/2090689260320129211)）
- Astromech融资2000万美元，估值达38亿美元，用于开发预测生物及进化变化的AI模型。（[SiliconANGLE](https://siliconangle.com/2026/08/20/astromech-raises-20m-to-build-a-biological-operating-system-that-can-forecast-evolutionary-change/)）
- Sourcegraph正式发布Code Finder，为编程智能体提供包含摘要、链接及代码行范围的精准仓库搜索结果。（[Sourcegraph（X）](https://x.com/Sourcegraph/status/2090601923145777544)）
- Simon Willison发现ChatGPT搜索正大规模使用限定网站查询，揭示其网页检索时定向访问特定域名的方式。（[Simon Willison’s Weblog](https://simonwillison.net/2026/Aug/20/chatgpt-search-now-uses-the-siteoperator-at-scale/)）
- Sakana AI为Sakana Translate升级新一代Namazu模型，重点改善日英自然翻译及文化语境理解。（[Sakana AI（X）](https://x.com/SakanaAILabs/status/2090586947047895536)）
- Arena称GLM-5.3 Max刷新Code Arena网页开发性价比前沿，并将在权重发布后位列开放模型第二。（[Arena（X）](https://x.com/arena/status/2090581559262798055)）

---

完整日报：[8月21日晚报网页](https://mmlong818.github.io/ai-pulse/zh/day/2026-08-21.html)

历史存档：[猫叔的AI资讯雷达存档](https://mmlong818.github.io/ai-pulse/zh/archive.html)



说明：本文为 AI 自动采编稿，所有事实以文中原始信源为准；如发现时间或事实错误，会在网页版本中优先修正。