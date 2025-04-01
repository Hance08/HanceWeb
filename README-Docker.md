# Docker部署指南

這份文檔說明如何使用Docker部署個人作品集網站。

## 前提條件

- 安裝 [Docker](https://docs.docker.com/get-docker/)
- 安裝 [Docker Compose](https://docs.docker.com/compose/install/)

## 快速開始

1. 克隆或下載本項目

2. 修改環境變數(可選)
   在 `docker-compose.yml` 文件中，您可以根據需要修改環境變數：
   - `SECRET_KEY`: 修改為安全的密鑰
   - 郵件設置: 配置您自己的郵件服務帳號
   - MongoDB連接: 如需要，可以更改MongoDB連接設置

3. 構建並啟動服務

   ```bash
   cd HanceWeb
   docker-compose up -d
   ```

4. 訪問網站
   - 前端: http://localhost (port 80)
   - 後端API: http://localhost:8000/api/

## 服務說明

本Docker部署包含三個主要服務:

1. **frontend**: Angular前端應用
   - 使用Nginx作為Web服務器
   - 端口映射: 80:80

2. **backend**: Django後端API
   - 運行在Gunicorn上
   - 端口映射: 8000:8000

3. **mongo**: MongoDB數據庫
   - 使用標準MongoDB鏡像
   - 端口映射: 27017:27017
   - 數據持久化在Docker卷中

## 常用命令

- 啟動所有服務: `docker-compose up -d`
- 查看日誌: `docker-compose logs -f`
- 停止所有服務: `docker-compose down`
- 重新構建服務: `docker-compose build`
- 重新啟動單個服務: `docker-compose restart <服務名稱>`

## 更新應用

當您更新代碼後，需要重新構建和部署Docker容器:

```bash
docker-compose down
docker-compose build
docker-compose up -d
```

## 生產環境部署提示

- 更改所有默認密碼和密鑰
- 配置HTTPS
- 限制MongoDB訪問
- 考慮使用Docker Swarm或Kubernetes進行擴展 