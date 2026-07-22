@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo [%date% %time%] AI Pulse daily run start >> daily.log

node generate.mjs 4 >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] generate FAILED, skip publish >> daily.log
  exit /b 1
)

node build.mjs >> daily.log 2>&1
if errorlevel 1 (
  echo [%date% %time%] build FAILED, skip publish >> daily.log
  exit /b 1
)

git add -A >> daily.log 2>&1
git commit -m "daily: auto briefing %date%" >> daily.log 2>&1
git push origin main >> daily.log 2>&1
node submit-indexnow.mjs >> daily.log 2>&1
echo [%date% %time%] published >> daily.log
