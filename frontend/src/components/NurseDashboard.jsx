import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Users, 
  ClipboardList, 
  Activity, 
  Clock,
  Search,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Thermometer,
  Droplet,
  Wind,
  Menu,
  X,
  LogOut,
  Bell,
  Hospital,
  FileText,
  Pill,
  Syringe,
  Calendar
} from 'lucide-react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';


export function NurseDashboard({ setCurrentPage }) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  // Mock data
  const todayStats = {
    totalPatients: 18,
    pendingOrders: 5,
    completedTasks: 12,
    vitalSigns: 8
  };

  const medicalOrders = [
    { id: '1', patient: 'Nguyễn Văn A', order: 'Phát thuốc Paracetamol 500mg', time: '08:00', status: 'pending', priority: 'high' },
    { id: '2', patient: 'Trần Thị B', order: 'Truyền dịch NaCl 0.9%', time: '09:30', status: 'pending', priority: 'normal' },
    { id: '3', patient: 'Lê Văn C', order: 'Lấy mẫu xét nghiệm máu', time: '10:00', status: 'completed', priority: 'normal' },
    { id: '4', patient: 'Phạm Thị D', order: 'Đo sinh hiệu', time: '11:00', status: 'pending', priority: 'high' },
    { id: '5', patient: 'Hoàng Văn E', order: 'Thay băng vết thương', time: '14:00', status: 'pending', priority: 'normal' },
  ];

  const patients = [
    { 
      id: '1', 
      name: 'Nguyễn Văn A', 
      age: 45, 
      room: 'P201', 
      vitals: { temp: '37.2°C', bp: '120/80', hr: '72', rr: '18' },
      status: 'Ổn định'
    },
    { 
      id: '2', 
      name: 'Trần Thị B', 
      age: 32, 
      room: 'P202', 
      vitals: { temp: '38.5°C', bp: '130/85', hr: '88', rr: '20' },
      status: 'Cần theo dõi'
    },
    { 
      id: '3', 
      name: 'Lê Văn C', 
      age: 58, 
      room: 'P203', 
      vitals: { temp: '36.8°C', bp: '115/75', hr: '68', rr: '16' },
      status: 'Ổn định'
    },
  ];

  const notifications = [
    { id: '1', type: 'urgent', message: 'Y lệnh khẩn cấp - P201 Nguyễn Văn A', time: '5 phút trước', unread: true },
    { id: '2', type: 'reminder', message: 'Nhắc nhở: Đo sinh hiệu P202', time: '15 phút trước', unread: true },
    { id: '3', type: 'info', message: 'Bệnh nhân mới nhập viện - P204', time: '1 giờ trước', unread: false },
  ];

  return (
    <div className="flex h-screen bg-[#F2F7FB]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-pink-600 to-pink-500 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-white/20">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <Hospital className="w-8 h-8" />
              <div>
                <h2 className="text-sm">Bệnh viện Tự Nhiên</h2>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'overview' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`}
          >
            <Activity className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Tổng quan</span>}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'orders' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`}
          >
            <ClipboardList className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Y lệnh</span>}
          </button>

          <button
            onClick={() => setActiveTab('patients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'patients' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Bệnh nhân</span>}
          </button>

          <button
            onClick={() => setActiveTab('vitals')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'vitals' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`}
          >
            <Heart className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Sinh hiệu</span>}
          </button>

          <button
            onClick={() => setActiveTab('notes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'notes' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`}
          >
            <FileText className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Ghi chú điều dưỡng</span>}
          </button>
        </nav>

        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-all text-red-200 hover:text-white"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[#0C4A6E] mb-1">Dashboard Y tá</h1>
              <p className="text-sm text-muted-foreground">
                Chào mừng trở lại, {user?.name}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Avatar>
                  <AvatarFallback className="bg-pink-500 text-white">
                    {user?.name?.charAt(0) || 'YT'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.department}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-pink-500">
                  <CardHeader className="pb-3">
                    <CardDescription>Bệnh nhân phụ trách</CardDescription>
                    <CardTitle className="text-[#0C4A6E]">{todayStats.totalPatients}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-pink-600">
                      <Users className="w-4 h-4" />
                      <span>Khoa {user?.department}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="pb-3">
                    <CardDescription>Y lệnh chờ xử lý</CardDescription>
                    <CardTitle className="text-[#0C4A6E]">{todayStats.pendingOrders}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-yellow-600">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Cần thực hiện</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <CardDescription>Đã hoàn thành</CardDescription>
                    <CardTitle className="text-[#0C4A6E]">{todayStats.completedTasks}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Hôm nay</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardDescription>Sinh hiệu cần đo</CardDescription>
                    <CardTitle className="text-[#0C4A6E]">{todayStats.vitalSigns}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Heart className="w-4 h-4" />
                      <span>Theo lịch</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Medical Orders & Notifications */}
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-[#0C4A6E] flex items-center gap-2">
                      <ClipboardList className="w-5 h-5" />
                      Y lệnh hôm nay
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {medicalOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center gap-4 p-4 bg-[#F2F7FB] rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex-shrink-0 w-16 text-center">
                            <p className="text-sm text-pink-600">{order.time}</p>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-[#0C4A6E]">{order.patient}</p>
                              {order.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">Khẩn</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{order.order}</p>
                          </div>
                          {order.status === 'pending' ? (
                            <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                              Thực hiện
                            </Button>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Hoàn thành
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#0C4A6E] flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Thông báo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-lg border ${
                            notif.type === 'urgent'
                              ? 'bg-red-50 border-red-200'
                              : notif.unread
                              ? 'bg-pink-50 border-pink-200'
                              : 'bg-white border-gray-200'
                          }`}
                        >
                          <p className="text-sm text-[#0C4A6E] mb-1">{notif.message}</p>
                          <p className="text-xs text-muted-foreground">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Patient Vital Signs */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0C4A6E] flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Sinh hiệu bệnh nhân
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Phòng</TableHead>
                        <TableHead>Nhiệt độ</TableHead>
                        <TableHead>Huyết áp</TableHead>
                        <TableHead>Mạch</TableHead>
                        <TableHead>Nhịp thở</TableHead>
                        <TableHead>Tình trạng</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell>{patient.name}</TableCell>
                          <TableCell>{patient.room}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            <Thermometer className="w-4 h-4 text-red-500" />
                            {patient.vitals.temp}
                          </TableCell>
                          <TableCell>{patient.vitals.bp}</TableCell>
                          <TableCell>{patient.vitals.hr} bpm</TableCell>
                          <TableCell>{patient.vitals.rr}/phút</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={patient.status === 'Cần theo dõi' ? 'border-yellow-500 text-yellow-700' : ''}
                            >
                              {patient.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="text-pink-600">
                              Cập nhật
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-[#0C4A6E]">Quản lý Y lệnh</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    Chức năng đang phát triển
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-[#0C4A6E]">Danh sách bệnh nhân</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    Chức năng đang phát triển
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'vitals' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-[#0C4A6E]">Cập nhật sinh hiệu</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    Chức năng đang phát triển
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-[#0C4A6E]">Ghi chú điều dưỡng</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    Chức năng đang phát triển
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
