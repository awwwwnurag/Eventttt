import React, { useState } from 'react';
import './AdminPanel.css';

const initialEvents = [
  { id: 1, title: 'Music Concert', date: '2025-08-10', organizer: 'Alice', description: 'Live music performance', category: 'Music', location: 'City Hall' },
  { id: 2, title: 'Art Exhibition', date: '2025-08-15', organizer: 'Bob', description: 'Modern art showcase', category: 'Art', location: 'Art Gallery' },
];

const AdminPanel = () => {
  const [events, setEvents] = useState(initialEvents);
  const [editingId, setEditingId] = useState(null);
  const [editEvent, setEditEvent] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    organizer: '',
    description: '',
    category: '',
    location: ''
  });

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEdit = (event) => {
    setEditingId(event.id);
    setEditEvent({ ...event }); // create a shallow copy
  };

  const handleEditChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleSave = (id) => {
    setEvents(events.map(event =>
      event.id === id ? { ...editEvent, id } : event
    ));
    setEditingId(null);
    setEditEvent({});
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newId = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    setEvents([...events, { ...newEvent, id: newId }]);
    setNewEvent({
      title: '',
      date: '',
      organizer: '',
      description: '',
      category: '',
      location: ''
    });
    setShowAddForm(false);
  };

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  return (
    <div className="admin-panel-container">
      <h2 className="admin-panel-title">Admin Panel - Manage All Events</h2>
      <button className="add-event-btn" onClick={() => setShowAddForm(!showAddForm)}>
        {showAddForm ? 'Close' : 'Add Event'}
      </button>
      {showAddForm && (
        <form className="add-event-form" onSubmit={handleAddEvent}>
          <h3>Add New Event</h3>
          <div className="form-group">
            <input name="title" type="text" placeholder="Title" value={newEvent.title} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <input name="date" type="date" placeholder="Date" value={newEvent.date} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <input name="organizer" type="text" placeholder="Organizer" value={newEvent.organizer} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <input name="category" type="text" placeholder="Category" value={newEvent.category} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <input name="location" type="text" placeholder="Location" value={newEvent.location} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <textarea name="description" placeholder="Description" value={newEvent.description} onChange={handleInputChange} />
          </div>
          <button type="submit">Add Event</button>
        </form>
      )}
      <table className="admin-events-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Organizer</th>
            <th>Category</th>
            <th>Location</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No events found.</td>
            </tr>
          ) : (
            events.map(event => (
              <tr key={event.id}>
                <td data-label="Title">
                  {editingId === event.id ? (
                    <input name="title" value={editEvent.title || ''} onChange={handleEditChange} />
                  ) : (
                    event.title
                  )}
                </td>
                <td data-label="Date">
                  {editingId === event.id ? (
                    <input name="date" type="date" value={editEvent.date || ''} onChange={handleEditChange} />
                  ) : (
                    event.date
                  )}
                </td>
                <td data-label="Organizer">
                  {editingId === event.id ? (
                    <input name="organizer" value={editEvent.organizer || ''} onChange={handleEditChange} />
                  ) : (
                    event.organizer
                  )}
                </td>
                <td data-label="Category">
                  {editingId === event.id ? (
                    <input name="category" value={editEvent.category || ''} onChange={handleEditChange} />
                  ) : (
                    event.category
                  )}
                </td>
                <td data-label="Location">
                  {editingId === event.id ? (
                    <input name="location" value={editEvent.location || ''} onChange={handleEditChange} />
                  ) : (
                    event.location
                  )}
                </td>
                <td data-label="Description">
                  {editingId === event.id ? (
                    <input name="description" value={editEvent.description || ''} onChange={handleEditChange} />
                  ) : (
                    event.description
                  )}
                </td>
                <td data-label="Actions" className="admin-event-actions">
                  {editingId === event.id ? (
                    <button onClick={() => handleSave(event.id)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(event)}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(event.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;