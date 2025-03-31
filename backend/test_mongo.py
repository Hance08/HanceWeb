from mongoengine import connect
from mongoengine.connection import get_db

def test_mongodb_connection():
    try:
        # 嘗試連接本地 MongoDB
        connect(
            db='test_database',
            host='10.0.2.22',  # 本地服務器
            port=27017,
            username='admin',  # 如果設置了認證
            password='010606',   # 如果設置了認證
            authentication_source='admin'
        )
        
        # 獲取數據庫實例
        db = get_db()
        
        # 測試連接
        db.command('ping')
        
        print("✅ MongoDB 連接成功！")
        print(f"數據庫名稱: {db.name}")
        print(f"數據庫版本: {db.command('serverStatus')['version']}")
        
        return True
    except Exception as e:
        print("❌ MongoDB 連接失敗！")
        print(f"錯誤信息: {str(e)}")
        return False

if __name__ == "__main__":
    test_mongodb_connection()