@echo off
chcp 65001 >nul
echo ========================================================
echo   🚀 BSEBTimes™ - GitHub Upload Helper Script
echo ========================================================
echo.

git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed or not in PATH!
    pause
    exit /b 1
)

echo Step 1: Checking Git status...
git add .
git commit -m "feat: complete BSEBTimes platform with Class 10/12 syllabi, OMR simulator, and subjective Q&A" >nul 2>&1

echo.
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    for /f "delims=" %%i in ('git remote get-url origin') do set CURRENT_REMOTE=%%i
    echo Current remote origin is: %CURRENT_REMOTE%
    set /p REPO_URL="Press ENTER to use this, or enter new GitHub Repo URL: "
    if not "%REPO_URL%"=="" (
        git remote set-url origin %REPO_URL%
    )
) else (
    echo No remote repository configured yet.
    echo Please create a new repo at: https://github.com/new
    echo.
    set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/username/bsebtimes.git): "
    if "%REPO_URL%"=="" (
        echo [ERROR] Repository URL cannot be empty.
        pause
        exit /b 1
    )
    git remote add origin %REPO_URL%
)

echo.
echo Step 2: Pushing to branch 'main'...
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   ✅ SUCCESS! Your project is now on GitHub!
    echo   👉 Check FRONTEND_HOSTING_GUIDE.md to deploy in 1-click
    echo ========================================================
) else (
    echo.
    echo [NOTICE] Push failed or was cancelled.
    echo If this is your first time, check your GitHub credentials or Personal Access Token.
)

echo.
pause
