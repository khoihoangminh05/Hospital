import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { 
  ArrowRight, 
  Phone, 
  Mail, 
  MapPin, 
  Building2,
  CheckCircle2,
  Home,
  Calendar,
  Clock,
  Eye,
  Share2,
  Facebook,
  Twitter,
  Link as LinkIcon,
  TrendingUp,
  Newspaper,
  Filter
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';


export function News({ setCurrentPage }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = [
    { id: 'all', name: 'Tất cả tin tức', icon: Newspaper },
    { id: 'health', name: 'Sức khỏe', icon: CheckCircle2 },
    { id: 'activities', name: 'Hoạt động bệnh viện', icon: Building2 },
    { id: 'events', name: 'Sự kiện', icon: Calendar }
  ];

  const newsArticles= [
    {
      id: '1',
      title: 'Khám phá phương pháp điều trị tim mạch tiên tiến tại Bệnh viện Tự Nhiên',
      shortDescription: 'Bệnh viện Tự Nhiên vừa đưa vào sử dụng công nghệ can thiệp tim mạch hiện đại, giúp điều trị các bệnh lý tim mạch phức tạp với tỷ lệ thành công cao.',
      fullContent: `Bệnh viện Tự Nhiên tự hào công bố đã đưa vào sử dụng hệ thống can thiệp tim mạch thế hệ mới nhất, được nhập khẩu từ Đức. Đây là bước tiến quan trọng trong việc nâng cao chất lượng điều trị các bệnh lý tim mạch tại bệnh viện.

Với công nghệ mới này, các bác sĩ có thể thực hiện các ca can thiệp tim mạch phức tạp với độ chính xác cao hơn, thời gian phục hồi nhanh hơn và giảm thiểu các biến chứng sau phẫu thuật.

Khoa Tim Mạch của bệnh viện đã thực hiện thành công hơn 500 ca can thiệp tim mạch trong năm qua, với tỷ lệ thành công đạt 98%. Đội ngũ bác sĩ giàu kinh nghiệm, được đào tạo chuyên sâu tại các bệnh viện hàng đầu thế giới.

"Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao nhất cho bệnh nhân, với công nghệ tiên tiến và đội ngũ y bác sĩ tận tâm," BS. Nguyễn Văn An, Trưởng khoa Tim Mạch cho biết.

Bệnh nhân có nhu cầu khám và điều trị các bệnh lý tim mạch có thể đặt lịch trực tiếp tại bệnh viện hoặc qua hotline 1900 1234.`,
      image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=800',
      category: 'health',
      date: '15/11/2024',
      views: 1245,
      author: 'BS. Nguyễn Văn An'
    },
    {
      id: '2',
      title: 'Chương trình khám sức khỏe miễn phí cho người cao tuổi',
      shortDescription: 'Bệnh viện Tự Nhiên tổ chức chương trình khám sức khỏe miễn phí cho 500 người cao tuổi trong tháng 11 này.',
      fullContent: `Nhân dịp kỷ niệm 20 năm thành lập, Bệnh viện Tự Nhiên tổ chức chương trình khám sức khỏe miễn phí cho 500 người cao tuổi từ 60 tuổi trở lên tại khu vực TP.HCM.

Chương trình bao gồm các dịch vụ:
- Khám tổng quát toàn diện
- Xét nghiệm máu cơ bản
- Đo huyết áp, đường huyết
- Tư vấn dinh dưỡng và chế độ sinh hoạt
- Siêu âm tim và các cơ quan nội tạng

Chương trình được tổ chức từ ngày 20/11 đến 30/11/2024, tại Hội trường B, Bệnh viện Tự Nhiên. Người cao tuổi có nhu cầu tham gia vui lòng đăng ký trước qua hotline 1900 1234.

"Đây là hoạt động thường niên của bệnh viện nhằm chăm sóc sức khỏe cộng đồng và tri ân những người cao tuổi," ThS.BS Trần Thị Bình, Phó Giám đốc bệnh viện cho biết.

Bệnh viện cũng chuẩn bị các phần quà ý nghĩa và tổ chức các hoạt động văn nghệ cho người cao tuổi trong suốt chương trình.`,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
      category: 'activities',
      date: '12/11/2024',
      views: 892,
      author: 'Phòng Truyền thông'
    },
    {
      id: '3',
      title: 'Hội thảo khoa học "Tiến bộ trong điều trị ung thư" tại Bệnh viện Tự Nhiên',
      shortDescription: 'Hội thảo tập trung vào các phương pháp điều trị ung thư tiên tiến, với sự tham gia của các chuyên gia hàng đầu trong và ngoài nước.',
      fullContent: `Ngày 25/11/2024, Bệnh viện Tự Nhiên sẽ tổ chức Hội thảo khoa học "Tiến bộ trong điều trị ung thư" với sự tham gia của hơn 200 bác sĩ và chuyên gia từ các bệnh viện lớn trên toàn quốc.

Chương trình hội thảo bao gồm:
- Các phương pháp điều trị ung thư hiện đại
- Liệu pháp miễn dịch trong điều trị ung thư
- Chăm sóc và hỗ trợ bệnh nhân ung thư
- Những tiến bộ mới nhất trong nghiên cứu ung thư

Diễn giả chính của hội thảo là GS.TS. Nguyễn Văn Hoàng từ Viện Nghiên cứu Ung thư Quốc gia và PGS.TS. Trần Thị Mai từ Bệnh viện K Hà Nội.

Hội thảo cũng là dịp để các bác sĩ trao đổi kinh nghiệm lâm sàng, cập nhật kiến thức mới nhất về điều trị ung thư và xây dựng mạng lưới hợp tác trong điều trị.

Bệnh nhân và người nhà quan tâm có thể tham dự phần tư vấn miễn phí vào buổi chiều cùng ngày tại Hội trường A, Bệnh viện Tự Nhiên.

Đăng ký tham dự: Email hoidao@tunhien.vn hoặc gọi 1900 1234.`,
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=800',
      category: 'events',
      date: '10/11/2024',
      views: 1567,
      author: 'Phòng Đào tạo'
    },
    {
      id: '4',
      title: '5 thói quen đơn giản giúp phòng ngừa bệnh tiểu đường',
      shortDescription: 'Các bác sĩ Bệnh viện Tự Nhiên chia sẻ những thói quen sinh hoạt giúp phòng ngừa và kiểm soát bệnh tiểu đường hiệu quả.',
      fullContent: `Bệnh tiểu đường đang trở thành vấn đề sức khỏe toàn cầu, ảnh hưởng đến hàng triệu người. Tuy nhiên, với những thay đổi nhỏ trong lối sống, bạn hoàn toàn có thể phòng ngừa và kiểm soát bệnh hiệu quả.

BS. Nguyễn Thị Hà, chuyên gia dinh dưỡng tại Bệnh viện Tự Nhiên, chia sẻ 5 thói quen đơn giản:

1. Ăn uống lành mạnh
- Hạn chế đường và tinh bột tinh chế
- Tăng cường rau xanh, trái cây
- Chọn ngũ cốc nguyên hạt
- Kiểm soát khẩu phần ăn

2. Vận động thường xuyên
- Tập thể dục ít nhất 30 phút/ngày
- Đi bộ, chạy bộ, bơi lội, yoga
- Tránh ngồi nhiều

3. Duy trì cân nặng hợp lý
- Giảm cân nếu thừa cân
- Theo dõi BMI thường xuyên

4. Ngủ đủ giấc
- Ngủ 7-8 giờ mỗi đêm
- Tránh thức khuya
- Duy trì giấc ngủ chất lượng

5. Kiểm tra sức khỏe định kỳ
- Đo đường huyết 6 tháng/lần
- Khám sức khỏe tổng quát hàng năm

"Phòng bệnh hơn chữa bệnh. Những thay đổi nhỏ hôm nay sẽ mang lại sức khỏe lâu dài," BS. Hà nhấn mạnh.

Bệnh viện Tự Nhiên cung cấp dịch vụ tư vấn dinh dưỡng và khám sức khỏe định kỳ. Liên hệ: 1900 1234.`,
      image: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=800',
      category: 'health',
      date: '08/11/2024',
      views: 2134,
      author: 'BS. Nguyễn Thị Hà'
    },
    {
      id: '5',
      title: 'Đội ngũ y bác sĩ Bệnh viện Tự Nhiên tham gia cứu trợ bão lũ miền Trung',
      shortDescription: 'Bệnh viện cử 20 cán bộ y tế đến các tỉnh miền Trung để hỗ trợ khám chữa bệnh cho người dân vùng lũ.',
      fullContent: `Hưởng ứng lời kêu gọi của Bộ Y tế, Bệnh viện Tự Nhiên đã cử đoàn y bác sĩ gồm 20 người đến các tỉnh miền Trung bị ảnh hưởng bởi bão lũ để hỗ trợ khám chữa bệnh miễn phí cho người dân.

Đoàn công tác mang theo:
- Thuốc và vật tư y tế trị giá 500 triệu đồng
- Thiết bị y tế di động
- Trang bị bảo hộ và cứu trợ
- Quà tặng cho trẻ em và người già

Trong 7 ngày hoạt động, đoàn đã:
- Khám và cấp thuốc miễn phí cho 1.500 người dân
- Thực hiện 50 ca mổ cấp cứu
- Tư vấn sức khỏe cho 300 gia đình
- Trao tặng 200 phần quà cho hộ nghèo

BS. Lê Văn Cường, Trưởng đoàn, chia sẻ: "Chúng tôi rất xúc động khi được góp phần nhỏ bé giúp đỡ bà con vượt qua khó khăn. Đây là trách nhiệm và sứ mệnh của người thầy thuốc."

Bệnh viện cũng kêu gọi cán bộ, bệnh nhân và cộng đồng ủng hộ thêm cho các hoạt động cứu trợ. Mọi đóng góp xin gửi về:
- Tài khoản: 123456789 - Ngân hàng Vietcombank
- Địa chỉ: 336 Nguyễn Trãi, TP.HCM

Thông tin chi tiết: 1900 1234.`,
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800',
      category: 'activities',
      date: '05/11/2024',
      views: 1876,
      author: 'Phòng Truyền thông'
    },
    {
      id: '6',
      title: 'Lễ khai trương Trung tâm Chăm sóc Sức khỏe Gia đình',
      shortDescription: 'Bệnh viện Tự Nhiên chính thức khai trương Trung tâm Chăm sóc Sức khỏe Gia đình với đầy đủ tiện nghi hiện đại.',
      fullContent: `Sáng ngày 01/11/2024, Bệnh viện Tự Nhiên đã long trọng tổ chức lễ khai trương Trung tâm Chăm sóc Sức khỏe Gia đình tại tầng 5, tòa nhà B.

Trung tâm được thiết kế theo tiêu chuẩn quốc tế, cung cấp các dịch vụ:
- Khám sức khỏe tổng quát cho cả gia đình
- Tư vấn dinh dưỡng và chăm sóc sức khỏe
- Tiêm chủng đầy đủ cho trẻ em và người lớn
- Khám thai và chăm sóc thai sản
- Theo dõi sức khỏe cho người cao tuổi

Điểm nổi bật của Trung tâm:
- Không gian rộng rãi, thoáng mát
- Khu vui chơi cho trẻ em
- Phòng chờ thoải mái
- Đội ngũ y bác sĩ giàu kinh nghiệm
- Thiết bị y tế hiện đại
- Dịch vụ tận tâm, chu đáo

GS.TS. Trần Văn Nam, Giám đốc Bệnh viện Tự Nhiên, phát biểu: "Trung tâm ra đời với mong muốn mang đến dịch vụ chăm sóc sức khỏe toàn diện cho mọi gia đình, từ trẻ em đến người cao tuổi."

Dịp khai trương, Trung tâm ưu đãi:
- Giảm 30% gói khám sức khỏe gia đình
- Tặng phiếu khám miễn phí cho trẻ em dưới 5 tuổi
- Quà tặng cho 100 khách hàng đầu tiên

Đăng ký: 1900 1234 hoặc trực tiếp tại Trung tâm.`,
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
      category: 'events',
      date: '01/11/2024',
      views: 2456,
      author: 'Ban Giám đốc'
    },
    {
      id: '7',
      title: 'Cảnh báo: Dịch cúm mùa đang gia tăng - Cách phòng ngừa hiệu quả',
      shortDescription: 'Số ca mắc cúm tăng đột biến trong thời gian qua. Bác sĩ khuyến cáo người dân cần phòng ngừa tích cực.',
      fullContent: `Theo thống kê của Bệnh viện Tự Nhiên, số ca mắc cúm mùa đã tăng 40% trong tháng vừa qua, đặc biệt ở trẻ em và người cao tuổi.

Triệu chứng cúm mùa:
- Sốt cao đột ngột (38-40°C)
- Ho, đau họng
- Đau đầu, đau cơ
- Mệt mỏi, chán ăn
- Chảy nước mũi, nghẹt mũi

Biến chứng nguy hiểm:
- Viêm phổi
- Viêm tai giữa
- Viêm xoang
- Suy hô hấp (ở người cao tuổi)

BS. Đỗ Minh Đức, chuyên gia Hô hấp, khuyến cáo:

Cách phòng ngừa:
1. Tiêm vắc xin cúm hàng năm
2. Rửa tay thường xuyên với xà phòng
3. Đeo khẩu trang nơi đông người
4. Tránh tiếp xúc với người bệnh
5. Tăng cường sức đề kháng:
   - Ăn uống đầy đủ dinh dưỡng
   - Ngủ đủ giấc
   - Tập thể dục đều đặn
   - Uống đủ nước

Khi nào cần đến bệnh viện:
- Sốt trên 39°C kéo dài >3 ngày
- Khó thở, thở nhanh
- Đau ngực
- Co giật
- Lú lẫn, li bì

"Cúm mùa có thể gây biến chứng nghiêm trọng nếu không được điều trị kịp thời. Người dân cần chủ động phòng ngừa và đi khám sớm khi có triệu chứng," BS. Đức nhấn mạnh.

Bệnh viện Tự Nhiên cung cấp dịch vụ tiêm vắc xin cúm và khám điều trị cúm 24/7.
Hotline: 1900 1234.`,
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800',
      category: 'health',
      date: '28/10/2024',
      views: 3124,
      author: 'BS. Đỗ Minh Đức'
    },
    {
      id: '8',
      title: 'Bệnh viện Tự Nhiên nhận chứng chỉ ISO 9001:2015',
      shortDescription: 'Bệnh viện chính thức được cấp chứng chỉ ISO 9001:2015 về hệ thống quản lý chất lượng dịch vụ y tế.',
      fullContent: `Sau một năm triển khai và chuẩn bị, Bệnh viện Tự Nhiên đã chính thức được tổ chức quốc tế Bureau Veritas cấp chứng chỉ ISO 9001:2015 về hệ thống quản lý chất lượng.

Ý nghĩa của chứng chỉ:
- Khẳng định chất lượng dịch vụ y tế đạt chuẩn quốc tế
- Cam kết cải tiến liên tục quy trình phục vụ
- Đảm bảo quyền lợi và sự hài lòng của bệnh nhân
- Nâng cao uy tín và vị thế của bệnh viện

Những cải tiến đã thực hiện:
1. Chuẩn hóa quy trình khám chữa bệnh
2. Nâng cấp cơ sở vật chất
3. Đào tạo và phát triển đội ngũ
4. Ứng dụng công nghệ thông tin
5. Tăng cường kiểm soát chất lượng
6. Cải thiện dịch vụ chăm sóc khách hàng

GS.TS. Trần Văn Nam, Giám đốc Bệnh viện, phát biểu: "Đây là thành quả của sự nỗ lực không ngừng của toàn thể cán bộ nhân viên. Chúng tôi cam kết tiếp tục nâng cao chất lượng dịch vụ để xứng đáng với sự tin tưởng của người dân."

Kế hoạch tiếp theo:
- Triển khai ISO 15189 cho phòng xét nghiệm
- Đạt chuẩn JCI trong 3 năm tới
- Mở rộng dịch vụ y tế chất lượng cao
- Hợp tác với các bệnh viện quốc tế

Bệnh viện Tự Nhiên - Chất lượng quốc tế, Phục vụ tận tâm!

Thông tin: 1900 1234 | info@tunhien.vn`,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800',
      category: 'events',
      date: '25/10/2024',
      views: 1654,
      author: 'Ban Giám đốc'
    }
  ];

  const filteredNews = selectedCategory === 'all' 
    ? newsArticles 
    : newsArticles.filter(article => article.category === selectedCategory);

  const popularNews = [...newsArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  const handleShare = (platform) => {
    if (!selectedNews) return;
    
    const url = window.location.href;
    const title = selectedNews.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Đã sao chép link!');
        break;
    }
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=1920&q=80"
            alt="Tin tức - Bệnh viện Tự Nhiên"
            className="w-full h-full object-cover"
          />
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
              <span className="text-muted-foreground">Tin tức</span>
            </div>

            <Badge className="bg-[#1A73E8] text-white mb-6 text-base px-6 py-2 hover:bg-[#0C4A6E]">
              <Newspaper className="w-4 h-4 mr-2" />
              Tin tức y tế
            </Badge>

            <h1 className="text-[#0C4A6E] mb-8 leading-tight text-5xl md:text-6xl lg:text-7xl">
              TIN TỨC<br />BỆNH VIỆN
            </h1>

            <p className="text-xl md:text-2xl text-[#1E293B] mb-10 leading-relaxed max-w-3xl">
              Cập nhật các thông tin sức khỏe, hoạt động và sự kiện của Bệnh viện Tự Nhiên
            </p>
          </div>
        </div>
      </section>

      {/* FILTER SECTION */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-blue-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="w-5 h-5 text-[#1A73E8]" />
              <h3 className="text-[#0C4A6E] text-lg">Lọc theo danh mục:</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <Button
                    key={cat.id}
                    variant={selectedCategory === cat.id ? "default" : "outline"}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`${
                      selectedCategory === cat.id
                        ? 'bg-[#1A73E8] text-white hover:bg-[#0C4A6E]'
                        : 'border-2 border-[#1A73E8] text-[#1A73E8] hover:bg-[#1A73E8] hover:text-white'
                    } transition-all duration-300 h-12 px-6`}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {cat.name}
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* NEWS LIST */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* MAIN NEWS GRID */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-[#0C4A6E] text-3xl mb-2">
                  {categories.find(c => c.id === selectedCategory)?.name}
                </h2>
                <p className="text-muted-foreground">
                  Tìm thấy {filteredNews.length} tin tức
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {filteredNews.map((article) => (
                  <Card 
                    key={article.id}
                    className="border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group cursor-pointer overflow-hidden bg-white"
                    onClick={() => setSelectedNews(article)}
                  >
                    <CardContent className="p-0">
                      {/* Article Image */}
                      <div className="relative h-56 overflow-hidden">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* Category Badge */}
                        <Badge className={`absolute top-4 left-4 ${
                          article.category === 'health' ? 'bg-green-500' :
                          article.category === 'activities' ? 'bg-blue-500' :
                          'bg-purple-500'
                        } text-white border-0`}>
                          {categories.find(c => c.id === article.category)?.name}
                        </Badge>

                        {/* Views Badge */}
                        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views.toLocaleString()}
                        </div>
                      </div>

                      {/* Article Info */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{article.date}</span>
                          </div>
                        </div>

                        <h3 className="text-[#0C4A6E] text-xl mb-3 line-clamp-2 group-hover:text-[#1A73E8] transition-colors">
                          {article.title}
                        </h3>

                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                          {article.shortDescription}
                        </p>

                        <Button 
                          variant="ghost" 
                          className="text-[#1A73E8] hover:text-[#0C4A6E] p-0 h-auto hover:bg-transparent group/btn text-base"
                        >
                          Xem thêm
                          <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="space-y-6">
              {/* POPULAR NEWS */}
              <Card className="border-0 shadow-xl sticky top-24">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-[#1A73E8] rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-[#0C4A6E] text-xl">Tin phổ biến</h3>
                  </div>

                  <div className="space-y-4">
                    {popularNews.map((article, index) => (
                      <div
                        key={article.id}
                        onClick={() => setSelectedNews(article)}
                        className="flex gap-3 pb-4 border-b last:border-0 cursor-pointer group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-[#E8F1FF] text-[#1A73E8] rounded-lg flex items-center justify-center group-hover:bg-[#1A73E8] group-hover:text-white transition-colors">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm line-clamp-2 mb-2 group-hover:text-[#1A73E8] transition-colors">
                            {article.title}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{article.views.toLocaleString()}</span>
                            </div>
                            <span>{article.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CONTACT INFO */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-[#E8F1FF] to-white">
                <CardContent className="p-8">
                  <h3 className="text-[#0C4A6E] text-xl mb-6">Liên hệ</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-[#1A73E8] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Địa chỉ:</p>
                        <p className="text-sm">336 Nguyễn Trãi, Trường Đại học Khoa học Tự Nhiên</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#1A73E8] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Hotline:</p>
                        <a href="tel:19001234" className="text-sm hover:text-[#1A73E8] transition-colors">
                          1900 1234
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#1A73E8] flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email:</p>
                        <a href="mailto:info@tunhien.vn" className="text-sm hover:text-[#1A73E8] transition-colors">
                          info@tunhien.vn
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
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

      {/* NEWS DETAIL MODAL */}
      <Dialog open={!!selectedNews} onOpenChange={(open) => !open && setSelectedNews(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedNews && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl text-[#0C4A6E] mb-4 pr-8">
                  {selectedNews.title}
                </DialogTitle>
                
                <div className="flex flex-wrap gap-4 items-center text-sm text-muted-foreground mb-6">
                  <Badge className={`${
                    selectedNews.category === 'health' ? 'bg-green-500' :
                    selectedNews.category === 'activities' ? 'bg-blue-500' :
                    'bg-purple-500'
                  } text-white`}>
                    {categories.find(c => c.id === selectedNews.category)?.name}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Ngày đăng: {selectedNews.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{selectedNews.views.toLocaleString()} lượt xem</span>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                {/* Featured Image */}
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={selectedNews.image}
                    alt={selectedNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 py-4 border-y">
                  <div className="w-12 h-12 bg-[#E8F1FF] rounded-full flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-[#1A73E8]" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Tác giả</p>
                    <p className="text-[#0C4A6E]">{selectedNews.author}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none">
                  {selectedNews.fullContent.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-[#1E293B] leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Share Buttons */}
                <div className="pt-6 border-t">
                  <h4 className="text-[#0C4A6E] mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Chia sẻ bài viết
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      onClick={() => handleShare('facebook')}
                      className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      <Facebook className="w-5 h-5 mr-2" />
                      Facebook
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleShare('twitter')}
                      className="border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
                    >
                      <Twitter className="w-5 h-5 mr-2" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleShare('copy')}
                      className="border-2 border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white"
                    >
                      <LinkIcon className="w-5 h-5 mr-2" />
                      Sao chép link
                    </Button>
                  </div>
                </div>

                {/* Back Button */}
                <div className="pt-6">
                  <Button
                    size="lg"
                    onClick={() => setSelectedNews(null)}
                    className="bg-[#1A73E8] hover:bg-[#0C4A6E] text-white w-full md:w-auto"
                  >
                    <ArrowRight className="mr-2 w-5 h-5 rotate-180" />
                    Quay lại danh sách
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
