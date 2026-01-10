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
import { useAuth } from "../contexts/AuthContext";
import { Lock, Mail, AlertCircle, ArrowLeft, KeyRound } from "lucide-react";
import { toast } from "sonner";
import api from "../config/axios"; // Đảm bảo import đúng đường dẫn axios của bạn

export function Login({ setCurrentPage }) {
  // State quản lý xem đang ở màn hình Login hay Forgot Password
  // 'login' | 'forgot-email' | 'forgot-reset'
  const [view, setView] = useState("login"); 

  // State cho Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // State cho Forgot Password
  const [resetEmail, setResetEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // --- XỬ LÝ ĐĂNG NHẬP ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError("Email hoặc mật khẩu không chính xác");
        return;
      }
      toast.success("Đăng nhập thành công!");
      setCurrentPage("home");
    } catch (err) {
      console.log(err);
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // --- BƯỚC 1: GỬI YÊU CẦU QUÊN MẬT KHẨU (Gửi OTP) ---
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Gọi API gửi mail
      await api.post('/api/auth/forgot-password', { email: resetEmail });
      
      toast.success("Mã OTP đã được gửi tới email của bạn!");
      setView("forgot-reset"); // Chuyển sang màn hình nhập OTP
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Không thể gửi email. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // --- BƯỚC 2: ĐẶT LẠI MẬT KHẨU (Gửi OTP + Pass mới) ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post('/api/auth/reset-password', {
        email: resetEmail,
        otp: otp,
        newPassword: newPassword
      });

      toast.success("Đổi mật khẩu thành công! Hãy đăng nhập lại.");
      
      // Reset form và quay về login
      setResetEmail("");
      setOtp("");
      setNewPassword("");
      setView("login");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Mã OTP không đúng hoặc đã hết hạn.");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER GIAO DIỆN ---
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-[#007BFF]/5 to-white">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">
              {view === "login" && "Đăng nhập"}
              {view === "forgot-email" && "Quên mật khẩu"}
              {view === "forgot-reset" && "Đặt lại mật khẩu"}
            </CardTitle>
            <CardDescription className="text-center">
              {view === "login" && "Đăng nhập để truy cập hệ thống quản lý"}
              {view === "forgot-email" && "Nhập email để nhận mã xác thực"}
              {view === "forgot-reset" && "Kiểm tra email và nhập mã OTP"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* VIEW 1: LOGIN FORM */}
            {view === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <button
                      type="button"
                      onClick={() => { setError(""); setView("forgot-email"); }}
                      className="text-xs text-[#007BFF] hover:underline"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#007BFF] hover:bg-[#0056b3]"
                  disabled={loading}
                >
                  {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>
            )}

            {/* VIEW 2: FORGOT PASSWORD - STEP 1 (EMAIL) */}
            {view === "forgot-email" && (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email đăng ký</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="nhap@email.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#007BFF] hover:bg-[#0056b3]"
                  disabled={loading}
                >
                  {loading ? "Đang gửi OTP..." : "Gửi mã xác thực"}
                </Button>

                <button
                  type="button"
                  onClick={() => setView("login")}
                  className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Quay lại đăng nhập
                </button>
              </form>
            )}

            {/* VIEW 3: FORGOT PASSWORD - STEP 2 (OTP + NEW PASS) */}
            {view === "forgot-reset" && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="p-3 bg-blue-50 text-blue-700 text-sm rounded mb-2">
                    Mã OTP đã được gửi đến <b>{resetEmail}</b>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Mã OTP (6 số)</Label>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="otp"
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="pl-10 tracking-widest font-bold"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#007BFF] hover:bg-[#0056b3]"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
                </Button>

                <button
                  type="button"
                  onClick={() => setView("forgot-email")}
                  className="w-full text-center text-sm text-gray-500 hover:text-gray-700 mt-2"
                >
                  Gửi lại mã?
                </button>
              </form>
            )}

            {/* FOOTER */}
            {view === "login" && (
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Chưa có tài khoản?{" "}
                  <button
                    onClick={() => setCurrentPage("register")}
                    className="text-[#007BFF] hover:underline"
                  >
                    Đăng ký ngay
                  </button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}