import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, CheckCircle2, AlertCircle, Plus, 
  User, MapPin, Activity, ChevronRight, Loader2, 
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import api from '@/config/axios';
import { toast } from 'sonner';
import { useChat } from '@/contexts/ChatContext';

export function PatientDashboard({ setCurrentPage }) {
  const { openChatWithDoctor } = useChat();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({ name: 'Bạn' });

  // --- 1. LẤY DỮ LIỆU TỪ API ---
  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }

    const fetchAppointments = async () => {
      try {
        setLoading(true);
        // Gọi API lấy lịch sử khám của chính mình
        const res = await api.get('/api/appointments/my-list');
        setAppointments(res.data);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleContactDoctor = (appointment) => {
    console.log(appointment)
    // Logic mở chat:
    // Cách 1: Nếu bạn dùng ChatWidget toàn cục, bạn có thể emit event hoặc set state global
    openChatWithDoctor({
        doctorId: appointment.doctorId, // ID lấy từ API get_appointments
        doctorName: appointment.doctorName
    });
    
    // Ví dụ: Hiển thị thông báo tạm thời
    toast.info(`Đang kết nối với ${appointment.doctorName}...`);
    
  };

  // --- 2. TÍNH TOÁN THỐNG KÊ ---
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  
  // Lấy lịch khám sắp tới gần nhất
  const nextAppointment = appointments
    .filter(a => a.status === 'confirmed' && new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  // Helper format ngày
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
  };

  // Helper màu trạng thái
  const getStatusConfig = (status) => {
    switch (status) {
      case 'confirmed':
        return { color: 'bg-teal-50 text-teal-700 border-teal-200', icon: CheckCircle2, text: 'Đã xác nhận' };
      case 'pending':
        return { color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock, text: 'Chờ xác nhận' };
      case 'completed':
        return { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: CheckCircle2, text: 'Đã khám xong' };
      case 'cancelled':
        return { color: 'bg-red-50 text-red-700 border-red-200', icon: AlertCircle, text: 'Đã hủy' };
      default:
        return { color: 'bg-gray-50 text-gray-700', icon: Clock, text: status };
    }
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* HEADER BANNER */}
      <div className="bg-[#1A73E8] text-white pt-12 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Xin chào, {user.name} 👋</h1>
                    <p className="text-blue-100 opacity-90">Theo dõi sức khỏe và lịch khám của bạn tại đây.</p>
                </div>
                <Button 
                    onClick={() => handleNavigate('appointment')}
                    className="bg-white text-[#1A73E8] hover:bg-blue-50 font-semibold shadow-lg hidden md:flex"
                >
                    <Plus className="w-4 h-4 mr-2" /> Đặt lịch khám mới
                </Button>
            </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl px-4 -mt-16">
        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Lịch sắp tới */}
            <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Lịch khám tiếp theo</p>
                            <h3 className="text-lg font-bold text-gray-800">
                                {nextAppointment 
                                    ? `${formatDate(nextAppointment.date)} - ${nextAppointment.time}` 
                                    : "Chưa có lịch"}
                            </h3>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Card 2: Chờ xác nhận */}
            <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Đang chờ duyệt</p>
                            <h3 className="text-lg font-bold text-gray-800">{pendingCount} lịch hẹn</h3>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Card 3: Tổng quan */}
            <Card className="shadow-lg border-0">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                            <Activity className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Đã hoàn thành</p>
                            <h3 className="text-lg font-bold text-gray-800">
                                {appointments.filter(a => a.status === 'completed').length} lần khám
                            </h3>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT: Appointment List */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* ... (Giữ nguyên Header "Danh sách lịch khám") ... */}
                    
                    <div className="p-4 md:p-6 space-y-4">
                        {appointments.length === 0 ? (
                            <div className="text-center py-10">
                                <p className="text-gray-500 mb-4">Bạn chưa có lịch khám nào.</p>
                                <Button onClick={() => handleNavigate('appointment')} className="bg-[#1A73E8]">Đặt lịch ngay</Button>
                            </div>
                        ) : (
                            appointments.map((appt) => {
                                const statusConfig = getStatusConfig(appt.status);
                                const StatusIcon = statusConfig.icon;

                                return (
                                    <div key={appt.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-blue-200 transition-all bg-white hover:shadow-md">
                                        {/* Date Box */}
                                        <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 rounded-lg w-16 h-16 flex-shrink-0">
                                            <span className="text-xs font-semibold uppercase">Tháng {new Date(appt.date).getMonth() + 1}</span>
                                            <span className="text-xl font-bold">{new Date(appt.date).getDate()}</span>
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1 min-w-0 w-full">
                                            <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                                                <h3 className="font-bold text-gray-900 text-lg">{appt.doctorName}</h3>
                                                <Badge className={`${statusConfig.color} px-2.5 py-0.5 rounded-full font-medium border`}>
                                                    <StatusIcon className="w-3 h-3 mr-1" /> {statusConfig.text}
                                                </Badge>
                                            </div>
                                            
                                            <p className="text-gray-600 text-sm mb-2">{appt.department}</p>
                                            
                                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-4 h-4" /> {appt.time}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4" /> Bệnh viện Tự Nhiên
                                                </div>
                                            </div>
                                            
                                            {/* NÚT LIÊN HỆ (CHỈ HIỆN KHI ĐÃ CONFIRMED) */}
                                            {appt.status === 'confirmed' && (
                                                <Button 
                                                    onClick={() => handleContactDoctor(appt)}
                                                    variant="outline" 
                                                    size="sm"
                                                    className="w-full md:w-auto text-blue-600 border-blue-200 hover:bg-blue-50 mt-2"
                                                >
                                                    <MessageSquare className="w-4 h-4 mr-2" /> 
                                                    Nhắn tin với bác sĩ
                                                </Button>
                                            )}

                                            {appt.reason && (
                                                <div className="mt-3 text-sm bg-gray-50 p-2 rounded text-gray-600 italic border border-gray-100">
                                                    "Lý do: {appt.reason}"
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* RIGHT: Quick Profile & Support */}
            <div className="space-y-6">
                {/* Profile Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="text-center mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold shadow-md">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">{user.name}</h3>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Số điện thoại</span>
                            <span className="text-sm font-medium">{user.phone || 'Chưa cập nhật'}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Mã bệnh nhân</span>
                            <span className="text-sm font-medium">BN-{user._id ? user._id.slice(-6).toUpperCase() : '---'}</span>
                        </div>
                    </div>
                    
                    <Button className="w-full mt-6" variant="outline">
                        <User className="w-4 h-4 mr-2" /> Chỉnh sửa hồ sơ
                    </Button>
                </div>

                {/* Support Banner */}
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
                    <h3 className="font-bold text-lg mb-2">Cần hỗ trợ y tế?</h3>
                    <p className="text-indigo-100 text-sm mb-4">Đội ngũ bác sĩ của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.</p>
                    <a href="tel:19001234" className="inline-flex items-center justify-center w-full bg-white text-indigo-700 font-bold py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                        Gọi 1900 1234
                    </a>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}