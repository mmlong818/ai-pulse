# 猫叔的 AI 资讯雷达：换机运行手册

这份文档用于把项目迁移到另一台 Windows 机器继续自动运行。仓库里不保存任何 API token、账号密码或私有配置；所有密钥只放在目标机器的用户级环境变量里。

## 1. 新机器准备

需要安装并确认可用：

- Git，并能推送到 `mmlong818/ai-pulse` 的 `main` 分支。
- Node.js 18 或更高版本。
- Codex CLI，并完成 ChatGPT 登录；`node generate.mjs 6` 会调用 `codex exec` 无人值守模式采编。
- 可访问 GitHub、GitHub Pages、X API、IndexNow。

克隆项目：

```powershell
git clone https://github.com/mmlong818/ai-pulse.git
cd ai-pulse
```

本项目目前零 npm 依赖，不需要 `npm install`。

## 2. 必填环境变量

用 PowerShell 写入用户级环境变量。不要把实际值写进仓库、README、日志或截图。

```powershell
[Environment]::SetEnvironmentVariable('X_BEARER_TOKEN', '<x bearer token>', 'User')
[Environment]::SetEnvironmentVariable('X_API_KEY', '<x api key>', 'User')
[Environment]::SetEnvironmentVariable('X_API_SECRET', '<x api secret>', 'User')
[Environment]::SetEnvironmentVariable('X_ACCESS_TOKEN', '<x access token>', 'User')
[Environment]::SetEnvironmentVariable('X_ACCESS_SECRET', '<x access token secret>', 'User')
```

写入后重新打开 PowerShell，再验证：

```powershell
node post-x.mjs verify
node post-x.mjs preview
```

注意：

- `X_BEARER_TOKEN` 用于读取 X 动态和发布后检查。
- `X_API_KEY`、`X_API_SECRET`、`X_ACCESS_TOKEN`、`X_ACCESS_SECRET` 用于发帖。
- X Developer App 必须开启写权限。若 `node post-x.mjs verify` 或发帖返回 `401 Unauthorized`，通常是 OAuth 写 token 不是最新的，或权限不是 `Read and write`；需要在 X Developer 后台重新生成 Access Token and Secret。
- 同一台机器上如果 Codex/终端进程里也有旧的 X 环境变量，当前脚本会优先读取用户级环境变量，减少计划任务拿错旧 token 的风险。

## 3. 本地验证

先只做不发帖的检查：

```powershell
node --check generate.mjs
node --check build.mjs
node --check post-x.mjs
node post-x.mjs verify
node post-x.mjs preview
node build.mjs
```

手动跑一班完整采编会产生内容、构建页面并可能触发后续发布流程；换机当天建议先看预览再决定是否跑：

```powershell
node generate.mjs 6
node refresh-volatile.mjs
node build.mjs
```

本地预览：

```powershell
node serve.mjs
```

然后打开 `http://127.0.0.1:3898/ai-pulse/`。

## 4. 安装自动任务

推荐用仓库脚本创建 Windows 计划任务：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-ai-pulse-task.ps1
```

这会创建 `AI Pulse Daily`，每天北京时间本机时间 `07:00` 和 `19:00` 运行 `run-daily.bat`。

如果希望机器重启后即使无人登录也能运行，用：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-ai-pulse-task.ps1 -RunWhetherLoggedOn
```

这个模式会让 Windows 弹出凭据输入，凭据由 Windows 计划任务保存，不进入仓库。

安装后检查：

```powershell
Get-ScheduledTask -TaskName 'AI Pulse Daily' | Format-List
Get-ScheduledTaskInfo -TaskName 'AI Pulse Daily' | Format-List
```

## 5. 日常运行入口

自动任务只调用：

```powershell
.\run-daily.bat
```

主要流程：

1. `git pull --ff-only origin main`
2. `node generate.mjs 6`
3. `node refresh-volatile.mjs`
4. `node build.mjs`
5. `node zhihu-evening.mjs`
6. `git add -A && git commit && git push`
7. `node wait-pages.mjs`
8. `node submit-indexnow.mjs`
9. `node post-x.mjs daily`

日志写入 `daily.log`。出现问题时先看最后 200 行：

```powershell
Get-Content -Encoding UTF8 .\daily.log -Tail 200
```

## 6. X 发布注意事项

当前 X 发布策略：

- 中文和英文都会发主帖。
- 主帖不放外链，链接放在第一条回复。
- 同一天早报/晚报的回复文本会带班次，避免被 X 认为重复。
- 如果链接回复失败，脚本会继续发布后续语言主帖，不让回复失败拖死整班。
- 发布后会检查链接回复是否包含正确引用页；检查接口遇到临时网络错误会重试。

如果 API 发帖继续出现 `401 Unauthorized`：

1. 确认 `node post-x.mjs verify` 是否成功。
2. 确认 X Developer App 权限是 `Read and write`。
3. 重新生成 Access Token and Secret。
4. 重新写入用户级环境变量。
5. 重新打开 PowerShell 再验证。

临时补发命令：

```powershell
node post-x.mjs preview
node post-x.mjs daily
node post-x.mjs post "文本"
node post-x.mjs reply <tweet_id> "回复文本"
node post-x.mjs check <tweet_id> zh
node post-x.mjs check <tweet_id> en
```

## 7. 知乎晚报

晚班会生成知乎草稿：

- `zhihu/drafts/latest-evening-title.txt`
- `zhihu/drafts/latest-evening-body.md`
- `zhihu/drafts/latest-evening-body.html`
- `zhihu/drafts/latest-evening.json`

发知乎时标题用 `latest-evening-title.txt`，正文用 `latest-evening-body.md` 或 `latest-evening-body.html`。不要把 `latest-evening.md` 整篇贴进正文，避免标题重复。

## 8. 换机前最后检查

旧机器切走前确认：

```powershell
git status --short
git log --oneline --max-count 5
git push origin main
```

新机器接手后确认：

```powershell
git pull --ff-only origin main
node post-x.mjs verify
node post-x.mjs preview
Get-ScheduledTaskInfo -TaskName 'AI Pulse Daily' | Format-List
```

剩余高风险点只有一个：X OAuth 写 token 过期或权限错误时，网页和 GitHub Pages 会正常更新，但 X API 发帖会失败。遇到这种情况不要改代码，先刷新 X Developer Access Token and Secret。
