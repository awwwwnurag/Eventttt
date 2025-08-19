import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { allEvents } from '../data/events';
import './EventCard.css';

function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = allEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Event not found</h2>
        <p>The event you are looking for does not exist.</p>
        <Link to="/categories">Back to categories</Link>
      </div>
    );
  }

  const dateStr = new Date(event.date).toLocaleDateString();

  return (
    <div className="event-card" style={{ maxWidth: 900, margin: '24px auto' }}>
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
            <span>{dateStr}</span>
          </div>
          <div className="info-item">
            <span className="info-icon">📍</span>
            <span>{event.location}</span>
          </div>
          {event.attendees && (
            <div className="info-item">
              <span className="info-icon">👥</span>
              <span>{event.attendees} attending</span>
            </div>
          )}
        </div>

        {event.description && (
          <p className="event-description" style={{ marginTop: 12 }}>{event.description}</p>
        )}
        {event.interests && event.interests.length > 0 && (
          <div style={{ marginTop: 8, opacity: 0.9 }}>
            <strong>Tags: </strong>
            {event.interests.join(' • ')}
          </div>
        )}
      </div>

      <div className="event-actions">
        <button className="view-details-button" onClick={() => navigate(-1)}>Go Back</button>
        <button className="book-now-button">Book Now</button>
      </div>
    </div>
  );
}

export default EventDetail;


