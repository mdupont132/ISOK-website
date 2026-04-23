@echo off
echo Starting ISOK Website...
start "" "http://localhost:3000"
npx --yes serve . -p 3000
pause
