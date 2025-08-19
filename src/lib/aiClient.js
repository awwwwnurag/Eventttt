export async function fetchAiRecommendations(preferences, events, topK = 6) {
  const res = await fetch('/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ preferences, events, topK }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `AI request failed: ${res.status}`);
  }
  return res.json();
}

export async function fetchAiHealth() {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return { ok: false };
    return res.json();
  } catch {
    return { ok: false };
  }
}


