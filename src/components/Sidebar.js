import React from "react";
import {
    Person, Group, Contacts, Phone, PeopleOutline,
    BookmarkBorder, Settings, PersonAdd, HelpOutline,
    Brightness4, ExpandMore, Close
} from '@mui/icons-material';
import Avatar from "./Avatar";

function MenuItem({ Icon, text, notification }) {
    return (
        <div className="menu-item">
            <Icon className="menu-icon" />
            <span>{text}</span>
            {notification && <span className="notification">{notification}</span>}
        </div>
    );
}

function Sidebar({ isOpen, toggleSidebar, toggleTheme }) {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleSidebar} className="close-sidebar">
                <Close />
            </button>
            <div className="sidebar-header">
                <Avatar className="sidebar-avatar" size={45} name="BeyondChat" />
                <div className="user-info">
                    <h2>BeyondChat</h2>
                    <ExpandMore className="expand-icon" />
                </div>
                <button onClick={toggleTheme}>
                    <Brightness4 />
                </button>
            </div>
            <div className="sidebar-menu">
                <MenuItem Icon={Person} text="My Profile" />
                <MenuItem Icon={Group} text="New Group" />
                <MenuItem Icon={Contacts} text="Contacts" />
                <MenuItem Icon={Phone} text="Calls" />
                <MenuItem Icon={PeopleOutline} text="People Nearby" />
                <MenuItem Icon={BookmarkBorder} text="Saved Messages" />
                <MenuItem Icon={Settings} text="Settings" />
                <MenuItem Icon={PersonAdd} text="Invite Friends" />
                <MenuItem Icon={HelpOutline} text="Telegram Features" />
            </div>

        </div>
    )
}

export default Sidebar;