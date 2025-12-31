import { useState } from "react";
import { Menu, X, Phone, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "../contexts/AuthContext";

export function Navbar({ currentPage, setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleNavClick = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    logout();
    setCurrentPage("home");
    setIsMenuOpen(false);
  };

  const publicMenuItems = [
    { id: "home", label: "Trang chủ" },
    { id: "about", label: "Giới thiệu" },
    { id: "departments", label: "Khoa phòng" },
    { id: "doctors", label: "Bác sĩ" },
    { id: "appointment", label: "Đặt lịch khám" },
    { id: "news", label: "Tin tức" },
  ];

  const userMenuItems = user
    ? [{ id: "profile", label: "Hồ sơ cá nhân" }]
    : [];

  const adminMenuItems =
    user?.role === "admin"
      ? [{ id: "admin-dashboard", label: "Dashboard" }]
      : [];

  const doctorMenuItems = user?.role === 'doctor' ? [
    { id: 'doctor-dashboard', label: 'Dashboard Bác sĩ' },
  ] : [];

  const nurseMenuItems = user?.role === 'nurse' ? [
    { id: 'nurse-dashboard', label: 'Dashboard Y tá' },
  ] : [];

  const visibleMenuItems = [
    ...publicMenuItems,
    ...userMenuItems,
    ...adminMenuItems,
    ...doctorMenuItems,
    ...nurseMenuItems,
  ];

  const isActive = (id) => currentPage === id;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavClick("home")}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#1A73E8] to-[#0C4A6E] rounded-xl flex items-center justify-center shadow-md">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-[#1A73E8] leading-tight">
                Bệnh viện Tự Nhiên
              </h2>
              <p className="text-xs text-muted-foreground">
                Natural Hospital
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {visibleMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive(item.id)
                    ? "bg-[#1A73E8] text-white shadow-md"
                    : "text-[#1E293B] hover:bg-[#E8F1FF] hover:text-[#1A73E8]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Actions Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#E8F1FF] rounded-lg">
                  <User className="w-4 h-4 text-[#1A73E8]" />
                  <span className="text-sm text-[#0C4A6E]">
                    {user.name}
                  </span>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Đăng xuất
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleNavClick("register")}
                  variant="outline"
                  className="border-[#1A73E8] text-[#1A73E8] hover:bg-[#E8F1FF]"
                >
                  Đăng ký
                </Button>
                <Button
                  onClick={() => handleNavClick("login")}
                  variant="outline"
                  className="border-[#1A73E8] text-[#1A73E8] hover:bg-[#E8F1FF]"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={() => handleNavClick("appointment")}
                  className="bg-[#1A73E8] hover:bg-[#0C4A6E] shadow-md"
                >
                  Đặt lịch ngay
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#E8F1FF]"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#1E293B]" />
            ) : (
              <Menu className="w-6 h-6 text-[#1E293B]" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            {visibleMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  isActive(item.id)
                    ? "bg-[#1A73E8] text-white shadow-md"
                    : "text-[#1E293B] hover:bg-[#E8F1FF] hover:text-[#1A73E8]"
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="px-4 pt-3 space-y-2">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#E8F1FF] rounded-lg mb-2">
                    <User className="w-4 h-4 text-[#1A73E8]" />
                    <span className="text-sm text-[#0C4A6E]">
                      {user.name}
                    </span>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => handleNavClick("register")}
                    variant="outline"
                    className="w-full border-[#1A73E8] text-[#1A73E8] hover:bg-[#E8F1FF] mb-2"
                  >
                    Đăng ký
                  </Button>
                  <Button
                    onClick={() => handleNavClick("login")}
                    variant="outline"
                    className="w-full border-[#1A73E8] text-[#1A73E8] hover:bg-[#E8F1FF] mb-2"
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    onClick={() => handleNavClick("appointment")}
                    className="w-full bg-[#1A73E8] hover:bg-[#0C4A6E] shadow-md"
                  >
                    Đặt lịch ngay
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
