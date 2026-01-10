import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { MessageCircle, X, Send, Headset, User } from 'lucide-react'; // Thêm icon
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import api from '@/config/axios';
import { useChat } from '@/contexts/ChatContext';

// Hàm format giờ (Đã thêm múi giờ VN và 'Z' để fix lỗi sai giờ)
const formatTime = (dateString) => {
  if (!dateString) return '';
  let safeDateString = dateString;
  if (!dateString.endsWith('Z')) {
      safeDateString += 'Z';
  }
  const date = new Date(safeDateString);
  return new Intl.DateTimeFormat('vi-VN', { 
    hour: '2-digit', 
    minute: '2-digit',  
    timeZone: 'Asia/Ho_Chi_Minh'
  }).format(date);
};

export function ChatWidget() {
  // Lấy state và hàm từ Context toàn cục
  const { chatState, closeChat, openSupportChat } = useChat(); 
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem('accessToken'); 

  // --- 1. EFFECT: Load tin nhắn & Kết nối Socket ---
  useEffect(() => {
    // Chỉ chạy khi chat mở và có token
    if (chatState.isOpen && token) {
      
      // A. Gọi API lấy lịch sử chat
      const fetchHistory = async () => {
        try {
            const res = await api.get('/api/chat/history', {
                params: { 
                    receiver_id: chatState.receiverId 
                }
            });
            
            // Client filter: Chỉ lấy tin nhắn thuộc cuộc hội thoại hiện tại
            const filtered = res.data.filter(m => 
                (m.sender_id === chatState.receiverId) || // Họ gửi mình
                (m.receiver_id === chatState.receiverId) || // Mình gửi họ
                // Trường hợp đặc biệt: Chat với Admin (receiverId='admin' hoặc role='admin')
                (chatState.receiverId === 'admin' && (m.receiver_id === 'admin' || m.sender_role === 'admin')) 
            );
            setMessages(filtered);
        } catch (e) { console.error("Lỗi tải tin nhắn:", e); }
      };
      fetchHistory();

      // B. Kết nối Socket (Nếu chưa có)
      if (!socketRef.current) {
        socketRef.current = io('http://localhost:5000', { query: { token } });
        
        socketRef.current.on('receive_message', (msg) => {
            // Logic Realtime: Chỉ hiện tin nhắn nếu nó thuộc về người đang chat cùng
            const isRelevant = 
                msg.sender_id === chatState.receiverId || 
                msg.receiver_id === chatState.receiverId || 
                (chatState.receiverId === 'admin' && msg.sender_role === 'admin');

            if (isRelevant) {
                setMessages(prev => [...prev, msg]);
            }
        });
      }
    }

    // Cleanup: Ngắt kết nối khi component unmount (Optional, thường giữ kết nối để nhận noti)
    // return () => { if(socketRef.current) socketRef.current.disconnect(); }
  }, [chatState.isOpen, chatState.receiverId]);

  // --- 2. EFFECT: Auto Scroll ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 3. HANDLE SEND ---
  const handleSend = () => {
    if (!input.trim()) return;
    
    // Gửi tin nhắn kèm receiver_id lấy từ Context
    if (socketRef.current) {
        socketRef.current.emit('send_message', { 
            content: input,
            receiver_id: chatState.receiverId 
        });
    }
    
    setInput('');
  };

  // --- 4. RENDER: Nút Mở Chat (Khi đang đóng) ---
  if (!chatState.isOpen) {
    return (
        <Button 
            onClick={openSupportChat} // Mặc định mở chat hỗ trợ
            className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-xl z-50 transition-transform hover:scale-110"
        >
            <MessageCircle className="w-8 h-8 text-white" />
        </Button>
    );
  }

  // --- 5. RENDER: Khung Chat (Khi đang mở) ---
  const isDoctorChat = chatState.receiverRole === 'doctor';

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 h-[500px] flex flex-col shadow-2xl border-0 animate-in slide-in-from-bottom-5 overflow-hidden">
        
        {/* Header Dynamic: Đổi màu & Icon tùy theo đang chat với ai */}
        <div className={`p-4 text-white flex justify-between items-center ${isDoctorChat ? 'bg-teal-600' : 'bg-blue-600'}`}>
          <div className="flex items-center gap-2">
            {isDoctorChat ? <User className="w-5 h-5"/> : <Headset className="w-5 h-5"/>}
            <div>
                <span className="font-bold block text-sm">{chatState.receiverName}</span>
                <span className="text-[10px] opacity-90 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Trực tuyến
                </span>
            </div>
          </div>
          <button onClick={closeChat} className="hover:bg-white/20 p-1 rounded transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List tin nhắn */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.length === 0 && (
                <div className="text-center text-gray-400 text-xs mt-10">
                    Bắt đầu cuộc trò chuyện với {chatState.receiverName}...
                </div>
            )}
            
            {messages.map((msg, index) => {
                // Xác định tin nhắn của mình hay của họ
                // Logic: Nếu người gửi KHÔNG PHẢI là người mình đang chat -> Thì là Mình gửi
                const isIncoming = (msg.sender_id === chatState.receiverId) || 
                                   (chatState.receiverId === 'admin' && msg.sender_role === 'admin');
                const isMe = !isIncoming;

                return (
                <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex flex-col max-w-[85%] ${isMe ? 'items-end' : 'items-start'}`}>
                    
                    {/* Bong bóng chat */}
                    <div className={`px-3 py-2 rounded-xl text-sm break-words shadow-sm ${
                        isMe 
                        ? (isDoctorChat ? 'bg-teal-500 text-white rounded-tr-none' : 'bg-blue-500 text-white rounded-tr-none')
                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                    }`}>
                        {msg.content}
                    </div>

                    {/* Thời gian */}
                    <span className="text-[10px] text-gray-400 mt-1 px-1 select-none">
                        {formatTime(msg.timestamp)}
                    </span>
                    
                    </div>
                </div>
                );
            })}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-white flex gap-2">
            <Input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Nhập tin nhắn..."
              className="flex-1 focus-visible:ring-1"
            />
            <Button 
                size="icon" 
                onClick={handleSend} 
                className={isDoctorChat ? 'bg-teal-600 hover:bg-teal-700' : 'bg-blue-600 hover:bg-blue-700'}
            >
              <Send className="w-4 h-4" />
            </Button>
        </div>
      </Card>
    </div>
  );
}