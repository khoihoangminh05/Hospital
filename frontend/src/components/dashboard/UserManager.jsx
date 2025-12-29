import React, { useState, useEffect } from 'react';

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Plus, Pencil, Trash2, Search, Loader2, Lock } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/config/axios';

export function UserManager() {
  // --- STATE ---
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dialog & Form State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user', // user, admin, doctor...
    status: 'active',
    password: ''
  });

  // --- API CALLS ---
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/api/admin/users/');
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi tải users:", error);
      toast.error("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- HANDLERS ---
  const handleAdd = () => {
    setEditingUser(null);
    setFormData({
      name: '', email: '', phone: '', 
      role: 'user', status: 'active', password: ''
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      password: '' // Reset password field
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingUser) {
        // --- UPDATE ---
        await api.put(`/api/admin/users/${editingUser.id}`, formData);
        toast.success('Đã cập nhật thông tin người dùng');
      } else {
        // --- CREATE ---
        // Validate password
        if (!formData.password) {
            toast.error("Vui lòng nhập mật khẩu");
            return;
        }
        await api.post('/api/admin/users/', formData);
        toast.success('Đã thêm người dùng mới');
      }
      
      setIsDialogOpen(false);
      fetchUsers(); // Refresh
    } catch (error) {
      const msg = error.response?.data?.message || "Có lỗi xảy ra";
      toast.error(msg);
    }
  };

  const handleDelete = async (user) => {
    // Basic protection logic
    if (user.role === 'admin' && user.email === 'admin@gmail.com') { // Ví dụ check cứng
       toast.error('Không thể xóa tài khoản Super Admin');
       return;
    }

    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      try {
        await api.delete(`/api/admin/users/${user.id}`);
        toast.success('Đã xóa người dùng');
        fetchUsers();
      } catch (error) {
        toast.error("Xóa thất bại");
      }
    }
  };

  // --- FILTER ---
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Quản lý người dùng</CardTitle>
            <CardDescription>Quản lý tài khoản người dùng hệ thống</CardDescription>
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
                  {editingUser ? 'Sửa thông tin người dùng' : 'Thêm người dùng mới'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  
                  {/* Tên & Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Họ và tên</Label>
                        <Input
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            placeholder="Nguyễn Văn A" required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder="email@example.com" required
                            disabled={!!editingUser} // Không sửa email
                        />
                    </div>
                  </div>

                  {/* Phone & Password */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Số điện thoại</Label>
                        <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="09xxx"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Mật khẩu {editingUser ? '(Để trống nếu không đổi)' : '*'}</Label>
                        <div className="relative">
                            <Lock className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="password"
                                className="pl-8"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                placeholder={editingUser ? "******" : "Nhập mật khẩu..."}
                                required={!editingUser}
                            />
                        </div>
                    </div>
                  </div>

                  {/* Role & Status */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Vai trò</Label>
                      <Select 
                        value={formData.role} 
                        onValueChange={(val) => setFormData({...formData, role: val})}
                        disabled={editingUser?.email === 'admin@gmail.com'} // Ví dụ chặn sửa quyền admin gốc
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="user">Người dùng (Bệnh nhân)</SelectItem>
                          <SelectItem value="admin">Quản trị viên</SelectItem>
                          <SelectItem value="doctor">Bác sĩ</SelectItem>
                          <SelectItem value="nurse">Y tá</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Trạng thái</Label>
                      <Select 
                        value={formData.status} 
                        onValueChange={(val) => setFormData({...formData, status: val})}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Hoạt động</SelectItem>
                          <SelectItem value="inactive">Tạm khóa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-[#007BFF] hover:bg-[#0056b3]">
                    {editingUser ? 'Cập nhật' : 'Thêm'}
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
              placeholder="Tìm kiếm theo tên hoặc email..."
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
              <TableRow>
                <TableHead className="text-center">Họ và tên</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Số điện thoại</TableHead>
                <TableHead className="text-center">Vai trò</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-center">Ngày tạo</TableHead>
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
                ) : filteredUsers.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            Không tìm thấy người dùng.
                        </TableCell>
                    </TableRow>
                ) : (
                    filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                            {user.role === 'admin' ? 'Quản trị viên' : 
                             user.role === 'doctor' ? 'Bác sĩ' : 'Người dùng'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge 
                            variant="outline"
                            className={user.status === 'active' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-gray-100 text-gray-700'}
                            >
                            {user.status === 'active' ? 'Hoạt động' : 'Tạm khóa'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : ''}
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(user)}
                            >
                                <Pencil className="w-4 h-4 text-blue-600" />
                            </Button>
                            
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(user)}
                                // Disable nút xóa nếu là admin gốc (tuỳ chọn)
                                disabled={user.email === 'admin@gmail.com'}
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