from extensions import mongo, bcrypt
from datetime import datetime, timedelta , timezone
import jwt
from flask import current_app
from models.user_model import UserModel

VALID_ROLES = ["patient", "doctor", "nurse", "admin"]

def register_user(data):
    users = mongo.db.users

    if users.find_one({"email": data["email"]}):
        return False, "Email đã được sử dụng"

    password_hash = bcrypt.generate_password_hash(
        data["password"]
    ).decode("utf-8")

    user = UserModel(
        name=data["name"],
        email=data["email"],
        phone=data["phone"],
        password_hash=password_hash,
        role=data["role"],
        doctor_code=data.get("doctorCode"),
        nurse_code=data.get("nurseCode"),
    )

    users.insert_one(user.to_dict())

    return True, "Đăng ký thành công"


def login_user(data):
    users = mongo.db.users

    user = users.find_one({"email": data["email"]})
    if not user:
        return False, "Email hoặc mật khẩu không đúng"

    if not bcrypt.check_password_hash(user["password"], data["password"]):
        return False, "Email hoặc mật khẩu không đúng"

    # Sử dụng timezone UTC chuẩn để tránh lỗi lệch giờ server
    expiration_time = datetime.now(timezone.utc) + timedelta(hours=2)

    payload = {
        "user_id": str(user["_id"]),
        "role": user["role"],
        "exp": expiration_time
    }

    # Encode dùng algorithm (số ít) là đúng
    token = jwt.encode(
        payload,
        current_app.config["JWT_SECRET"],
        algorithm="HS256"
    )

    return True, {
        "accessToken": token,
        "user": {
            "_id": str(user["_id"]), # Nên trả về cả ID để frontend dùng
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }
