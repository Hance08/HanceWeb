FROM node:20-slim as build

# 添加一個構建時間變數，確保每次構建都不同
ARG BUILD_TIME=unknown
ENV BUILD_TIME=${BUILD_TIME}

WORKDIR /app

# 首先只複製 package.json，這樣 npm install 的結果可以被快取
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有源碼
COPY . .

# 清除舊的快取和構建產物
RUN rm -rf .angular/cache dist

# 強制生產環境構建
RUN echo "// 構建於: ${BUILD_TIME}" > src/assets/build-info.js && \
    npm run build -- --configuration=production

# 列出構建產物確認版本
RUN echo "=== 構建產物 ===" && \
    ls -la dist/frontend && \
    echo "${BUILD_TIME}" > dist/frontend/build-time.txt

# 使用 Nginx 映像作為運行環境
FROM nginx:alpine

# 複製構建產物到 Nginx 目錄
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# 複製 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 創建健康檢查文件
RUN echo "Build completed at $(date)" > /usr/share/nginx/html/build-info.txt

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 