from extensions import mongo, bcrypt, mail
from datetime import datetime, timedelta , timezone
from flask_mail import Message
import jwt
from flask import current_app
from models.user_model import UserModel
import random
import string

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


def generate_otp():
    return ''.join(random.choices(string.digits, k=6))

# Bước 1: Khởi tạo đăng ký - Lưu tạm & Gửi OTP
def init_registration(data):
    email = data['email']
    
    # Check email đã tồn tại trong bảng Users chính chưa
    if mongo.db.users.find_one({'email': email}):
        return False, "Email này đã được sử dụng."

    # Tạo OTP
    otp_code = generate_otp()

    
    
    # Hash password trước khi lưu tạm
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    # Dữ liệu lưu tạm (có thời hạn)
    pending_user = {
        "name": data['name'],
        "email": email,
        "phone": data['phone'],
        "password": hashed_password,
        "role": data.get('role', 'patient'),
        "doctorCode": data.get('doctorCode'),
        "nurseCode": data.get('nurseCode'),
        "otp": otp_code,
        "otp_exp": datetime.utcnow() + timedelta(minutes=10) # Hết hạn sau 10p
    }

    # Lưu vào collection pending_users (dùng update_one với upsert để ghi đè nếu đăng ký lại)
    mongo.db.pending_users.update_one(
        {"email": email}, 
        {"$set": pending_user}, 
        upsert=True
    )
    

    # Gửi Email
    try:
        msg = Message("Mã xác thực đăng ký - Bệnh viện Tự Nhiên",
                      recipients=[email])
        msg.body = f"Mã OTP của bạn là: {otp_code}. Mã có hiệu lực trong 10 phút."
        print(mail)
        mail.send(msg)
        
        return True, "Mã xác thực đã được gửi đến email của bạn."
    except Exception as e:
        print(e)
        return False, "Lỗi gửi email. Vui lòng kiểm tra lại địa chỉ email."

# Bước 2: Xác thực OTP & Tạo User thật
def verify_registration(email, otp):
    pending_user = mongo.db.pending_users.find_one({"email": email})

    if not pending_user:
        return False, "Yêu cầu đăng ký không tồn tại hoặc đã hết hạn."

    # Check OTP
    if pending_user['otp'] != otp:
        return False, "Mã xác thực không chính xác."

    # Check hạn OTP
    if datetime.utcnow() > pending_user['otp_exp']:
        return False, "Mã xác thực đã hết hạn."

    # Chuyển sang bảng Users thật
    new_user = {
        "name": pending_user['name'],
        "email": pending_user['email'],
        "phone": pending_user['phone'],
        "password": pending_user['password'], # Đã hash ở bước 1
        "role": pending_user['role'],
        "createdAt": datetime.utcnow()
    }
    
    # Nếu là bác sĩ/y tá thì thêm code
    if pending_user.get('doctorCode'):
        new_user['doctorCode'] = pending_user['doctorCode']
    if pending_user.get('nurseCode'):
        new_user['nurseCode'] = pending_user['nurseCode']

    mongo.db.users.insert_one(new_user)
    
    # Xóa khỏi bảng pending
    mongo.db.pending_users.delete_one({"email": email})

    return True, "Đăng ký thành công!"
