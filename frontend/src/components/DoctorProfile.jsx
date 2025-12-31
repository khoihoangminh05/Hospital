import React, { useState, useEffect } from 'react';
import { Mail, Phone, GraduationCap, Award, Globe, Edit, Building2, User, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import api from '@/config/axios';

export function DoctorProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  const [formData, setFormData] = useState({});

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/doctor/profile/');
      setProfile(res.data);
      
      setFormData({
        phone: res.data.phone || '',
        hospital: res.data.hospital || '',
        education: Array.isArray(res.data.education) ? res.data.education.join('\n') : res.data.education || '',
        certifications: res.data.certifications ? res.data.certifications.join('\n') : '',
        languages: res.data.languages ? res.data.languages.join(', ') : '',
        achievements: res.data.achievements ? res.data.achievements.join('\n') : ''
      });
    } catch (error) {
      console.error("Lỗi tải hồ sơ:", error);
      toast.error("Không thể tải thông tin hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // --- HANDLER ---
  const handleUpdate = async () => {
    try {
        // Convert text area (xuống dòng) thành mảng để gửi lên server
        const payload = {
            phone: formData.phone,
            hospital: formData.hospital,
            education: formData.education, // Giữ nguyên string hoặc convert tuỳ backend
            certifications: formData.certifications.split('\n').filter(i => i.trim()),
            languages: formData.languages.split(',').map(i => i.trim()).filter(i => i),
            achievements: formData.achievements.split('\n').filter(i => i.trim())
        };

        await api.put('/api/doctor/profile/', payload);
        toast.success("Cập nhật hồ sơ thành công");
        setIsEditOpen(false);
        fetchProfile(); // Reload
    } catch (error) {
        toast.error("Cập nhật thất bại");
    }
  };

  if (loading) {
    return (
        <div className="flex h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    );
  }

  if (!profile) return <div className="text-center p-10">Không có dữ liệu</div>;

  // Helper để hiển thị Avatar (chữ cái đầu)
  const getInitials = (name) => {
    return name ? name.split(' ').pop().charAt(0).toUpperCase() : 'BS';
  };

  return (
    <div className="max-w-[1600px] mx-auto px-4 md:px-8 pb-12">
      {/* Header Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 mb-8 text-center shadow-sm">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center mb-6 shadow-lg border-4 border-white">
            <span className="text-white text-4xl font-bold">{getInitials(profile.name)}</span>
          </div>

          {/* Doctor Info */}
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{profile.name}</h1>
          <p className="text-lg text-sky-700 font-medium mb-1">{profile.specialty}</p>
          <p className="text-slate-500 mb-2">{profile.department}</p>
          
          <div className="flex items-center gap-2 text-slate-600 mb-6 bg-slate-50 px-4 py-2 rounded-full">
            <Building2 className="w-4 h-4" />
            <span>{profile.hospital}</span>
          </div>

          {/* Edit Button */}
          <Button 
            onClick={() => setIsEditOpen(true)}
            className="inline-flex items-center gap-2 px-6 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors shadow-md hover:shadow-lg"
          >
            <Edit className="w-4 h-4" />
            Chỉnh sửa hồ sơ
          </Button>
        </div>
      </div>

      {/* Information Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Liên hệ */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="p-2 bg-sky-100 rounded-lg">
                <Mail className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Thông tin liên hệ</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="text-slate-900 font-medium">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Số điện thoại</p>
                <p className="text-slate-900 font-medium">{profile.phone || "Chưa cập nhật"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Ngôn ngữ */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Ngôn ngữ</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {profile.languages && profile.languages.length > 0 ? (
                profile.languages.map((lang, index) => (
                <div key={index} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg border border-purple-100 font-medium">
                    {lang}
                </div>
                ))
            ) : <p className="text-slate-400 italic">Chưa cập nhật</p>}
          </div>
        </div>

        {/* Chứng chỉ */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Chứng chỉ hành nghề</h2>
          </div>
          <div className="space-y-4">
            {profile.certifications && profile.certifications.length > 0 ? (
                profile.certifications.map((cert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">{cert}</p>
                </div>
                ))
            ) : <p className="text-slate-400 italic">Chưa cập nhật</p>}
          </div>
        </div>

        {/* Đào tạo */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
                <GraduationCap className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Đào tạo & Học vấn</h2>
          </div>
          <div className="space-y-4">
            {profile.education && profile.education.length > 0 ? (
                profile.education.map((edu, index) => (
                <div key={index} className="flex items-start gap-3">
                    <div className="p-1 bg-orange-100 rounded-full mt-0.5">
                        <GraduationCap className="w-3 h-3 text-orange-600" />
                    </div>
                    <p className="text-slate-700">{edu}</p>
                </div>
                ))
            ) : <p className="text-slate-400 italic">Chưa cập nhật</p>}
          </div>
        </div>

        {/* Thành tích - Full width */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6 border-b pb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
                <Award className="w-5 h-5 text-yellow-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-900">Thành tích & Giải thưởng</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {profile.achievements && profile.achievements.length > 0 ? (
                profile.achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3 p-4 border border-slate-100 rounded-xl bg-slate-50">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-slate-700">{achievement}</p>
                </div>
                ))
            ) : <p className="text-slate-400 italic">Chưa cập nhật</p>}
          </div>
        </div>
      </div>

      {/* DIALOG EDIT PROFILE */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
                <DialogTitle>Chỉnh sửa hồ sơ bác sĩ</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Số điện thoại</Label>
                        <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label>Bệnh viện công tác</Label>
                        <Input value={formData.hospital} onChange={e => setFormData({...formData, hospital: e.target.value})} />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label>Học vấn (Mỗi dòng một bằng cấp)</Label>
                    <Textarea 
                        className="min-h-[100px]" 
                        value={formData.education} 
                        onChange={e => setFormData({...formData, education: e.target.value})} 
                        placeholder="VD: Bác sĩ Chuyên khoa I..."
                    />
                </div>

                <div className="space-y-2">
                    <Label>Chứng chỉ hành nghề (Mỗi dòng một chứng chỉ)</Label>
                    <Textarea 
                        className="min-h-[100px]" 
                        value={formData.certifications} 
                        onChange={e => setFormData({...formData, certifications: e.target.value})} 
                    />
                </div>

                <div className="space-y-2">
                    <Label>Ngôn ngữ (Ngăn cách bằng dấu phẩy)</Label>
                    <Input 
                        value={formData.languages} 
                        onChange={e => setFormData({...formData, languages: e.target.value})} 
                        placeholder="VD: Tiếng Việt, Tiếng Anh, Tiếng Pháp"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Thành tích & Giải thưởng (Mỗi dòng một mục)</Label>
                    <Textarea 
                        className="min-h-[100px]" 
                        value={formData.achievements} 
                        onChange={e => setFormData({...formData, achievements: e.target.value})} 
                    />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>Hủy</Button>
                <Button onClick={handleUpdate} className="bg-sky-600 hover:bg-sky-700">Lưu thay đổi</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}