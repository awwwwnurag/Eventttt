import React from 'react';
import './InterestSelector.css'; 

const InterestSelector = ({ interests, selectedInterests, onInterestChange }) => {
  const handleCheckboxChange = (interest, checked) => {
    let updated;
    if (checked) {
      updated = [...selectedInterests, interest];
    } else {
      updated = selectedInterests.filter(i => i !== interest);
    }
    onInterestChange(updated);
  };

  return (
    <div className="interest-selector-panel">
      <h3>Refine your interests</h3>
      <div className="interest-list">
        {interests.map((interest) => (
          <label key={interest} className="interest-checkbox">
            <input
              type="checkbox"
              value={interest}
              checked={selectedInterests.includes(interest)}
              onChange={(e) => handleCheckboxChange(interest, e.target.checked)}
            />
            <span className="tag">{interest}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
export default InterestSelector;
