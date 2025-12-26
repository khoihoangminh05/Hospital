from extensions import mongo
from bson import ObjectId

# Lấy danh sách tất cả các khoa
def get_all_departments():
    departments = list(mongo.db.departments.find())
    for dept in departments:
        dept['_id'] = str(dept['_id']) # Convert ObjectId sang string
    return departments

# Lấy danh sách bác sĩ theo ID khoa
def get_doctors_by_department(department_id):
    try:
        # Tìm user có role doctor VÀ departmentId khớp với tham số truyền vào
        query = {
            "role": "doctor",
            "departmentId": department_id 
        }
        
        # Chỉ lấy các trường cần thiết để trả về frontend cho nhẹ
        projection = {
            "password": 0, 
            "createdAt": 0
        }
        
        doctors = list(mongo.db.users.find(query, projection))
        
        # Convert ObjectId sang string
        for doc in doctors:
            doc['_id'] = str(doc['_id'])
            
        return doctors
    except Exception as e:
        print(f"Lỗi query bác sĩ: {e}")
        return []