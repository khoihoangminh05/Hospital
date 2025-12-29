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
import { Lock, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export function Login({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
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


  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-[#007BFF]/5 to-white">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center">Đăng nhập</CardTitle>
            <CardDescription className="text-center">
              Đăng nhập để truy cập hệ thống quản lý
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
                <Label htmlFor="password">Mật khẩu</Label>
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

            
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
