from extensions import mongo
from bson import ObjectId
from datetime import datetime, timedelta

def get_dashboard_stats():
    # 1. Đếm tổng số lượng
    total_users = mongo.db.users.count_documents({"role": "patient"})
    total_doctors = mongo.db.users.count_documents({"role": "doctor"})
    
    # Lịch khám hôm nay
    today_start = datetime.combine(datetime.today(), datetime.min.time())
    today_end = datetime.combine(datetime.today(), datetime.max.time())
    
    # Lưu ý: Cần chắc chắn field date_time trong DB lưu dạng ISODate hoặc String ISO chuẩn
    # Ở đây giả sử lưu String ISO: "2025-12-25T09:00:00" -> Query string regex hoặc range
    # Để đơn giản demo, mình đếm tất cả appointments
    total_appointments = mongo.db.appointments.count_documents({})
    
    # 2. Dữ liệu biểu đồ (Thống kê User theo Role)
    # Pipeline Aggregation
    role_pipeline = [
        {"$group": {"_id": "$role", "count": {"$sum": 1}}}
    ]
    role_stats = list(mongo.db.users.aggregate(role_pipeline))
    
    # Format lại cho Frontend: [{name: 'User', value: 10}, ...]
    chart_role_data = []
    colors = {"patient": "#1A73E8", "doctor": "#0C4A6E", "admin": "#F59E0B"}
    
    for item in role_stats:
        role_name = item['_id'].capitalize()
        chart_role_data.append({
            "name": role_name,
            "value": item['count'],
            "color": colors.get(item['_id'], "#888888")
        })

    return {
        "counts": {
            "users": total_users,
            "doctors": total_doctors,
            "appointments": total_appointments,
            "news": 10 # Giả lập
        },
        "charts": {
            "roleData": chart_role_data,
            # Các chart khác bạn có thể viết thêm aggregation tương tự
        }
    }

def get_all_users():
    users = list(mongo.db.users.find({}, {"password": 0})) # Không lấy password
    for u in users:
        u['_id'] = str(u['_id'])
        # Map field để khớp với Table Frontend
        u['id'] = u['_id'] 
        u['status'] = u.get('status', 'Hoạt động') # Giả lập status nếu chưa có
    return users

def delete_user_by_id(user_id):
    try:
        mongo.db.users.delete_one({"_id": ObjectId(user_id)})
        return True, "Đã xóa thành công"
    except Exception as e:
        return False, str(e)