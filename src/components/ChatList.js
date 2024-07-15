import React, { useState, useRef, useLayoutEffect } from "react";
import Avatar from "./Avatar";

const truncateMessage = (message, maxLength) => {
    if (message.length <= maxLength) {
        return message;
    }
    return message.slice(0, maxLength) + "...";
};

function ChatList({ chats, onSelectChat, toggleSidebar }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [maxMessageLength, setMaxMessageLength] = useState(30);
    const chatListRef = useRef(null);

    useLayoutEffect(() => {
        const calculateMaxMessageLength = () => {
            if (chatListRef.current) {
                const containerWidth = chatListRef.current.offsetWidth;
                const maxLength = Math.floor(containerWidth / 10);
                setMaxMessageLength(maxLength);
            }
        };

        calculateMaxMessageLength();

        window.addEventListener('resize', calculateMaxMessageLength);
        return () => {
            window.removeEventListener('resize', calculateMaxMessageLength);
        };
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredChats = chats
        .filter(chat => chat.creator?.name)
        .filter(chat =>
            chat.creator.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

    return (
        <div className="chat-list-container" ref={chatListRef}>
            <div className="chat-list-header">
                <button onClick={toggleSidebar} className="menu-icon">☰</button>
                <input
                    type="text"
                    placeholder="Search"
                    className="search-bar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="chat-list">
                {filteredChats.map((chat) => (
                    <div
                        key={chat.id + chat.creator.name}
                        className="chat-item"
                        onClick={() => onSelectChat(chat)}
                    >
                        <Avatar name={chat.creator.name} size={45} />
                        <div className="chat-info">
                            <h3>{chat.creator.name}</h3>
                            <p>{truncateMessage(chat.last_message, maxMessageLength)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatList;
