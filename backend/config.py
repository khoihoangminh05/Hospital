import os
from dotenv import load_dotenv

class Config:
    MONGO_URI = "mongodb+srv://doanduonghung2005lhp_db_user:Huyduong05@cluster0.u2b6xzt.mongodb.net/hospital_db?retryWrites=true&w=majority"
    JWT_SECRET = "jwt-secret-key"

    # Cấu hình Email
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('MAIL_USER') 
    MAIL_PASSWORD = os.environ.get('MAIL_PASS') 
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_USER')
