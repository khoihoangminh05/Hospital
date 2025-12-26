import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Calendar,
  Clock,
  Pill,
  FileText,
  Bell,
  User,
  LogOut,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Info,
  Heart,
  Home,
  Phone,
  MessageCircle,
  MapPin,
  Stethoscope,
  CalendarCheck,
  ClipboardList,
  Sun,
  Sunset,
  Moon,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';


export function PatientDashboard({ setCurrentPage }) {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(true);

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  // Patient data
  const patient = {
    name: 'Nguyễn Văn A',
    id: 'BN001',
    age: 45,
    gender: 'Nam',
    careStatus: 'under-treatment',
    currentCondition: 'Đang điều trị cao huyết áp',
    assignedDoctor: 'Bs. Lê Minh Tuấn',
    department: 'Khoa Tim Mạch',
    ward: 'Phòng 201 - Giường 03',
    treatmentPhase: 'Theo dõi và điều chỉnh thuốc'
  };

  // Today's tasks
  const todayTasks = [
    {
      id: '1',
      type: 'appointment',
      title: 'Khám với Bác sĩ',
      time: '14:00',
      detail: 'Bs. Lê Minh Tuấn - Khoa Tim Mạch',
      location: 'Phòng khám 305',
      icon: Stethoscope,
      color: 'blue'
    },
    {
      id: '2',
      type: 'medication',
      title: 'Uống thuốc buổi trưa',
      time: '12:00',
      detail: 'Amlodipine 5mg + Losartan 50mg',
      instruction: 'Uống sau bữa ăn',
      icon: Pill,
      color: 'green'
    },
    {
      id: '3',
      type: 'test',
      title: 'Xét nghiệm máu',
      time: '08:00 ngày mai',
      detail: 'Đường huyết lúc đói',
      location: 'Phòng xét nghiệm - Tầng 2',
      icon: FileText,
      color: 'purple'
    }
  ];

  // Upcoming appointments
  const upcomingAppointments = [
    {
      id: '1',
      date: '25/12/2024',
      time: '09:00',
      doctor: 'Bs. Lê Minh Tuấn',
      department: 'Khoa Tim Mạch',
      type: 'Tái khám',
      canReschedule: true
    },
    {
      id: '2',
      date: '28/12/2024',
      time: '14:00',
      doctor: 'Bs. Trần Văn B',
      department: 'Khoa Xét nghiệm',
      type: 'Kiểm tra kết quả',
      canReschedule: true
    },
    {
      id: '3',
      date: '02/01/2025',
      time: '10:00',
      doctor: 'Bs. Lê Minh Tuấn',
      department: 'Khoa Tim Mạch',
      type: 'Khám định kỳ',
      canReschedule: true
    }
  ];

  // Medications
  const medications = [
    {
      id: '1',
      name: 'Amlodipine',
      dose: '5mg',
      schedule: [
        { time: 'morning', label: 'Sáng', active: true }
      ],
      instruction: 'Uống sau bữa ăn sáng',
      color: 'blue'
    },
    {
      id: '2',
      name: 'Losartan',
      dose: '50mg',
      schedule: [
        { time: 'evening', label: 'Tối', active: true }
      ],
      instruction: 'Uống trước khi đi ngủ',
      color: 'green'
    },
    {
      id: '3',
      name: 'Metformin',
      dose: '850mg',
      schedule: [
        { time: 'morning', label: 'Sáng', active: true },
        { time: 'evening', label: 'Tối', active: true }
      ],
      instruction: 'Uống sau bữa ăn',
      color: 'purple'
    }
  ];

  // Lab results
  const labResults = [
    {
      id: '1',
      test: 'Xét nghiệm máu tổng quát',
      date: '18/12/2024',
      status: 'normal',
      message: 'Kết quả bình thường'
    },
    {
      id: '2',
      test: 'Đường huyết',
      date: '18/12/2024',
      status: 'attention',
      message: 'Cần theo dõi - Bác sĩ sẽ tư vấn'
    },
    {
      id: '3',
      test: 'X-quang tim phổi',
      date: '20/12/2024',
      status: 'pending',
      message: 'Đang chờ kết quả'
    }
  ];

  // Notifications
  const notifications = [
    {
      id: '1',
      type: 'reminder',
      title: 'Nhắc lịch khám',
      message: 'Bạn có lịch khám vào 14:00 hôm nay',
      time: '1 giờ trước',
      icon: Calendar
    },
    {
      id: '2',
      type: 'result',
      title: 'Kết quả xét nghiệm',
      message: 'Kết quả xét nghiệm máu đã có',
      time: '2 giờ trước',
      icon: FileText
    }
  ];

  const getCareStatusInfo = (status) => {
    switch (status) {
      case 'waiting':
        return { label: 'Chờ khám', color: 'bg-blue-100 text-blue-700', icon: Clock };
      case 'under-treatment':
        return { label: 'Đang điều trị', color: 'bg-green-100 text-green-700', icon: Heart };
      case 'follow-up':
        return { label: 'Theo dõi sau điều trị', color: 'bg-purple-100 text-purple-700', icon: CalendarCheck };
      default:
        return { label: 'Đang theo dõi', color: 'bg-gray-100 text-gray-700', icon: Info };
    }
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'normal':
        return { label: 'Bình thường', color: 'bg-green-100 text-green-700', icon: CheckCircle2 };
      case 'attention':
        return { label: 'Cần theo dõi', color: 'bg-yellow-100 text-yellow-700', icon: AlertCircle };
      case 'pending':
        return { label: 'Đang chờ', color: 'bg-blue-100 text-blue-700', icon: Clock };
      default:
        return { label: 'Chưa rõ', color: 'bg-gray-100 text-gray-700', icon: Info };
    }
  };

  const getTimeIcon = (time) => {
    if (time === 'morning') return Sun;
    if (time === 'afternoon') return Sunset;
    return Moon;
  };

  const statusInfo = getCareStatusInfo(patient.careStatus);
  const StatusIcon = statusInfo.icon;

  const handleReschedule = (appointmentId) => {
    toast.info('Chức năng đổi lịch hẹn đang được phát triển');
  };

  const handleViewDetails = (id, type) => {
    toast.info(`Xem chi tiết ${type}`);
  };

  const getCurrentTime = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'sáng';
    if (hour < 18) return 'chiều';
    return 'tối';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                <Home className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-[#0C4A6E]">Bệnh viện Tự Nhiên</h1>
                <p className="text-sm text-muted-foreground">Chăm sóc sức khỏe của bạn</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    {patient.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium">{patient.name}</p>
                  <p className="text-xs text-muted-foreground">Mã BN: {patient.id}</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Đăng xuất
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="animate-fade-in">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-3xl font-bold text-[#0C4A6E]">
                Xin chào, {patient.name}
              </h2>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Chúc bạn một buổi {getCurrentTime()} tốt lành! Đây là thông tin của bạn hôm nay.
            </p>
            <Badge className={`${statusInfo.color} text-base px-4 py-2`}>
              <StatusIcon className="w-5 h-5 mr-2" />
              {statusInfo.label}
            </Badge>
          </div>

          {/* Notifications */}
          {showNotifications && notifications.length > 0 && (
            <div className="space-y-3 animate-fade-in">
              {notifications.map(notification => (
                <Alert key={notification.id} className="border-l-4 border-l-blue-500 bg-blue-50">
                  <notification.icon className="w-5 h-5 text-blue-600" />
                  <AlertDescription className="ml-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-blue-900">{notification.title}</p>
                        <p className="text-blue-700">{notification.message}</p>
                        <p className="text-xs text-blue-600 mt-1">{notification.time}</p>
                      </div>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </div>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          )}

          {/* Today's Tasks - MOST IMPORTANT */}
          <section className="animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#0C4A6E]">Việc cần làm hôm nay</h3>
                <p className="text-sm text-muted-foreground">
                  {todayTasks.length} công việc cần thực hiện
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {todayTasks.map((task) => {
                const Icon = task.icon;
                return (
                  <Card 
                    key={task.id} 
                    className={`border-l-4 ${
                      task.color === 'blue' ? 'border-l-blue-500 hover:shadow-blue-100' :
                      task.color === 'green' ? 'border-l-green-500 hover:shadow-green-100' :
                      'border-l-purple-500 hover:shadow-purple-100'
                    } hover:shadow-xl transition-all cursor-pointer group`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          task.color === 'blue' ? 'bg-blue-100' :
                          task.color === 'green' ? 'bg-green-100' :
                          'bg-purple-100'
                        }`}>
                          <Icon className={`w-7 h-7 ${
                            task.color === 'blue' ? 'text-blue-600' :
                            task.color === 'green' ? 'text-green-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                            task.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                            task.color === 'green' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                          }`}>
                            <Clock className="w-4 h-4" />
                            {task.time}
                          </div>
                          <h4 className="font-bold text-[#0C4A6E] text-lg mb-2">{task.title}</h4>
                          <p className="text-sm text-gray-700 mb-1">{task.detail}</p>
                          {task.location && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {task.location}
                            </p>
                          )}
                          {task.instruction && (
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Info className="w-3 h-3" />
                              {task.instruction}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Current Treatment Summary */}
          <section className="animate-fade-in">
            <h3 className="text-2xl font-bold text-[#0C4A6E] mb-6 flex items-center gap-2">
              <Heart className="w-7 h-7" />
              Thông tin điều trị hiện tại
            </h3>
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ClipboardList className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Tình trạng hiện tại</p>
                        <p className="font-semibold text-[#0C4A6E]">{patient.currentCondition}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Stethoscope className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Bác sĩ điều trị</p>
                        <p className="font-semibold text-[#0C4A6E]">{patient.assignedDoctor}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Home className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Khoa / Phòng</p>
                        <p className="font-semibold text-[#0C4A6E]">{patient.department}</p>
                        <p className="text-sm text-muted-foreground">{patient.ward}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Giai đoạn điều trị</p>
                        <p className="font-semibold text-[#0C4A6E]">{patient.treatmentPhase}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 flex gap-3">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Nhắn tin cho bác sĩ
                  </Button>
                  <Button variant="outline">
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi điện tư vấn
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Two Columns: Appointments & Medications */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upcoming Appointments */}
            <section className="animate-fade-in">
              <h3 className="text-2xl font-bold text-[#0C4A6E] mb-6 flex items-center gap-2">
                <Calendar className="w-7 h-7" />
                Lịch hẹn sắp tới
              </h3>
              <div className="space-y-4">
                {upcomingAppointments.map(apt => (
                  <Card key={apt.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex gap-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex flex-col items-center justify-center">
                            <p className="text-xs text-blue-600 font-medium">Th {apt.date.split('/')[0]}</p>
                            <p className="text-lg font-bold text-blue-700">{apt.date.split('/')[0]}</p>
                          </div>
                          <div>
                            <p className="font-bold text-[#0C4A6E] mb-1">{apt.type}</p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                              <Clock className="w-4 h-4" />
                              <span>{apt.time}</span>
                            </div>
                            <p className="text-sm text-gray-700">{apt.doctor}</p>
                            <p className="text-xs text-muted-foreground">{apt.department}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleViewDetails(apt.id, 'appointment')}
                        >
                          Xem chi tiết
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                        {apt.canReschedule && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReschedule(apt.id)}
                          >
                            Đổi lịch
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Medications */}
            <section className="animate-fade-in">
              <h3 className="text-2xl font-bold text-[#0C4A6E] mb-6 flex items-center gap-2">
                <Pill className="w-7 h-7" />
                Thuốc đang dùng
              </h3>
              <div className="space-y-4">
                {medications.map(med => (
                  <Card key={med.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          med.color === 'blue' ? 'bg-blue-100' :
                          med.color === 'green' ? 'bg-green-100' :
                          'bg-purple-100'
                        }`}>
                          <Pill className={`w-6 h-6 ${
                            med.color === 'blue' ? 'text-blue-600' :
                            med.color === 'green' ? 'text-green-600' :
                            'text-purple-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-[#0C4A6E] mb-1">
                            {med.name} <span className="text-sm font-normal text-muted-foreground">{med.dose}</span>
                          </h4>
                          <div className="flex gap-2 mb-2">
                            {med.schedule.map((sch, idx) => {
                              const TimeIcon = getTimeIcon(sch.time);
                              return (
                                <Badge 
                                  key={idx} 
                                  className={`${
                                    sch.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                  }`}
                                >
                                  <TimeIcon className="w-3 h-3 mr-1" />
                                  {sch.label}
                                </Badge>
                              );
                            })}
                          </div>
                          <p className="text-sm text-muted-foreground flex items-start gap-1">
                            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            {med.instruction}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>

          {/* Lab Results Status */}
          <section className="animate-fade-in">
            <h3 className="text-2xl font-bold text-[#0C4A6E] mb-6 flex items-center gap-2">
              <FileText className="w-7 h-7" />
              Kết quả xét nghiệm
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {labResults.map(result => {
                const statusInfo = getStatusInfo(result.status);
                const StatusIcon = statusInfo.icon;
                return (
                  <Card 
                    key={result.id} 
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleViewDetails(result.id, 'lab-result')}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          result.status === 'normal' ? 'bg-green-100' :
                          result.status === 'attention' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            result.status === 'normal' ? 'text-green-600' :
                            result.status === 'attention' ? 'text-yellow-600' :
                            'text-blue-600'
                          }`} />
                        </div>
                        <Badge className={`${statusInfo.color}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-[#0C4A6E] mb-2">{result.test}</h4>
                      <p className="text-sm text-gray-700 mb-2">{result.message}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {result.date}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Help & Support */}
          <section className="animate-fade-in">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-none">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <MessageCircle className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0C4A6E] mb-1">Cần hỗ trợ?</h4>
                      <p className="text-sm text-muted-foreground">
                        Chúng tôi luôn sẵn sàng giúp đỡ bạn 24/7
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="bg-white">
                      <Phone className="w-4 h-4 mr-2" />
                      Gọi: 1900 xxxx
                    </Button>
                    <Button className="bg-gradient-to-r from-blue-500 to-blue-600">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat ngay
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}