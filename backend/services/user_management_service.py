from extensions import mongo, bcrypt
from bson import ObjectId
from datetime import datetime

def get_all_users_admin():
    # Lấy tất cả user, sắp xếp mới nhất
    users = list(mongo.db.users.find({}).sort("createdAt", -1))
    results = []
    for u in users:
        results.append({
            "id": str(u['_id']),
            "name": u.get('name', ''),
            "email": u.get('email', ''),
            "phone": u.get('phone', ''),
            "role": u.get('role', 'user'),
            "status": u.get('status', 'active'),
            "createdAt": u.get('createdAt', datetime.utcnow()).isoformat()
        })
    return results

def create_user_admin(data):
    try:
        if mongo.db.users.find_one({"email": data['email']}):
            return False, "Email đã tồn tại"

        # Hash password
        raw_pass = data.get('password', '123456')
        hashed_password = bcrypt.generate_password_hash(raw_pass).decode('utf-8')

        new_user = {
            "name": data['name'],
            "email": data['email'],
            "phone": data.get('phone', ''),
            "password": hashed_password,
            "role": data.get('role', 'user'),
            "status": data.get('status', 'active'),
            "createdAt": datetime.utcnow()
        }

        mongo.db.users.insert_one(new_user)
        return True, "Tạo người dùng thành công"
    except Exception as e:
        return False, str(e)

def update_user_admin(user_id, data):
    try:
        update_data = {
            "name": data.get('name'),
            "phone": data.get('phone'),
            "role": data.get('role'),
            "status": data.get('status')
        }

        # Nếu có gửi password mới thì hash và cập nhật
        if data.get('password'):
            hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            update_data['password'] = hashed_password

        mongo.db.users.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )
        return True, "Cập nhật thành công"
    except Exception as e:
        return False, str(e)

def delete_user_admin(user_id):
    try:
        # Chặn không cho xóa chính mình hoặc Super Admin (logic tuỳ chọn)
        # Ở đây xóa thẳng
        mongo.db.users.delete_one({"_id": ObjectId(user_id)})
        return True, "Đã xóa người dùng"
    except Exception as e:
        return False, str(e)