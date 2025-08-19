import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatBot.css';
import { allEvents } from '../data/events';

/**
 * ChatBot Component - AI-powered event assistant
 * 
 * This component provides an interactive chat interface where users can:
 * - Ask questions about events
 * - Get AI-powered event recommendations
 * - Click on suggested events to navigate to their detail pages
 * 
 * Features:
 * - Real-time chat with AI backend
 * - Event suggestions with clickable links
 * - Responsive design with toggle functionality
 * - Auto-scroll to latest messages
 * - Loading states and error handling
 * 
 * @param {string} userName - Current user's name for personalized greetings
 */
export default function ChatBot({ userName }) {
  // State management for chat functionality
  const [open, setOpen] = useState(false); // Controls chat panel visibility
  const [messages, setMessages] = useState([
    // Initial greeting message with personalized user name
    { role: 'assistant', content: `Hi${userName ? ` ${userName}` : ''}! I am Eventura. How can I help you today?` },
  ]);
  const [input, setInput] = useState(''); // Current input field value
  const [loading, setLoading] = useState(false); // Loading state for API calls
  const listRef = useRef(null); // Reference to messages container for auto-scroll
  const navigate = useNavigate(); // React Router navigation hook

  // Auto-scroll to bottom when new messages are added or chat opens
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  /**
   * Handles sending messages to the AI backend and processing responses
   * 
   * This function:
   * 1. Validates input and adds user message to chat
   * 2. Sends request to AI backend with conversation context
   * 3. Processes AI response and extracts event recommendations
   * 4. Updates chat with AI reply and clickable event suggestions
   * 5. Handles errors gracefully with user-friendly messages
   */
  const handleSend = async () => {
    const content = input.trim();
    if (!content) return; // Don't send empty messages
    
    setInput(''); // Clear input field immediately
    const next = [...messages, { role: 'user', content }]; // Add user message to conversation
    setMessages(next);
    setLoading(true); // Show loading indicator
    
    try {
      // Send request to AI backend with last 6 messages for context
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: next.slice(-6), // Keep conversation context manageable
          preferences: {}, // User preferences (can be enhanced)
          topK: 5 // Number of event recommendations to return
        }),
      });
      
      const data = await res.json();
      const reply = data.reply || '…'; // AI's text response
      const ids = Array.isArray(data.eventIds) ? data.eventIds : []; // Event IDs from AI
      
      // Convert event IDs to full event objects for display
      const recommendedEvents = ids
        .map((id) => allEvents.find((e) => e.id === id))
        .filter(Boolean); // Remove any undefined events
      
      // Add AI response with both text and event suggestions
      setMessages((m) => [...m, { role: 'assistant', content: reply, events: recommendedEvents }]);
    } catch (e) {
      // Handle API errors gracefully
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I had trouble answering. Please try again.' }]);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className={`chatbot ${open ? 'open' : ''}`}>
      {/* Chat toggle button - shown when chat is closed */}
      {!open && (
        <button className="chatbot-toggle" onClick={() => setOpen(true)} aria-label="Open chat">
          💬
        </button>
      )}
      
      {/* Chat panel - shown when chat is open */}
      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="Event assistant">
          {/* Chat header with title and close button */}
          <div className="chatbot-header">
            <div>Eventura Assistant</div>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
          </div>
          
          {/* Messages container with auto-scroll */}
          <div className="chatbot-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`msg ${m.role}`}>
                {/* AI or user message content */}
                <div>{m.content}</div>
                
                {/* Event suggestions - rendered as clickable links */}
                {Array.isArray(m.events) && m.events.length > 0 && (
                  <ul style={{ marginTop: 8, paddingLeft: 18 }}>
                    {m.events.map((e) => (
                      <li key={e.id}>
                        <button
                          onClick={() => navigate(`/event/${e.id}`)} // Navigate to event detail page
                          className="linklike"
                          style={{ background: 'transparent', border: 'none', color: '#2c3e50', textDecoration: 'underline', cursor: 'pointer', padding: 0 }}
                        >
                          {e.name} ({e.location} • {new Date(e.date).toLocaleDateString()})
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
            
            {/* Loading indicator while waiting for AI response */}
            {loading && <div className="msg assistant">Typing…</div>}
          </div>
          
          {/* Input area with text field and send button */}
          <div className="chatbot-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()} // Send on Enter key
              placeholder="Ask about events, e.g., free tech events in Pune"
            />
            <button onClick={handleSend} disabled={loading || !input.trim()}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}


