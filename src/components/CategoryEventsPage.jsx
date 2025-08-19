import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import EventCard from './EventCard';
import InterestSelector from './InterestSelector';
import './CategoryEventsPage.css';
import { eventsByCategory } from '../data/events';

const CategoryEventsPage = () => {
  const { categoryName } = useParams();
  const allCategoryEvents = eventsByCategory[categoryName] || [];

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    setVisibleCount(3);
  }, [categoryName, selectedInterests]);

  const availableInterests = useMemo(() => {
    const interestsSet = new Set();
    allCategoryEvents.forEach(event => {
      event.interests && event.interests.forEach(interest => interestsSet.add(interest));
    });
    return Array.from(interestsSet);
  }, [allCategoryEvents]);

  const filteredEvents = useMemo(() => {
    if (selectedInterests.length === 0) {
      return allCategoryEvents;
    }
    return allCategoryEvents.filter(event =>
      event.interests && selectedInterests.some(selected => event.interests.includes(selected))
    );
  }, [allCategoryEvents, selectedInterests]);

  const handleInterestChange = (updated) => {
    setSelectedInterests(updated);
  };

  const handleExploreMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, filteredEvents.length));
  };

  const displayedEvents = filteredEvents.slice(0, visibleCount);
  const hasMoreEvents = visibleCount < filteredEvents.length;


  const readableCategoryName = categoryName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <div className="category-events-page">
      <div className="category-header">
        <h2>{readableCategoryName} Events</h2>
        <p className="category-description">
          Discover amazing {readableCategoryName.toLowerCase()} events happening near you
        </p>
      </div>

      {availableInterests.length > 0 && (
        <InterestSelector
          interests={availableInterests}
          selectedInterests={selectedInterests}
          onInterestChange={handleInterestChange}
        />
      )}
      
      {displayedEvents.length > 0 ? (
        <>
          <div className="events-grid">
            {displayedEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {hasMoreEvents && (
            <div className="explore-more-section">
              <button onClick={handleExploreMore} className="explore-more-button">
                Explore More Events
              </button>
              <p className="events-count">
                Showing {visibleCount} of {filteredEvents.length} events
              </p>
            </div>
          )}
          
          {!hasMoreEvents && filteredEvents.length > 0 && (
            <div className="all-events-shown">
              <p>✨ All {filteredEvents.length} events are now displayed!</p>
            </div>
          )}
        </>
      ) : (
        <div className="no-events">
          <p>No events found for {readableCategoryName} with the selected interests.</p>
          <p>Check back later or try different filters!</p>
        </div>
      )}
      
      <Link to="/categories" className="back-button">
        &larr; Back to Categories
      </Link>
    </div>
  );
};

export default CategoryEventsPage;