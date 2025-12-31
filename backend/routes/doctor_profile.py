from flask import Blueprint, request, jsonify
from middleware.auth import token_required
from services.doctor_service import get_doctor_profile_service, update_doctor_profile_service

doctor_profile_bp = Blueprint('doctor_profile', __name__, url_prefix='/api/doctor/profile')

@doctor_profile_bp.route('/', methods=['GET'])
@token_required
def get_profile(current_user):
    if current_user['role'] != 'doctor':
        return jsonify({'message': 'Unauthorized'}), 403
        
    profile, msg = get_doctor_profile_service(current_user['_id'])
    if not profile:
        return jsonify({'message': msg}), 404
    return jsonify(profile), 200

@doctor_profile_bp.route('/', methods=['PUT'])
@token_required
def update_profile(current_user):
    if current_user['role'] != 'doctor':
        return jsonify({'message': 'Unauthorized'}), 403
        
    data = request.json
    success, msg = update_doctor_profile_service(current_user['_id'], data)
    if success:
        return jsonify({'message': msg}), 200
    return jsonify({'message': msg}), 400