from flask import Blueprint, request, jsonify
from services.auth_service import register_user, login_user, init_registration, verify_registration, request_password_reset, reset_password
import socket

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    required = ["name", "email", "phone", "password", "role"]
    for f in required:
        if not data.get(f):
            return jsonify({"message": f"Thiếu {f}"}), 400

    success, result = register_user(data)

    if not success:
        return jsonify({"message": result}), 400

    return jsonify({"message": result}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data.get("email") or not data.get("password"):
        return jsonify({"message": "Thiếu email hoặc mật khẩu"}), 400

    success, result = login_user(data)

    if not success:
        return jsonify({"message": result}), 401

    return jsonify(result), 200

@auth_bp.route("/register-init", methods=["POST"])
def register_init():
    data = request.get_json()
    # ... (Validate dữ liệu đầu vào như cũ) ...
    
    success, message = init_registration(data)
    if not success:
        return jsonify({"message": message}), 400
    return jsonify({"message": message}), 200

@auth_bp.route("/register-verify", methods=["POST"])
def register_verify():
    data = request.get_json()
    email = data.get('email')
    otp = data.get('otp')
    
    if not email or not otp:
        return jsonify({"message": "Thiếu thông tin xác thực"}), 400

    success, message = verify_registration(email, otp)
    if not success:
        return jsonify({"message": message}), 400
    return jsonify({"message": message}), 201

@auth_bp.route('/debug-connection', methods=['GET'])
def debug_connection():
    host = 'smtp.gmail.com'
    ports = [587, 465, 25, 2525] # Các cổng thường dùng cho mail
    results = {}

    for port in ports:
        try:
            # Thử kết nối TCP trong 3 giây
            s = socket.create_connection((host, port), timeout=3)
            s.close()
            results[str(port)] = "✅ CONNECTED (Thông mạng)"
        except socket.timeout:
            results[str(port)] = "❌ TIMEOUT (Mạng chậm hoặc bị chặn)"
        except ConnectionRefusedError:
            results[str(port)] = "❌ REFUSED (Server từ chối)"
        except OSError as e:
            results[str(port)] = f"❌ UNREACHABLE (Lỗi mạng: {str(e)})"
        except Exception as e:
            results[str(port)] = f"❌ ERROR: {str(e)}"

    return jsonify({
        "server": host,
        "results": results
    })

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password_route():
    data = request.get_json()
    email = data.get('email')
    
    if not email:
        return jsonify({'message': 'Vui lòng nhập email'}), 400

    success, message = request_password_reset(email)
    
    if success:
        return jsonify({'message': message}), 200
    return jsonify({'message': message}), 400

# 2. API Đổi mật khẩu (Nhập Email + OTP + Pass Mới)
@auth_bp.route('/reset-password', methods=['POST'])
def reset_password_route():
    data = request.get_json()
    email = data.get('email')
    otp = data.get('otp')
    new_password = data.get('newPassword')

    if not all([email, otp, new_password]):
        return jsonify({'message': 'Vui lòng điền đầy đủ thông tin'}), 400

    success, message = reset_password(email, otp, new_password)

    if success:
        return jsonify({'message': message}), 200
    return jsonify({'message': message}), 400
