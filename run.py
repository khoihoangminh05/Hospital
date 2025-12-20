from app import create_app

app = create_app()

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",   # cho phép truy cập từ máy khác
        port=5001,        # 👈 CHỌN CỔNG Ở ĐÂY
        debug=True        # chỉ bật khi dev
    )
