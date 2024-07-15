import React from "react";

function Header({ toggleSidebar }) {
    return (
        <div className="header">
            <button onClick={toggleSidebar} className="menu-icon">☰</button>
            <input type="text" placeholder="Search" className="search-bar" />
        </div>
    )
}

export default Header;