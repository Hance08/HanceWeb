@echo off
echo ===== Hance Web Docker 部署 =====

REM 檢查 Docker 安裝
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Docker 未安裝。請安裝 Docker Desktop。
    pause
    exit /b 1
)

REM 進入專案目錄
cd %~dp0

REM 設置構建時間環境變數
set BUILD_TIME=%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2%%time:~6,2%
echo 構建時間：%BUILD_TIME%

REM 徹底清理 Docker 環境
echo 正在清理 Docker 環境...
docker-compose down --rmi all -v
docker system prune -af --volumes

REM 暫停一下以確保完全清理
timeout /t 2 /nobreak >nul

REM 清理構建緩存
echo 正在清理前端構建緩存...
rmdir /s /q frontend\.angular\cache 2>nul
rmdir /s /q frontend\dist 2>nul

REM 構建和啟動容器
echo 正在構建和啟動容器...
set BUILD_TIME=%BUILD_TIME%
docker-compose build --no-cache
docker-compose up -d

REM 檢查容器狀態
echo 檢查容器狀態...
timeout /t 10 /nobreak >nul
docker-compose ps

REM 顯示構建信息
echo 正在獲取構建信息...
curl http://localhost/build-info

echo ===== 部署完成! =====
echo 前端: http://localhost
echo 後端 API: http://localhost:8000/api/

REM 自動打開瀏覽器
timeout /t 5 /nobreak >nul
start "" http://localhost

pause 