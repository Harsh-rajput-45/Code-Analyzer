import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const TimeTracker = () => {
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;

        let startTime = Date.now();
        const storageKey = `codecoach_time_spent_${user.id}`;

        const updateTime = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            startTime = now;

            const currentTotal = parseInt(localStorage.getItem(storageKey) || '0', 10);
            localStorage.setItem(storageKey, (currentTotal + elapsed).toString());
        };

        const interval = setInterval(updateTime, 1000); // Update every second

        // Also update on visibility change to handle tab switching
        const handleVisibilityChange = () => {
            if (document.hidden) {
                updateTime();
            } else {
                startTime = Date.now();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', updateTime);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', updateTime);
            updateTime(); // Final save
        };
    }, [user]);

    return null; // This component doesn't render anything
};

export default TimeTracker;
