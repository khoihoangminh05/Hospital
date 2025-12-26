from flask import Blueprint, jsonify, request
from services.admin_service import get_dashboard_stats, get_all_users, delete_user_by_id
from middleware.auth import token_required

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

# Middleware check role Admin
def admin_required(f):
    def wrapper(current_user, *args, **kwargs):
        if current_user['role'] != 'admin':
            return jsonify({'message': 'Quyền truy cập bị từ chối! Chỉ Admin mới được vào.'}), 403
        return f(current_user, *args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

@admin_bp.route('/stats', methods=['GET'])
@token_required
@admin_required
def dashboard_stats(current_user):
    stats = get_dashboard_stats()
    return jsonify(stats), 200

@admin_bp.route('/users', methods=['GET'])
@token_required
@admin_required
def list_users(current_user):
    users = get_all_users()
    return jsonify(users), 200

@admin_bp.route('/users/<user_id>', methods=['DELETE'])
@token_required
@admin_required
def delete_user(current_user, user_id):
    success, msg = delete_user_by_id(user_id)
    if success:
        return jsonify({"message": msg}), 200
    return jsonify({"message": msg}), 400