from app import create_app
from extensions import mongo, bcrypt

app = create_app()

def seed_database():
    with app.app_context():
        print("--- BẮT ĐẦU TẠO DỮ LIỆU ---")
        
        # 1. Xóa dữ liệu cũ
        mongo.db.departments.delete_many({})
        mongo.db.users.delete_many({"role": "doctor"}) 

        # 2. Tạo Khoa (Departments)
        depts_list = [
            {"name": "Khoa Tim mạch", "desc": "Tim mạch & Lồng ngực"},
            {"name": "Khoa Nội tổng quát", "desc": "Khám sức khỏe chung"},
            {"name": "Khoa Nhi", "desc": "Chăm sóc trẻ em"},
            {"name": "Khoa Ngoại", "desc": "Phẫu thuật chấn thương"},
            {"name": "Khoa Mắt", "desc": "Nhãn khoa"},
            {"name": "Khoa Sản", "desc": "Sản phụ khoa"}
        ]
        
        # Insert và lưu lại ID để gán cho bác sĩ
        dept_map = {} # Key: Tên khoa, Value: _id
        for d in depts_list:
            res = mongo.db.departments.insert_one(d)
            dept_map[d['name']] = str(res.inserted_id)

        print(f"Đã tạo {len(dept_map)} khoa.")

        # 3. Tạo Bác sĩ (Kèm doctor_code và department_id)
        pw_hash = bcrypt.generate_password_hash("123456").decode('utf-8')
        
        doctors = [
            # Tim mạch
            {"name": "BS. Nguyễn Văn An", "dept": "Khoa Tim mạch"},
            {"name": "BS. Lê Thị Cúc", "dept": "Khoa Tim mạch"},
            # Nội
            {"name": "BS. Trần Văn Bình", "dept": "Khoa Nội tổng quát"},
            {"name": "BS. Võ Thị Hương", "dept": "Khoa Nội tổng quát"},
            # Ngoại
            {"name": "BS. Lê Văn Cường", "dept": "Khoa Ngoại"},
            # Nhi
            {"name": "BS. Phạm Thị Dung", "dept": "Khoa Nhi"},
            # Mắt
            {"name": "BS. Trần Kim Anh", "dept": "Khoa Mắt"},
        ]

        user_docs = []
        for index, doc in enumerate(doctors):
            # Tự động sinh mã doctor_code: BS001, BS002...
            code_num = str(index + 1).zfill(3) # 1 -> "001"
            doc_code = f"BS{code_num}"

            user_model = {
                "name": doc['name'],
                "email": f"bs.{index+1}@bv.com", # Email giả: bs.1@bv.com
                "phone": f"0900000{code_num}",
                "password": pw_hash,
                "role": "doctor",
                "doctorCode": doc_code,            # <--- MÃ BÁC SỸ
                "departmentId": dept_map[doc['dept']] # <--- ID KHOA ÁNH XẠ
            }
            user_docs.append(user_model)

        mongo.db.users.insert_many(user_docs)
        print(f"Đã tạo {len(user_docs)} bác sĩ thành công.")
        print("-------------------------------")

if __name__ == "__main__":
    seed_database()