# app/services/auth_service.py
import bcrypt
from app.models.user_model import UserModel
from flask_jwt_extended import create_access_token

class AuthService:
    @staticmethod
    def register(username, password, role):
        if UserModel.find_by_username(username):
            return None, "Username already exists"

        UserModel.create_user(username, password, role)
        return True, None

    @staticmethod
    def login(username, password):
        user = UserModel.find_by_username(username)
        if not user:
            return None, "Invalid credentials"

        if not bcrypt.checkpw(password.encode("utf-8"), user["password"]):
            return None, "Invalid credentials"

        token = create_access_token(
            identity=str(user["_id"]),
            additional_claims={"role": user["role"]}
        )

        return {
            "access_token": token,
            "role": user["role"]
        }, None
