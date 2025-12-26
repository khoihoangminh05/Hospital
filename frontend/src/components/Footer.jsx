import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Heart,
} from "lucide-react";

export function Footer({ setCurrentPage }) {
  const quickLinks = [
    { label: "Trang chủ", page: "home" },
    { label: "Giới thiệu", page: "about" },
    { label: "Khoa phòng", page: "departments" },
    { label: "Bác sĩ", page: "doctors" },
  ];

  const services = [
    { label: "Đặt lịch khám", page: "appointment" },
    { label: "Tin tức", page: "news" },
    { label: "Liên hệ", page: "contact" },
  ];

  const handleLinkClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0C4A6E] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#1A73E8] rounded-lg flex items-center justify-center shadow-lg">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white">Bệnh viện Tự Nhiên</h3>
              </div>
            </div>
            <p className="text-blue-100 mb-4 leading-relaxed">
              Cung cấp dịch vụ y tế chất lượng cao với trang thiết bị hiện đại
              và đội ngũ y bác sĩ tận tâm.
            </p>
            <div className="flex gap-3">
              <button className="w-9 h-9 bg-white/10 hover:bg-[#1A73E8] rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 bg-white/10 hover:bg-[#1A73E8] rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 bg-white/10 hover:bg-[#1A73E8] rounded-lg flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-white">Liên kết nhanh</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => handleLinkClick(link.page)}
                    className="text-blue-100 hover:text-[#1A73E8] transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-white">Dịch vụ</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.page}>
                  <button
                    onClick={() => handleLinkClick(service.page)}
                    className="text-blue-100 hover:text-[#1A73E8] transition-colors"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-white">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex gap-3 text-blue-100">
                <MapPin className="w-5 h-5 flex-shrink-0 text-[#1A73E8]" />
                <span>
                  336 Nguyễn Trãi, Trường Đại học Khoa học Tự Nhiên
                </span>
              </li>
              <li className="flex gap-3 text-blue-100">
                <Phone className="w-5 h-5 flex-shrink-0 text-[#1A73E8]" />
                <a href="tel:19001234" className="hover:text-[#1A73E8]">
                  1900 1234
                </a>
              </li>
              <li className="flex gap-3 text-blue-100">
                <Mail className="w-5 h-5 flex-shrink-0 text-[#1A73E8]" />
                <a
                  href="mailto:info@tunhien.vn"
                  className="hover:text-[#1A73E8]"
                >
                  info@tunhien.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-blue-100">
          <p>© 2024 Bệnh viện Tự Nhiên. All rights reserved.</p>
          <p className="text-sm mt-2">
            Giấy phép hoạt động số: 123/BYT-GP | Cơ sở đạt chuẩn chất lượng
            ISO 9001:2015
          </p>
        </div>
      </div>
    </footer>
  );
}
