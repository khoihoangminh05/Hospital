import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Heart, 
  Users, 
  Clock, 
  Calendar, 
  Stethoscope, 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Activity,
  Shield,
  Microscope,
  HeartPulse,
  Building2,
  CheckCircle2,
  Star,
  Award,
  Sparkles
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';



export function Hero({ setCurrentPage }) {
  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const departments = [
    {
      icon: Heart,
      title: 'Khoa Tim mạch',
      description: 'Chăm sóc tim mạch toàn diện với công nghệ chẩn đoán tiên tiến và điều trị hiện đại.',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600'
    },
    {
      icon: Activity,
      title: 'Khoa Nội tổng hợp',
      description: 'Khám và điều trị các bệnh lý nội khoa với đội ngũ bác sĩ giàu kinh nghiệm.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600'
    },
    {
      icon: Stethoscope,
      title: 'Khoa Ngoại tổng hợp',
      description: 'Phẫu thuật chuyên sâu với công nghệ nội soi và robot hiện đại.',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=600'
    },
    {
      icon: HeartPulse,
      title: 'Khoa Cấp cứu',
      description: 'Dịch vụ cấp cứu 24/7 với đội ngũ sẵn sàng và trang thiết bị đầy đủ.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-50',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600'
    }
  ];

  const doctors = [
    {
      name: 'BS. Nguyễn Văn An',
      specialty: 'Bác sĩ Tim mạch',
      experience: '15 năm kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400'
    },
    {
      name: 'BS. Trần Thị Bình',
      specialty: 'Bác sĩ Nhi khoa',
      experience: '12 năm kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400'
    },
    {
      name: 'BS. Lê Văn Cường',
      specialty: 'Bác sĩ Phẫu thuật',
      experience: '18 năm kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400'
    },
    {
      name: 'BS. Phạm Thị Dung',
      specialty: 'Bác sĩ Sản phụ khoa',
      experience: '14 năm kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400'
    },
    {
      name: 'BS. Hoàng Minh Tuấn',
      specialty: 'Bác sĩ Thần kinh',
      experience: '16 năm kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400'
    },
    {
      name: 'BS. Võ Thị Mai',
      specialty: 'Bác sĩ Nội tiết',
      experience: '13 năm kinh nghiệm',
      image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400'
    }
  ];

  const whyChooseUs = [
    {
      icon: Clock,
      title: 'Dịch vụ 24/7',
      description: 'Hỗ trợ y tế mọi lúc, mọi nơi với đội ngũ trực 24/7',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Microscope,
      title: 'Công nghệ tiên tiến',
      description: 'Thiết bị chẩn đoán và điều trị hiện đại nhất',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Award,
      title: 'Chuyên gia chất lượng',
      description: 'Bác sĩ và nhân viên có nhiều năm kinh nghiệm',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Shield,
      title: 'Chăm sóc người bệnh',
      description: 'Luôn đặt sự an toàn và thoải mái lên hàng đầu',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    }
  ];

  return (
    <div className="bg-white">
      {/* HERO SECTION / BANNER */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Real Hospital Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80"
            alt="Bệnh viện Tự Nhiên - Hospital Building"
            className="w-full h-full object-cover"
          />
          {/* Semi-transparent overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/90 to-[#1A73E8]/20"></div>
        </div>

        {/* Content - Left Panel */}
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content with White Panel */}
            <div className="bg-white/80 backdrop-blur-md p-12 rounded-3xl shadow-2xl border border-white">
              <Badge className="bg-[#1A73E8] text-white mb-6 text-base px-6 py-2 hover:bg-[#0C4A6E]">
                <Building2 className="w-4 h-4 mr-2" />
                Y tế chất lượng cao
              </Badge>

              {/* Main Title */}
              <h1 className="text-[#0C4A6E] mb-6 leading-tight text-5xl md:text-6xl lg:text-7xl">
                BỆNH VIỆN<br />TỰ NHIÊN
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-[#1E293B] mb-10 leading-relaxed">
                Chăm sóc sức khỏe toàn diện với dịch vụ y tế hiện đại và tận tâm
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg"
                  onClick={() => handleNavigation('appointment')}
                  className="bg-[#1A73E8] hover:bg-[#0C4A6E] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-lg px-10 py-7 h-auto"
                >
                  <Calendar className="mr-3 w-6 h-6" />
                  Đặt lịch ngay
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => handleNavigation('about')}
                  className="border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white transition-all duration-300 hover:scale-105 text-lg px-10 py-7 h-auto"
                >
                  Xem thêm
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-200">
                <div>
                  <div className="text-3xl text-[#1A73E8] mb-2">20+</div>
                  <div className="text-sm text-muted-foreground">Năm kinh nghiệm</div>
                </div>
                <div>
                  <div className="text-3xl text-[#1A73E8] mb-2">150+</div>
                  <div className="text-sm text-muted-foreground">Bác sĩ chuyên khoa</div>
                </div>
                <div>
                  <div className="text-3xl text-[#1A73E8] mb-2">100K+</div>
                  <div className="text-sm text-muted-foreground">Bệnh nhân</div>
                </div>
              </div>
            </div>

            {/* Right: Empty space for image visibility */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* DEPARTMENTS / KHOA PHÒNG SECTION */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 mb-4 text-base px-6 py-2">
              <Heart className="w-4 h-4 mr-2" />
              Dịch vụ chuyên khoa
            </Badge>
            <h2 className="mb-6 text-[#0C4A6E] text-4xl md:text-5xl">Các Khoa Phòng</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Khám phá dịch vụ chuyên khoa chuyên sâu của chúng tôi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {departments.map((dept, index) => {
              const Icon = dept.icon;
              return (
                <Card 
                  key={index}
                  className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-105 group cursor-pointer overflow-hidden bg-white"
                  onClick={() => handleNavigation('departments')}
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
                      <div className={`absolute top-4 right-4 w-14 h-14 ${dept.bgColor} rounded-xl flex items-center justify-center shadow-lg`}>
                        <Icon className={`w-7 h-7 ${dept.color}`} />
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-white text-xl">{dept.title}</h3>
                      </div>
                    </div>

                    {/* Department Info */}
                    <div className="p-6">
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {dept.description}
                      </p>
                      <Button 
                        variant="ghost" 
                        className="text-[#1A73E8] hover:text-[#0C4A6E] p-0 h-auto hover:bg-transparent group/btn w-full justify-start text-base"
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

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleNavigation('departments')}
              className="border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white text-lg px-10 py-7 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Building2 className="mr-3 w-6 h-6" />
              Xem tất cả khoa phòng
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* DOCTORS / BÁC SĨ SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 mb-4 text-base px-6 py-2">
              <Users className="w-4 h-4 mr-2" />
              Chuyên gia y tế
            </Badge>
            <h2 className="mb-6 text-[#0C4A6E] text-4xl md:text-5xl">Đội Ngũ Bác Sĩ</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Các chuyên gia y tế giàu kinh nghiệm, tận tâm với sức khỏe của bạn
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {doctors.map((doctor, index) => (
              <Card 
                key={index}
                className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group overflow-hidden bg-white cursor-pointer"
                onClick={() => handleNavigation('doctors')}
              >
                <CardContent className="p-0">
                  <div className="relative h-[420px] overflow-hidden">
                    <ImageWithFallback
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <Badge className="bg-white/95 text-[#1A73E8] mb-4 px-4 py-1">
                        <Star className="w-3 h-3 mr-1 fill-current" />
                        {doctor.experience}
                      </Badge>
                      <h4 className="text-white mb-2 text-2xl">{doctor.name}</h4>
                      <p className="text-blue-100 text-lg mb-4">{doctor.specialty}</p>
                      <Button 
                        variant="ghost"
                        className="text-white hover:text-blue-200 p-0 h-auto hover:bg-transparent group/btn text-base"
                      >
                        Xem thêm
                        <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => handleNavigation('doctors')}
              className="border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white text-lg px-10 py-7 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Users className="mr-3 w-6 h-6" />
              Xem tất cả bác sĩ
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / TẠI SAO CHỌN CHÚNG TÔI SECTION */}
      <section className="py-24 bg-gradient-to-br from-[#1A73E8] to-[#0C4A6E] text-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/40 mb-4 text-base px-6 py-2 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Cam kết chất lượng
            </Badge>
            <h2 className="mb-6 text-white text-4xl md:text-5xl">Tại Sao Chọn Chúng Tôi</h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Cơ sở vật chất hiện đại, chăm sóc tận tâm và công nghệ tiên tiến
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="border-0 bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 hover:-translate-y-3 group cursor-pointer"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                      <Icon className={`w-10 h-10 ${feature.color}`} />
                    </div>
                    <h3 className="text-white text-xl mb-4">{feature.title}</h3>
                    <p className="text-blue-100 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  {/* Left: Image */}
                  <div className="relative h-64 lg:h-auto">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800"
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
                      Cần đặt lịch khám?
                    </h2>

                    <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                      Đặt lịch ngay hoặc liên hệ với chúng tôi để được hỗ trợ
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
                        Liên hệ
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
    </div>
  );
}
