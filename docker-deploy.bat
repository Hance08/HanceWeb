@echo off
echo ==== Starting Docker Deployment ====

REM Check Docker installation
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker is not installed. Please install Docker Desktop.
    pause
    exit /b 1
)

echo Docker is installed. Proceeding with deployment...

REM Go to project directory
cd HanceWeb

REM Build and start containers
echo Building and starting containers...
docker-compose up -d --build

REM Check container status
echo Checking container status...
timeout /t 5 /nobreak >nul
docker-compose ps

echo ===== Deployment complete! =====
echo Frontend: http://localhost
echo Backend API: http://localhost:8000/api/
echo To stop services, run: docker-compose down

pause 