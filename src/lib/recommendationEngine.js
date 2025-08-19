// A lightweight, deterministic recommendation engine.
// Scores events based on user preferences and contextual rules.

export function scoreEvent(event, prefs) {
  let score = 0;

  const {
    interests = [],
    preferredLocations = [],
    budget = 'any', // 'free' | 'low' | 'any'
    timeframe = 'any', // 'week' | 'month' | 'any'
  } = prefs || {};

  // Interest overlap
  if (Array.isArray(event.interests)) {
    const overlap = event.interests.filter((i) => interests.includes(i)).length;
    score += overlap * 3;
  }

  // Location preference
  if (preferredLocations.length > 0 && preferredLocations.includes(event.location)) {
    score += 2;
  }

  // Budget
  if (budget === 'free' && event.price === 'Free') score += 3;
  if (budget === 'low' && event.price && event.price !== 'Free') {
    const value = parseInt(String(event.price).replace(/[^0-9]/g, ''), 10);
    if (!Number.isNaN(value) && value <= 40) score += 2;
  }

  // Timeframe: simple heuristic using date proximity
  try {
    const daysOut = daysUntil(event.date);
    if (timeframe === 'week' && daysOut <= 7) score += 2;
    if (timeframe === 'month' && daysOut <= 30) score += 1;
  } catch {}

  // Popularity
  if (event.attendees) {
    const base = parseInt(String(event.attendees).replace(/[^0-9]/g, ''), 10);
    if (!Number.isNaN(base)) score += Math.min(3, Math.floor(base / 200));
  }

  return score;
}

export function recommendEvents(allEvents, prefs, limit = 6) {
  return [...allEvents]
    .map((e) => ({ event: e, score: scoreEvent(e, prefs) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.event);
}

function daysUntil(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);
  const ms = target.getTime() - now.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}


