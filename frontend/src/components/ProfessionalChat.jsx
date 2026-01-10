import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, User, Loader2, Headset } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card } from './ui/card';
import api from '@/config/axios';

// Hàm format giờ
const formatTime = (dateString) => {
  if (!dateString) return '';
  let safeDateString = dateString.endsWith('Z') ? dateString : dateString + 'Z';
  return new Intl.DateTimeFormat('vi-VN', { 
    hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Ho_Chi_Minh' 
  }).format(new Date(safeDateString));
};

export function ProfessionalChat() {
  const [activeChat, setActiveChat] = useState(null); 
  const [chats, setChats] = useState({}); 
  const [userList, setUserList] = useState([]); 
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null); 
  
  const socketRef = useRef(null);
  
  // --- THAY ĐỔI 1: Dùng ref cho container thay vì element cuối cùng ---
  const chatContainerRef = useRef(null); 
  
  const token = localStorage.getItem('accessToken'); 

  // --- 1. KHỞI TẠO ---
  useEffect(() => {
    if (!token) return;

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setCurrentUser(storedUser);

    const fetchConversations = async () => {
      try {
        const res = await api.get('/api/chat/conversations');
        setUserList(res.data);
      } catch (err) {
        console.error("Lỗi tải danh sách chat:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConversations();

    socketRef.current = io('http://localhost:5000', {
      query: { token: token },
      transports: ['websocket']
    });

    socketRef.current.on('receive_message', (msg) => {
      const myId = storedUser._id || storedUser.id;
      const myRole = storedUser.role;
      
      let conversationId;
      if (msg.sender_id === myId || (myRole === 'admin' && msg.sender_role === 'admin')) {
          conversationId = msg.receiver_id;
      } else {
          conversationId = msg.sender_id;
      }

      setChats((prev) => ({
        ...prev,
        [conversationId]: [...(prev[conversationId] || []), msg]
      }));
    });

    return () => socketRef.current.disconnect();
  }, []);

  // --- 2. KHI CHỌN USER: Lấy lịch sử chat ---
  useEffect(() => {
    if (!activeChat) return;

    if (!chats[activeChat]) {
      const fetchHistory = async () => {
        try {
          const res = await api.get('/api/chat/history', {
              params: { receiver_id: activeChat }
          });
          setChats(prev => ({ ...prev, [activeChat]: res.data }));
        } catch (error) {
          console.error("Lỗi tải lịch sử:", error);
        }
      };
      fetchHistory();
    }
  }, [activeChat]);

  // --- THAY ĐỔI 2: Logic cuộn xuống đáy ---
  // Dùng scrollTo thao tác trực tiếp lên thanh cuộn của container
  // Giúp trang web KHÔNG bị nhảy lung tung
  useEffect(() => {
    if (chatContainerRef.current) {
      const { scrollHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chats, activeChat]);

  const handleSend = () => {
    if (!input.trim() || !activeChat) return;

    socketRef.current.emit('send_message', {
      content: input,
      receiver_id: activeChat
    });
    setInput('');
  };

  const isDoctor = currentUser?.role === 'doctor';
  const themeColor = isDoctor ? 'bg-teal-600' : 'bg-blue-600';
  const bubbleColor = isDoctor ? 'bg-teal-500' : 'bg-blue-500';
  const borderColor = isDoctor ? 'border-teal-500' : 'border-blue-500';

  return (
    <div className="grid grid-cols-4 h-[600px] gap-0 bg-white rounded-lg border shadow-sm overflow-hidden">
      
      {/* SIDEBAR */}
      <div className="col-span-1 border-r flex flex-col h-full">
        <div className={`p-4 border-b font-bold flex justify-between items-center text-white ${themeColor}`}>
          <div className="flex items-center gap-2">
             {isDoctor ? <User className="w-5 h-5"/> : <Headset className="w-5 h-5"/>}
             <span>{isDoctor ? 'Bệnh nhân' : 'Hỗ trợ'}</span>
          </div>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
            {userList.length}
          </span>
        </div>
        
        <div className="flex-1 overflow-y-auto">
            {loading ? (
            <div className="p-4 flex justify-center"><Loader2 className="animate-spin text-gray-400" /></div>
            ) : userList.length === 0 ? (
            <div className="p-4 text-gray-500 text-sm text-center italic">Chưa có tin nhắn nào</div>
            ) : (
            userList.map((user) => (
                <div 
                key={user.id}
                onClick={() => setActiveChat(user.id)}
                className={`p-4 cursor-pointer flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-50
                    ${activeChat === user.id ? `bg-gray-50 border-l-4 ${borderColor}` : ''}`}
                >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${isDoctor ? 'bg-teal-400' : 'bg-blue-400'}`}>
                    {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                    <div className="truncate font-medium text-gray-900">{user.name}</div>
                    <div className="truncate text-xs text-gray-500">ID: {user.id.slice(-4)}</div>
                </div>
                </div>
            ))
            )}
        </div>
      </div>

      {/* CHAT AREA */}
      <div className="col-span-3 flex flex-col h-full bg-slate-50">
        {!activeChat ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <User className="w-10 h-10 text-gray-300" />
            </div>
            <p>Chọn một người để bắt đầu trò chuyện</p>
          </div>
        ) : (
          <>
            {/* Header Chat */}
            <div className="p-4 bg-white border-b flex items-center gap-3 shadow-sm z-10 shrink-0">
               <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-bold ${isDoctor ? 'bg-teal-500' : 'bg-blue-500'}`}>
                  {userList.find(u => u.id === activeChat)?.name.charAt(0)}
               </div>
               <div>
                  <div className="font-bold text-gray-800">
                    {userList.find(u => u.id === activeChat)?.name || 'Người dùng'}
                  </div>
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                  </span>
               </div>
            </div>

            {/* Messages List */}
            <div 
                // --- THAY ĐỔI 3: Gắn ref vào container này ---
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0"
            >
              {(chats[activeChat] || []).map((msg, idx) => {
                const isMe = (currentUser.role === 'admin' && msg.sender_role === 'admin') || 
                             (msg.sender_id === currentUser._id || msg.sender_id === currentUser.id);

                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[70%]`}>
                        
                        <div className={`px-4 py-2 rounded-2xl text-sm shadow-sm break-words ${
                          isMe 
                            ? `${bubbleColor} text-white rounded-tr-none` 
                            : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                        }`}>
                          {msg.content}
                        </div>

                        <span className="text-[10px] text-gray-400 mt-1 px-1">
                           {formatTime(msg.timestamp)}
                        </span>

                    </div>
                  </div>
                );
              })}
              {/* --- Đã xóa div ref={messagesEndRef} --- */}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t shrink-0">
              <div className="flex gap-2">
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 bg-gray-50 border-gray-200 focus:bg-white"
                />
                <Button onClick={handleSend} className={`${themeColor} shadow-md`}>
                    <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}