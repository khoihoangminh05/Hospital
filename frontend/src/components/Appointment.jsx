import React, { useState, useEffect } from 'react';
// Import instance axios bạn đã cấu hình

// Import UI Components (Giữ nguyên từ code cũ)
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import { 
  Calendar, Clock, Phone, Mail, User, Stethoscope, Building2, 
  FileText, CheckCircle2, AlertCircle, Home, Siren
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import api from '@/config/axios';

export function Appointment({ setCurrentPage }) {
  // --- STATE QUẢN LÝ DỮ LIỆU ---
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', 
    department: '', doctor: '', doctorName: '', 
    date: '', time: '', notes: ''
  });

  // State dữ liệu động từ API
  const [departments, setDepartments] = useState([]); 
  const [doctors, setDoctors] = useState([]);
  
  // State trạng thái UI
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loadingDepts, setLoadingDepts] = useState(true);

  // --- 1. LOAD DANH SÁCH KHOA KHI MỞ TRANG ---
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        // Gọi API: GET /api/meta/departments
        const response = await api.get('/api/meta/departments');
        setDepartments(response.data);
      } catch (err) {
        console.error("Lỗi tải danh sách khoa:", err);
        setApiError("Không thể tải danh sách khoa phòng. Vui lòng thử lại sau.");
      } finally {
        setLoadingDepts(false);
      }
    };
    fetchDepartments();
  }, []);

  // --- 2. XỬ LÝ KHI CHỌN KHOA -> LOAD BÁC SĨ ---
  const handleDepartmentChange = async (deptId) => {
    // Reset bác sĩ cũ
    setFormData(prev => ({ 
        ...prev, 
        department: deptId, 
        doctor: '', 
        doctorName: '' 
    }));
    //setDoctors([]); // Xóa list bác sĩ cũ

    try {
        // Gọi API: GET /api/meta/doctors/<department_id>
        const response = await api.get(`/api/meta/doctors/${deptId}`);
       
        setDoctors(response.data); 
        console.log(doctors);
    } catch (err) {
        console.error("Lỗi tải bác sĩ:", err);
    }
  };

  const handleDoctorChange = (docId) => {
    // Tìm object bác sĩ để lấy tên hiển thị
    const selectedDoc = doctors.find(d => d._id === docId);
    setFormData(prev => ({ 
        ...prev, 
        doctor: docId, 
        // Backend trả về user, ưu tiên lấy fullName, nếu không có lấy username
        doctorName: selectedDoc ? (selectedDoc.fullName || selectedDoc.username) : '' 
    }));
    
    // Xóa lỗi nếu có
    if (errors.doctor) setErrors(prev => ({ ...prev, doctor: undefined }));
  };

  // --- VALIDATE FORM ---
  const validateForm = () => {
      const newErrors = {};
      const phoneRegex = /^[0-9]{10}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!formData.fullName.trim()) newErrors.fullName = 'Nhập họ tên';
      if (!formData.phone.trim()) newErrors.phone = 'Nhập số điện thoại';
      else if (!phoneRegex.test(formData.phone)) newErrors.phone = 'SĐT không hợp lệ';
      
      if (!formData.email.trim()) newErrors.email = 'Nhập email';
      else if (!emailRegex.test(formData.email)) newErrors.email = 'Email sai định dạng';

      if (!formData.department) newErrors.department = 'Chọn khoa phòng';
      if (!formData.doctor) newErrors.doctor = 'Chọn bác sĩ';
      if (!formData.date) newErrors.date = 'Chọn ngày khám';
      if (!formData.time) newErrors.time = 'Chọn giờ khám';

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  // --- 3. GỬI FORM ĐẶT LỊCH ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setApiError("Bạn cần đăng nhập để đặt lịch!");
            setIsSubmitting(false);
            return;
        }

        // Chuẩn bị payload đúng format backend cần
        const payload = {
            doctor_id: formData.doctor,
            date_time: `${formData.date}T${formData.time}:00`, // ISO Format
            description: formData.notes
        };

        // Gọi API: POST /api/appointments/book
        const res = await api.post('/api/appointments/book', payload);
        console.log(res);
        // Nếu axios không throw error nghĩa là thành công (status 2xx)
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (err) {
        console.error("Submit Error:", err);
        // Lấy message lỗi từ backend trả về (nếu có)
        const message = err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại.";
        setApiError(message);
    } finally {
        setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: '', phone: '', email: '', department: '',
      doctor: '', doctorName: '', date: '', time: '', notes: ''
    });
    setErrors({});
    setApiError(null);
    setIsSubmitted(false);
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- GIAO DIỆN THÀNH CÔNG ---
  if (isSubmitted) {
    return (
      <div className="bg-white min-h-screen">
        <section className="py-20 bg-gradient-to-br from-[#1A73E8] to-[#0C4A6E] text-white">
          <div className="container mx-auto px-4 text-center max-w-2xl">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                <CheckCircle2 className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-6">Đặt lịch thành công!</h1>
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white mb-8 text-left">
                <CardContent className="p-8 space-y-4">
                    <div className="flex justify-between border-b border-white/20 pb-2">
                        <span className="text-blue-200">Bệnh nhân:</span> <span>{formData.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-2">
                        <span className="text-blue-200">Bác sĩ:</span> <span>{formData.doctorName}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-2">
                        <span className="text-blue-200">Thời gian:</span> <span>{formData.time} - {formData.date}</span>
                    </div>
                </CardContent>
              </Card>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => handleNavigation('home')} className="bg-white text-blue-700 hover:bg-gray-100">Về trang chủ</Button>
                <Button variant="outline" onClick={handleReset} className="border-white text-white hover:bg-white/20">Đặt lịch mới</Button>
              </div>
          </div>
        </section>
      </div>
    );
  }

  // --- GIAO DIỆN FORM CHÍNH ---
  return (
    <div className="bg-white">
      {/* Banner */}
      <section className="relative h-[300px] flex items-center justify-center bg-blue-50">
         <ImageWithFallback src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200" className="absolute inset-0 w-full h-full object-cover opacity-30" />
         <div className="relative z-10 text-center">
            <h1 className="text-4xl font-bold text-[#0C4A6E] mb-2">ĐẶT LỊCH KHÁM</h1>
            <p className="text-gray-600">Kết nối nhanh chóng - Chăm sóc tận tâm</p>
         </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cột trái: Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-[#0C4A6E] mb-6">Thông tin đăng ký</h2>
                  
                  {apiError && (
                      <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 border border-red-200">
                          <AlertCircle className="w-5 h-5" /> {apiError}
                      </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Tên & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Họ và tên <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} className="pl-10" placeholder="Nguyễn Văn A" />
                            </div>
                            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Số điện thoại <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                <Input value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} className="pl-10" placeholder="09xxxxxxxx" />
                            </div>
                            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <Label>Email <span className="text-red-500">*</span></Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <Input value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="pl-10" placeholder="email@example.com" />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* --- SELECT ĐỘNG TỪ API --- */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Khoa phòng <span className="text-red-500">*</span></Label>
                            <Select value={formData.department} onValueChange={handleDepartmentChange}>
                                <SelectTrigger className={errors.department ? "border-red-500" : ""}>
                                    <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                                    <SelectValue placeholder={loadingDepts ? "Đang tải..." : "Chọn khoa"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map((dept) => (
                                        <SelectItem key={dept._id} value={dept._id}>
                                            {dept.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Bác sĩ <span className="text-red-500">*</span></Label>
                            <Select value={formData.doctor} onValueChange={handleDoctorChange} disabled={!formData.department}>
                                <SelectTrigger className={errors.doctor ? "border-red-500" : ""}>
                                    <Stethoscope className="h-4 w-4 mr-2 text-gray-500" />
                                    <SelectValue placeholder={!formData.department ? "Chọn khoa trước" : "Chọn bác sĩ"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {doctors.length === 0 ? (
                                        <div className="p-2 text-sm text-gray-500">Chưa có bác sĩ</div>
                                    ) : (
                                        doctors.map((doc) => (
                                            <SelectItem key={doc._id} value={doc._id}>
                                                {doc.name || doc.username}
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            {errors.doctor && <p className="text-red-500 text-sm">{errors.doctor}</p>}
                        </div>
                    </div>

                    {/* Ngày & Giờ */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Ngày khám <span className="text-red-500">*</span></Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
                                <Input type="date" min={new Date().toISOString().split('T')[0]} 
                                    value={formData.date} onChange={(e) => handleInputChange('date', e.target.value)} 
                                    className="pl-10" />
                            </div>
                            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Giờ khám <span className="text-red-500">*</span></Label>
                            <Select value={formData.time} onValueChange={(val) => handleInputChange('time', val)}>
                                <SelectTrigger>
                                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                                    <SelectValue placeholder="Chọn giờ" />
                                </SelectTrigger>
                                <SelectContent>
                                    {timeSlots.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                            </Select>
                            {errors.time && <p className="text-red-500 text-sm">{errors.time}</p>}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="space-y-2">
                        <Label>Ghi chú thêm</Label>
                        <Textarea value={formData.notes} onChange={(e) => handleInputChange('notes', e.target.value)} 
                            placeholder="Mô tả triệu chứng..." className="min-h-[100px]" />
                    </div>

                    {/* Submit */}
                    <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-lg bg-[#1A73E8] hover:bg-[#1557B0]">
                        {isSubmitting ? "Đang xử lý..." : "XÁC NHẬN ĐẶT LỊCH"}
                    </Button>

                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Cột phải: Thông tin static */}
            <div className="space-y-6">
                <Card className="bg-red-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <Siren className="w-8 h-8" />
                            <h3 className="text-xl font-bold">Cấp cứu 24/7</h3>
                        </div>
                        <p className="mb-4 text-red-100">Trong trường hợp khẩn cấp, vui lòng gọi ngay:</p>
                        <a href="tel:19001234" className="flex items-center gap-3 bg-white/20 p-3 rounded-lg hover:bg-white/30 transition">
                            <Phone className="w-6 h-6" />
                            <span className="text-2xl font-bold">1900 1234</span>
                        </a>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow">
                    <CardContent className="p-6">
                         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <Home className="w-5 h-5 text-blue-600"/> Địa chỉ
                         </h3>
                         <p className="text-gray-600 text-sm">336 Nguyễn Trãi, Thanh Xuân, Hà Nội</p>
                    </CardContent>
                </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}