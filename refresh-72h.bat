@echo off
chcp 65001 >nul
cd /d "%~dp0"
set AIPULSE_WINDOW_HOURS=72
set AIPULSE_RADAR_COUNT=20
echo [%date% %time%] FULL REFRESH start (72h window) >> daily.log

node generate.mjs 8 >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] FULL REFRESH FAILED at batch1 >> daily.log
  exit /b 1
)

set AIPULSE_SKIP_RADAR=1
node generate.mjs 6 >> daily.log 2>&1
if errorlevel 1 echo [%date% %time%] batch2 failed, continue with batch1 >> daily.log
set AIPULSE_SKIP_RADAR=

node build.mjs >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] FULL REFRESH FAILED at build >> daily.log
  exit /b 1
)

git add -A >> daily.log 2>&1
git commit -m "full refresh: 72h window, complete re-edition with full source system" >> daily.log 2>&1
git push origin main >> daily.log 2>&1
node submit-indexnow.mjs >> daily.log 2>&1
echo [%date% %time%] FULL REFRESH published >> daily.log
