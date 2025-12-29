import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Building2,
  CheckCircle2,
  Heart,
  Users,
  Target,
  Eye,
  Sparkles,
  Award,
  Stethoscope,
  Shield,
  TrendingUp,
  Home
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function About({ setCurrentPage }) {
  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const missionPoints = [
    {
      icon: Heart,
      title: 'Cung cấp dịch vụ y tế chất lượng cao, tận tâm với người bệnh',
      description: 'Đặt sự hài lòng và an toàn của bệnh nhân là ưu tiên hàng đầu',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: Stethoscope,
      title: 'Ứng dụng công nghệ hiện đại trong chẩn đoán và điều trị',
      description: 'Trang thiết bị y tế tiên tiến, cập nhật công nghệ mới nhất',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Users,
      title: 'Nâng cao sức khỏe cộng đồng và giáo dục y tế',
      description: 'Tổ chức các chương trình khám sức khỏe và tư vấn miễn phí',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'An toàn',
      description: 'Đảm bảo môi trường điều trị an toàn và vệ sinh tuyệt đối',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Award,
      title: 'Chuyên nghiệp',
      description: 'Đội ngũ y bác sĩ được đào tạo bài bản, giàu kinh nghiệm',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Heart,
      title: 'Tận tâm',
      description: 'Chăm sóc người bệnh với sự tận tình và đầy lòng nhân ái',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      icon: TrendingUp,
      title: 'Phát triển',
      description: 'Không ngừng cải tiến chất lượng dịch vụ và đào tạo nhân sự',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Hospital Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1920&q=80"
            alt="Bệnh viện Tự Nhiên - Giới thiệu"
            className="w-full h-full object-cover"
          />
          {/* Semi-transparent overlay for readability */}
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
              <span className="text-muted-foreground">Giới thiệu</span>
            </div>

            {/* Title */}
            <Badge className="bg-[#1A73E8] text-white mb-6 text-base px-6 py-2 hover:bg-[#0C4A6E]">
              <Building2 className="w-4 h-4 mr-2" />
              Về chúng tôi
            </Badge>

            <h1 className="text-[#0C4A6E] mb-8 leading-tight text-5xl md:text-6xl lg:text-7xl">
              GIỚI THIỆU<br />
              BỆNH VIỆN TỰ NHIÊN
            </h1>

            <p className="text-xl md:text-2xl text-[#1E293B] mb-10 leading-relaxed max-w-3xl">
              Chăm sóc sức khỏe toàn diện với dịch vụ y tế hiện đại và tận tâm
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
                Liên hệ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION / VỀ CHÚNG TÔI */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800&q=80"
                    alt="Bệnh viện Tự Nhiên"
                    className="w-full h-[600px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A73E8]/40 to-transparent"></div>
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#E8F1FF] rounded-3xl -z-10"></div>
                <div className="absolute -top-8 -left-8 w-48 h-48 bg-[#1A73E8]/10 rounded-3xl -z-10"></div>
              </div>

              {/* Right: Content */}
              <div>
                <Badge className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 mb-6 text-base px-6 py-2">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Về chúng tôi
                </Badge>

                <h2 className="text-[#0C4A6E] mb-6 text-4xl md:text-5xl">
                  Về Bệnh Viện<br />Tự Nhiên
                </h2>

                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Sứ mệnh và tầm nhìn của chúng tôi
                </p>

                <div className="space-y-4 text-lg text-[#1E293B] leading-relaxed mb-8">
                  <p>
                    <strong className="text-[#1A73E8]">Bệnh viện Tự Nhiên</strong> là cơ sở y tế hiện đại, cung cấp dịch vụ chăm sóc sức khỏe toàn diện, với đội ngũ bác sĩ giàu kinh nghiệm và trang thiết bị tiên tiến.
                  </p>
                  
                  <p>
                    Chúng tôi luôn đặt sự an toàn, sức khỏe và trải nghiệm của người bệnh lên hàng đầu. Với hơn 20 năm kinh nghiệm trong lĩnh vực y tế, chúng tôi tự hào là địa chỉ tin cậy cho hàng trăm nghìn bệnh nhân mỗi năm.
                  </p>

                  <p>
                    Bệnh viện được trang bị công nghệ y tế tiên tiến nhất, kết hợp với đội ngũ y bác sĩ được đào tạo chuyên sâu, cam kết mang đến dịch vụ chăm sóc sức khỏe chất lượng cao theo tiêu chuẩn quốc tế.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-[#E8F1FF] rounded-2xl">
                    <div className="text-4xl text-[#1A73E8] mb-2">20+</div>
                    <div className="text-sm text-muted-foreground">Năm kinh nghiệm</div>
                  </div>
                  <div className="text-center p-6 bg-[#E8F1FF] rounded-2xl">
                    <div className="text-4xl text-[#1A73E8] mb-2">150+</div>
                    <div className="text-sm text-muted-foreground">Bác sĩ chuyên khoa</div>
                  </div>
                  <div className="text-center p-6 bg-[#E8F1FF] rounded-2xl">
                    <div className="text-4xl text-[#1A73E8] mb-2">100K+</div>
                    <div className="text-sm text-muted-foreground">Bệnh nhân/năm</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR MISSION / SỨ MỆNH */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <Badge className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 mb-4 text-base px-6 py-2">
                <Target className="w-4 h-4 mr-2" />
                Sứ mệnh của chúng tôi
              </Badge>
              <h2 className="mb-6 text-[#0C4A6E] text-4xl md:text-5xl">Sứ Mệnh</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Cam kết mang đến dịch vụ y tế chất lượng cao và chăm sóc toàn diện
              </p>
            </div>

            {/* Mission Points */}
            <div className="grid md:grid-cols-3 gap-8">
              {missionPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <Card 
                    key={index}
                    className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 bg-white"
                  >
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 ${point.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                        <Icon className={`w-8 h-8 ${point.color}`} />
                      </div>
                      
                      <h3 className="text-[#0C4A6E] text-xl mb-4 leading-tight">
                        {point.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {point.description}
                      </p>

                      <div className="mt-6 flex items-center gap-2 text-[#1A73E8]">
                        <CheckCircle2 className="w-5 h-5" />
                        <span className="text-sm">Cam kết thực hiện</span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* OUR VISION / TẦM NHÌN */}
      <section className="py-24 bg-gradient-to-br from-[#1A73E8] to-[#0C4A6E] text-white relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left: Vision Content */}
              <div>
                <Badge className="bg-white/20 text-white border-white/40 mb-6 text-base px-6 py-2 backdrop-blur-sm">
                  <Eye className="w-4 h-4 mr-2" />
                  Tầm nhìn của chúng tôi
                </Badge>

                <h2 className="mb-8 text-white text-4xl md:text-5xl">
                  Tầm Nhìn
                </h2>

                <div className="space-y-6 text-xl text-blue-50 leading-relaxed mb-10">
                  <p>
                    Trở thành <strong className="text-white">bệnh viện hàng đầu</strong> về y tế hiện đại, chuyên nghiệp, nơi người bệnh được chăm sóc toàn diện với chất lượng quốc tế.
                  </p>
                  
                  <p>
                    Chúng tôi hướng đến việc xây dựng một hệ thống y tế <strong className="text-white">đẳng cấp thế giới</strong>, không chỉ trong việc điều trị bệnh mà còn trong việc phòng ngừa và nâng cao sức khỏe cộng đồng.
                  </p>

                  <p>
                    Với tầm nhìn dài hạn, chúng tôi cam kết <strong className="text-white">không ngừng đổi mới</strong>, áp dụng công nghệ tiên tiến nhất và phát triển đội ngũ y bác sĩ chất lượng cao để phục vụ người bệnh tốt nhất.
                  </p>
                </div>

                {/* Vision Points */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white">Tiêu chuẩn quốc tế trong chăm sóc y tế</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white">Công nghệ y tế tiên tiến hàng đầu khu vực</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                    <CheckCircle2 className="w-6 h-6 text-white flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white">Đội ngũ chuyên gia y tế hàng đầu</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Image */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80"
                    alt="Tầm nhìn Bệnh viện Tự Nhiên"
                    className="w-full h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES / GIÁ TRỊ CỐT LÕI */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <Badge className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 mb-4 text-base px-6 py-2">
                <Award className="w-4 h-4 mr-2" />
                Giá trị cốt lõi
              </Badge>
              <h2 className="mb-6 text-[#0C4A6E] text-4xl md:text-5xl">Giá Trị Của Chúng Tôi</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Những giá trị cốt lõi định hướng mọi hoạt động của bệnh viện
              </p>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card 
                    key={index}
                    className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 bg-white group"
                  >
                    <CardContent className="p-8 text-center">
                      <div className={`w-20 h-20 ${value.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-10 h-10 ${value.color}`} />
                      </div>
                      
                      <h3 className="text-[#0C4A6E] text-2xl mb-4">
                        {value.title}
                      </h3>
                      
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-gradient-to-br from-[#E8F1FF] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  {/* Left: Image */}
                  <div className="relative h-64 lg:h-auto">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
                      alt="Khoa phòng"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A73E8]/80 to-transparent"></div>
                  </div>

                  {/* Right: CTA Content */}
                  <div className="p-12 flex flex-col justify-center bg-white">
                    <Badge className="bg-[#1A73E8] text-white mb-6 text-base px-6 py-2 w-fit">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Khám phá thêm
                    </Badge>

                    <h2 className="text-[#0C4A6E] mb-6 text-4xl md:text-5xl">
                      Khám Phá<br />Các Dịch Vụ
                    </h2>

                    <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                      Tìm hiểu về các khoa phòng chuyên sâu và đội ngũ bác sĩ chuyên môn cao của chúng tôi
                    </p>

                    <div className="flex flex-wrap gap-4">
                      <Button 
                        size="lg"
                        onClick={() => handleNavigation('departments')}
                        className="bg-[#1A73E8] hover:bg-[#0C4A6E] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 text-lg px-10 py-7 h-auto"
                      >
                        <Building2 className="mr-3 w-6 h-6" />
                        Xem các Khoa Phòng
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

                    {/* Quick Links */}
                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <p className="text-sm text-muted-foreground mb-4">Hoặc khám phá:</p>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={() => handleNavigation('doctors')}
                          className="text-sm text-[#1A73E8] hover:text-[#0C4A6E] transition-colors flex items-center gap-1"
                        >
                          <Users className="w-4 h-4" />
                          Đội ngũ bác sĩ
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <span className="text-gray-300">•</span>
                        <button
                          onClick={() => handleNavigation('appointment')}
                          className="text-sm text-[#1A73E8] hover:text-[#0C4A6E] transition-colors flex items-center gap-1"
                        >
                          Đặt lịch khám
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
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
                  const labels= {
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
