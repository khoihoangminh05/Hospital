# app/models/patient_model.py
from app.extensions.db import mongo
from bson import ObjectId

class PatientModel:
    @staticmethod
    def create_patient(data):
        patient = {
            "name": data["name"],
            "dob": data["dob"],
            "gender": data["gender"],
            "phone": data["phone"],
            "address": data.get("address", ""),
            "medical_history": []
        }
        return mongo.db.patients.insert_one(patient)

    @staticmethod
    def get_patient(patient_id):
        return mongo.db.patients.find_one(
            {"_id": ObjectId(patient_id)}
        )
