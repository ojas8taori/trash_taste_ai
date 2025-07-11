@echo off
echo Starting EcoBin AI Scanner...
echo.

REM Set environment variables for Windows
set NODE_ENV=development

REM Create uploads directory if it doesn't exist
if not exist "uploads" mkdir uploads

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

REM Check if GEMINI_API_KEY is set
if "%GEMINI_API_KEY%"=="" (
    echo WARNING: GEMINI_API_KEY environment variable is not set!
    echo Please set your Gemini API key:
    echo set GEMINI_API_KEY=your_api_key_here
    echo.
    echo You can get a free API key from: https://makersuite.google.com/app/apikey
    echo.
    pause
    exit /b 1
)

echo Starting development server...
echo The application will be available at: http://localhost:5000
echo.

REM Run the development server
tsx server/index.ts