from flask import Blueprint, request, jsonify
from services.auth_service import register_user, login_user, init_registration, verify_registration

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
