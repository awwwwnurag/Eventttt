import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// Import the shared events dataset from the frontend
const eventsModule = await import('../src/data/events.js');
const ALL_EVENTS = eventsModule.allEvents || [];

dotenv.config();

const app = express();
const port = process.env.PORT || 8787;

const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyBRVRDu3u5aDOnE1GuzLDkW1ZOBdNOPnBQ';

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, model: !!apiKey });
});

app.post('/api/recommend', async (req, res) => {
  try {
    if (!apiKey || !genAI) {
      return res.status(501).json({ error: 'GEMINI_API_KEY not configured on server' });
    }
    const { preferences, events, topK = 6 } = req.body || {};
    if (!Array.isArray(events)) {
      return res.status(400).json({ error: 'events must be an array' });
    }

    const trimmed = events.map((e) => ({
      id: e.id,
      name: e.name,
      date: e.date,
      location: e.location,
      price: e.price,
      attendees: e.attendees,
      interests: e.interests,
      category: e.category,
    }));

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `You are Eventura, a friendly events assistant. Greet the user briefly, be concise and helpful.\n\nGiven user preferences and a list of events, return the BEST ${topK} event IDs sorted by relevance.\n\nReturn STRICT JSON only in the format: {\n  "eventIds": ["id1", "id2", ...]\n}\n\nPreferences:\n${JSON.stringify(preferences, null, 2)}\n\nEvents:\n${JSON.stringify(trimmed, null, 2)}\n`;

    const result = await model.generateContent([{ text: prompt }]);
    const text = result.response.text();
    const json = extractJson(text);
    if (!json || !Array.isArray(json.eventIds)) {
      return res.status(502).json({ error: 'Model returned unexpected output', raw: text });
    }
    const limited = json.eventIds.filter((id) => trimmed.some((e) => e.id === id)).slice(0, topK);
    return res.json({ eventIds: limited });
  } catch (err) {
    console.error('recommend error', err);
    return res.status(500).json({ error: 'Internal error', details: String(err?.message || err) });
  }
});

/**
 * ChatBot API Endpoint - AI-powered event assistant
 * samghne ke liye code hai ye
 * This endpoint handles chat interactions with the AI model to provide:
 * - Intelligent responses to user queries about events
 * - Event recommendations based on user preferences and conversation context
 * - Fallback to keyword-based recommendations if AI fails
 * 
 * Request body:
 * - messages: Array of conversation messages with role and content
 * - preferences: User preferences (interests, locations, budget, timeframe)
 * - topK: Number of event recommendations to return
 */
app.post('/api/chat', async (req, res) => {
  try {
    // Check if AI service is properly configured
    if (!apiKey || !genAI) {
      return res.status(501).json({ error: 'GEMINI_API_KEY not configured on server' });
    }
    
    const { messages = [], preferences = {}, topK = 5 } = req.body || {};
    
    const lastUserMsg = [...messages].reverse().find((m) => (m.role || 'user') === 'user')?.content || '';

    // Optimize performance by limiting events sent to AI model
    // This reduces token usage and improves response time
    const trimmed = ALL_EVENTS.slice(0, 60).map((e) => ({
      id: e.id,
      name: e.name,
      date: e.date,
      location: e.location,
      price: e.price,
      interests: e.interests,
      category: e.category,
    }));

    // AI System Prompt: Defines the assistant's personality and response format
    const systemPrompt = `You are Eventura, a friendly events assistant. Greet the user briefly, be concise and helpful. 
Always respond STRICTLY as JSON: {"reply":"...","eventIds":["id1","id2", ...]}. 
If the user asks general questions, answer them briefly. Then, if relevant, suggest up to ${topK} matching event IDs from the provided Events list. 
If nothing matches, use an empty array for eventIds.`;

    // Initialize Google Gemini AI model for natural language processing
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // Construct the complete prompt with system instructions, user preferences, and event data
    const prompt = `${systemPrompt}\n\nPreferences:\n${JSON.stringify(preferences)}\n\nEvents:\n${JSON.stringify(trimmed)}\n\nUser: ${lastUserMsg}`;

    // Generate AI response
    const result = await model.generateContent(prompt);
    const text = result?.response?.text?.() || '';
    
    // Parse AI response and handle potential JSON parsing errors
    let json = extractJson(text);
    if (!json || typeof json.reply !== 'string') {
      json = { reply: text || '', eventIds: [] };
    }
    
    // Validate and filter event IDs to ensure they exist in our dataset
    json.eventIds = Array.isArray(json.eventIds)
      ? json.eventIds.filter((id) => trimmed.some((e) => e.id === id)).slice(0, topK)
      : [];
    
    // Fallback mechanism: If AI fails to provide a meaningful response,
    // use keyword-based local recommendation engine
    if (!json.reply || json.reply.trim().length === 0) {
      const prefs = derivePrefsFromQuery(lastUserMsg);
      const ids = keywordRecommendIds(prefs, topK);
      json = { reply: 'Here are some events you might like:', eventIds: ids };
    }
    
    return res.json(json);
  } catch (err) {
    console.error('chat error', err);
    return res.status(500).json({ error: 'Internal error', details: String(err?.message || err) });
  }
});

app.listen(port, () => {
  console.log(`AI server listening on http://localhost:${port}`);
});

/**
 * Extracts JSON from AI response text
 * 
 * AI models sometimes include extra text around JSON responses.
 * This function attempts to extract valid JSON from the response:
 * 1. First tries to parse the entire text as JSON
 * 2. If that fails, looks for JSON-like patterns and tries to parse them
 * 3. Returns null if no valid JSON is found
 * 
 * @param {string} text - Raw text response from AI model
 * @returns {object|null} - Parsed JSON object or null
 */
function extractJson(text) {
  if (!text) return null;
  try {
    // Try direct parse first (most efficient)
    return JSON.parse(text);
  } catch {}
  
  // Fallback: Look for JSON-like patterns in the text
  const match = text.match(/\{[\s\S]*\}/);
  if (match) {
    try { return JSON.parse(match[0]); } catch {}
  }
  return null;
}

/**
 * Extracts user preferences from natural language text
 * 
 * This function analyzes user queries to extract structured preferences:
 * - Interests: Detects keywords related to event categories
 * - Locations: Identifies city names and virtual events
 * - Budget: Determines if user is looking for free/low-cost events
 * - Timeframe: Identifies time constraints (week/month)
 * 
 * Used as fallback when AI model fails to provide recommendations
 * 
 * @param {string} text - User's natural language query
 * @returns {object} - Structured preferences object
 */
function derivePrefsFromQuery(text = '') {
  const lower = text.toLowerCase();
  const interests = [];
  const preferredLocations = [];
  
  // Budget detection: Look for free/cheap/low-cost indicators
  const budget = lower.includes('free') ? 'free' : (lower.includes('cheap') || lower.includes('low')) ? 'low' : 'any';
  
  // Timeframe detection: Look for time-based constraints
  const timeframe = lower.includes('week') ? 'week' : lower.includes('month') ? 'month' : 'any';
  
  // Interest keywords: Comprehensive list of event categories and interests
  const interestKeywords = ['ai/ml','web development','cybersecurity','blockchain','data science','cloud','devops','jazz','blues','classical','rock','folk music','startup','leadership','marketing','e-commerce','finance','hr','marathon','badminton','cricket','swimming','basketball','yoga','art','photography','poetry','theater','craft'];
  for (const k of interestKeywords) {
    if (lower.includes(k)) interests.push(capitalizeInterest(k));
  }
  
  // Location keywords: Major Indian cities and virtual events
  const locations = ['delhi','mumbai','bangalore','chennai','pune','hyderabad','kolkata','goa','jaipur','lucknow','gurgaon','rishikesh','varanasi','amritsar','virtual'];
  for (const loc of locations) {
    if (lower.includes(loc)) preferredLocations.push(capitalize(loc));
  }
  
  return { interests, preferredLocations, budget, timeframe };
}

/**
 * Local keyword-based event recommendation engine
 * 
 * This function provides a lightweight fallback recommendation system when AI fails.
 * It scores events based on user preferences and returns the best matches.
 * 
 * Scoring algorithm:
 * - Interest matches: +3 points per matching interest
 * - Location matches: +2 points for preferred locations
 * - Budget matches: +2 points for free events when budget is 'free'
 * 
 * @param {object} prefs - User preferences object
 * @param {number} topK - Number of recommendations to return
 * @returns {Array} - Array of event IDs sorted by relevance score
 */
function keywordRecommendIds(prefs, topK) {
  // Lightweight scoring algorithm similar to frontend recommendation engine
  const scored = ALL_EVENTS.map((e) => {
    let s = 0; // Initialize score
    
    // Score based on interest matches (highest weight)
    if (prefs.interests?.length && e.interests) {
      s += e.interests.filter((i) => prefs.interests.includes(i)).length * 3;
    }
    
    // Score based on location preferences
    if (prefs.preferredLocations?.length && prefs.preferredLocations.includes(e.location)) {
      s += 2;
    }
    
    // Score based on budget constraints
    if (prefs.budget === 'free' && e.price === 'Free') {
      s += 2;
    }
    
    return { id: e.id, s };
  })
  .filter((x) => x.s > 0) // Only include events with positive scores
  .sort((a,b) => b.s - a.s) // Sort by score (highest first)
  .slice(0, topK); // Take top K recommendations
  
  return scored.map((x) => x.id); // Return just the event IDs
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function capitalizeInterest(s) { return s.split(' ').map(capitalize).join(' ').replace('Ai/ml','AI/ML').replace('E-commerce','E-commerce'); }


