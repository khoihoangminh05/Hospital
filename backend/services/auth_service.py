from extensions import mongo, bcrypt, mail
from datetime import datetime, timedelta , timezone
from flask_mail import Message
import jwt
from flask import current_app
from models.user_model import UserModel
import random
import string
from threading import Thread

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

def send_async_email(app, msg):
    with app.app_context():
        try:
            mail.send(msg)
            print("✅ Email OTP đã gửi thành công!")
        except Exception as e:
            print(f"❌ Lỗi gửi email: {e}")

def init_registration(data):
    email = data['email']
    
    # Check email tồn tại
    if mongo.db.users.find_one({'email': email}):
        return False, "Email này đã được sử dụng."

    otp_code = generate_otp()
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    pending_user = {
        "name": data['name'],
        "email": email,
        "phone": data['phone'],
        "password": hashed_password,
        "role": data.get('role', 'patient'),
        "doctorCode": data.get('doctorCode'),
        "nurseCode": data.get('nurseCode'),
        "otp": otp_code,
        "otp_exp": datetime.utcnow() + timedelta(minutes=10)
    }

    mongo.db.pending_users.update_one(
        {"email": email}, 
        {"$set": pending_user}, 
        upsert=True
    )

    # --- ĐOẠN GỬI MAIL (ĐÃ SỬA DÙNG THREAD) ---
    try:
        msg = Message("Mã xác thực đăng ký", recipients=[email])
        msg.body = f"Mã OTP của bạn là: {otp_code}. Mã có hiệu lực trong 10 phút."
        
        # Lấy app context thật để truyền vào thread
        app = current_app._get_current_object()
        
        # Tạo luồng chạy song song
        thr = Thread(target=send_async_email, args=(app, msg))
        thr.start()
        
        # Return ngay lập tức, KHÔNG chờ mail gửi xong
        return True, "Đang gửi mã xác thực, vui lòng kiểm tra email sau vài giây."
        
    except Exception as e:
        print(f"Lỗi tạo thread gửi mail: {e}")
        # Vẫn trả về True vì data đã lưu rồi
        return True, "Đã lưu thông tin. Hệ thống đang xử lý email..."
    
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
