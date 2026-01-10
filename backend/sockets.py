from flask import request
from flask_socketio import emit, join_room
from extensions import socketio, mongo
from datetime import datetime
import jwt
from config import Config

# Hàm xác thực token từ socket
def get_user_from_token():
    token = request.args.get('token')
    if not token:
        return None
    try:
        data = jwt.decode(token, Config.JWT_SECRET, algorithms=["HS256"])
        return data
    except:
        return None

@socketio.on('connect')
def handle_connect():
    user = get_user_from_token()
    print("-------------------", user)
    if not user:
        return False # Từ chối kết nối nếu không có token
    
    user_id = user['user_id']
    role = user['role']
    
    # 1. User tham gia vào "phòng" của riêng họ (để Admin gửi tin nhắn riêng cho họ)
    join_room(f"user_{user_id}")
    
    # 2. Nếu là Admin, tham gia vào phòng "support_room" (để nhận tin từ tất cả user)
    if role == 'admin':
        join_room("admin_support")
        print(f"Admin {user_id} joined support channel")
    else:
        print(f"User {user_id} connected")

@socketio.on('send_message')
def handle_message(data):
    sender = get_user_from_token()
    if not sender: return

    sender_id = sender['user_id']
    role = sender['role']
    content = data['content']
    
    # Lấy người nhận từ client gửi lên (nếu có)
    # Nếu không có receiver_id -> Mặc định là 'admin' (Chat hỗ trợ)
    target_receiver_id = data.get('receiver_id', 'admin')

    msg_data = {
        "sender_id": sender_id,
        "content": content,
        "sender_role": role,
        "receiver_id": target_receiver_id, # Lưu người nhận thực tế
        "timestamp": datetime.utcnow(),
        "read": False
    }
    
    # Lưu vào DB
    mongo.db.messages.insert_one(msg_data)
    
    # Fix format cho JSON
    msg_data['_id'] = str(msg_data['_id'])
    msg_data['timestamp'] = msg_data['timestamp'].isoformat() + 'Z'

    # --- LOGIC GỬI REALTIME ---
    
    # 1. Gửi lại cho người gửi (để hiện lên màn hình họ)
    socketio.emit('receive_message', msg_data, room=f"user_{sender_id}")

    # 2. Gửi cho người nhận
    if target_receiver_id == 'admin':
        socketio.emit('receive_message', msg_data, room='admin_support')
    else:
        # Gửi cho bác sĩ cụ thể (Bác sĩ cũng join room user_{id} của chính họ)
        socketio.emit('receive_message', msg_data, room=f"user_{target_receiver_id}")