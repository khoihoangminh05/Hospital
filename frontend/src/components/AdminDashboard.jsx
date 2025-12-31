import React, { useState, useEffect } from 'react';

// Import UI Components (Giữ nguyên)
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from './ui/select';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from './ui/dialog';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowRight, Users, Calendar, Stethoscope, Newspaper, TrendingUp, 
  Plus, Edit, Trash2, Search, Download, Eye, UserCheck, Activity, 
  AlertCircle, Home, Building2, MapPin, Phone, Mail, CheckCircle2, BarChart3 
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import api from '@/config/axios';
import { AppointmentManager } from './dashboardAdmin/AppointmentManager';
import { DoctorManager } from './dashboardAdmin/DoctorManager';
import { UserManager } from './dashboardAdmin/UserManager';

export function AdminDashboard({ setCurrentPage }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [chartPeriod, setChartPeriod] = useState('week');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State quản lý Popup Xóa
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // --- STATE DỮ LIỆU TỪ API ---
  const [dashboardStats, setDashboardStats] = useState({
    counts: { users: 0, doctors: 0, appointments: 0, news: 0 },
    charts: { roleData: [] }
  });
  
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. GỌI API KHI LOAD TRANG ---
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Gọi lại khi chuyển Tab Users để làm mới danh sách
  useEffect(() => {
    if (activeTab === 'users') {
        fetchUsers();
    }
  }, [activeTab]);

  const fetchDashboardData = async () => {
    try {
        const res = await api.get('/api/admin/stats');
        setDashboardStats(res.data);
    } catch (error) {
        console.error("Lỗi tải stats:", error);
    }
  };

  const fetchUsers = async () => {
    try {
        const res = await api.get('/api/admin/users');
        setUsersList(res.data);
        setLoading(false);
    } catch (error) {
        console.error("Lỗi tải users:", error);
    }
  };

  // --- 2. XỬ LÝ XÓA USER ---
  const handleDeleteClick = (type, id) => {
    setDeleteTarget({ type, id });
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
        if (deleteTarget.type === 'user') {
            await api.delete(`/api/admin/users/${deleteTarget.id}`);
            // Xóa thành công thì reload list
            fetchUsers(); 
            // Cập nhật lại stats tổng
            fetchDashboardData();
        }
        // Tương tự cho doctors, news...
    } catch (error) {
        alert("Xóa thất bại: " + (error.response?.data?.message || "Lỗi server"));
    } finally {
        setShowDeleteDialog(false);
        setDeleteTarget(null);
    }
  };

  const handleNavigation = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- MOCK DATA CHO CHART (Giữ lại để UI đẹp nếu chưa có API thật cho Chart) ---
  const departmentData = [
    { name: 'Tim mạch', patients: 245 }, { name: 'Nội khoa', patients: 189 },
    { name: 'Ngoại khoa', patients: 167 }, { name: 'Nhi khoa', patients: 143 },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION */}
      <section className="relative min-h-[30vh] flex items-center overflow-hidden bg-gradient-to-br from-[#1A73E8] via-[#0C4A6E] to-[#1A73E8]">
         {/* ... (Giữ nguyên phần trang trí Background) ... */}
         <div className="container mx-auto px-4 py-8 relative z-10 text-white">
            <h1 className="text-4xl font-bold mb-2">DASHBOARD QUẢN TRỊ</h1>
            <p className="opacity-90">Xin chào Admin, chúc bạn một ngày làm việc hiệu quả.</p>
         </div>
      </section>

      {/* SUMMARY CARDS (Dữ liệu động từ API) */}
      <section className="py-8 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {/* Card Users */}
             <Card onClick={() => setActiveTab('users')} className="cursor-pointer hover:-translate-y-1 transition border-0 shadow-lg">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white"><Users /></div>
                      <Badge className="bg-green-100 text-green-700">+12%</Badge>
                   </div>
                   <p className="text-gray-500 text-sm">Tổng người dùng</p>
                   <h3 className="text-3xl font-bold text-[#0C4A6E]">{dashboardStats.counts.users}</h3>
                </CardContent>
             </Card>
             {/* Card Doctors */}
             <Card onClick={() => setActiveTab('doctors')} className="cursor-pointer hover:-translate-y-1 transition border-0 shadow-lg">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white"><Stethoscope /></div>
                   </div>
                   <p className="text-gray-500 text-sm">Tổng bác sĩ</p>
                   <h3 className="text-3xl font-bold text-[#0C4A6E]">{dashboardStats.counts.doctors}</h3>
                </CardContent>
             </Card>
             {/* Card Appointments */}
             <Card onClick={() => setActiveTab('appointments')} className="cursor-pointer hover:-translate-y-1 transition border-0 shadow-lg">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white"><Calendar /></div>
                   </div>
                   <p className="text-gray-500 text-sm">Lịch khám</p>
                   <h3 className="text-3xl font-bold text-[#0C4A6E]">{dashboardStats.counts.appointments}</h3>
                </CardContent>
             </Card>
             {/* Card News */}
             <Card onClick={() => setActiveTab('news')} className="cursor-pointer hover:-translate-y-1 transition border-0 shadow-lg">
                <CardContent className="p-6">
                   <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white"><Newspaper /></div>
                   </div>
                   <p className="text-gray-500 text-sm">Tin tức</p>
                   <h3 className="text-3xl font-bold text-[#0C4A6E]">{dashboardStats.counts.news}</h3>
                </CardContent>
             </Card>
          </div>
        </div>
      </section>

      {/* MAIN TABS */}
      <section className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
           <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white p-1 mb-6 border w-full justify-start overflow-x-auto">
                 <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                 <TabsTrigger value="users">Người dùng</TabsTrigger>
                 <TabsTrigger value="doctors">Bác sĩ</TabsTrigger>
                 <TabsTrigger value="appointments">Lịch khám</TabsTrigger>
                 <TabsTrigger value="news">Tin tức</TabsTrigger>
              </TabsList>

              {/* TAB OVERVIEW */}
              <TabsContent value="overview" className="space-y-6">
                 <div className="grid lg:grid-cols-2 gap-6">
                    {/* Biểu đồ Vai trò (Dữ liệu thật) */}
                    <Card>
                       <CardHeader><CardTitle>Phân bố người dùng</CardTitle></CardHeader>
                       <CardContent className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                             <PieChart>
                                <Pie 
                                   data={dashboardStats.charts.roleData.length > 0 ? dashboardStats.charts.roleData : [{name:'No Data', value:1}]} 
                                   dataKey="value" cx="50%" cy="50%" outerRadius={100} label
                                >
                                   {dashboardStats.charts.roleData.map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.color} />
                                   ))}
                                </Pie>
                                <Tooltip />
                             </PieChart>
                          </ResponsiveContainer>
                       </CardContent>
                    </Card>
                    
                    {/* Biểu đồ Khoa (Mockup) */}
                    <Card>
                       <CardHeader><CardTitle>Thống kê theo khoa</CardTitle></CardHeader>
                       <CardContent className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                             <BarChart data={departmentData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="patients" fill="#1A73E8" />
                             </BarChart>
                          </ResponsiveContainer>
                       </CardContent>
                    </Card>
                 </div>
              </TabsContent>

              {/* TAB USERS */}

              {/* Các Tabs khác (Doctors, News...) làm tương tự cấu trúc User Tab */}
              <TabsContent value="users"><div className="p-10 text-center text-gray-500"><UserManager/> </div></TabsContent>
              <TabsContent value="doctors"><div className="p-10 text-center text-gray-500"><DoctorManager/> </div></TabsContent>
              <TabsContent value="appointments"><div className="p-10 text-center text-gray-500"><AppointmentManager/> </div></TabsContent>
              <TabsContent value="news"><div className="p-10 text-center text-gray-500">Chức năng quản lý tin tức đang phát triển...</div></TabsContent>
           </Tabs>
        </div>
      </section>
      {/* DIALOG XÓA */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
         <DialogContent>
            <DialogHeader>
               <DialogTitle className="text-red-600 flex items-center gap-2">
                  <AlertCircle /> Xác nhận xóa
               </DialogTitle>
               <DialogDescription>
                  Hành động này không thể hoàn tác. Bạn chắc chắn muốn xóa dữ liệu này?
               </DialogDescription>
            </DialogHeader>
            <DialogFooter>
               <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Hủy</Button>
               <Button variant="destructive" onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">Xóa vĩnh viễn</Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
    </div>
  );
}