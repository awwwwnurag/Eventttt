import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import CoverPage from './components/CoverPage';
import EventCategories from './components/EventCategories';
import CategoryEventsPage from './components/CategoryEventsPage';
import Navbar from './components/Navbar';
import EventDetail from './components/EventDetail';
import AdminPanel from './components/AdminPanel';
import MyEvents from './components/MyEvents';
import LoginSignup from './components/Assets/LoginSignup';
import About from './components/About';
import RecommendationCard from './components/RecommendationCard';
import './App.css';
import DarkMode from './components/DarkMode';

function AppRoutes({ userName, setUserName, userInterests, setUserInterests, theme, toggleTheme }) {
  const navigate = useNavigate();

  const handleLogin = (name) => {
    setUserName(name);
    // Set default interests for new users
    if (!userInterests || userInterests.length === 0) {
      setUserInterests(['AI/ML', 'Web Development', 'Conference']);
    }
    navigate('/cover');
  };

  const handleUpdateInterests = (newInterests) => {
    setUserInterests(newInterests);
  };

  return (
    <>
      <Navbar userName={userName} theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<LoginSignup onLogin={handleLogin} />} />
        <Route 
          path="/cover" 
          element={
            <div>
              <CoverPage />
              {userName && (
                <RecommendationCard 
                  userName={userName}
                  userInterests={userInterests}
                  onUpdateInterests={handleUpdateInterests}
                  onOpenChat={() => {
                    // ChatBot Integration: Programmatically opens the ChatBot when "Chat with AI" is clicked
                    // This creates a seamless connection between recommendations and AI chat
                    const chatToggle = document.querySelector('.chatbot-toggle');
                    if (chatToggle) {
                      chatToggle.click();
                    }
                  }}
                />
              )}
            </div>
          } 
        />
        <Route path="/categories" element={<EventCategories />} />
        <Route path="/events/:categoryName" element={<CategoryEventsPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/DarkMode" element={<DarkMode/>}/>
        <Route path="/event/:eventId" element={<EventDetail />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/my-events" element={<MyEvents />} />
      </Routes>
    </>
  );
}

function App() {
  const [userName, setUserName] = useState('');
  const [userInterests, setUserInterests] = useState([]);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <Router>
      <AppRoutes 
        userName={userName}
        setUserName={setUserName}
        userInterests={userInterests}
        setUserInterests={setUserInterests}
        theme={theme}
        toggleTheme={toggleTheme}
      />
    </Router>
  );
}

export default App;
