from flask import Blueprint, request, jsonify
from services.appointment_service import create_appointment, get_appointments_by_role
# from middleware.auth import token_required # Import middleware xác thực của bạn
from middleware.auth import token_required

appointment_bp = Blueprint('appointment', __name__, url_prefix="/api/appointments")

# API: Đặt lịch (Chỉ dành cho Patient)
@appointment_bp.route('/book', methods=['POST'])
@token_required 
def book_appointment(current_user): 
    # current_user được trả về từ middleware sau khi decode token
    
    if current_user['role'] != 'patient':
        return jsonify({"message": "Chỉ bệnh nhân mới được đặt lịch!"}), 403

    data = request.json
    appt_id, error = create_appointment(data, current_user['_id'])
    
    if error:
        return jsonify({"message": "Lỗi đặt lịch", "error": error}), 500
        
    return jsonify({"message": "Đặt lịch thành công", "id": appt_id}), 201

# API: Xem danh sách lịch (Dùng chung cho Patient, Doctor, Admin)
@appointment_bp.route('/list', methods=['GET'])
# @token_required
def list_appointments(current_user):
    appointments = get_appointments_by_role(current_user)
    return jsonify(appointments), 200