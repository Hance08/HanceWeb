# 環境變數設定指南

## 概述

本專案使用環境變數來管理敏感資料，如郵件帳號、密碼等。這種方式能確保敏感資料不會被直接寫入代碼，也不會被提交到版本控制系統中。

## 設定步驟

1. 複製範例環境變數文件並重命名
   ```bash
   cp .env.example .env
   ```

2. 編輯 `.env` 文件，填入您的實際資料：
   - `EMAIL_HOST_USER`: 您的郵件帳號 (例如: contact@hanceweb.com)
   - `EMAIL_HOST_PASSWORD`: 您的郵件密碼或應用密碼
   - `DEFAULT_FROM_EMAIL`: 顯示的發件人 (例如: Hance Web <contact@hanceweb.com>)
   - `ADMIN_EMAIL`: 接收聯絡表單通知的管理員郵箱

3. 如果使用Gmail作為郵件服務提供商，您需要：
   - 在Google帳戶中啟用「低安全性應用程式存取權」，或
   - 建立並使用「應用程式密碼」(推薦)

## Gmail應用程式密碼設定步驟

1. 登入您的Google帳戶
2. 前往「安全性」設定 (https://myaccount.google.com/security)
3. 在「登入Google」部分，點選「應用程式密碼」
4. 選擇「應用程式」下拉清單中的「其他(自訂名稱)」
5. 輸入「HanceWeb聯絡表單」
6. Google會為您生成一個16位字元的密碼
7. 複製此密碼並貼到您的 `.env` 文件的 `EMAIL_HOST_PASSWORD` 設定中

## 重要注意事項

- **請勿**將 `.env` 文件提交到版本控制系統 (已在 `.gitignore` 中設定)
- 在部署到生產環境時，請使用不同的密碼和安全設定
- 定期更換密碼以確保安全
- 考慮使用密碼管理工具來生成和存儲強密碼 