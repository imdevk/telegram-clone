import React, { useRef, useEffect } from "react";
import Message from "./Message";
import Avatar from "./Avatar";
import { KeyboardBackspace } from "@mui/icons-material";

function ChatWindow({ chat, messages, onBack }) {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Scroll to bottom when messages or chat changes
        scrollToBottom();
    }, [messages, chat]);

    const groupMessagesByDate = (messages) => {
        const groups = {};
        messages.forEach(message => {
            const date = new Date(message.created_at).toDateString();
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(message);
        });
        return groups;
    }

    const getDateLabel = (dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            return "Yesterday";
        } else {
            return date.toLocaleDateString();
        }
    };

    if (!chat) {
        return null;
    }

    const groupedMessages = groupMessagesByDate(messages);

    return (
        <div className="chat-window">
            <div className="chat-header">
                {onBack && (
                    <button className="back-button" onClick={onBack}>
                        <KeyboardBackspace />
                    </button>
                )}
                <Avatar name={chat.creator.name} size={45} />
                <h2>{chat.creator.name}</h2>
            </div>
            <div className="messages-container">
                {Object.entries(groupedMessages).map(([date, msgs]) => (
                    <React.Fragment key={date}>
                        <div className="date-separator">{getDateLabel(date)}</div>
                        {msgs.map((message) => (
                            <Message key={message.id} message={message} />
                        ))}
                    </React.Fragment>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="message-input">
                <input type="text" placeholder="Type a message..." />
                <button>Send</button>
            </div>
        </div>
    )
}

export default ChatWindow;