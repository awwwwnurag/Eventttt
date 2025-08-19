import React, { useState, useEffect } from 'react'
import './DarkMode.css'

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
        setIsDarkMode(true);
        localStorage.setItem('theme', 'dark');
    }

    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
        setIsDarkMode(false);
        localStorage.setItem('theme', 'light');
    }

    const toggleTheme = () => {
        if (isDarkMode) {
            setLightMode();
        } else {
            setDarkMode();
        }
    }

    // Initialize theme on component mount
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode();
        } else {
            setLightMode();
        }
    }, []);

    return (
        <div className="dark-mode-toggle">
            <button 
                onClick={toggleTheme}
                className={`toggle-btn ${isDarkMode ? 'dark' : 'light'}`}
            >
                {isDarkMode ? '🌙' : '☀️'} 
                {isDarkMode ? ' Light Mode' : ' Dark Mode'}
            </button>
        </div>
    )
}

export default DarkMode
