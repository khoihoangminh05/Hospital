# app/models/doctor_model.py
from app.extensions.db import mongo

class DoctorModel:
    @staticmethod
    def create_doctor(data):
        doctor = {
            "name": data["name"],
            "specialty": data["specialty"],
            "department": data["department"],
            "phone": data["phone"]
        }
        return mongo.db.doctors.insert_one(doctor)
