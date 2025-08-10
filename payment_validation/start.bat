@echo off
echo Starting Payment Validation Server...
echo =====================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if dependencies are installed
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Start the server
echo.
echo Server starting on http://localhost:3001
echo.
echo Available endpoints:
echo   GET  /health                    - Health check
echo   POST /api/validate-payment     - Payment validation
echo   POST /api/authorize-card      - Card authorization ($1 charge + refund)
echo   GET  /api/bin-lookup/:bin     - BIN lookup
echo   POST /api/detect-card-type    - Card type detection
echo.
echo Press Ctrl+C to stop the server
echo.

node src/index.js
