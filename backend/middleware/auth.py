from functools import wraps
from flask import request, jsonify, current_app
import jwt
from extensions import mongo # Giả sử bạn import mongo từ đây
from bson import ObjectId

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # 1. Lấy token từ Header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                try:
                    token = auth_header.split(" ")[1]
                    # print(token)    
                except IndexError:
                    return jsonify({'message': 'Token format invalid!'}), 401

        if not token:
            return jsonify({'message': 'Token không tồn tại (Missing Token)!'}), 401

        try:
            
            data = jwt.decode(
                token, 
                current_app.config['JWT_SECRET'], 
                algorithms=["HS256"]
            )
            
            current_user = mongo.db.users.find_one({'_id': ObjectId(data['user_id'])})
            
            if not current_user:
                return jsonify({'message': 'User không tồn tại hoặc Token không hợp lệ!'}), 401
            
    
            current_user['_id'] = str(current_user['_id'])

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token đã hết hạn! Vui lòng đăng nhập lại.'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token không hợp lệ!'}), 401
        except Exception as e:
            return jsonify({'message': f'Lỗi xác thực: {str(e)}'}), 500

        return f(current_user, *args, **kwargs)

    return decorated