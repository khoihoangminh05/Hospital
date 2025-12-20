# app/routes/auth.py
from flask import Blueprint, request, jsonify
from app.services.auth_service import AuthService

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    role = data.get("role", "patient")

    if not username or not password:
        return jsonify({"message": "Missing data"}), 400

    success, error = AuthService.register(username, password, role)
    if error:
        return jsonify({"message": error}), 400

    return jsonify({"message": "Register successful"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    result, error = AuthService.login(username, password)
    if error:
        return jsonify({"message": error}), 401

    return jsonify(result), 200
