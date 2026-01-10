import resend
import os

resend.api_key = os.getenv("RESEND_API_KEY")

def send_otp_email(to_email, otp_code):
    resend.Emails.send({
        "from": "onboarding@resend.dev", 
        "to": to_email,
        "subject": "Mã xác thực đăng ký",
        "html": f"""
            <p>Mã OTP của bạn là: <b>{otp_code}</b></p>
            <p>Mã có hiệu lực trong 10 phút.</p>
        """
    })
