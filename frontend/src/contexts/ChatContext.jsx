import React, { createContext, useState, useContext } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  // Trạng thái: chatBox có đang mở không? Đang chat với ai?
  const [chatState, setChatState] = useState({
    isOpen: false,
    receiverId: 'admin', // Mặc định là admin (hỗ trợ)
    receiverName: 'Hỗ trợ viên',
    receiverRole: 'admin'
  });

  // Hàm mở chat với Bác sĩ
  const openChatWithDoctor = (doctor) => {
    setChatState({
      isOpen: true,
      receiverId: doctor.doctorId,
      receiverName: `${doctor.doctorName}`,
      receiverRole: 'doctor'
    });
  };

  // Hàm mở chat hỗ trợ (Reset về admin)
  const openSupportChat = () => {
    setChatState({
      isOpen: true,
      receiverId: 'admin',
      receiverName: 'Hỗ trợ viên',
      receiverRole: 'admin'
    });
  };

  const closeChat = () => {
    setChatState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ChatContext.Provider value={{ chatState, openChatWithDoctor, openSupportChat, closeChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);