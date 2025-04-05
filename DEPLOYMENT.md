# HanceWeb 部署指南

本指南將幫助您將 HanceWeb 應用程序部署到 Docker 環境中。

## 前置準備

1. 安裝 Docker 和 Docker Compose
2. 確保您有域名並已配置好 DNS 解析
3. 如需使用 HTTPS，準備好 SSL 證書

## 部署步驟

### 1. 確認環境變數

系統已經在 `backend/.env` 文件中配置了環境變數。請檢查該文件，確保以下配置正確：

- `SECRET_KEY` 應設置為安全的隨機字符串
- 確認郵件配置（EMAIL_HOST_USER, EMAIL_HOST_PASSWORD 等）
- 確保 `DEBUG=False`（生產環境）

如果需要修改配置，請直接編輯 `backend/.env` 文件。

### 2. 建立並啟動容器

在專案根目錄執行：

```bash
docker-compose up -d
```

這將在背景啟動前端和後端容器。

### 3. 檢查容器運行狀態

```bash
docker-compose ps
```

確保所有容器都處於 `Up` 狀態。

### 4. 訪問您的網站

現在您可以通過以下地址訪問您的網站：

- 前端網站: http://your-domain.com
- 後端 API: http://your-domain.com/api/

## 故障排除

### 查看容器日誌

```bash
# 查看前端容器日誌
docker-compose logs frontend

# 查看後端容器日誌
docker-compose logs backend
```

### 常見問題

1. **郵件發送失敗**：檢查您的郵件配置是否正確，特別是 Gmail 需要使用應用專用密碼。

2. **網站無法訪問**：檢查防火牆是否開放了 80 和 8000 端口。

3. **資料庫錯誤**：檢查後端容器日誌中的錯誤信息。

## 維護

### 更新應用

當需要更新應用時，請遵循以下步驟：

```bash
# 拉取最新代碼
git pull

# 重新構建並啟動容器
docker-compose up -d --build
```

### 備份數據

SQLite 數據庫文件位於 `backend-data` 卷中，可以使用以下命令進行備份：

```bash
docker-compose exec backend sh -c 'cp /app/db.sqlite3 /app/data/backup_$(date +%Y%m%d).sqlite3'
```

## 安全提示

1. 始終保持 Docker 和系統更新到最新版本
2. 定期檢查和更新容器中的依賴項
3. 考慮添加 HTTPS 支持以加密傳輸
4. 定期備份您的數據
5. 使用強密碼和密鑰

## 進階配置

### 配置 HTTPS

為了啟用 HTTPS，您需要修改 Nginx 配置並添加 SSL 證書。推薦使用 Certbot 和 Let's Encrypt 獲取免費證書。

### 添加負載均衡

如果您的網站流量增加，可以考慮添加負載均衡器，如 Nginx 或 HAProxy。 