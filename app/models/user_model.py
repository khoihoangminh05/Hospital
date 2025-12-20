# app/models/user_model.py
from app.extensions.db import mongo
from flask import current_app
import bcrypt

class UserModel:
    @staticmethod
    def create_user(username, password, role):
        hashed = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        )

        return mongo.db.users.insert_one({
            "username": username,
            "password": hashed,
            "role": role
        })

    @staticmethod
    def find_by_username(username):
        if not current_app:
            raise RuntimeError("No Flask app context")
        return mongo.db.users.find_one({"username": username})
