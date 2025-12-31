import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Clock, Check, X, CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/config/axios';

// Helper tạo lịch tháng
const generateCalendarDays = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  const days = [];
  
  // Slot trống đầu tháng
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  // Các ngày trong tháng
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
};

export function DoctorDashboard() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  
  // State dữ liệu
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const appointmentListRef = useRef(null);

  // --- 1. GỌI API LẤY DANH SÁCH ---
  const fetchAppointments = async () => {
    try {
        setLoading(true);
        // Gọi API backend vừa sửa
        const res = await api.get('/api/appointments/my-list');
        setAppointments(res.data);
    } catch (error) {
        console.error("Lỗi tải lịch:", error);
        toast.error("Không thể tải danh sách lịch khám");
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // --- 2. XỬ LÝ HÀNH ĐỘNG ---
  const handleConfirm = async (id) => {
    try {
        await api.put(`/api/appointments/doctor/confirm/${id}`);
        toast.success("Đã xác nhận lịch hẹn");
        // Update state local để UI mượt mà
        setAppointments(prev => prev.map(a => a.id === id ? {...a, status: 'confirmed'} : a));
    } catch (error) {
        toast.error("Lỗi xác nhận");
    }
  };

  const handleComplete = async (id) => {
    try {
        await api.put(`/api/appointments/doctor/complete/${id}`);
        toast.success("Đã hoàn thành khám bệnh");
        setAppointments(prev => prev.map(a => a.id === id ? {...a, status: 'completed'} : a));
    } catch (error) {
        toast.error("Lỗi cập nhật");
    }
  };

  const handleCancel = async (id) => {
    if(!confirm("Bạn có chắc muốn hủy lịch này?")) return;
    try {
        // Tùy logic bạn dùng API delete hay update status 'cancelled'
        await api.delete(`/api/appointments/${id}`); 
        toast.success("Đã hủy lịch hẹn");
        setAppointments(prev => prev.filter(a => a.id !== id));
    } catch (error) {
        toast.error("Lỗi hủy lịch");
    }
  };

  // --- 3. LOGIC LỊCH & FORMAT ---
  
  // Format Date -> String (YYYY-MM-DD) để so sánh với dữ liệu backend
  const formatDateToString = (date) => {
    if (!date) return '';
    // Lưu ý: toISOString() chuyển về UTC, cẩn thận lệch múi giờ. 
    // Cách an toàn lấy YYYY-MM-DD theo giờ địa phương:
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - (offset*60*1000));
    return localDate.toISOString().split('T')[0];
  };

  const selectedDateStr = formatDateToString(selectedDate);
  const todayStr = formatDateToString(today);

  // Lọc lịch theo ngày đang chọn trên lịch
  const selectedDateAppointments = appointments.filter(apt => apt.date === selectedDateStr);
  
  // Lọc lịch hôm nay để hiển thị thông báo
  const todayAppointments = appointments.filter(apt => apt.date === todayStr);
  const pendingCount = todayAppointments.filter(apt => apt.status === 'pending').length;
  const confirmedCount = todayAppointments.filter(apt => apt.status === 'confirmed').length;

  const handlePrevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else { setCurrentMonth(currentMonth - 1); }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else { setCurrentMonth(currentMonth + 1); }
  };

  const getAppointmentCountForDate = (date) => {
    if (!date) return 0;
    return appointments.filter(apt => apt.date === formatDateToString(date)).length;
  };

  const monthNames = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  
  // Màu avatar ngẫu nhiên theo tên
  const getAvatarColor = (initials) => {
    const colors = ['from-sky-400 to-sky-600', 'from-purple-400 to-purple-600', 'from-emerald-400 to-emerald-600', 'from-amber-400 to-amber-600', 'from-rose-400 to-rose-600'];
    const charCode = initials ? initials.charCodeAt(0) : 0;
    return colors[charCode % colors.length];
  };

  // Loading Screen
  if (loading) {
      return (
        <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-8 pb-8">
      
      {/* Banner Thống kê nhanh */}
      <div className="mb-8 bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl mb-1 font-semibold">
              {todayAppointments.length > 0 
                ? `Hôm nay bạn có ${todayAppointments.length} lịch hẹn`
                : 'Hôm nay bạn chưa có lịch hẹn nào'
              }
            </h2>
            <p className="text-sky-100 text-sm">
              {pendingCount > 0 && `${pendingCount} chờ xác nhận • `}
              {confirmedCount > 0 && `${confirmedCount} đã xác nhận`}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* CỘT TRÁI: Danh sách lịch hẹn */}
        <div className="lg:col-span-8">
          <div ref={appointmentListRef} className="scroll-mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-slate-900 font-bold">
                {selectedDateStr === todayStr ? 'Hôm nay' : `Ngày ${selectedDate.getDate()} tháng ${selectedDate.getMonth()+1}`}
              </h2>
              <div className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
                {selectedDateAppointments.length} lịch hẹn
              </div>
            </div>

            {selectedDateAppointments.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500">Không có lịch hẹn nào vào ngày này</p>
              </div>
            ) : (
              <div className="space-y-4">
                {selectedDateAppointments.map((appointment) => (
                  <div key={appointment.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start md:items-center gap-5 flex-col md:flex-row">
                      
                      <div className="flex items-center gap-5 flex-1 w-full">
                        {/* Avatar */}
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getAvatarColor(appointment.patientInitials)} flex items-center justify-center flex-shrink-0 text-white text-lg font-bold shadow-sm`}>
                            {appointment.patientInitials}
                        </div>

                        {/* Thông tin bệnh nhân */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-slate-900 font-bold text-lg mb-1">{appointment.patientName}</h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                            <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span className="font-semibold text-slate-700">{appointment.time}</span>
                            </div>
                            {appointment.reason && (
                                <span className="text-slate-500 truncate max-w-[250px]" title={appointment.reason}>
                                • {appointment.reason}
                                </span>
                            )}
                            </div>
                        </div>
                      </div>

                      {/* Nút thao tác */}
                      <div className="flex items-center gap-2 w-full md:w-auto justify-end mt-2 md:mt-0">
                        {appointment.status === 'pending' && (
                          <>
                            <button onClick={() => handleConfirm(appointment.id)} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium text-sm shadow-sm">
                              <Check className="w-4 h-4" /> Xác nhận
                            </button>
                            <button onClick={() => handleCancel(appointment.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all border border-red-100 hover:border-red-200">
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        
                        {appointment.status === 'confirmed' && (
                          <>
                            <button onClick={() => handleComplete(appointment.id)} className="flex items-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-all font-medium text-sm shadow-sm">
                              <CheckCircle2 className="w-4 h-4" /> Hoàn thành
                            </button>
                            <button onClick={() => handleCancel(appointment.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100">
                              <X className="w-5 h-5" />
                            </button>
                          </>
                        )}
                        
                        {appointment.status === 'completed' && (
                          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-medium text-sm border border-slate-200">
                            <CheckCircle2 className="w-4 h-4 text-green-600" /> Đã khám xong
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CỘT PHẢI: Lịch (Calendar Widget) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 shadow-sm">
            {/* Header Lịch */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">{monthNames[currentMonth]}</h3>
                <p className="text-sm text-slate-500">Năm {currentYear}</p>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ChevronLeft className="w-5 h-5 text-slate-600"/></button>
                <button onClick={handleNextMonth} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><ChevronRight className="w-5 h-5 text-slate-600"/></button>
              </div>
            </div>

            {/* Thứ trong tuần */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
               {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(d => (
                   <div key={d} className="text-xs font-semibold text-slate-400 py-1">{d}</div>
               ))}
            </div>

            {/* Grid ngày */}
            <div className="grid grid-cols-7 gap-2">
              {generateCalendarDays(currentYear, currentMonth).map((day, index) => {
                if (!day) return <div key={`empty-${index}`} />;
                
                const dateStr = formatDateToString(day);
                const isSelected = dateStr === selectedDateStr;
                const isToday = dateStr === todayStr;
                // Kiểm tra xem ngày này có lịch hẹn nào không
                const hasAppt = getAppointmentCountForDate(day) > 0;

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day)}
                    className={`
                        aspect-square rounded-xl flex flex-col items-center justify-center text-sm relative transition-all duration-200
                        ${isSelected ? 'bg-sky-600 text-white shadow-md scale-105 z-10' : 'hover:bg-slate-50 text-slate-700'}
                        ${isToday && !isSelected ? 'border-2 border-sky-600 font-bold text-sky-600' : ''}
                        ${hasAppt && !isSelected ? 'bg-sky-50 font-medium text-sky-900' : ''}
                    `}
                  >
                    {day.getDate()}
                    {hasAppt && (
                        <div className={`w-1.5 h-1.5 rounded-full mt-1 ${isSelected ? 'bg-white' : 'bg-sky-500'}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}