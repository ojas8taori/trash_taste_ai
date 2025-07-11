@echo off
echo Starting EcoBin AI Scanner...
echo.

REM Check if GEMINI_API_KEY is set
if "%GEMINI_API_KEY%"=="" (
    echo WARNING: GEMINI_API_KEY environment variable is not set!
    echo Please set your Gemini API key first:
    echo.
    echo   set GEMINI_API_KEY=your_api_key_here
    echo.
    echo You can get a free API key from: https://makersuite.google.com/app/apikey
    echo.
    pause
    exit /b 1
)

REM Create uploads directory if it doesn't exist
if not exist "uploads" mkdir uploads

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
) else (
    echo Checking for missing dependencies...
    npm install --silent
    echo.
)

echo Starting development server...
echo The application will be available at: http://127.0.0.1:5000
echo.

REM Set host to IPv4 localhost for Windows compatibility
set HOST=127.0.0.1

REM Use npm script which handles cross-env automatically
npm run dev