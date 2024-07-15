import React from "react";
import Avatar from "./Avatar";

function Message({ message }) {
    // console.log(message);
    const messageDate = new Date(message.created_at);
    const formattedTime = messageDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="message-container">
            <div className="message-avatar">
                <Avatar name={message.sender.name} size={30} />
            </div>
            <div className={`message ${message.sender._id === 1 ? 'send' : 'received'}`}>
                <div className="message-content">
                    <p>{message.message}</p>
                    <span className="timestamp">{formattedTime}</span>
                </div>
            </div>
        </div>
    )
}

export default Message;