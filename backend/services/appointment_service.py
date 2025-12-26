from extensions import mongo
from models.appointment_model import Appointment
from bson import ObjectId

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