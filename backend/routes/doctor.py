from flask import Blueprint, request, jsonify
from middleware.auth import token_required
from services.doctor_service import (
    get_all_doctors_admin, create_doctor, update_doctor, delete_doctor
)

doctor_bp = Blueprint('doctor_admin', __name__, url_prefix='/api/admin/doctors')

# Middleware check admin nội bộ (hoặc import từ file admin)
def admin_only(f):
    def wrapper(current_user, *args, **kwargs):
        if current_user['role'] != 'admin':
            return jsonify({'message': 'Chỉ Admin mới có quyền này'}), 403
        return f(current_user, *args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

@doctor_bp.route('/', methods=['GET'])
@token_required
@admin_only
def list_doctors(current_user):
    data = get_all_doctors_admin()
    return jsonify(data), 200

@doctor_bp.route('/', methods=['POST'])
@token_required
@admin_only
def add_doctor(current_user):
    data = request.json
    success, msg = create_doctor(data)
    if success:
        return jsonify({"message": msg}), 201
    return jsonify({"message": msg}), 400

@doctor_bp.route('/<id>', methods=['PUT'])
@token_required
@admin_only
def edit_doctor(current_user, id):
    data = request.json
    success, msg = update_doctor(id, data)
    if success:
        return jsonify({"message": msg}), 200
    return jsonify({"message": msg}), 400

@doctor_bp.route('/<id>', methods=['DELETE'])
@token_required
@admin_only
def remove_doctor(current_user, id):
    success, msg = delete_doctor(id)
    if success:
        return jsonify({"message": msg}), 200
    return jsonify({"message": msg}), 400