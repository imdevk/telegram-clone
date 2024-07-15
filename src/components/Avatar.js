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
        '#3498db', '#1abc9c'
    ];

    const backgroundColorIndex = initials.length % 2;
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