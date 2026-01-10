import { useState } from "react";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Mail, Lock, User, Phone, AlertCircle, CheckCircle2, UserCircle,
  Stethoscope, Heart, ArrowLeft, BadgeCheck, KeyRound
} from "lucide-react";
import { toast } from "sonner";
import api from "@/config/axios";

export function Register({ setCurrentPage }) {
  // State quản lý luồng: 'role' -> 'form' -> 'verification' -> 'success'
  const [step, setStep] = useState('role'); 
  const [selectedRole, setSelectedRole] = useState(null);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
    doctorCode: "", nurseCode: "",
  });
  
  const [otp, setOtp] = useState(""); // State lưu mã OTP người dùng nhập

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({});

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  // --- Validate Form (Giữ nguyên logic cũ) ---
  const validateForm = () => {
    if (!formData.name.trim()) return "Vui lòng nhập họ và tên";
    if (!formData.email.trim()) return "Vui lòng nhập email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return "Email không hợp lệ";
    if (!formData.phone.trim()) return "Vui lòng nhập số điện thoại";
    if (!formData.password) return "Vui lòng nhập mật khẩu";
    if (formData.password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự";
    if (formData.password !== formData.confirmPassword) return "Mật khẩu xác nhận không khớp";
    if (selectedRole === "doctor") {
    if (!formData.doctorCode.trim()) {
      return "Vui lòng nhập mã bác sĩ";
    }
    if (!/^BS\d{4}$/.test(formData.doctorCode)) {
      return "Mã bác sĩ phải có định dạng BSxxxx (ví dụ: BS0123)";
    }
  }

  if (selectedRole === "nurse" && !formData.nurseCode.trim()) {
    return "Vui lòng nhập mã y tá";
  }
    return null;
  };

  // --- BƯỚC 1: GỬI THÔNG TIN & YÊU CẦU OTP ---
  const handleInitSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const userPayload = { ...formData, role: selectedRole };
      // Gọi API bước 1: Validate thông tin và gửi OTP
      await api.post("api/auth/register-init", userPayload);
      
      toast.success("Mã xác thực đã được gửi tới email của bạn!");
      setStep('verification'); // Chuyển sang màn hình nhập OTP
    } catch (err) {
      setError(err.response?.data?.message || "Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  // --- BƯỚC 2: XÁC THỰC OTP & HOÀN TẤT ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Gọi API bước 2: Xác thực OTP và tạo user
      await api.post("api/auth/register-verify", {
        email: formData.email,
        otp: otp
      });

      setStep('success'); // Chuyển sang màn hình thành công
      toast.success("Đăng ký tài khoản thành công!");
      setTimeout(() => {
        setCurrentPage("login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Mã xác thực không đúng.");
    } finally {
      setLoading(false);
    }
  };

  // --- UI COMPONENTS ---
  
  // 1. Màn hình chọn Role
  if (step === 'role') {
    const roleOptions = [
        { id: "patient", title: "Người dùng", description: "Đặt lịch & Hồ sơ", icon: UserCircle, color: "from-blue-500 to-blue-600", bg: "bg-blue-50", border: "border-blue-200" },
        { id: "doctor", title: "Bác sĩ", description: "Quản lý bệnh nhân", icon: Stethoscope, color: "from-green-500 to-green-600", bg: "bg-green-50", border: "border-green-200" },
        { id: "nurse", title: "Y tá", description: "Hỗ trợ y tế", icon: Heart, color: "from-pink-500 to-pink-600", bg: "bg-pink-50", border: "border-pink-200" },
    ];

    return (
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#E8F1FF] to-white py-16 px-4 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-center text-[#0C4A6E] mb-8">Bạn muốn đăng ký với vai trò gì?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {roleOptions.map((role) => {
              const Icon = role.icon;
              return (
                <Card key={role.id} 
                    className={`cursor-pointer border-2 transition-all hover:-translate-y-1 hover:shadow-lg ${role.border}`}
                    onClick={() => { setSelectedRole(role.id); setStep('form'); }}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${role.bg}`}>
                        <Icon className={`w-8 h-8`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{role.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{role.description}</p>
                    <Button className={`w-full bg-gradient-to-r ${role.color}`}>Chọn {role.title}</Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 2. Màn hình Thành công
  if (step === 'success') {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gradient-to-br from-[#E8F1FF] to-white">
        <Card className="w-full max-w-md shadow-xl text-center p-8 animate-in zoom-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#0C4A6E] mb-2">Đăng ký thành công!</h2>
            <p className="text-gray-500">Đang chuyển hướng đến trang đăng nhập...</p>
        </Card>
      </div>
    );
  }

  // 3. Màn hình Nhập OTP (MỚI)
  if (step === 'verification') {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#E8F1FF] to-white py-16 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Xác thực Email</CardTitle>
            <CardDescription>
              Chúng tôi đã gửi mã 6 số đến <b>{formData.email}</b>. 
              <br/>Vui lòng kiểm tra hòm thư (kể cả mục Spam).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label className="text-center block">Nhập mã xác thực</Label>
                <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="123456"
                        className="pl-10 text-center text-2xl tracking-widest h-12 font-bold"
                        maxLength={6}
                    />
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#1A73E8]" disabled={loading || otp.length < 6}>
                {loading ? "Đang xác thực..." : "Xác nhận đăng ký"}
              </Button>
              
              <Button type="button" variant="ghost" className="w-full" onClick={() => setStep('form')}>
                Quay lại sửa thông tin
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // 4. Màn hình Form điền thông tin (step === 'form')
  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#E8F1FF] to-white py-12 px-4 flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-xl">
        <CardHeader>
            <Button variant="ghost" className="w-fit mb-2 pl-0 hover:bg-transparent" onClick={() => setStep('role')}>
                <ArrowLeft className="w-4 h-4 mr-2" /> Chọn lại vai trò
            </Button>
            <CardTitle className="text-2xl text-[#0C4A6E]">Đăng ký tài khoản</CardTitle>
            <CardDescription>Điền thông tin để tạo tài khoản {selectedRole === 'patient' ? 'Người dùng' : (selectedRole === 'doctor' ? 'Bác sĩ' : 'Y tá')}</CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleInitSubmit} className="space-y-4">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Các trường Input cũ giữ nguyên */}
                <div className="space-y-2">
                    <Label>Họ và tên <span className="text-red-500">*</span></Label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="pl-9" placeholder="Nguyễn Văn A" onBlur={() => handleBlur('name')} />
                    </div>
                    {touched.name && !formData.name && <span className="text-xs text-red-500">Bắt buộc nhập</span>}
                </div>

                <div className="space-y-2">
                    <Label>Email <span className="text-red-500">*</span></Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="pl-9" placeholder="email@example.com" onBlur={() => handleBlur('email')} />
                    </div>
                    {touched.email && !formData.email && <span className="text-xs text-red-500">Bắt buộc nhập</span>}
                </div>

                <div className="space-y-2">
                    <Label>Số điện thoại <span className="text-red-500">*</span></Label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                        <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="pl-9" placeholder="09xxxx" onBlur={() => handleBlur('phone')} />
                    </div>
                </div>

                {/* Mã Bác sĩ / Y tá */}
                {selectedRole === 'doctor' && (
                    <div className="space-y-2">
                        <Label>Mã bác sĩ <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <BadgeCheck className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input value={formData.doctorCode} onChange={e => setFormData({...formData, doctorCode: e.target.value})} className="pl-9" placeholder="Mã được cấp" />
                        </div>
                    </div>
                )}
                {selectedRole === 'nurse' && (
                    <div className="space-y-2">
                        <Label>Mã y tá <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <BadgeCheck className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input value={formData.nurseCode} onChange={e => setFormData({...formData, nurseCode: e.target.value})} className="pl-9" placeholder="Mã được cấp" />
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Mật khẩu <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="pl-9" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Xác nhận <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input type="password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} className="pl-9" />
                        </div>
                    </div>
                </div>

                <Button type="submit" className="w-full bg-[#1A73E8]" disabled={loading}>
                    {loading ? "Đang xử lý..." : "Tiếp tục"}
                </Button>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}