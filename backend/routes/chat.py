from flask import Blueprint, jsonify, request
from middleware.auth import token_required
from extensions import mongo
from bson import ObjectId

chat_bp = Blueprint('chat', __name__, url_prefix='/api/chat')

# backend/routes/chat.py

@chat_bp.route('/history', methods=['GET'])
@token_required
def get_chat_history(current_user):
    my_id = str(current_user['_id'])
    my_role = current_user['role']
    
    # Người mà mình đang muốn xem lịch sử chat cùng
    target_id = request.args.get('receiver_id', 'admin')
    
    query = {}

    # --- TRƯỜNG HỢP 1: ADMIN/BÁC SĨ ĐI XEM LỊCH SỬ VỚI BỆNH NHÂN ---
    if my_role in ['admin', 'doctor']:
        # target_id lúc này là ID của Bệnh nhân
        
        # Điều kiện cơ bản: Tin nhắn giữa Tôi và Họ
        or_conditions = [
            {"sender_id": my_id, "receiver_id": target_id}, # Tôi gửi Họ
            {"sender_id": target_id, "receiver_id": my_id}  # Họ gửi Tôi
        ]
        
        # FIX QUAN TRỌNG: Nếu tôi là Admin, tôi phải nhìn thấy cả tin nhắn họ gửi cho 'admin' chung
        if my_role == 'admin':
            or_conditions.append({"sender_id": target_id, "receiver_id": "admin"})
            # Và cả tin nhắn mà các admin khác gửi cho họ (để support team nắm thông tin)
            or_conditions.append({"sender_role": "admin", "receiver_id": target_id})

        query = {"$or": or_conditions}

    # --- TRƯỜNG HỢP 2: BỆNH NHÂN ĐI XEM LỊCH SỬ ---
    else:
        # Nếu chat với Admin
        if target_id == 'admin':
            query = {
                "$or": [
                    {"sender_id": my_id, "receiver_id": "admin"}, # Tôi gửi Admin
                    {"receiver_id": my_id, "sender_role": "admin"} # Bất kỳ Admin nào gửi Tôi
                ]
            }
        # Nếu chat với Bác sĩ cụ thể
        else:
            query = {
                "$or": [
                    {"sender_id": my_id, "receiver_id": target_id}, # Tôi gửi Bác sĩ
                    {"sender_id": target_id, "receiver_id": my_id}  # Bác sĩ gửi Tôi
                ]
            }

    # Thực hiện truy vấn & sắp xếp
    messages = list(mongo.db.messages.find(query).sort("timestamp", 1))
    
    results = []
    for msg in messages:
        # Xử lý timestamp
        ts = msg.get('timestamp')
        ts_str = ""
        if ts:
            # Nếu là datetime object thì convert, nếu là string (do socket lưu) thì giữ nguyên
            if isinstance(ts, str):
                ts_str = ts 
            else:
                ts_str = ts.isoformat() + 'Z'

        results.append({
            "content": msg['content'],
            "sender_role": msg['sender_role'],
            "timestamp": ts_str,
            "sender_id": msg['sender_id'],
            "receiver_id": msg.get('receiver_id')
        })
        
    return jsonify(results), 200

# API: Admin lấy lịch sử chat với 1 User cụ thể
@chat_bp.route('/admin/history/<target_user_id>', methods=['GET'])
@token_required
def get_admin_chat_history(current_user, target_user_id):
    if current_user['role'] != 'admin':
        return jsonify([]), 403

    messages = list(mongo.db.messages.find({
        "$or": [
            {"sender_id": target_user_id}, # User đó gửi
            {"receiver_id": target_user_id} # Admin gửi cho user đó
        ]
    }).sort("timestamp", 1))
    
    results = []
    for msg in messages:
        results.append({
            "content": msg['content'],
            "sender_role": msg['sender_role'],
            "timestamp": str(msg['timestamp'])
        })
        
    return jsonify(results), 200


@chat_bp.route('/conversations', methods=['GET']) # Đổi URL bỏ chữ 'admin' đi cho tổng quát
@token_required
def get_conversations_users(current_user):
    
    if current_user['role'] not in ['admin', 'doctor']:
        return jsonify({'message': 'Unauthorized'}), 403

    my_id = str(current_user['_id'])
    role = current_user['role']

    try:
     
        if role == 'admin':
            pipeline = [
                {
                    "$match": {
                        "$or": [
                            {"receiver_id": "admin"},
                            {"sender_role": {"$ne": "admin"}} 
                        ]
                    }
                }
            ]
        else:
            pipeline = [
                {
                    "$match": {
                        "$or": [
                            {"receiver_id": my_id}, 
                            {"sender_id": my_id}    
                        ]
                    }
                }
            ]
        
        relevant_msgs = list(mongo.db.messages.find(pipeline[0]['$match']))
        
        user_ids = set()
        for msg in relevant_msgs:
       
            if msg['sender_role'] == 'patient': 
                user_ids.add(msg['sender_id'])
           
            elif msg.get('receiver_id') and msg['receiver_id'] not in ['admin', my_id]:
                user_ids.add(msg['receiver_id'])

        obj_ids = [ObjectId(uid) for uid in user_ids if ObjectId.is_valid(uid)]

        users = list(mongo.db.users.find(
            {'_id': {'$in': obj_ids}},
            {'name': 1, 'email': 1}
        ))

        results = []
        for u in users:
            results.append({
                'id': str(u['_id']),
                'name': u.get('name', 'Unknown'),
                'email': u.get('email', '')
            })

        return jsonify(results), 200
        
    except Exception as e:
        print(f"Error getting conversations: {e}")
        return jsonify([]), 500