import React, { useState, useEffect } from 'react';

// UI Imports
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/config/axios';

export function DoctorManager() {
  // --- STATE ---
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]); // State lưu danh sách khoa
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '', 
    email: '', 
    phone: '', 
    password: '',
    departmentId: '', // Dùng ID khoa để đồng bộ
    experience: '', 
    education: ''
  });

  // --- API CALLS ---
  
  // 1. Lấy danh sách bác sĩ
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/admin/doctors/');
      setDoctors(res.data);
    } catch (error) {
      console.error("Lỗi tải bác sĩ:", error);
      toast.error("Không thể tải danh sách bác sĩ");
    } finally {
      setLoading(false);
    }
  };

  // 2. Lấy danh sách khoa (để đổ vào dropdown)
  const fetchDepartments = async () => {
    try {
        const res = await api.get('/api/meta/departments');
        setDepartments(res.data);
    } catch (error) {
        console.error("Lỗi tải khoa:", error);
        toast.error("Không thể tải danh sách khoa");
    }
  };

  // Gọi API khi component load
  useEffect(() => {
    fetchDoctors();
    fetchDepartments();
  }, []);

  // --- HANDLERS ---
  
  const handleAdd = () => {
    setEditingDoctor(null);
    setFormData({
      name: '', email: '', phone: '', password: '', 
      departmentId: '', // Reset về rỗng
      experience: '', education: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      password: '', // Không hiện password cũ
      departmentId: doctor.departmentId || '', // Map ID khoa vào form
      experience: doctor.experience || '',
      education: doctor.education || ''
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate cơ bản
    if (!formData.departmentId) {
        toast.error("Vui lòng chọn chuyên khoa (Phòng ban)");
        return;
    }

    try {
      if (editingDoctor) {
        // --- API UPDATE ---
        await api.put(`/api/admin/doctors/${editingDoctor.id}`, formData);
        toast.success('Đã cập nhật thông tin bác sĩ');
      } else {
        // --- API CREATE ---
        if (!formData.password) {
            toast.error("Vui lòng nhập mật khẩu cho tài khoản mới");
            return;
        }
        await api.post('/api/admin/doctors/', formData);
        toast.success('Đã thêm bác sĩ mới');
      }
      
      setIsDialogOpen(false);
      fetchDoctors(); // Refresh list sau khi lưu
    } catch (error) {
      const msg = error.response?.data?.message || "Có lỗi xảy ra";
      toast.error(msg);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa bác sĩ này? Hành động này cũng xóa tài khoản đăng nhập của họ.')) {
      try {
        await api.delete(`/api/admin/doctors/${id}`);
        toast.success('Đã xóa bác sĩ');
        fetchDoctors();
      } catch (error) {
        toast.error("Xóa thất bại");
      }
    }
  };

  // --- FILTER ---
  const filteredDoctors = doctors.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.specialty && doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quản lý bác sĩ</CardTitle>
            <CardDescription>Quản lý thông tin đội ngũ bác sĩ và phân khoa</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-[#007BFF] hover:bg-[#0056b3]">
                <Plus className="w-4 h-4 mr-2" />
                Thêm bác sĩ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingDoctor ? 'Sửa thông tin bác sĩ' : 'Thêm bác sĩ mới'}
                </DialogTitle>
                <DialogDescription>
                    {editingDoctor ? 'Cập nhật hồ sơ và chuyên môn' : 'Tạo tài khoản và hồ sơ cho bác sĩ mới'}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  {/* Hàng 1: Tên & Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Họ và tên <span className="text-red-500">*</span></Label>
                        <Input 
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="BS. Nguyễn Văn A" required 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Email (Tên đăng nhập) <span className="text-red-500">*</span></Label>
                        <Input 
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="bacsi@example.com" required 
                            disabled={!!editingDoctor} // Không cho sửa email khi edit
                        />
                    </div>
                  </div>

                  {/* Hàng 2: SĐT & Password */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Số điện thoại</Label>
                        <Input 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="09xxx" 
                        />
                    </div>
                    {!editingDoctor && (
                        <div className="space-y-2">
                            <Label>Mật khẩu khởi tạo <span className="text-red-500">*</span></Label>
                            <Input 
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                placeholder="******" 
                            />
                        </div>
                    )}
                  </div>

                  {/* Hàng 3: Chuyên khoa & Kinh nghiệm */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Chuyên khoa (Phòng ban) <span className="text-red-500">*</span></Label>
                      {/* Dropdown lấy từ API departments */}
                      <Select 
                        value={formData.departmentId} 
                        onValueChange={(val) => setFormData({...formData, departmentId: val})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn chuyên khoa" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept._id} value={dept._id}>
                                {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Kinh nghiệm</Label>
                      <Input 
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        placeholder="VD: 10 năm" 
                      />
                    </div>
                  </div>
                  
                  {/* Hàng 4: Học vấn */}
                  <div className="space-y-2">
                    <Label>Học vấn / Bằng cấp</Label>
                    <Input 
                      value={formData.education}
                      onChange={(e) => setFormData({...formData, education: e.target.value})}
                      placeholder="VD: Tiến sĩ Y khoa" 
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="submit" className="bg-[#007BFF] hover:bg-[#0056b3]">
                    {editingDoctor ? 'Cập nhật' : 'Tạo mới'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên hoặc chuyên khoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table Data */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Họ và tên</TableHead>
                <TableHead className="text-center">Chuyên khoa</TableHead>
                <TableHead className="text-center">Kinh nghiệm</TableHead>
                <TableHead className="text-center">Học vấn</TableHead>
                <TableHead className="text-center">Số điện thoại</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
                {loading ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex justify-center items-center gap-2">
                                <Loader2 className="animate-spin" /> Đang tải dữ liệu...
                            </div>
                        </TableCell>
                    </TableRow>
                ) : filteredDoctors.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            Chưa có dữ liệu bác sĩ.
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredDoctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                        <TableCell className="font-medium">{doctor.name}</TableCell>
                        <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {doctor.specialty || "Chưa phân công"}
                            </Badge>
                        </TableCell>
                        <TableCell>{doctor.experience}</TableCell>
                        <TableCell>{doctor.education}</TableCell>
                        <TableCell>{doctor.phone}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(doctor)}
                            >
                                <Pencil className="w-4 h-4 text-blue-600" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(doctor.id)}
                            >
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                            </div>
                        </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}