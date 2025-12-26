from datetime import datetime
from bson import ObjectId

class UserModel:
    def __init__(
        self,
        name,
        email,
        phone,
        password_hash,
        role,
        doctor_code=None,
        nurse_code=None,
        department_id=None 
    ):
        self.name = name
        self.email = email
        self.phone = phone
        self.password = password_hash
        self.role = role
        self.doctorCode = doctor_code
        self.nurseCode = nurse_code
        self.departmentId = department_id 
        self.createdAt = datetime.utcnow()

    def to_dict(self):
        return {
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "password": self.password,
            "role": self.role,
            "doctorCode": self.doctorCode,
            "nurseCode": self.nurseCode,
            "departmentId": self.departmentId, 
            "createdAt": self.createdAt,
        }