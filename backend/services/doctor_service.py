from extensions import mongo, bcrypt
from bson import ObjectId
from datetime import datetime

def get_all_doctors_admin():
    # Lấy tất cả user có role là doctor
    doctors = list(mongo.db.users.find({"role": "doctor"}).sort("created_at", -1))
    results = []
    for doc in doctors:
        results.append({
            "id": str(doc['_id']),
            "name": doc.get('name', ''),
            "email": doc.get('email', ''),
            "phone": doc.get('phone', ''),
            "specialty": doc.get('specialty', 'Đa khoa'), # Lưu tên chuyên khoa
            "experience": doc.get('experience', ''),
            "education": doc.get('education', ''),
            # Nếu bạn dùng department_id thì có thể map thêm tên khoa ở đây
        })
    return results

def create_doctor(data):
    try:
        # Check email trùng
        if mongo.db.users.find_one({"email": data['email']}):
            return False, "Email đã tồn tại"

        # --- ĐỒNG BỘ: Lấy tên khoa từ department_id ---
        dept_id = data.get('departmentId')
        specialty_name = "Đa khoa" # Giá trị mặc định
        
        if dept_id:
            department = mongo.db.departments.find_one({"_id": ObjectId(dept_id)})
            if department:
                specialty_name = department['name']
            else:
                return False, "Khoa không tồn tại"
        # -----------------------------------------------

        hashed_password = bcrypt.generate_password_hash(data.get('password', '123456')).decode('utf-8')

        new_doctor = {
            "name": data['name'],
            "email": data['email'],
            "phone": data['phone'],
            "password": hashed_password,
            "role": "doctor",
            
            # Lưu cả ID và Tên để tiện hiển thị/truy vấn
            "departmentId": dept_id, 
            "specialty": specialty_name, # <-- Tên khoa được đồng bộ vào đây
            
            "experience": data.get('experience'),
            "education": data.get('education'),
            "created_at": datetime.utcnow()
        }

        mongo.db.users.insert_one(new_doctor)
        return True, "Thêm bác sĩ thành công"
    except Exception as e:
        return False, str(e)

def update_doctor(doctor_id, data):
    try:
        update_data = {
            "name": data.get('name'),
            "phone": data.get('phone'),
            "experience": data.get('experience'),
            "education": data.get('education')
        }

        # --- ĐỒNG BỘ KHI UPDATE ---
        dept_id = data.get('departmentId')
        if dept_id:
            department = mongo.db.departments.find_one({"_id": ObjectId(dept_id)})
            if department:
                update_data["departmentId"] = dept_id
                update_data["specialty"] = department['name'] # Cập nhật lại tên khoa nếu đổi ID
        # --------------------------

        mongo.db.users.update_one(
            {"_id": ObjectId(doctor_id)},
            {"$set": update_data}
        )
        return True, "Cập nhật thành công"
    except Exception as e:
        return False, str(e)

def delete_doctor(doctor_id):
    try:
        # Xóa bác sĩ (Có thể cần check xem bác sĩ có lịch hẹn chưa trước khi xóa)
        mongo.db.users.delete_one({"_id": ObjectId(doctor_id)})
        return True, "Đã xóa bác sĩ"
    except Exception as e:
        return False, str(e)