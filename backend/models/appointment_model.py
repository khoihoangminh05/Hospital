from datetime import datetime

class Appointment:
    def __init__(self, patient_id, doctor_id, date_time, symptom_desc=""):
        self.patient_id = patient_id  # ID của bệnh nhân (ObjectId)
        self.doctor_id = doctor_id    # ID của bác sĩ (ObjectId)
        self.date_time = date_time    # Thời gian hẹn (datetime object)
        self.symptom_desc = symptom_desc # Mô tả triệu chứng
        self.status = "pending"       # pending, confirmed, completed, cancelled
        self.created_at = datetime.utcnow()

    def to_json(self):
        return {
            "patient_id": self.patient_id,
            "doctor_id": self.doctor_id,
            "date_time": self.date_time,
            "symptom_desc": self.symptom_desc,
            "status": self.status,
            "created_at": self.created_at
        }