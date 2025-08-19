import React, { useEffect, useState } from 'react';
import './PreferenceModal.css';

const ALL_INTERESTS = [
  'AI/ML','Web Development','Cybersecurity','Blockchain','Data Science','Cloud','Mobile Development','DevOps',
  'Festival','Competition','Workshop','Bootcamp','Conference','Expo',
  'Jazz','Blues','Classical','Rock','A Capella','Folk Music',
  'Startup','Leadership','Marketing','E-commerce','Finance','HR',
  'Marathon','Badminton','Cricket','Swimming','Basketball','Yoga',
  'Art','Photography','Poetry','Theater','Craft'
];

const ALL_LOCATIONS = ['Virtual','Delhi','Mumbai','Bangalore','Chennai','Pune','Hyderabad','Kolkata','Goa','Jaipur','Lucknow','Gurgaon','Rishikesh','Varanasi','Amritsar'];

export default function PreferenceModal({ open, onClose, onApply, initial }) {
  const [interests, setInterests] = useState(initial?.interests || []);
  const [preferredLocations, setPreferredLocations] = useState(initial?.preferredLocations || []);
  const [budget, setBudget] = useState(initial?.budget || 'any');
  const [timeframe, setTimeframe] = useState(initial?.timeframe || 'any');

  useEffect(() => {
    if (open) {
      setInterests(initial?.interests || []);
      setPreferredLocations(initial?.preferredLocations || []);
      setBudget(initial?.budget || 'any');
      setTimeframe(initial?.timeframe || 'any');
    }
  }, [open, initial]);

  const toggle = (list, value, setter) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  if (!open) return null;

  return (
    <div className="pref-modal__backdrop" onClick={onClose}>
      <div className="pref-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="pref-modal__header">
          <h3>Set your preferences</h3>
          <button className="pref-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="pref-modal__section">
          <h4>Interests</h4>
          <div className="pref-chips">
            {ALL_INTERESTS.map((i) => (
              <button key={i} className={`chip ${interests.includes(i) ? 'active' : ''}`} onClick={() => toggle(interests, i, setInterests)}>{i}</button>
            ))}
          </div>
        </div>

        <div className="pref-modal__section">
          <h4>Preferred locations</h4>
          <div className="pref-chips">
            {ALL_LOCATIONS.map((l) => (
              <button key={l} className={`chip ${preferredLocations.includes(l) ? 'active' : ''}`} onClick={() => toggle(preferredLocations, l, setPreferredLocations)}>{l}</button>
            ))}
          </div>
        </div>

        <div className="pref-modal__section pref-row">
          <div>
            <h4>Budget</h4>
            <select value={budget} onChange={(e) => setBudget(e.target.value)}>
              <option value="any">Any</option>
              <option value="free">Free only</option>
              <option value="low">Low (≤ $40)</option>
            </select>
          </div>
          <div>
            <h4>Timeframe</h4>
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)}>
              <option value="any">Any</option>
              <option value="week">Within a week</option>
              <option value="month">Within a month</option>
            </select>
          </div>
        </div>

        <div className="pref-modal__actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={() => onApply({ interests, preferredLocations, budget, timeframe })}>Apply</button>
        </div>
      </div>
    </div>
  );
}


