from extensions import mongo
from models.appointment_model import Appointment
from bson import ObjectId
from datetime import datetime

def create_appointment(data, current_user_id):
    # Dữ liệu từ FE gửi lên: doctor_id, date_time, description
    try:
        new_appointment = Appointment(
            patient_id=ObjectId(current_user_id), # Người đang login là bệnh nhân
            doctor_id=ObjectId(data['doctor_id']),
            date_time=data['date_time'], # Lưu ý: Cần convert string sang datetime nếu cần
            symptom_desc=data.get('description', "")
        )
        
        # Lưu vào Collection 'appointments'
        result = mongo.db.appointments.insert_one(new_appointment.to_json())
        return str(result.inserted_id), None
    except Exception as e:
        return None, str(e)

def get_appointments_by_role(user):
    # user là object chứa thông tin người đang login (id, role)
    role = user['role']
    user_id = ObjectId(user['_id'])
    
    query = {}
    
    # Logic phân quyền xem dữ liệu
    if role == 'patient':
        query = {"patient_id": user_id} # Bệnh nhân chỉ xem lịch của mình
    elif role == 'doctor':
        query = {"doctor_id": user_id}  # Bác sĩ chỉ xem lịch mình phụ trách
    elif role == 'admin':
        query = {} # Admin xem hết
    else:
        return [] # Nurse hoặc role khác chưa xử lý

    # Query database và join với bảng users để lấy tên (nếu cần hiển thị tên thay vì ID)
    # Ở đây mình query đơn giản trước
    appointments = list(mongo.db.appointments.find(query))
    
    # Convert ObjectId thành string để trả về JSON
    for appt in appointments:
        appt['_id'] = str(appt['_id'])
        appt['patient_id'] = str(appt['patient_id'])
        appt['doctor_id'] = str(appt['doctor_id'])
        
    return appointments

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