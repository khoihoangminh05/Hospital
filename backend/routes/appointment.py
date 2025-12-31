from flask import Blueprint, request, jsonify
from services.appointment_service import create_appointment, get_appointments_by_role, get_all_appointments_for_admin, update_appointment, delete_appointment, doctor_confirm_appointment, doctor_complete_appointment
# from middleware.auth import token_required # Import middleware xác thực của bạn
from middleware.auth import token_required
from extensions import mongo
from bson import ObjectId

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

# API: Xóa lịch hẹn (Admin hoặc Bác sĩ phụ trách)
@appointment_bp.route('/<id>', methods=['DELETE'])
@token_required
def delete_appt(current_user, id):
    try:
        # 1. Tìm lịch hẹn trong DB để kiểm tra quyền sở hữu
        appointment = mongo.db.appointments.find_one({"_id": ObjectId(id)})
        
        if not appointment:
            return jsonify({'message': 'Lịch hẹn không tồn tại'}), 404

        # 2. Logic kiểm tra quyền (Admin HOẶC Bác sĩ chính chủ)
        is_admin = current_user['role'] == 'admin'
        
        is_owner_doctor = False
        if current_user['role'] == 'doctor':
            # So sánh ID của user đang login với doctor_id trong lịch hẹn
            # Lưu ý: Convert sang string để so sánh chính xác
            if str(appointment.get('doctor_id')) == str(current_user['_id']):
                is_owner_doctor = True

        # Nếu không phải Admin và cũng không phải Bác sĩ của lịch này -> Chặn
        if not (is_admin or is_owner_doctor):
            return jsonify({'message': 'Bạn không có quyền xóa lịch hẹn này'}), 403

        # 3. Thực hiện xóa
        success, msg = delete_appointment(id)
        
        if success:
            return jsonify({'message': msg}), 200
        return jsonify({'message': msg}), 400

    except Exception as e:
        return jsonify({'message': f'Lỗi server: {str(e)}'}), 500

@appointment_bp.route('/my-list', methods=['GET']) # Đổi tên cho rõ ràng
@token_required
def get_my_appointments(current_user):
    data = get_appointments_by_role(current_user)
    return jsonify(data), 200

# API: Bác sĩ xác nhận lịch
@appointment_bp.route('/doctor/confirm/<id>', methods=['PUT'])
@token_required
def confirm_appt(current_user, id):
    if current_user['role'] != 'doctor':
        return jsonify({'message': 'Unauthorized'}), 403
        
    success = doctor_confirm_appointment(id, current_user['_id'])
    if success:
        return jsonify({'message': 'Đã xác nhận'}), 200
    return jsonify({'message': 'Không tìm thấy lịch hoặc lỗi'}), 400

# API: Bác sĩ hoàn thành lịch
@appointment_bp.route('/doctor/complete/<id>', methods=['PUT'])
@token_required
def complete_appt(current_user, id):
    if current_user['role'] != 'doctor':
        return jsonify({'message': 'Unauthorized'}), 403
        
    success = doctor_complete_appointment(id, current_user['_id'])
    if success:
        return jsonify({'message': 'Đã hoàn thành khám'}), 200
    return jsonify({'message': 'Lỗi'}), 400