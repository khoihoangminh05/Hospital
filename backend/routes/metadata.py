from flask import Blueprint, jsonify, request
from services.metadata_service import get_all_departments, get_doctors_by_department
from extensions import mongo

metadata_bp = Blueprint('metadata', __name__, url_prefix='/api/meta')

# API: Lấy danh sách khoa
@metadata_bp.route('/departments', methods=['GET'])
def list_departments():
    depts = get_all_departments()
    return jsonify(depts), 200

# API: Lấy danh sách bác sĩ theo khoa
@metadata_bp.route('/doctors/<department_id>', methods=['GET'])
def list_doctors(department_id):
    doctors = get_doctors_by_department(department_id)
    return jsonify(doctors), 200
