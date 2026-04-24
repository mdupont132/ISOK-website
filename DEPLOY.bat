@echo off
echo =========================================
echo  ISOK Website — Deploy to GitHub/Vercel
echo =========================================
echo.

REM Copy all website files to Desktop ISOK Website folder
set DST=%USERPROFILE%\OneDrive\Desktop\ISOK Website

echo Copying updated files...
copy /Y "%~dp0index.html"      "%DST%\"
copy /Y "%~dp0facility.html"   "%DST%\"
copy /Y "%~dp0partners.html"   "%DST%\"
copy /Y "%~dp0leadership.html" "%DST%\"
copy /Y "%~dp0styles.css"      "%DST%\"
copy /Y "%~dp0animations.js"   "%DST%\"
copy /Y "%~dp0vercel.json"     "%DST%\"

REM Create images folder
if not exist "%DST%\images" mkdir "%DST%\images"
if exist "%~dp0images\" xcopy /Y /E "%~dp0images\" "%DST%\images\"

echo.
echo Committing and pushing to GitHub...
cd /d "%DST%"
git add .
git commit -m "ISOK website update - multi-page rebuild"
git push origin main

echo.
echo =========================================
echo  DONE! Vercel will auto-deploy in ~30s
echo  Visit: https://isokacademy.com
echo =========================================
pause
