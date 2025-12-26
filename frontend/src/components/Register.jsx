import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Mail,
  Lock,
  User,
  Phone,
  AlertCircle,
  CheckCircle2,
  UserCircle,
  Stethoscope,
  Heart,
  ArrowLeft,
  Home,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";
import { toast } from "sonner";
import api from "@/config/axios";

export function Register({ setCurrentPage }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    doctorCode: "",
    nurseCode: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
    doctorCode: false,
    nurseCode: false,
  });

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Vui lòng nhập họ và tên";
    if (!formData.email.trim()) return "Vui lòng nhập email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return "Email không hợp lệ";
    if (!formData.phone.trim()) return "Vui lòng nhập số điện thoại";
    if (!/^[0-9]{10}$/.test(formData.phone))
      return "Số điện thoại không hợp lệ (10 chữ số)";
    if (!formData.password) return "Vui lòng nhập mật khẩu";
    if (formData.password.length < 6)
      return "Mật khẩu phải có ít nhất 6 ký tự";
    if (!formData.confirmPassword)
      return "Vui lòng xác nhận mật khẩu";
    if (formData.password !== formData.confirmPassword)
      return "Mật khẩu xác nhận không khớp";

    if (selectedRole === "doctor" && !formData.doctorCode.trim()) {
      return "Vui lòng nhập mã bác sĩ";
    }

    if (selectedRole === "nurse" && !formData.nurseCode.trim()) {
      return "Vui lòng nhập mã y tá";
    }

    return null;
  };

  const isFormValid = () => validateForm() === null;

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  const validationError = validateForm();
  if (validationError) {
    setError(validationError);
    return;
  }

  setLoading(true);

  try {
    const user = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: selectedRole, // patient | doctor | nurse
      doctorCode: formData.doctorCode,
      nurseCode: formData.nurseCode,
    }
    if(!user.doctorCode) delete user.doctorCode;
    if(!user.nurseCode) delete user.nurseCode;
    console.log(user);
    await api.post("api/auth/register", user);

    toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
    setSuccess(true);

    setTimeout(() => {
      setCurrentPage("login");
    }, 1500);
  } catch (err) {
    setError(
      err.response?.data?.message || "Có lỗi xảy ra. Vui lòng thử lại."
    );
  } finally {
    setLoading(false);
  }
};

  const roleOptions = [
    {
      id: "patient",
      title: "Người dùng",
      subtitle: "Bệnh nhân",
      description: "Đăng ký để đặt lịch khám và quản lý hồ sơ sức khỏe",
      icon: UserCircle,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200 hover:border-blue-400",
      iconColor: "text-blue-600",
    },
    {
      id: "doctor",
      title: "Bác sĩ",
      subtitle: "Y bác sĩ",
      description: "Dành cho bác sĩ để quản lý lịch khám và bệnh nhân",
      icon: Stethoscope,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200 hover:border-green-400",
      iconColor: "text-green-600",
    },
    {
      id: "nurse",
      title: "Y tá",
      subtitle: "Điều dưỡng",
      description: "Dành cho y tá hỗ trợ chăm sóc bệnh nhân",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200 hover:border-pink-400",
      iconColor: "text-pink-600",
    },
  ];

  /* ================= SUCCESS SCREEN ================= */
  if (success) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-[#E8F1FF] to-white">
        <Card className="w-full max-w-md shadow-medical-lg animate-scale-in">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="mb-4 text-[#0C4A6E]">Đăng ký thành công!</h2>
            <p className="text-muted-foreground">
              Đang chuyển đến trang đăng nhập...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ================= ROLE SELECTION ================= */
  if (!selectedRole) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#E8F1FF] via-white to-[#E8F1FF] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {roleOptions.map((role) => {
              const Icon = role.icon;
              return (
                <Card
                  key={role.id}
                  className={`cursor-pointer border-2 ${role.borderColor}`}
                  onClick={() => setSelectedRole(role.id)}
                >
                  <CardContent className="p-8 text-center">
                    <Icon className={`w-10 h-10 mx-auto mb-4 ${role.iconColor}`} />
                    <h3 className="mb-2">{role.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {role.description}
                    </p>
                    <Button
                      className={`mt-6 w-full bg-gradient-to-r ${role.color}`}
                    >
                      Chọn vai trò
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const selectedRoleOption = roleOptions.find(
    (r) => r.id === selectedRole
  );
  const Icon = selectedRoleOption.icon;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#E8F1FF] to-white py-16 px-4">
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          onClick={() => setSelectedRole(null)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        <Card>
          <CardHeader className="text-center">
            <Icon className={`w-8 h-8 mx-auto ${selectedRoleOption.iconColor}`} />
            <CardTitle>Đăng ký {selectedRoleOption.title}</CardTitle>
            <CardDescription>
              {selectedRoleOption.description}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* các Input giữ nguyên như trên – đã JSX-safe */}
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onBlur={() => handleBlur('name')}
                    className="pl-10 bg-[#F2F7FB] border-gray-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                    required
                  />
                </div>
                {touched.name && !formData.name && (
                  <p className="text-xs text-red-500">Vui lòng nhập họ và tên</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={() => handleBlur('email')}
                    className="pl-10 bg-[#F2F7FB] border-gray-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                    required
                  />
                </div>
                {touched.email && !formData.email && (
                  <p className="text-xs text-red-500">Vui lòng nhập email</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0901234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    onBlur={() => handleBlur('phone')}
                    className="pl-10 bg-[#F2F7FB] border-gray-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                    required
                  />
                </div>
                {touched.phone && formData.phone && !/^[0-9]{10}$/.test(formData.phone) && (
                  <p className="text-xs text-red-500">Số điện thoại không hợp lệ (10 chữ số)</p>
                )}
              </div>

              {/* Doctor Code */}
              {selectedRole === 'doctor' && (
                <div className="space-y-2">
                  <Label htmlFor="doctorCode">Mã bác sĩ *</Label>
                  <div className="relative">
                    <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="doctorCode"
                      type="text"
                      placeholder="Nhập mã bác sĩ"
                      value={formData.doctorCode}
                      onChange={(e) => setFormData({ ...formData, doctorCode: e.target.value })}
                      onBlur={() => handleBlur('doctorCode')}
                      className="pl-10 bg-[#F2F7FB] border-gray-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nhập mã bác sĩ được cấp bởi bệnh viện
                  </p>
                  {touched.doctorCode && !formData.doctorCode && (
                    <p className="text-xs text-red-500">Vui lòng nhập mã bác sĩ</p>
                  )}
                </div>
              )}

              {/* Nurse Code */}
              {selectedRole === 'nurse' && (
                <div className="space-y-2">
                  <Label htmlFor="nurseCode">Mã y tá *</Label>
                  <div className="relative">
                    <BadgeCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="nurseCode"
                      type="text"
                      placeholder="Nhập mã y tá"
                      value={formData.nurseCode}
                      onChange={(e) => setFormData({ ...formData, nurseCode: e.target.value })}
                      onBlur={() => handleBlur('nurseCode')}
                      className="pl-10 bg-[#F2F7FB] border-gray-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                      required
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Nhập mã y tá do bệnh viện cung cấp
                  </p>
                  {touched.nurseCode && !formData.nurseCode && (
                    <p className="text-xs text-red-500">Vui lòng nhập mã y tá</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    onBlur={() => handleBlur('password')}
                    className="pl-10 bg-[#F2F7FB] border-gray-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">Tối thiểu 6 ký tự</p>
                {touched.password && formData.password && formData.password.length < 6 && (
                  <p className="text-xs text-red-500">Mật khẩu phải có ít nhất 6 ký tự</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    onBlur={() => handleBlur('confirmPassword')}
                    className="pl-10 bg-[#F2F7FB] border-gray-200 focus:border-[#1A73E8] focus:ring-[#1A73E8]"
                    required
                  />
                </div>
                {touched.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-red-500">Mật khẩu xác nhận không khớp</p>
                )}
              </div>
              <Button
                type="submit"
                className={`w-full bg-gradient-to-r ${selectedRoleOption.color}`}
                disabled={loading || !isFormValid()}
              >
                {loading ? "Đang đăng ký..." : "Đăng ký"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
