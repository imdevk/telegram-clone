import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "./hooks/useTheme";
import './styles/styles.css';
import Sidebar from "./components/Sidebar";
import ChatList from "./components/ChatList";
import ChatWindow from "./components/ChatWindow";
import useDragSidebar from "./hooks/useDragSidebar";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  useDragSidebar(openSidebar, closeSidebar, isSidebarOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    fetchChats();
  }, []);

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    if (isMobile) {
      fetchMessages(chat.id);
    }
  };

  const handleBackToList = () => {
    setSelectedChat(null);
  };

  useEffect(() => {
    if (selectedChat) {
      fetchMessages(selectedChat.id);
    }
  }, [selectedChat]);

  const fetchChats = async () => {
    try {
      const response = await fetch('https://devapi.beyondchats.com/api/get_all_chats?page=1');
      const data = await response.json();
      const chats = data.data.data;

      const updatedChats = await Promise.all(chats.map(async (chat) => {
        const lastMessage = await fetchLastMessage(chat.id);
        return { ...chat, last_message: lastMessage };
      }));
      setChats(updatedChats);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
      const data = await response.json();
      setMessages(data.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchLastMessage = async (chatId) => {
    try {
      const response = await fetch(`https://devapi.beyondchats.com/api/get_chat_messages?chat_id=${chatId}`);
      const data = await response.json();
      const messages = data.data;
      if (messages.length > 0) {
        return messages[messages.length - 1].message;
      }
      return '';
    } catch (error) {
      console.error('Error fetching last message:', error);
      return '';
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app ${theme}`}>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} toggleTheme={toggleTheme} />
      <div className="main-content">
        {(!isMobile || (isMobile && !selectedChat)) && (
          <ChatList
            chats={chats}
            onSelectChat={handleSelectChat}
            toggleSidebar={toggleSidebar}
          />
        )}
        {(!isMobile || (isMobile && selectedChat)) && (
          <ChatWindow
            chat={selectedChat}
            messages={messages}
            onBack={isMobile ? handleBackToList : undefined}
          />
        )}
      </div>
    </div>
  );
}

export default App;
