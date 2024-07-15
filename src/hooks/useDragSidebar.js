import { useState, useEffect, useRef, useCallback } from 'react';

const useDragSidebar = (openSidebar, closeSidebar, isOpen, dragThreshold = 50) => {
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);

    const handleTouchStart = useCallback((e) => {
        if (!isOpen && e.touches[0].clientX < 20) {
            setIsDragging(true);
            dragStartX.current = e.touches[0].clientX;
        } else if (isOpen) {
            setIsDragging(true);
            dragStartX.current = e.touches[0].clientX;
        }
    }, [isOpen]);

    const handleMouseDown = useCallback((e) => {
        if (!isOpen && e.clientX < 20) {
            setIsDragging(true);
            dragStartX.current = e.clientX;
        } else if (isOpen) {
            setIsDragging(true);
            dragStartX.current = e.clientX;
        }
    }, [isOpen]);

    const handleTouchMove = useCallback((e) => {
        if (isDragging) {
            const currentX = e.touches[0].clientX;
            const dragDistance = currentX - dragStartX.current;
            if (!isOpen && dragDistance > dragThreshold) {
                openSidebar();
                setIsDragging(false);
            } else if (isOpen && dragDistance < -dragThreshold) {
                closeSidebar();
                setIsDragging(false);
            }
        }
    }, [isDragging, isOpen, openSidebar, closeSidebar, dragThreshold]);

    const handleMouseMove = useCallback((e) => {
        if (isDragging) {
            const currentX = e.clientX;
            const dragDistance = currentX - dragStartX.current;
            if (!isOpen && dragDistance > dragThreshold) {
                openSidebar();
                setIsDragging(false);
            } else if (isOpen && dragDistance < -dragThreshold) {
                closeSidebar();
                setIsDragging(false);
            }
        }
    }, [isDragging, isOpen, openSidebar, closeSidebar, dragThreshold]);

    const handleDragEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleDragEnd);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleDragEnd);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleDragEnd);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleDragEnd);
        };
    }, [handleTouchStart, handleTouchMove, handleDragEnd, handleMouseDown, handleMouseMove]);

    return null;
};

export default useDragSidebar;