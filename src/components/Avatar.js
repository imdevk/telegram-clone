import React from "react";

function Avatar({ name, size = 50 }) {
    const getInitials = (name) => {
        if (name) {
            return name
                .split(' ')
                .map(word => word[0])
                .join('')
                .toUpperCase()
                .slice(0, 2);
        } else {
            return '??';
        }
    };

    const initials = getInitials(name);


    const colors = [
        '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
        '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50',
        '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6',
    ];

    const backgroundColorIndex = initials.length % colors.length;
    const backgroundColor = colors[backgroundColorIndex];

    const style = {
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor,
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size / 2.5}px`,
        fontWeight: 'bold',
    }

    return (
        <div style={style}>
            {initials}
        </div>
    )
}

export default Avatar;