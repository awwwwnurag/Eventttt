import React from 'react';
import EventCategoryCard from './EventCategoryCard';
import './EventCategories.css'; // Create this file for styling

const EventCategories = () => {
  const categories = [
    { id: 'tech', name: 'Tech Events', description: 'Conferences, workshops, hackathons, and more.' },
    { id: 'dance', name: 'Dance Events', description: 'Performances, workshops, and dance competitions.' },
    { id: 'singing', name: 'Singing Events', description: 'Concerts, open mics, and vocal competitions.' },
    { id: 'business', name: 'Business Events', description: 'Seminars, networking events, and startup expos.' },
    { id: 'sports', name: 'Sports Events', description: 'Tournaments, marathons, and sporting spectacles.' },
    { id: 'art-culture', name: 'Art & Culture Events', description: 'Exhibitions, festivals, and cultural shows.' },
    // Add more categories as needed
  ];

  return (
    <div className="event-categories">
      <h2>Explore Event Categories</h2>
      <div className="category-grid">
        {categories.map(category => (
          <EventCategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default EventCategories;
