import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CoverPage.css';
import ChatBot from './ChatBot'; // AI-powered chat assistant for event recommendations

const CoverPage = () => {

    const navigate = useNavigate();

    const handleEnterEvents = () => {
        navigate('/categories');
    };
    
  return (
  <div className="cover-page">
    <div className="cover-page-content">
      <h1>This Is Where the Magic Happens</h1>
      <p>Discover exciting events happening all around you!</p>
      <button onClick={handleEnterEvents} className="enter-button">
        Explore Events
      </button>
      <button onClick={() => navigate('/my-events')} className="enter-button">
        My Events
      </button>
      <button onClick={() => navigate('/admin')} className="enter-button">
        Admin Panel
      </button>
    </div>
    {/* AI ChatBot - Provides interactive event recommendations and assistance */}
    <ChatBot />
  </div>

    //User profile section
    //user profile section will be added later
  );
};

export default CoverPage;