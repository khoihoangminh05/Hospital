import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Calendar, 
  FileText, 
  Activity, 
  Clock,
  Search,
  Plus,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Stethoscope,
  Pill,
  ClipboardList,
  TestTube2,
  UserPlus,
  Menu,
  X,
  LogOut,
  User,
  Bell,
  Settings,
  Hospital
} from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';


export function DoctorDashboard({ setCurrentPage }  ) {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  // Mock data
  const todayStats = {
    totalPatients: 12,
    appointments: 8,
    completed: 5,
    pending: 3
  };

  const todayAppointments = [
    { id: '1', time: '08:00', name: 'Nguyễn Văn A', reason: 'Khám tổng quát', status: 'completed' },
    { id: '2', time: '09:00', name: 'Trần Thị B', reason: 'Tái khám', status: 'completed' },
    { id: '3', time: '10:30', name: 'Lê Văn C', reason: 'Đau bụng', status: 'pending' },
    { id: '4', time: '14:00', name: 'Phạm Thị D', reason: 'Khám định kỳ', status: 'pending' },
    { id: '5', time: '15:30', name: 'Hoàng Văn E', reason: 'Sốt cao', status: 'pending' },
  ];

  const patients = [
    { id: '1', name: 'Nguyễn Văn A', age: 45, diagnosis: 'Cao huyết áp', room: 'P201', status: 'Đang điều trị' },
    { id: '2', name: 'Trần Thị B', age: 32, diagnosis: 'Viêm họng', room: 'P202', status: 'Ổn định' },
    { id: '3', name: 'Lê Văn C', age: 58, diagnosis: 'Đái tháo đường', room: 'P203', status: 'Cần theo dõi' },
    { id: '4', name: 'Phạm Thị D', age: 67, diagnosis: 'Tim mạch', room: 'P204', status: 'Đang điều trị' },
  ];

  const notifications = [
    { id: '1', type: 'test', message: 'Kết quả xét nghiệm máu - Nguyễn Văn A', time: '10 phút trước', unread: true },
    { id: '2', type: 'admission', message: 'Bệnh nhân mới nhập viện - Khoa Nội', time: '30 phút trước', unread: true },
    { id: '3', type: 'appointment', message: 'Lịch hẹn mới được đặt - 15:30', time: '1 giờ trước', unread: false },
  ];

  return (
    <div className="flex h-screen bg-[#F2F7FB]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gradient-to-b from-[#0C4A6E] to-[#1A73E8] text-white transition-all duration-300 flex flex-col`}>
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
            onClick={() => setActiveTab('patients')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'patients' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`}
          >
            <Users className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Bệnh nhân</span>}
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'appointments' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`}
          >
            <Calendar className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Lịch khám</span>}
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'prescriptions' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`}
          >
            <Pill className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Kê đơn thuốc</span>}
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === 'tests' ? 'bg-white/20 shadow-lg' : 'hover:bg-white/10'
            }`}
          >
            <TestTube2 className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Xét nghiệm</span>}
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
              <h1 className="text-[#0C4A6E] mb-1">Dashboard Bác sĩ</h1>
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
                  <AvatarFallback className="bg-[#1A73E8] text-white">
                    {user?.name?.charAt(0) || 'BS'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.specialty}</p>
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
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardDescription>Bệnh nhân hôm nay</CardDescription>
                    <CardTitle className="text-[#0C4A6E]">{todayStats.totalPatients}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>+2 so với hôm qua</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                  <CardHeader className="pb-3">
                    <CardDescription>Lịch hẹn</CardDescription>
                    <CardTitle className="text-[#0C4A6E]">{todayStats.appointments}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <Calendar className="w-4 h-4" />
                      <span>{todayStats.completed} đã hoàn thành</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                  <CardHeader className="pb-3">
                    <CardDescription>Chờ khám</CardDescription>
                    <CardTitle className="text-[#0C4A6E]">{todayStats.pending}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-yellow-600">
                      <Clock className="w-4 h-4" />
                      <span>Cần xử lý</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-3">
                    <CardDescription>Đang điều trị</CardDescription>
                    <CardTitle className="text-[#0C4A6E]">24</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Users className="w-4 h-4" />
                      <span>Bệnh nhân nội trú</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Schedule & Notifications */}
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-[#0C4A6E] flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Lịch khám hôm nay
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {todayAppointments.map((apt) => (
                        <div
                          key={apt.id}
                          className="flex items-center gap-4 p-4 bg-[#F2F7FB] rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div className="flex-shrink-0 w-16 text-center">
                            <p className="text-sm text-[#1A73E8]">{apt.time}</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-[#0C4A6E]">{apt.name}</p>
                            <p className="text-sm text-muted-foreground">{apt.reason}</p>
                          </div>
                          <Badge
                            variant={apt.status === 'completed' ? 'default' : 'secondary'}
                            className={apt.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                          >
                            {apt.status === 'completed' ? 'Hoàn thành' : 'Chờ khám'}
                          </Badge>
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
                            notif.unread ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
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

              {/* Active Patients */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#0C4A6E] flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Bệnh nhân đang điều trị
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Họ tên</TableHead>
                        <TableHead>Tuổi</TableHead>
                        <TableHead>Chẩn đoán</TableHead>
                        <TableHead>Phòng</TableHead>
                        <TableHead>Tình trạng</TableHead>
                        <TableHead>Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient) => (
                        <TableRow key={patient.id}>
                          <TableCell>{patient.name}</TableCell>
                          <TableCell>{patient.age}</TableCell>
                          <TableCell>{patient.diagnosis}</TableCell>
                          <TableCell>{patient.room}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{patient.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" className="text-[#1A73E8]">
                              Xem hồ sơ
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

          {activeTab === 'patients' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-[#0C4A6E]">Quản lý bệnh nhân</h2>
                <Button className="bg-[#1A73E8]">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Thêm bệnh nhân
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        placeholder="Tìm kiếm bệnh nhân..."
                        className="pl-10"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Chức năng đang phát triển
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-[#0C4A6E]">Quản lý lịch khám</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    Chức năng đang phát triển
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-[#0C4A6E]">Kê đơn thuốc</h2>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground text-center py-8">
                    Chức năng đang phát triển
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'tests' && (
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-[#0C4A6E]">Quản lý xét nghiệm</h2>
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
