import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecommendationCard.css';
import PreferenceModal from './PreferenceModal';
import { allEvents } from '../data/events';
import { recommendEvents } from '../lib/recommendationEngine';
import { fetchAiRecommendations, fetchAiHealth } from '../lib/aiClient';

function RecommendationCard({ userName, userInterests = [], onUpdateInterests, onOpenChat }) {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState({ interests: userInterests, preferredLocations: [], budget: 'any', timeframe: 'any' });
  const [aiIds, setAiIds] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [health, setHealth] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchAiHealth().then(setHealth);
  }, []);

  const recommended = useMemo(() => {
    const effective = {
      ...prefs,
      interests: prefs.interests && prefs.interests.length ? prefs.interests : userInterests,
    };
    const local = recommendEvents(allEvents, effective, 6);
    if (aiIds && aiIds.length) {
      const map = new Map(local.map((e) => [e.id, e]));
      const fromAi = aiIds.map((id) => map.get(id) || allEvents.find((e) => e.id === id)).filter(Boolean);
      return fromAi.length ? fromAi : local;
    }
    return local;
  }, [prefs, userInterests, aiIds]);
  const hasInterests = Array.isArray(userInterests) && userInterests.length > 0;

  const toTitleCase = (s) => (typeof s === 'string' && s.length
    ? s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    : s);
  const displayName = userName ? toTitleCase(userName) : 'you';

  return (
    <div className="recommendation-card">
      <div className="recommendation-card__header">
        <h2>Hand‑Picked Events for you</h2>
        <p className="recommendation-card__subtitle">
          {hasInterests ? 'Based on your interests' : 'Select interests to get personalized recommendations'}
        </p>
      </div>

      <div className="recommendation-card__content">
        {hasInterests ? (
          <ul className="recommendation-card__interest-list">
            {(prefs.interests?.length ? prefs.interests : userInterests).map((interest) => (
              <li key={interest} className="recommendation-card__interest-item">{interest}</li>
            ))}
          </ul>
        ) : (
          <div className="recommendation-card__empty">No interests selected yet.</div>
        )}

        <div className="recommendation-card__grid">
          {recommended.map((e) => (
            <div key={e.id} className="recommendation-card__item" onClick={() => navigate(`/event/${e.id}`)} style={{ cursor: 'pointer' }}>
              <div className="recommendation-card__item-title">{e.name}</div>
              <div className="recommendation-card__item-meta">{e.location} • {new Date(e.date).toLocaleDateString()}</div>
              <div className="recommendation-card__item-tags">{(e.interests||[]).slice(0,3).join(' • ')}</div>
            </div>
          ))}
          {recommended.length === 0 && (
            <div className="recommendation-card__empty">No recommendations yet. Try adjusting your preferences.</div>
          )}
        </div>
      </div>

      <div className="recommendation-card__actions">
        <button type="button" onClick={() => setOpen(true)}>Set preferences</button>
        <button
          type="button"
          onClick={() => onOpenChat && onOpenChat()}
        >
          Chat with AI
        </button>
      </div>

      {health && !health.model && <div className="recommendation-card__status">AI server is running without a key; falling back to local recommendations.</div>}
      {error && <div style={{ color: '#c0392b', marginTop: 8 }}>{error}</div>}

      <PreferenceModal
        open={open}
        initial={prefs}
        onClose={() => setOpen(false)}
        onApply={(p) => {
          setOpen(false);
          setPrefs(p);
          setAiIds(null);
          setError('');
        }}
      />
    </div>
  );
}

export default RecommendationCard;


