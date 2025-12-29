from flask import Blueprint, request, jsonify
from services.appointment_service import create_appointment, get_appointments_by_role, get_all_appointments_for_admin, update_appointment, delete_appointment
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

# API: Admin lấy danh sách toàn bộ (GET)
@appointment_bp.route('/admin/all', methods=['GET'])
@token_required
def get_all_appointments(current_user):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    data = get_all_appointments_for_admin()
    return jsonify(data), 200

# API: Admin sửa lịch hẹn (PUT)
@appointment_bp.route('/<id>', methods=['PUT'])
@token_required
def update_appt(current_user, id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
        
    data = request.json
    success, msg = update_appointment(id, data)
    if success:
        return jsonify({'message': msg}), 200
    return jsonify({'message': msg}), 400

# API: Admin xóa lịch hẹn (DELETE)
@appointment_bp.route('/<id>', methods=['DELETE'])
@token_required
def delete_appt(current_user, id):
    if current_user['role'] != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
        
    success, msg = delete_appointment(id)
    if success:
        return jsonify({'message': msg}), 200
    return jsonify({'message': msg}), 400