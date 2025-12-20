# app/__init__.py
from flask import Flask
from app.config import Config
from app.extensions.db import mongo
from flask_jwt_extended import JWTManager

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # ✅ init extensions TRƯỚC
    mongo.init_app(app)
    JWTManager(app)

    # ✅ import routes SAU
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp)

    @app.route("/health")
    def health():
        return {"status": "OK"}

    return app
