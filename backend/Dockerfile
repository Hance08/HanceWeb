FROM python:3.10-slim

# 添加構建時間變數
ARG BUILD_TIME=unknown
ENV BUILD_TIME=${BUILD_TIME}

WORKDIR /app

# 複製依賴列表
COPY requirements.txt .

# 安裝依賴
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install gunicorn

# 複製所有源碼
COPY . .

# 創建必要的目錄
RUN mkdir -p logs data

# 記錄構建時間
RUN echo "Backend built at: ${BUILD_TIME}" > build-info.txt

# 開放端口
EXPOSE 8000

# 創建啟動腳本
RUN echo '#!/bin/sh\n\n\
# 確保日誌目錄存在\n\
mkdir -p /app/logs\n\
\n\
# 設置日誌檔案權限\n\
touch /app/logs/debug.log\n\
touch /app/debug.log\n\
chmod 666 /app/logs/debug.log\n\
chmod 666 /app/debug.log\n\
\n\
# 顯示構建信息\n\
echo "Starting backend built at: $(cat /app/build-info.txt)"\n\
\n\
# Apply database migrations\n\
python manage.py makemigrations\n\
python manage.py migrate\n\
\n\
# 啟動 Gunicorn\n\
echo "Starting Gunicorn server on 0.0.0.0:8000..."\n\
exec gunicorn --bind 0.0.0.0:8000 --workers 3 --timeout 120 portfolio.wsgi:application\n\
' > entrypoint.sh

# 設置腳本權限
RUN chmod +x entrypoint.sh

# 設置啟動命令
CMD ["./entrypoint.sh"] 