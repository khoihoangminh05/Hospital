from flask import Flask
from config import Config
from extensions import mongo, bcrypt
from routes.auth import auth_bp
from routes.appointment import appointment_bp
from routes.metadata import metadata_bp
from routes.admin import admin_bp
from routes.doctor import doctor_bp
from routes.user_management import user_mgmt_bp
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(Config)

    CORS(app)

    mongo.init_app(app)
    bcrypt.init_app(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(appointment_bp)
    app.register_blueprint(metadata_bp)
    app.register_blueprint(admin_bp)  
    app.register_blueprint(doctor_bp)  
    app.register_blueprint(user_mgmt_bp)

    return app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
