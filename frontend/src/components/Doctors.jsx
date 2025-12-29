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
  Home,
  Calendar,
  Clock,
  Award,
  GraduationCap,
  Star,
  User
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';


export function Doctors({ setCurrentPage }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const doctors= [
    {
      id: 'hoang-minh-khoi',
      name: 'BS. Hoàng Minh Khôi',  
      specialty: 'Bác sĩ Tim Mạch',
      specialtyIcon: Heart,
      department: 'Khoa Tim Mạch',
      shortBio: 'Chuyên khám và điều trị các bệnh tim mạch phức tạp',
      fullBio: 'Bác sĩ Nguyễn Văn An có hơn 15 năm kinh nghiệm trong lĩnh vực tim mạch. Từng công tác tại các bệnh viện lớn trong nước và có nhiều công trình nghiên cứu về bệnh lý tim mạch. Chuyên môn sâu về can thiệp tim mạch và điều trị suy tim.',
      experience: '15 năm kinh nghiệm',
      education: [
        'Bác sĩ Đa khoa - Đại học Y Hà Nội',
        'Chuyên khoa II Tim Mạch - Bệnh viện Bạch Mai',
        'Tập huấn can thiệp tim mạch - Singapore'
      ],
      achievements: [
        'Giải thưởng Bác sĩ xuất sắc năm 2022',
        'Hơn 500 ca can thiệp tim mạch thành công',
        '15+ bài báo khoa học được công bố'
      ],
      languages: ['Tiếng Việt', 'English'],
      image: './doctor1.jpg',
      rating: 4.9,
      consultations: 2500,
      availability: 'Thứ 2, 4, 6',
      color: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      id: 'doan-duong-hung',
      name: 'BS. Đoàn Dương Hưng',
      specialty: 'Bác sĩ Nội Tổng Quát',
      specialtyIcon: Stethoscope,
      department: 'Khoa Nội Tổng Quát',
      shortBio: 'Chăm sóc sức khỏe toàn diện cho người lớn',
      fullBio: 'Bác sĩ Trần Thị Bình là chuyên gia về nội tổng quát với 12 năm kinh nghiệm điều trị các bệnh lý nội khoa phổ biến. Tận tâm với người bệnh và luôn cập nhật các phương pháp điều trị mới nhất.',
      experience: '12 năm kinh nghiệm',
      education: [
        'Bác sĩ Đa khoa - Đại học Y Dược TP.HCM',
        'Chuyên khoa I Nội tổng quát - Bệnh viện Chợ Rẫy',
        'Chứng chỉ điều trị tiểu đường - Mỹ'
      ],
      achievements: [
        'Bác sĩ được yêu thích nhất 2023',
        'Hơn 3000 bệnh nhân được điều trị',
        'Chuyên gia tư vấn sức khỏe trên VTV'
      ],
      languages: ['Tiếng Việt', 'English'],
      image: './doctor2.jpg',
      rating: 4.8,
      consultations: 3200,
      availability: 'Thứ 2 - Thứ 6',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'duong-quang-huy',
      name: 'BS. Dương Quang Huy',
      specialty: 'Bác sĩ Phẫu Thuật',
      specialtyIcon: Activity,
      department: 'Khoa Ngoại',
      shortBio: 'Thực hiện phẫu thuật chính xác và an toàn',
      fullBio: 'Bác sĩ Lê Văn Cường là một trong những phẫu thuật viên hàng đầu với 18 năm kinh nghiệm. Chuyên sâu về phẫu thuật nội soi và phẫu thuật ổ bụng, với tỷ lệ thành công cao.',
      experience: '18 năm kinh nghiệm',
      education: [
        'Bác sĩ Đa khoa - Đại học Y Hà Nội',
        'Chuyên khoa II Ngoại khoa - Bệnh viện Việt Đức',
        'Fellowship phẫu thuật nội soi - Nhật Bản'
      ],
      achievements: [
        'Hơn 1000 ca phẫu thuật thành công',
        'Giải thưởng phẫu thuật viên xuất sắc 2021',
        'Đào tạo 20+ bác sĩ trẻ'
      ],
      languages: ['Tiếng Việt', 'English', '日本語'],
      image: './doctor3.jpg',
      rating: 4.9,
      consultations: 1800,
      availability: 'Thứ 3, 5, 7',
      color: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      id: 'le-tien-manh',
      name: 'BS. Lê Tiến Mạnh',
      specialty: 'Bác sĩ Nhi Khoa',
      specialtyIcon: Baby,
      department: 'Khoa Nhi',
      shortBio: 'Chăm sóc sức khỏe trẻ em từ sơ sinh đến thiếu niên',
      fullBio: 'Bác sĩ Phạm Thị Dung có 14 năm kinh nghiệm chăm sóc sức khỏe trẻ em. Tận tâm, kiên nhẫn và luôn tạo cảm giác an tâm cho cả trẻ em và phụ huynh.',
      experience: '14 năm kinh nghiệm',
      education: [
        'Bác sĩ Đa khoa - Đại học Y Hà Nội',
        'Chuyên khoa I Nhi khoa - Bệnh viện Nhi Trung Ương',
        'Chứng chỉ dinh dưỡng trẻ em - WHO'
      ],
      achievements: [
        'Bác sĩ Nhi khoa được yêu thích nhất',
        'Tư vấn cho hơn 5000 gia đình',
        'Chuyên gia dinh dưỡng trẻ em'
      ],
      languages: ['Tiếng Việt', 'English'],
      image: './doctor4.jpg',
      rating: 5.0,
      consultations: 5000,
      availability: 'Thứ 2 - Chủ nhật',
      color: 'text-pink-500',
      bgColor: 'bg-pink-50'
    },
    {
      id: 'tran-dang-tai',
      name: 'BS. Trần Đăng Tài',
      specialty: 'Bác sĩ Thần Kinh',
      specialtyIcon: Brain,
      department: 'Khoa Thần Kinh',
      shortBio: 'Chuyên gia điều trị các bệnh lý thần kinh phức tạp',
      fullBio: 'Bác sĩ Hoàng Minh Tuấn là chuyên gia hàng đầu về thần kinh học với 16 năm kinh nghiệm. Chuyên sâu về điều trị đột quỵ, động kinh và các bệnh lý thần kinh thoái hóa.',
      experience: '16 năm kinh nghiệm',
      education: [
        'Bác sĩ Đa khoa - Đại học Y Dược TP.HCM',
        'Tiến sĩ Y học - Đại học Y Hà Nội',
        'Post-doc Thần kinh học - Đức'
      ],
      achievements: [
        'Tiến sĩ Y học xuất sắc',
        'Hơn 30 công trình nghiên cứu quốc tế',
        'Chuyên gia tư vấn Bộ Y Tế'
      ],
      languages: ['Tiếng Việt', 'English', 'Deutsch'],
      image: './doctor5.jpg',
      rating: 4.9,
      consultations: 2200,
      availability: 'Thứ 2, 4, 6',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'nguyen-mai-huong',
      name: 'BS. Nguyễn Mai Hương',
      specialty: 'Bác sĩ Sản Phụ Khoa',
      specialtyIcon: Heart,
      department: 'Khoa Sản Phụ Khoa',
      shortBio: 'Chăm sóc sức khỏe phụ nữ và thai sản toàn diện',
      fullBio: 'Bác sĩ Võ Thị Mai có 13 năm kinh nghiệm trong lĩnh vực sản phụ khoa. Tận tâm với từng sản phụ và luôn đặt sự an toàn của mẹ và bé lên hàng đầu.',
      experience: '13 năm kinh nghiệm',
      education: [
        'Bác sĩ Đa khoa - Đại học Y Dược TP.HCM',
        'Chuyên khoa II Sản Phụ khoa - Bệnh viện Từ Dũ',
        'Chứng chỉ siêu âm thai 4D - Hàn Quốc'
      ],
      achievements: [
        'Đỡ đẻ thành công cho hơn 2000 ca',
        'Chuyên gia tư vấn thai sản',
        'Giải thưởng bác sĩ tận tâm 2022'
      ],
      languages: ['Tiếng Việt', 'English'],
      image: './doctor6.jpg',
      rating: 4.9,
      consultations: 3500,
      availability: 'Thứ 2 - Thứ 7',
      color: 'text-fuchsia-500',
      bgColor: 'bg-fuchsia-50'
    },
    {
      id: 'nguyen-viet-phuc',
      name: 'BS. Nguyễn Việt Phúc',
      specialty: 'Bác sĩ Xương Khớp',
      specialtyIcon: Bone,
      department: 'Khoa Xương Khớp',
      shortBio: 'Điều trị và phẫu thuật các bệnh lý xương khớp',
      fullBio: 'Bác sĩ Nguyễn Thanh Long là chuyên gia xương khớp với 14 năm kinh nghiệm. Thành thạo trong phẫu thuật thay khớp và điều trị chấn thương thể thao.',
      experience: '14 năm kinh nghiệm',
      education: [
        'Bác sĩ Đa khoa - Đại học Y Hà Nội',
        'Chuyên khoa II Chấn thương Chỉnh hình - Bệnh viện Việt Đức',
        'Fellowship phẫu thuật thay khớp - Úc'
      ],
      achievements: [
        'Hơn 800 ca phẫu thuật thành công',
        'Chuyên gia điều trị chấn thương thể thao',
        'Bác sĩ của đội tuyển quốc gia'
      ],
      languages: ['Tiếng Việt', 'English'],
      image: './doctor7.jpg',
      rating: 4.8,
      consultations: 1900,
      availability: 'Thứ 3, 5, 7',
      color: 'text-amber-500',
      bgColor: 'bg-amber-50'
    },
    {
      id: 'tran-kim-anh',
      name: 'BS. Trần Kim Anh',
      specialty: 'Bác sĩ Mắt',
      specialtyIcon: Eye,
      department: 'Khoa Mắt',
      shortBio: 'Chuyên khám và điều trị các bệnh lý về mắt',
      fullBio: 'Bác sĩ Trần Kim Anh có 11 năm kinh nghiệm trong lĩnh vực nhãn khoa. Thành thạo các kỹ thuật phẫu thuật mắt hiện đại và điều trị các bệnh lý võng mạc.',
      experience: '11 năm kinh nghiệm',
      education: [
        'Bác sĩ Đa khoa - Đại học Y Hà Nội',
        'Chuyên khoa I Nhãn khoa - Bệnh viện Mắt Trung Ương',
        'Chứng chỉ phẫu thuật Lasik - Singapore'
      ],
      achievements: [
        'Hơn 1500 ca phẫu thuật mắt',
        'Chuyên gia phẫu thuật đục thủy tinh thể',
        'Giải thưởng bác sĩ trẻ xuất sắc 2020'
      ],
      languages: ['Tiếng Việt', 'English'],
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      rating: 4.8,
      consultations: 2800,
      availability: 'Thứ 2, 4, 6',
      color: 'text-teal-500',
      bgColor: 'bg-teal-50'
    },
    {
      id: 'le-thanh-binh',
      name: 'BS. Lê Thanh Bình',
      specialty: 'Bác sĩ Da Liễu',
      specialtyIcon: User,
      department: 'Khoa Da Liễu',
      shortBio: 'Chuyên điều trị các bệnh da và thẩm mỹ da',
      fullBio: 'Bác sĩ Lê Thanh Bình là chuyên gia da liễu với 10 năm kinh nghiệm. Kết hợp phương pháp điều trị truyền thống và công nghệ laser hiện đại.',
      experience: '10 năm kinh nghiệm',
      education: [
        'Bác sĩ Đa khoa - Đại học Y Dược TP.HCM',
        'Chuyên khoa I Da Liễu - Bệnh viện Da Liễu TP.HCM',
        'Chứng chỉ Laser thẩm mỹ - Hàn Quốc'
      ],
      achievements: [
        'Điều trị thành công hơn 4000 ca',
        'Chuyên gia tư vấn làm đẹp da',
        'Giảng viên bộ môn Da Liễu'
      ],
      languages: ['Tiếng Việt', 'English', '한국어'],
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400',
      rating: 4.7,
      consultations: 4200,
      availability: 'Thứ 2 - Thứ 6',
      color: 'text-rose-500',
      bgColor: 'bg-rose-50'
    }
  ];

  const openDoctorDetail = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1920&q=80"
            alt="Đội ngũ bác sĩ - Bệnh viện Tự Nhiên"
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
              <span className="text-muted-foreground">Bác sĩ</span>
            </div>

            {/* Title */}
            <Badge className="bg-[#1A73E8] text-white mb-6 text-base px-6 py-2 hover:bg-[#0C4A6E]">
              <Users className="w-4 h-4 mr-2" />
              Chuyên gia y tế
            </Badge>

            <h1 className="text-[#0C4A6E] mb-8 leading-tight text-5xl md:text-6xl lg:text-7xl">
              ĐỘI NGŨ BÁC SĨ
            </h1>

            <p className="text-xl md:text-2xl text-[#1E293B] mb-10 leading-relaxed max-w-3xl">
              Gặp gỡ các bác sĩ chuyên môn cao, tận tâm với bệnh nhân
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
                onClick={() => handleNavigation('appointment')}
                className="border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white transition-all duration-300 text-lg px-10 py-7 h-auto"
              >
                <Calendar className="mr-3 w-6 h-6" />
                Đặt lịch khám
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTOR LIST / DANH SÁCH BÁC SĨ */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <Badge className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 mb-4 text-base px-6 py-2">
                <Stethoscope className="w-4 h-4 mr-2" />
                Đội ngũ chuyên gia
              </Badge>
              <h2 className="mb-6 text-[#0C4A6E] text-4xl md:text-5xl">
                Bác Sĩ Chuyên Môn Cao
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Được đào tạo bài bản, giàu kinh nghiệm và tận tâm với người bệnh
              </p>
            </div>

            {/* Doctor Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => {
                const Icon = doctor.specialtyIcon;
                return (
                  <Card 
                    key={doctor.id}
                    className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group overflow-hidden bg-white cursor-pointer"
                    onClick={() => openDoctorDetail(doctor)}
                  >
                    <CardContent className="p-0">
                      {/* Doctor Photo */}
                      <div className="relative h-[420px] overflow-hidden">
                        <ImageWithFallback
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                        
                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{doctor.rating}</span>
                        </div>

                        {/* Specialty Icon Badge */}
                        <div className={`absolute top-4 left-4 w-12 h-12 ${doctor.bgColor} rounded-xl flex items-center justify-center shadow-lg`}>
                          <Icon className={`w-6 h-6 ${doctor.color}`} />
                        </div>
                        
                        {/* Doctor Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-white mb-1 text-2xl">{doctor.name}</h3>
                          <p className="text-blue-100 text-lg mb-2">{doctor.specialty}</p>
                          <p className="text-blue-200 text-sm mb-3">{doctor.department}</p>
                          
                          <div className="flex items-center gap-4 mb-4 text-sm">
                            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                              <Award className="w-3 h-3 mr-1" />
                              {doctor.experience}
                            </Badge>
                            <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                              <Users className="w-3 h-3 mr-1" />
                              {doctor.consultations.toLocaleString()}+ ca
                            </Badge>
                          </div>

                          <p className="text-blue-100 text-sm mb-4 line-clamp-2">
                            {doctor.shortBio}
                          </p>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="p-6 space-y-3">
                        <Button 
                          variant="ghost" 
                          className="text-[#1A73E8] hover:text-[#0C4A6E] p-0 h-auto hover:bg-transparent group/btn w-full justify-start text-base"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDoctorDetail(doctor);
                          }}
                        >
                          Xem chi tiết
                          <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                        
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation('appointment');
                          }}
                          className="w-full bg-[#1A73E8] hover:bg-[#0C4A6E] text-white transition-all duration-300"
                        >
                          <Calendar className="mr-2 w-4 h-4" />
                          Đặt lịch khám
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
                      src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800"
                      alt="Đặt lịch khám với bác sĩ"
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
                      Đặt lịch khám<br />với bác sĩ
                    </h2>

                    <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                      Chọn bác sĩ phù hợp và đặt lịch khám ngay hôm nay
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

      {/* DOCTOR DETAIL MODAL */}
      <Dialog open={!!selectedDoctor} onOpenChange={(open) => !open && setSelectedDoctor(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          {selectedDoctor && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-6 mb-6">
                  {/* Doctor Photo */}
                  <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl">
                    <ImageWithFallback
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <DialogTitle className="text-3xl text-[#0C4A6E] mb-3">
                      {selectedDoctor.name}
                    </DialogTitle>
                    <p className="text-xl text-[#1A73E8] mb-3">{selectedDoctor.specialty}</p>
                    <p className="text-muted-foreground mb-4">{selectedDoctor.department}</p>
                    
                    <div className="flex flex-wrap gap-3">
                      <Badge className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 px-4 py-1.5">
                        <Award className="w-4 h-4 mr-1" />
                        {selectedDoctor.experience}
                      </Badge>
                      <Badge className="bg-yellow-50 text-yellow-700 border-yellow-200 px-4 py-1.5">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        {selectedDoctor.rating}/5.0
                      </Badge>
                      <Badge className="bg-green-50 text-green-700 border-green-200 px-4 py-1.5">
                        <Users className="w-4 h-4 mr-1" />
                        {selectedDoctor.consultations.toLocaleString()}+ ca khám
                      </Badge>
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200 px-4 py-1.5">
                        <Clock className="w-4 h-4 mr-1" />
                        {selectedDoctor.availability}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-8">
                {/* Bio */}
                <div>
                  <h4 className="text-xl text-[#0C4A6E] mb-4 flex items-center gap-2">
                    <User className="w-6 h-6 text-[#1A73E8]" />
                    Giới thiệu
                  </h4>
                  <DialogDescription className="text-lg text-[#1E293B] leading-relaxed">
                    {selectedDoctor.fullBio}
                  </DialogDescription>
                </div>

                {/* Education */}
                <div>
                  <h4 className="text-xl text-[#0C4A6E] mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-[#1A73E8]" />
                    Học vấn & Đào tạo
                  </h4>
                  <div className="space-y-3">
                    {selectedDoctor.education.map((edu, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-[#E8F1FF] rounded-xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#1A73E8] flex-shrink-0 mt-0.5" />
                        <span className="text-[#1E293B]">{edu}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="text-xl text-[#0C4A6E] mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#1A73E8]" />
                    Thành tựu & Giải thưởng
                  </h4>
                  <div className="space-y-3">
                    {selectedDoctor.achievements.map((achievement, idx) => (
                      <div 
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl"
                      >
                        <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5 fill-current" />
                        <span className="text-[#1E293B]">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h4 className="text-xl text-[#0C4A6E] mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-[#1A73E8]" />
                    Ngôn ngữ
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedDoctor.languages.map((lang, idx) => (
                      <Badge 
                        key={idx}
                        className="bg-[#1A73E8]/10 text-[#1A73E8] border-[#1A73E8]/20 px-4 py-2 text-base"
                      >
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-6 border-t">
                  <Button 
                    size="lg"
                    onClick={() => {
                      setSelectedDoctor(null);
                      handleNavigation('appointment');
                    }}
                    className="bg-[#1A73E8] hover:bg-[#0C4A6E] text-white shadow-lg hover:shadow-xl transition-all duration-300 text-base px-8 py-6 h-auto"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Đặt lịch khám với bác sĩ
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => {
                      setSelectedDoctor(null);
                      handleNavigation('contact');
                    }}
                    className="border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white transition-all duration-300 text-base px-8 py-6 h-auto"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    Liên hệ bệnh viện
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
