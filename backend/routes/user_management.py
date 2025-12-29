from flask import Blueprint, request, jsonify
from middleware.auth import token_required
from services.user_management_service import (
    get_all_users_admin, create_user_admin, update_user_admin, delete_user_admin
)

user_mgmt_bp = Blueprint('user_mgmt', __name__, url_prefix='/api/admin/users')

# Middleware check admin
def admin_only(f):
    def wrapper(current_user, *args, **kwargs):
        if current_user['role'] != 'admin':
            return jsonify({'message': 'Unauthorized'}), 403
        return f(current_user, *args, **kwargs)
    wrapper.__name__ = f.__name__
    return wrapper

@user_mgmt_bp.route('/', methods=['GET'])
@token_required
@admin_only
def list_users(current_user):
    data = get_all_users_admin()
    return jsonify(data), 200

@user_mgmt_bp.route('/', methods=['POST'])
@token_required
@admin_only
def add_user(current_user):
    data = request.json
    success, msg = create_user_admin(data)
    if success:
        return jsonify({"message": msg}), 201
    return jsonify({"message": msg}), 400

@user_mgmt_bp.route('/<id>', methods=['PUT'])
@token_required
@admin_only
def edit_user(current_user, id):
    data = request.json
    success, msg = update_user_admin(id, data)
    if success:
        return jsonify({"message": msg}), 200
    return jsonify({"message": msg}), 400

@user_mgmt_bp.route('/<id>', methods=['DELETE'])
@token_required
@admin_only
def remove_user(current_user, id):
    success, msg = delete_user_admin(id)
    if success:
        return jsonify({"message": msg}), 200
    return jsonify({"message": msg}), 400