from flask import Flask
from config import Config
from extensions import mongo, bcrypt, mail , socketio
from routes.auth import auth_bp
from routes.appointment import appointment_bp
from routes.metadata import metadata_bp
from routes.admin import admin_bp
from routes.doctor import doctor_bp
from routes.user_management import user_mgmt_bp
from routes.doctor_profile import doctor_profile_bp
from routes.chat import chat_bp
import sockets

from flask_cors import CORS
from dotenv import load_dotenv
import os
load_dotenv()

print("Email:", os.environ.get('MAIL_USER'))
print("Pass:", os.environ.get('MAIL_PASS'))

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    CORS(app)

    mongo.init_app(app)
    bcrypt.init_app(app)
    mail.init_app(app)
    socketio.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(appointment_bp)
    app.register_blueprint(metadata_bp)
    app.register_blueprint(admin_bp)  
    app.register_blueprint(doctor_bp)  
    app.register_blueprint(user_mgmt_bp)
    app.register_blueprint(doctor_profile_bp)
    app.register_blueprint(chat_bp)

    return app

app = create_app()

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000, allow_unsafe_werkzeug=True)
