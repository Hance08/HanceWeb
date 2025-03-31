# 個人作品集網站

這是一個使用 Angular 和 Django 構建的個人作品集網站。

## 技術棧

### 前端
- Angular 16
- Angular Material
- Tailwind CSS

### 後端
- Django
- Django REST Framework
- MongoDB (使用 Djongo)

## 功能
- 作品集展示
- 技能展示
- 聯絡表單
- 用戶認證

## 開始使用

### 前端設置
```bash
cd frontend
npm install
ng serve
```

### 後端設置
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

## API 端點

- `/api/projects/` - 作品集 CRUD
- `/api/skills/` - 技能 CRUD
- `/api/contacts/` - 聯絡表單
- `/api/token/` - JWT 認證
- `/api/token/refresh/` - 刷新 JWT 令牌

## 部署

### 前端
- 使用 Netlify/Vercel 部署

### 後端
- 使用 Heroku/DigitalOcean 部署
- MongoDB Atlas 用於數據庫

## 開發者

[您的名字] 