import React, { useState, useEffect } from 'react';

// Import UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner'; // Hoặc thư viện toast bạn đang dùng
import api from '@/config/axios';

export function AppointmentManager() {
  // State dữ liệu
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State UI
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  
  // State Form
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    department: '',
    date: '',
    time: '',
    status: 'Chờ xác nhận'
  });

  const departments = [
    'Khoa Tim Mạch', 'Khoa Thần Kinh', 'Khoa Nhi', 'Khoa Mắt',
    'Khoa Tai Mũi Họng', 'Khoa Ngoại', 'Khoa Nội', 'Khoa Nội tổng quát' // Đồng bộ với DB seed
  ];

  // --- 1. Fetch dữ liệu khi load ---
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/appointments/admin/all');
      setAppointments(res.data);
    } catch (error) {
      console.error("Lỗi tải lịch hẹn:", error);
      toast.error("Không thể tải danh sách lịch hẹn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // --- 2. Xử lý Form ---
  const handleAdd = () => {
    setEditingAppointment(null);
    setFormData({
      patientName: '', phone: '', email: '', department: '',
      date: '', time: '', status: 'Chờ xác nhận'
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      patientName: appointment.patientName,
      phone: appointment.phone,
      email: appointment.email,
      department: appointment.department || '',
      date: appointment.date,
      time: appointment.time,
      status: appointment.status
    });
    setIsDialogOpen(true);
  };

  // --- 3. Xử lý Submit (Thêm/Sửa) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingAppointment) {
        // --- Cập nhật (PUT) ---
        await api.put(`/api/appointments/${editingAppointment.id}`, formData);
        toast.success('Đã cập nhật lịch hẹn');
      } else {
        // --- Thêm mới (POST) ---
        // Lưu ý: Logic thêm mới của Admin có thể cần tạo User patient trước nếu chưa có
        // Ở đây giả sử gọi API book appointment, nhưng admin book hộ
        // Backend cần xử lý nếu patient_id không có thì tạo user vãng lai hoặc báo lỗi
        // Để đơn giản, ta demo update trước. Nếu muốn Create chuẩn, cần API riêng.
        toast.info("Chức năng thêm lịch hẹn từ Admin đang phát triển (Cần chọn User ID)");
        // Demo local update để UI mượt
      }
      
      // Reload lại dữ liệu
      fetchAppointments();
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  // --- 4. Xử lý Xóa (DELETE) ---
  const handleDelete = async (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa lịch hẹn này?')) {
      try {
        await api.delete(`/api/appointments/${id}`);
        toast.success('Đã xóa lịch hẹn');
        fetchAppointments(); // Reload list
      } catch (error) {
        toast.error("Xóa thất bại");
      }
    }
  };

  // Filter local
  const filteredAppointments = appointments.filter(apt =>
    (apt.patientName && apt.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (apt.department && apt.department.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quản lý lịch hẹn</CardTitle>
            <CardDescription>Xem và quản lý tất cả lịch hẹn khám bệnh</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleAdd} className="bg-[#007BFF] hover:bg-[#0056b3]">
                <Plus className="w-4 h-4 mr-2" />
                Thêm
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingAppointment ? 'Sửa lịch hẹn' : 'Thêm lịch hẹn mới'}
                </DialogTitle>
                <DialogDescription>
                  Điền thông tin chi tiết về lịch hẹn
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  {/* Các trường Input giữ nguyên logic, chỉ cần bỏ Type TypeScript */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Họ và tên</Label>
                      <Input
                        id="patientName"
                        value={formData.patientName}
                        onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                        required
                        // Nếu đang sửa, có thể disable tên vì tên gắn với User ID
                        disabled={!!editingAppointment} 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Số điện thoại</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Khoa phòng</Label>
                    <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn khoa phòng" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Ngày</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Giờ</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Trạng thái</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Chờ xác nhận</SelectItem>
                        <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                        <SelectItem value="completed">Hoàn thành</SelectItem>
                        <SelectItem value="cancelled">Đã hủy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-[#007BFF] hover:bg-[#0056b3]">
                    {editingAppointment ? 'Cập nhật' : 'Thêm'}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm theo tên hoặc khoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow >
                <TableHead className="text-center">Họ và tên</TableHead>
                <TableHead className="text-center">Số điện thoại</TableHead>
                <TableHead className="text-center">Khoa phòng</TableHead>
                <TableHead className="text-center">Ngày</TableHead>
                <TableHead className="text-center">Giờ</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                 <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                        <div className="flex justify-center items-center gap-2">
                            <Loader2 className="animate-spin" /> Đang tải dữ liệu...
                        </div>
                    </TableCell>
                 </TableRow>
              ) : filteredAppointments.length === 0 ? (
                 <TableRow>
                    <TableCell colSpan={7} className="text-center pl-8 text-gray-500">
                        Không tìm thấy lịch hẹn nào.
                    </TableCell>
                 </TableRow>
              ) : (
                filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                    <TableCell>{appointment.patientName}</TableCell>
                    <TableCell>{appointment.phone}</TableCell>
                    <TableCell>{appointment.department}</TableCell>
                    <TableCell>
                        {appointment.date ? new Date(appointment.date).toLocaleDateString('vi-VN') : ''}
                    </TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                        <Badge 
                        variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}
                        className={
                            appointment.status === 'confirmed' ? 'bg-green-600' : 
                            appointment.status === 'pending' ? 'bg-yellow-500' :
                            appointment.status === 'cancelled' ? 'bg-red-500' : ''
                        }
                        >
                        {appointment.status === 'pending' ? 'Chờ xác nhận' : 
                         appointment.status === 'confirmed' ? 'Đã xác nhận' :
                         appointment.status === 'cancelled' ? 'Đã hủy' : appointment.status}
                        </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                        <div className="flex justify-end gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(appointment)}
                        >
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(appointment.id)}
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