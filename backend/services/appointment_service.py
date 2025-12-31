from extensions import mongo
from models.appointment_model import Appointment
from bson import ObjectId
from datetime import datetime

def create_appointment(data, current_user_id):
    try:
        doctor_id = ObjectId(data['doctor_id'])
        
       
        date_time_input = data['date_time']
        if isinstance(date_time_input, str):
            appt_datetime = datetime.fromisoformat(date_time_input)
        else:
            appt_datetime = date_time_input

       
        existing_appt = mongo.db.appointments.find_one({
            "doctor_id": doctor_id,
            "date_time": appt_datetime,
            "status": {"$nin": ["cancelled", "rejected"]} 
        })

        if existing_appt:
            return None, "Bác sĩ đã có lịch hẹn vào giờ này. Vui lòng chọn giờ khác."

        
        new_appointment = Appointment(
            patient_id=ObjectId(current_user_id),
            doctor_id=doctor_id,
            date_time=appt_datetime, 
            symptom_desc=data.get('description', "")
        )
        
        result = mongo.db.appointments.insert_one(new_appointment.to_json())
        return str(result.inserted_id), None

    except Exception as e:
        return None, str(e)

def get_appointments_by_role(user):
    role = user['role']
    user_id = ObjectId(user['_id'])
    
    query = {}
    
    # 1. Xác định query dựa trên Role
    if role == 'patient':
        query = {"patient_id": user_id}
    elif role == 'doctor':
        query = {"doctor_id": user_id}
    elif role == 'admin':
        query = {}

    # 2. Lấy danh sách lịch từ DB (Sắp xếp theo thời gian)
    # Lưu ý: Model Appointment của bạn lưu 'created_at', nhưng sort theo 'date_time' sẽ hợp lý hơn cho lịch
    appointments = list(mongo.db.appointments.find(query).sort("date_time", 1))
    
    results = []
    for appt in appointments:
        # 3. Lấy thông tin Bệnh nhân (để hiển thị tên)
        # Lưu ý: Model lưu patient_id, cần query bảng users để lấy name
        patient_id = appt.get('patient_id')
        patient_name = "Khách vãng lai"
        patient_initials = "NA"

        if patient_id:
            patient = mongo.db.users.find_one({"_id": patient_id}) # patient_id trong model đã là ObjectId
            if patient:
                patient_name = patient.get('name', 'Không tên')
                # Tạo chữ cái đầu tên (VD: Nguyen Van A -> NA)
                if patient_name:
                    words = patient_name.split()
                    if len(words) > 0:
                        patient_initials = "".join([w[0] for w in words]).upper()[:2]

        # 4. Xử lý ngày giờ (date_time)
        # Model lưu datetime object, ta tách ra string để Frontend dễ dùng
        dt_obj = appt.get('date_time')
        date_str = ""
        time_str = ""
        
        if isinstance(dt_obj, datetime):
            date_str = dt_obj.strftime('%Y-%m-%d') # Trả về: 2025-12-30
            time_str = dt_obj.strftime('%H:%M')    # Trả về: 09:30
        elif isinstance(dt_obj, str):
            # Fallback nếu lỡ lưu string
            try:
                dt_obj = datetime.fromisoformat(dt_obj)
                date_str = dt_obj.strftime('%Y-%m-%d')
                time_str = dt_obj.strftime('%H:%M')
            except:
                pass

        # 5. Cấu trúc JSON trả về cho Frontend
        results.append({
            "id": str(appt['_id']),
            "patientName": patient_name,
            "patientInitials": patient_initials,
            "date": date_str,
            "time": time_str,
            "reason": appt.get('symptom_desc', ''), # Map 'symptom_desc' của Model thành 'reason' cho Frontend
            "status": appt.get('status', 'pending')
        })
        
    return results

def get_all_appointments_for_admin():
    # Lấy toàn bộ lịch hẹn, sắp xếp mới nhất trước
    appointments = list(mongo.db.appointments.find().sort("created_at", -1))
    
    results = []
    for appt in appointments:
        # Join thủ công để lấy tên Bệnh nhân và Bác sĩ (nếu lưu ID)
        patient = mongo.db.users.find_one({"_id": appt.get('patient_id')})
        doctor = mongo.db.users.find_one({"_id": appt.get('doctor_id')})
        
        # Tách date_time thành date và time để Frontend dễ hiển thị
        dt_obj = datetime.fromisoformat(appt['date_time']) if isinstance(appt['date_time'], str) else appt['date_time']
        
        results.append({
            "id": str(appt['_id']), # Map _id -> id
            "patientName": patient['name'] if patient else "Khách vãng lai",
            "phone": patient.get('phone', '') if patient else "",
            "email": patient.get('email', '') if patient else "",
            "doctorName": doctor['name'] if doctor else "Chưa phân công",
            "department": appt.get('department', 'Tổng quát'), # Cần lưu field này khi tạo
            "date": dt_obj.strftime('%Y-%m-%d'),
            "time": dt_obj.strftime('%H:%M'),
            "status": appt.get('status', 'Chờ xác nhận')
        })
    return results

def update_appointment(appt_id, data):
    try:
        # Logic update: Admin có thể sửa trạng thái, ngày giờ...
        update_data = {
            "status": data.get('status'),
            # Nếu sửa ngày giờ thì cần gộp lại thành ISO
            # "date_time": ... (xử lý nếu cần)
        }
        
        # Nếu có sửa ngày/giờ từ frontend gửi lên
        if data.get('date') and data.get('time'):
             update_data['date_time'] = f"{data['date']}T{data['time']}:00"

        mongo.db.appointments.update_one(
            {"_id": ObjectId(appt_id)},
            {"$set": update_data}
        )
        return True, "Cập nhật thành công"
    except Exception as e:
        return False, str(e)

def delete_appointment(appt_id):
    try:
        mongo.db.appointments.delete_one({"_id": ObjectId(appt_id)})
        return True, "Xóa thành công"
    except Exception as e:
        return False, str(e)
    
def doctor_confirm_appointment(appt_id, doctor_id):
    # Chỉ cho phép bác sĩ update lịch CỦA MÌNH
    result = mongo.db.appointments.update_one(
        {"_id": ObjectId(appt_id), "doctor_id": ObjectId(doctor_id)},
        {"$set": {"status": "confirmed"}}
    )
    return result.modified_count > 0

def doctor_complete_appointment(appt_id, doctor_id):
    result = mongo.db.appointments.update_one(
        {"_id": ObjectId(appt_id), "doctor_id": ObjectId(doctor_id)},
        {"$set": {"status": "completed"}}
    )
    return result.modified_count > 0