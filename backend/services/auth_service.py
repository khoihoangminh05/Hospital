from extensions import mongo, bcrypt
from datetime import datetime, timedelta, timezone
import jwt
from flask import current_app
from models.user_model import UserModel
import random
import string
from services.email_service import send_otp_email
import resend
import os

resend.api_key = os.environ.get("RESEND_API_KEY")

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

    expiration_time = datetime.now(timezone.utc) + timedelta(hours=2)

    payload = {
        "user_id": str(user["_id"]),
        "role": user["role"],
        "exp": expiration_time
    }

    token = jwt.encode(
        payload,
        current_app.config["JWT_SECRET"],
        algorithm="HS256"
    )

    return True, {
        "accessToken": token,
        "user": {
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "role": user["role"]
        }
    }


def generate_otp():
    return ''.join(random.choices(string.digits, k=6))


def init_registration(data):
    email = data["email"]

    if mongo.db.users.find_one({"email": email}):
        return False, "Email này đã được sử dụng."

    otp_code = generate_otp()
    hashed_password = bcrypt.generate_password_hash(
        data["password"]
    ).decode("utf-8")

    pending_user = {
        "name": data["name"],
        "email": email,
        "phone": data["phone"],
        "password": hashed_password,
        "role": data.get("role", "patient"),
        "doctorCode": data.get("doctorCode"),
        "nurseCode": data.get("nurseCode"),
        "otp": otp_code,
        "otp_exp": datetime.utcnow() + timedelta(minutes=10)
    }

    mongo.db.pending_users.update_one(
        {"email": email},
        {"$set": pending_user},
        upsert=True
    )

    # ✅ GỬI MAIL QUA EMAIL API (KHÔNG SMTP)
    try:
        send_otp_email(email, otp_code)
        return True, "Đang gửi mã xác thực, vui lòng kiểm tra email."
    except Exception as e:
        print("❌ Lỗi gửi OTP:", e)
        return True, "Đã lưu thông tin, email sẽ được gửi lại sau."


def verify_registration(email, otp):
    pending_user = mongo.db.pending_users.find_one({"email": email})

    if not pending_user:
        return False, "Yêu cầu đăng ký không tồn tại hoặc đã hết hạn."

    if pending_user["otp"] != otp:
        return False, "Mã xác thực không chính xác."

    if datetime.utcnow() > pending_user["otp_exp"]:
        return False, "Mã xác thực đã hết hạn."

    new_user = {
        "name": pending_user["name"],
        "email": pending_user["email"],
        "phone": pending_user["phone"],
        "password": pending_user["password"],
        "role": pending_user["role"],
        "createdAt": datetime.utcnow()
    }

    if pending_user.get("doctorCode"):
        new_user["doctorCode"] = pending_user["doctorCode"]
    if pending_user.get("nurseCode"):
        new_user["nurseCode"] = pending_user["nurseCode"]

    mongo.db.users.insert_one(new_user)
    mongo.db.pending_users.delete_one({"email": email})

    return True, "Đăng ký thành công!"

def send_reset_email(to_email, otp_code):
    try:
        html_content = f"""
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Yêu cầu đặt lại mật khẩu</h2>
                <p>Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản Bệnh viện Tự Nhiên.</p>
                <p>Mã xác thực (OTP) của bạn là:</p>
                <h1 style="color: #1A73E8; letter-spacing: 5px;">{otp_code}</h1>
                <p>Mã này có hiệu lực trong <b>10 phút</b>.</p>
                <p>Nếu không phải bạn yêu cầu, vui lòng bỏ qua email này.</p>
            </div>
        """

        resend.Emails.send({
            "from": "onboarding@resend.dev", # Lưu ý: Nếu chưa add domain riêng thì chỉ gửi được về email chính chủ
            "to": to_email,
            "subject": "Đặt lại mật khẩu - Bệnh viện Tự Nhiên",
            "html": html_content
        })
        print(f"✅ Đã gửi mail reset tới {to_email}")
        return True
    except Exception as e:
        print(f"❌ Lỗi gửi mail Resend: {e}")
        return False

# --- 2. LOGIC YÊU CẦU QUÊN MẬT KHẨU ---
def request_password_reset(email):
    # Tìm user
    user = mongo.db.users.find_one({"email": email})
    if not user:
        return False, "Email không tồn tại trong hệ thống."

    # Tạo OTP
    otp_code = ''.join(random.choices(string.digits, k=6))
    
    # Lưu OTP vào chính bản ghi user (hoặc bảng riêng password_resets)
    # Kèm thời gian hết hạn (10 phút)
    mongo.db.users.update_one(
        {"email": email},
        {"$set": {
            "reset_token": otp_code,
            "reset_token_exp": datetime.utcnow() + timedelta(minutes=10)
        }}
    )

    # Gửi mail (Chạy thẳng hoặc cho vào Thread nếu muốn nhanh hơn)
    send_reset_email(email, otp_code)
    
    return True, "Mã xác thực đã được gửi tới email của bạn."

# --- 3. LOGIC ĐẶT LẠI MẬT KHẨU MỚI ---
def reset_password(email, otp, new_password):
    user = mongo.db.users.find_one({"email": email})
    
    if not user:
        return False, "Email không đúng."
    
    # Kiểm tra OTP có khớp không
    if user.get('reset_token') != otp:
        return False, "Mã OTP không chính xác."
    
    # Kiểm tra hết hạn
    if user.get('reset_token_exp') < datetime.utcnow():
        return False, "Mã OTP đã hết hạn. Vui lòng yêu cầu lại."

    # Hash mật khẩu mới
    hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')

    # Cập nhật mật khẩu và xóa token cũ
    mongo.db.users.update_one(
        {"email": email},
        {"$set": {
            "password": hashed_password,
            "reset_token": None,
            "reset_token_exp": None
        }}
    )

    return True, "Đặt lại mật khẩu thành công. Hãy đăng nhập ngay."
