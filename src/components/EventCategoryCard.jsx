import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventCategoryCard.css';

const EventCategoryCard = ({ category }) => {
  const navigate = useNavigate();

  const getCategoryIcon = (categoryId) => {
    const icons = {
      tech: '💻',
      dance: '💃',
      singing: '🎤',
      business: '💼',
      sports: '⚽',
      'art-culture': '🎨'
    };
    return icons[categoryId] || '🎉';
  };

  const handleClick = () => {
    navigate(`/events/${category.id}`);
  };

  return (
    <div className="event-category-card" onClick={handleClick}>
      <div className="category-icon">
        {getCategoryIcon(category.id)}
      </div>
      <div className="category-content">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
      </div>
      <div className="category-arrow">
        →
      </div>
    </div>
  );
};

export default EventCategoryCard;