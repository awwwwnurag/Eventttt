import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCard.css';
import Event3DBackground from './Event3DBack';

const categoryFloatingIcons = {
  tech: ['💻', '🖥️', '🔧'],
  dance: ['💃', '🕺', '🎭'],
  singing: ['🎤', '🎵', '🎶'],
  business: ['💼', '📊', '📈'],
  sports: ['⚽', '🏆', '🏃'],
  'art-culture': ['🎨', '🎭', '🖼️'],
};

const categoryIcons = {
  tech: '💻',
  dance: '💃',
  singing: '🎤',
  business: '💼',
  sports: '⚽',
  'art-culture': '🎨',
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  let category = '';
  if (event.id) {
    if (event.id.startsWith('t')) category = 'tech';
    else if (event.id.startsWith('d')) category = 'dance';
    else if (event.id.startsWith('s')) category = 'singing';
    else if (event.id.startsWith('b')) category = 'business';
    else if (event.id.startsWith('sp')) category = 'sports';
    else if (event.id.startsWith('ac')) category = 'art-culture';
  }
  const icon = categoryIcons[category] || '🎫';
  const floatingIcons = categoryFloatingIcons[category] || ['🎫'];

  const goToDetail = () => navigate(`/event/${event.id}`);

  return (
    <div className="event-card" onClick={goToDetail} style={{ cursor: 'pointer' }}>
      {/* Pass the category prop so the 3D background matches the event type */}
      <Event3DBackground category={category} />
      <span className={`event-card-bg-icon event-card-bg-icon-${category}`}>{icon}</span>
      <div className="event-card-floating-icons">
        {floatingIcons.map((ic, idx) => (
          <span key={idx} className={`floating-emoji floating-emoji-${idx}`}>{ic}</span>
        ))}
      </div>
      <div className="event-header">
        <h3>{event.name}</h3>
        <div className="event-price">
          {event.price === 'Free' ? (
            <span className="price-free">Free</span>
          ) : (
            <span className="price-paid">{event.price}</span>
          )}
        </div>
      </div>
      
      <div className="event-details">
        <div className="event-info">
          <div className="info-item">
            <span className="info-icon">📅</span>
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span>{event.location}</span>
          </div>
          <div className="info-item">
            <span className="info-icon">👥</span>
            <span>{event.attendees} attending</span>
          </div>
        </div>
        
        <p className="event-description">{event.description}</p>
      </div>
      
      <div className="event-actions" onClick={(e) => e.stopPropagation()}>
        <button className="view-details-button" onClick={goToDetail}>View Details</button>
        <button className="book-now-button" onClick={goToDetail}>Book Now</button>
      </div>
    </div>
  );
};

export default EventCard;