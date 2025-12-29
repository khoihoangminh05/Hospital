from datetime import datetime
# from bson import ObjectId # Nếu cần xử lý ObjectId

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
        department_id=None,
      
        specialty=None,  # Chuyên khoa (Tim mạch, Nhi...)
        experience=None, # Kinh nghiệm (10 năm...)
        education=None   # Học vấn (Tiến sĩ, Thạc sĩ...)
    ):
        self.name = name
        self.email = email
        self.phone = phone
        self.password = password_hash
        self.role = role
        self.doctorCode = doctor_code
        self.nurseCode = nurse_code
        self.departmentId = department_id 
        
        self.specialty = specialty
        self.experience = experience
        self.education = education
        
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
            
            "specialty": self.specialty,
            "experience": self.experience,
            "education": self.education,
            
            "createdAt": self.createdAt,
        }