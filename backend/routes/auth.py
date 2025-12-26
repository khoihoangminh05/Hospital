from flask import Blueprint, request, jsonify
from services.auth_service import register_user, login_user

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
