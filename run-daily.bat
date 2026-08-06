@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo [%date% %time%] The Attention Post daily run start >> daily.log

git pull --ff-only origin main >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] git pull FAILED, skip publish >> daily.log
  exit /b 1
)

node generate.mjs 6 >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] generate FAILED, skip publish >> daily.log
  exit /b 1
)

node refresh-volatile.mjs >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] volatile refresh FAILED, skip publish >> daily.log
  exit /b 1
)

node build.mjs >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] build FAILED, skip publish >> daily.log
  exit /b 1
)

node zhihu-evening.mjs >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] Zhihu evening draft FAILED, continue publish >> daily.log
)

git add -A >> daily.log 2>&1
git diff --cached --quiet >> daily.log 2>&1
if not errorlevel 1 (
  echo [%date% %time%] no changes, skip publish >> daily.log
  exit /b 0
)

git commit -m "daily: auto briefing %date%" >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] git commit FAILED, skip publish >> daily.log
  exit /b 1
)

git push origin main >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] git push FAILED, skip IndexNow and X >> daily.log
  exit /b 1
)

node wait-pages.mjs >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] Pages deploy FAILED, skip IndexNow and X >> daily.log
  exit /b 1
)

node submit-indexnow.mjs >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] IndexNow FAILED, skip X >> daily.log
  exit /b 1
)

node post-x.mjs daily >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] X post FAILED >> daily.log
  exit /b 1
)
echo [%date% %time%] published >> daily.log
