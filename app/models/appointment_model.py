# app/models/appointment_model.py
from app.extensions.db import mongo
from bson import ObjectId

class AppointmentModel:
    @staticmethod
    def create_appointment(data):
        appointment = {
            "patient_id": ObjectId(data["patient_id"]),
            "doctor_id": ObjectId(data["doctor_id"]),
            "date": data["date"],
            "status": "scheduled"  # scheduled / completed / canceled
        }
        return mongo.db.appointments.insert_one(appointment)
