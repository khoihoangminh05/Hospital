import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Building2,
  CheckCircle2,
  Heart,
  Users,
  Stethoscope,
  Activity,
  Baby,
  HeartPulse,
  Brain,
  Bone,
  Eye,
  Siren,
  Home,
  Calendar,
  Clock,
  Award,
  Shield,
  User
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Departments({ setCurrentPage }) {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const departments = [
    {
      id: 'tim-mach',
      icon: Heart,
      title: 'Khoa Tim Mạch',
      shortDescription: 'Chăm sóc tim mạch toàn diện với công nghệ chẩn đoán tiên tiến',
      fullDescription: 'Khoa Tim Mạch của Bệnh viện Tự Nhiên chuyên điều trị các bệnh lý về tim mạch với đội ngũ bác sĩ chuyên môn cao và trang thiết bị hiện đại. Chúng tôi cung cấp dịch vụ khám, chẩn đoán và điều trị toàn diện các bệnh về tim mạch, từ tăng huyết áp, rối loạn nhịp tim đến các bệnh lý phức tạp hơn.',
      services: [
        'Siêu âm tim Doppler màu',
        'Điện tâm đồ (ECG)',
        'Holter 24h',
        'Test gắng sức',
        'Can thiệp tim mạch',
        'Phẫu thuật tim hở'
      ],
      doctors: 15,
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      availability: '24/7'
    },
    {
      id: 'noi-tong-quat',
      icon: Stethoscope,
      title: 'Khoa Nội Tổng Quát',
      shortDescription: 'Khám và điều trị các bệnh nội khoa phổ biến',
      fullDescription: 'Khoa Nội Tổng Quát chuyên khám và điều trị các bệnh lý nội khoa thường gặp như tiểu đường, bệnh về gan, thận, tiêu hóa và các bệnh nhiễm trùng. Đội ngũ bác sĩ giàu kinh nghiệm, tận tâm v���i người bệnh.',
      services: [
        'Khám nội tổng quát',
        'Điều trị tiểu đường',
        'Bệnh lý gan mật',
        'Bệnh về thận',
        'Bệnh tiêu hóa',
        'Điều trị nhiễm trùng'
      ],
      doctors: 20,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      availability: 'Thứ 2 - Chủ nhật'
    },
    {
      id: 'ngoai',
      icon: Activity,
      title: 'Khoa Ngoại',
      shortDescription: 'Thực hiện các ca phẫu thuật an toàn, chính xác',
      fullDescription: 'Khoa Ngoại của bệnh viện trang bị phòng mổ hiện đại, đạt chuẩn quốc tế. Chúng tôi thực hiện các ca phẫu thuật từ nhỏ đến phức tạp với tỷ lệ thành công cao và thời gian hồi phục nhanh.',
      services: [
        'Phẫu thuật nội soi',
        'Phẫu thuật ổ bụng',
        'Phẫu thuật tuyến giáp',
        'Phẫu thuật vú',
        'Phẫu thuật ruột thừa',
        'Phẫu thuật tạo hình'
      ],
      doctors: 18,
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      availability: '24/7'
    },
    {
      id: 'nhi',
      icon: Baby,
      title: 'Khoa Nhi',
      shortDescription: 'Chăm sóc sức khỏe toàn diện cho trẻ em',
      fullDescription: 'Khoa Nhi chuyên chăm sóc sức khỏe trẻ em từ sơ sinh đến 16 tuổi. Với không gian thân thiện, đội ngũ bác sĩ tận tâm và kinh nghiệm trong điều trị các bệnh lý nhi khoa.',
      services: [
        'Khám sức khỏe trẻ em',
        'Tiêm chủng đầy đủ',
        'Điều trị nhiễm trùng',
        'Dinh dưỡng trẻ em',
        'Theo dõi phát triển',
        'Cấp cứu nhi khoa'
      ],
      doctors: 12,
      image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50',
      availability: 'Thứ 2 - Chủ nhật'
    },
    {
      id: 'cap-cuu',
      icon: Siren,
      title: 'Khoa Cấp Cứu',
      shortDescription: 'Hỗ trợ cấp cứu 24/7 với đội ngũ y bác sĩ chuyên nghiệp',
      fullDescription: 'Khoa Cấp Cứu hoạt động 24/7 với đội ngũ y bác sĩ, điều dưỡng luôn sẵn sàng. Trang bị đầy đủ phương tiện và thuốc men để xử lý các ca cấp cứu.',
      services: [
        'Cấp cứu tai nạn',
        'Cấp cứu đột quỵ',
        'Cấp cứu tim mạch',
        'Cấp cứu hô hấp',
        'Cấp cứu nhi khoa',
        'Xe cứu thương 24/7'
      ],
      doctors: 25,
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      availability: '24/7'
    },
    {
      id: 'than-kinh',
      icon: Brain,
      title: 'Khoa Thần Kinh',
      shortDescription: 'Chẩn đoán và điều trị các bệnh lý thần kinh',
      fullDescription: 'Khoa Thần Kinh chuyên điều trị các bệnh lý về hệ thần kinh như đột quỵ, động kinh, đau đầu, Parkinson và các rối loạn thần kinh khác. Trang bị công nghệ chẩn đoán hình ảnh hiện đại.',
      services: [
        'Chẩn đoán đột quỵ',
        'Điều trị động kinh',
        'Điều trị Parkinson',
        'Điều trị đau đầu',
        'MRI não',
        'Điện não đồ (EEG)'
      ],
      doctors: 10,
      image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      availability: 'Thứ 2 - Chủ nhật'
    },
    {
      id: 'xuong-khop',
      icon: Bone,
      title: 'Khoa Xương Khớp',
      shortDescription: 'Điều trị các bệnh lý về xương khớp và cột sống',
      fullDescription: 'Khoa Xương Khớp chuyên điều trị các bệnh lý về xương, khớp, cột sống và chấn thương. Chúng tôi cung cấp dịch vụ từ khám, chẩn đoán đến phẫu thuật và phục hồi chức năng.',
      services: [
        'Điều trị thoái hóa khớp',
        'Phẫu thuật thay khớp',
        'Điều trị cột sống',
        'Chấn thương thể thao',
        'Vật lý trị liệu',
        'Phục hồi chức năng'
      ],
      doctors: 14,
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=600',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50',
      availability: 'Thứ 2 - Thứ 7'
    },
    {
      id: 'mat',
      icon: Eye,
      title: 'Khoa Mắt',
      shortDescription: 'Chăm sóc và điều trị các bệnh lý về mắt',
      fullDescription: 'Khoa Mắt cung cấp dịch vụ khám, chẩn đoán và điều trị toàn diện các bệnh lý về mắt. Trang bị máy móc hiện đại cho phẫu thuật mắt và điều trị các bệnh lý phức tạp.',
      services: [
        'Khám tật khúc xạ',
        'Phẫu thuật đục thủy tinh thể',
        'Điều trị glaucoma',
        'Phẫu thuật Lasik',
        'Điều trị võng mạc',
        'Khám mắt cho trẻ em'
      ],
      doctors: 8,
      image: 'https://plus.unsplash.com/premium_photo-1677333508720-c37038cbf8be?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      color: 'text-teal-500',
      bgColor: 'bg-teal-50',
      availability: 'Thứ 2 - Thứ 7'
    },
    {
      id: 'da-lieu',
      icon: User,
      title: 'Khoa Da Liễu',
      shortDescription: 'Chăm sóc và điều trị các bệnh về da',
      fullDescription: 'Khoa Da Liễu chuyên điều trị các bệnh lý về da, tóc, móng và các vấn đề thẩm mỹ da. Đội ngũ bác sĩ chuyên môn cao với công nghệ điều trị hiện đại.',
      services: [
        'Điều trị mụn trứng cá',
        'Điều trị viêm da',
        'Điều trị nám, tàn nhang',
        'Điều trị rụng tóc',
        'Laser thẩm mỹ',
        'Điều trị bệnh nấm da'
      ],
      doctors: 7,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600',
      color: 'text-rose-500',
      bgColor: 'bg-rose-50',
      availability: 'Thứ 2 - Thứ 7'
    },
    {
      id: 'san-phu-khoa',
      icon: Heart,
      title: 'Khoa Sản Phụ Khoa',
      shortDescription: 'Chăm sóc sức khỏe phụ nữ và thai sản',
      fullDescription: 'Khoa Sản Phụ Khoa cung cấp dịch vụ chăm sóc sức khỏe toàn diện cho phụ nữ, từ khám phụ khoa, chăm sóc thai sản đến sinh nở và sau sinh.',
      services: [
        'Khám phụ khoa định kỳ',
        'Theo dõi thai kỳ',
        'Siêu âm 4D',
        'Sinh thường và sinh mổ',
        'Chăm sóc sau sinh',
        'Tư vấn kế hoạch hóa gia đình'
      ],
      doctors: 16,
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600',
      color: 'text-fuchsia-500',
      bgColor: 'bg-fuchsia-50',
      availability: '24/7'
    }
  ];

  const openDepartmentDetail = (dept) => {
    setSelectedDepartment(dept);
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=1920&q=80"
            alt="Các khoa phòng - Bệnh viện Tự Nhiên"
            className="w-full h-full object-cover"
          />
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-[#1A73E8]/30"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-6 text-sm">
              <button
                onClick={() => handleNavigation('home')}
                className="text-[#1A73E8] hover:text-[#0C4A6E] transition-colors flex items-center gap-1"
              >
                <Home className="w-4 h-4" />
                Trang chủ
              </button>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Khoa phòng</span>
            </div>

            {/* Title */}
            <Badge className="bg-[#1A73E8] text-white mb-6 text-base px-6 py-2 hover:bg-[#0C4A6E]">
              <Building2 className="w-4 h-4 mr-2" />
              Khoa phòng chuyên sâu
            </Badge>

            <h1 className="text-[#0C4A6E] mb-8 leading-tight text-5xl md:text-6xl lg:text-7xl">
              CÁC KHOA PHÒNG
            </h1>

            <p className="text-xl md:text-2xl text-[#1E293B] mb-10 leading-relaxed max-w-3xl">
              Khám phá các khoa phòng chuyên nghiệp và hiện đại của chúng tôi
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                onClick={() => handleNavigation('home')}
                className="bg-[#1A73E8] hover:bg-[#0C4A6E] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-lg px-10 py-7 h-auto"
              >
                <Home className="mr-3 w-6 h-6" />
                Trang chủ
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => handleNavigation('contact')}
                className="border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white transition-all duration-300 text-lg px-10 py-7 h-auto"
              >
                <Phone className="mr-3 w-6 h-6" />
                Liên hệ ngay
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENT LIST / DANH SÁCH KHOA PHÒNG */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <Badge className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 mb-4 text-base px-6 py-2">
                <Stethoscope className="w-4 h-4 mr-2" />
                Danh sách khoa phòng
              </Badge>
              <h2 className="mb-6 text-[#0C4A6E] text-4xl md:text-5xl">
                Khoa Phòng Chuyên Sâu
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Trang bị công nghệ hiện đại, đội ngũ chuyên gia giàu kinh nghiệm
              </p>
            </div>

            {/* Department Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.map((dept, index) => {
                const Icon = dept.icon;
                return (
                  <Card 
                    key={dept.id}
                    className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group cursor-pointer overflow-hidden bg-white"
                    onClick={() => openDepartmentDetail(dept)}
                  >
                    <CardContent className="p-0">
                      {/* Department Image */}
                      <div className="relative h-52 overflow-hidden">
                        <ImageWithFallback
                          src={dept.image}
                          alt={dept.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                        
                        {/* Icon Badge */}
                        <div className={`absolute top-4 right-4 w-14 h-14 ${dept.bgColor} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className={`w-7 h-7 ${dept.color}`} />
                        </div>
                        
                        {/* Availability Badge */}
                        <Badge className="absolute top-4 left-4 bg-white/95 text-[#1A73E8] border-0">
                          <Clock className="w-3 h-3 mr-1" />
                          {dept.availability}
                        </Badge>
                        
                        {/* Title on Image */}
                        <div className="absolute bottom-4 left-4">
                          <h3 className="text-white text-xl mb-1">{dept.title}</h3>
                          <div className="flex items-center gap-2 text-blue-100 text-sm">
                            <Users className="w-4 h-4" />
                            <span>{dept.doctors} bác sĩ</span>
                          </div>
                        </div>
                      </div>

                      {/* Department Info */}
                      <div className="p-6">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {dept.shortDescription}
                        </p>
                        
                        <Button 
                          variant="ghost" 
                          className="text-[#1A73E8] hover:text-[#0C4A6E] p-0 h-auto hover:bg-transparent group/btn w-full justify-start text-base"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDepartmentDetail(dept);
                          }}
                        >
                          Xem thêm
                          <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  {/* Left: Image */}
                  <div className="relative h-64 lg:h-auto">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1551076805-e1869033e561?w=800"
                      alt="Đặt lịch khám"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A73E8]/80 to-transparent"></div>
                  </div>

                  {/* Right: CTA Content */}
                  <div className="p-12 flex flex-col justify-center bg-gradient-to-br from-[#E8F1FF] to-white">
                    <Badge className="bg-[#1A73E8] text-white mb-6 text-base px-6 py-2 w-fit">
                      <Calendar className="w-4 h-4 mr-2" />
                      Đặt lịch dễ dàng
                    </Badge>

                    <h2 className="text-[#0C4A6E] mb-6 text-4xl md:text-5xl">
                      Đặt lịch khám<br />tại các khoa
                    </h2>

                    <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                      Chọn khoa phòng phù hợp và đặt lịch khám ngay hôm nay
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Button 
                        size="lg"
                        onClick={() => handleNavigation('appointment')}
                        className="bg-[#1A73E8] hover:bg-[#0C4A6E] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-lg px-10 py-7 h-auto"
                      >
                        <Calendar className="mr-3 w-6 h-6" />
                        Đặt lịch ngay
                        <ArrowRight className="ml-3 w-6 h-6" />
                      </Button>
                      <Button 
                        size="lg"
                        variant="outline"
                        onClick={() => handleNavigation('contact')}
                        className="border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white transition-all duration-300 text-lg px-10 py-7 h-auto"
                      >
                        <Phone className="mr-3 w-6 h-6" />
                        Liên hệ ngay
                      </Button>
                    </div>

                    {/* Emergency Contact */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <p className="text-sm text-muted-foreground mb-2">Cấp cứu 24/7:</p>
                      <a 
                        href="tel:19001234"
                        className="text-2xl text-[#1A73E8] hover:text-[#0C4A6E] transition-colors flex items-center gap-2"
                      >
                        <Phone className="w-6 h-6" />
                        1900 1234
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0C4A6E] text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Hospital Info */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#1A73E8] rounded-xl flex items-center justify-center shadow-lg">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white text-xl">Bệnh viện Tự Nhiên</h3>
                </div>
              </div>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Cung cấp dịch vụ y tế chất lượng cao với trang thiết bị hiện đại và đội ngũ y bác sĩ tận tâm.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Địa chỉ:</p>
                    <p className="text-white">
                      336 Nguyễn Trãi, Trường Đại học Khoa học Tự Nhiên
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Số điện thoại:</p>
                    <a 
                      href="tel:19001234" 
                      className="text-white hover:text-blue-200 transition-colors"
                    >
                      1900 1234
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-300 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-blue-100 text-sm mb-1">Email:</p>
                    <a 
                      href="mailto:info@tunhien.vn" 
                      className="text-white hover:text-blue-200 transition-colors"
                    >
                      info@tunhien.vn
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6 text-xl text-white">Liên kết nhanh</h4>
              <ul className="space-y-3">
                {['home', 'about', 'departments', 'doctors', 'appointment', 'news', 'contact'].map((page) => {
                  const labels = {
                    home: 'Trang chủ',
                    about: 'Giới thiệu',
                    departments: 'Khoa phòng',
                    doctors: 'Bác sĩ',
                    appointment: 'Đặt lịch khám',
                    news: 'Tin tức',
                    contact: 'Liên hệ'
                  };
                  return (
                    <li key={page}>
                      <button 
                        onClick={() => handleNavigation(page)}
                        className="text-blue-200 hover:text-white transition-colors text-left flex items-center gap-2 group"
                      >
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        {labels[page]}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Working Hours */}
            <div>
              <h4 className="mb-6 text-xl text-white">Giờ làm việc</h4>
              <div className="space-y-3 text-blue-200">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Thứ 2 - Thứ 6:</span>
                  <span className="text-white">7:00 - 19:00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Thứ 7:</span>
                  <span className="text-white">7:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span>Chủ nhật:</span>
                  <span className="text-white">8:00 - 16:00</span>
                </div>
                <div className="pt-4 mt-4 border-t border-white/20">
                  <div className="flex items-center gap-2 text-[#34C759]">
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-lg">Cấp cứu 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/20 text-center">
            <p className="text-blue-200">
              © 2024 Bệnh viện Tự Nhiên. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* DEPARTMENT DETAIL MODAL */}
      <Dialog open={!!selectedDepartment} onOpenChange={(open) => !open && setSelectedDepartment(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedDepartment && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 ${selectedDepartment.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    {(() => {
                      const Icon = selectedDepartment.icon;
                      return <Icon className={`w-8 h-8 ${selectedDepartment.color}`} />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-3xl text-[#0C4A6E] mb-2">
                      {selectedDepartment.title}
                    </DialogTitle>
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20">
                        <Clock className="w-3 h-3 mr-1" />
                        {selectedDepartment.availability}
                      </Badge>
                      <Badge className="bg-green-50 text-green-700 border-green-200">
                        <Users className="w-3 h-3 mr-1" />
                        {selectedDepartment.doctors} bác sĩ
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={selectedDepartment.image}
                    alt={selectedDepartment.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>

                {/* Description */}
                <DialogDescription className="text-lg text-[#1E293B] leading-relaxed">
                  {selectedDepartment.fullDescription}
                </DialogDescription>

                {/* Services */}
                <div>
                  <h4 className="text-xl text-[#0C4A6E] mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#1A73E8]" />
                    Dịch vụ cung cấp
                  </h4>
                  <div className="grid md:grid-cols-2 gap-3">
                    {selectedDepartment.services.map((service, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-[#E8F1FF] rounded-xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#1A73E8] flex-shrink-0 mt-0.5" />
                        <span className="text-[#1E293B]">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6 border-t">
                  <Button 
                    size="lg"
                    onClick={() => {
                      setSelectedDepartment(null);
                      handleNavigation('appointment');
                    }}
                    className="bg-[#1A73E8] hover:bg-[#0C4A6E] text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8 py-6 h-auto"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Đặt lịch khám
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setSelectedDepartment(null);
                      handleNavigation('doctors');
                    }}
                    className="border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white transition-all duration-300 text-base px-8 py-6 h-auto"
                  >
                    <Users className="mr-2 w-5 h-5" />
                    Xem bác sĩ
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setSelectedDepartment(null);
                      handleNavigation('contact');
                    }}
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100 transition-all duration-300 text-base px-8 py-6 h-auto"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    Liên hệ
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
