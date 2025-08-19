// Centralized events dataset used across the app

function expand(baseList, prefix, target = 22) {
  if (baseList.length >= target) return baseList;
  const out = [...baseList];
  let i = baseList.length + 1;
  while (out.length < target) {
    const seed = baseList[(i - 1) % baseList.length];
    const date = new Date(seed.date || '2025-09-01');
    date.setDate(date.getDate() + i * 3);
    const clone = {
      ...seed,
      id: `${prefix}${i}`,
      name: `${seed.name} ${i}`,
      date: date.toISOString().slice(0, 10),
      attendees: seed.attendees || `${100 + (i * 37) % 1200}+`,
    };
    out.push(clone);
    i += 1;
  }
  return out;
}

export const eventsByCategory = {
  tech: [
    { id: 't1', name: 'AI & ML Summit 2025', date: '2025-08-15', location: 'Virtual', description: 'Explore the latest in AI and Machine Learning.', price: 'Free', attendees: '500+', interests: ['AI/ML', 'Conference', 'Virtual'] },
    { id: 't2', name: 'Web Dev Hackathon', date: '2025-09-01', location: 'Bangalore', description: 'Build innovative web solutions in 48 hours.', price: '$25', attendees: '200+', interests: ['Web Development', 'Hackathon', 'Coding'] },
    { id: 't3', name: 'Cyber Security Conference', date: '2025-10-20', location: 'Delhi', description: 'Stay updated on the evolving threat landscape.', price: '$50', attendees: '300+', interests: ['Cybersecurity', 'Conference', 'Networking'] },
    { id: 't4', name: 'Blockchain Workshop', date: '2025-11-10', location: 'Mumbai', description: 'Learn about blockchain technology and its applications.', price: '$30', attendees: '150+', interests: ['Blockchain', 'Workshop'] },
    { id: 't5', name: 'Data Science Bootcamp', date: '2025-12-05', location: 'Pune', description: 'Intensive 3-day bootcamp on data science fundamentals.', price: '$75', attendees: '100+', interests: ['Data Science', 'Bootcamp', 'Analytics'] },
    { id: 't6', name: 'Cloud Computing Expo', date: '2025-12-15', location: 'Chennai', description: 'Discover cloud solutions and best practices.', price: '$40', attendees: '250+', interests: ['Cloud', 'Expo', 'Networking'] },
    { id: 't7', name: 'Mobile App Development', date: '2025-01-20', location: 'Hyderabad', description: 'Build and deploy mobile applications.', price: '$35', attendees: '180+', interests: ['Mobile Development', 'Workshop', 'Coding'] },
    { id: 't8', name: 'DevOps Conference', date: '2025-02-10', location: 'Kolkata', description: 'Learn about CI/CD and deployment strategies.', price: '$45', attendees: '220+', interests: ['DevOps', 'Conference', 'Automation'] },
  ],
  dance: [
    { id: 'd1', name: 'Global Dance Festival', date: '2025-07-25', location: 'Mumbai', description: 'A celebration of diverse dance forms.', price: '$60', attendees: '1000+', interests: ['Festival', 'Global', 'Performance'] },
    { id: 'd2', name: 'Hip-Hop Battle Royale', date: '2025-09-10', location: 'Pune', description: 'Witness the best hip-hop dancers compete.', price: '$30', attendees: '500+', interests: ['Hip-Hop', 'Competition', 'Urban'] },
    { id: 'd3', name: 'Classical Dance Recital', date: '2025-10-05', location: 'Delhi', description: 'Traditional Indian classical dance performances.', price: '$25', attendees: '300+', interests: ['Classical', 'Recital', 'Cultural'] },
    { id: 'd4', name: 'Contemporary Dance Workshop', date: '2025-11-15', location: 'Bangalore', description: 'Learn contemporary dance techniques.', price: '$40', attendees: '150+', interests: ['Contemporary', 'Workshop', 'Modern'] },
    { id: 'd5', name: 'Salsa Night', date: '2025-12-20', location: 'Chennai', description: 'An evening of Latin dance and music.', price: '$20', attendees: '200+', interests: ['Salsa', 'Social', 'Latin'] },
    { id: 'd6', name: 'Bollywood Dance Competition', date: '2025-01-25', location: 'Hyderabad', description: 'Show your Bollywood dance moves.', price: '$35', attendees: '400+', interests: ['Bollywood', 'Competition', 'Fun'] },
  ],
  singing: [
    { id: 's1', name: 'Voice of India Auditions', date: '2025-08-05', location: 'Lucknow', description: 'Showcase your vocal talent.', price: 'Free', attendees: '800+', interests: ['Audition', 'Talent Show', 'Vocal'] },
    { id: 's2', name: 'Jazz & Blues Night', date: '2025-09-18', location: 'Goa', description: 'An evening of soulful melodies.', price: '$45', attendees: '250+', interests: ['Jazz', 'Blues', 'Concert'] },
    { id: 's3', name: 'Classical Music Concert', date: '2025-10-12', location: 'Varanasi', description: 'Traditional Indian classical music.', price: '$30', attendees: '200+', interests: ['Classical', 'Concert', 'Indian Music'] },
    { id: 's4', name: 'Rock Band Competition', date: '2025-11-08', location: 'Mumbai', description: 'Battle of the bands - rock edition.', price: '$25', attendees: '600+', interests: ['Rock', 'Competition', 'Live Music'] },
    { id: 's5', name: 'A Capella Festival', date: '2025-12-10', location: 'Pune', description: 'Harmony without instruments.', price: '$20', attendees: '180+', interests: ['A Capella', 'Festival', 'Vocal'] },
    { id: 's6', name: 'Folk Music Gathering', date: '2025-01-15', location: 'Jaipur', description: 'Celebrate regional folk music.', price: '$15', attendees: '120+', interests: ['Folk Music', 'Cultural', 'Traditional'] },
  ],
  business: [
    { id: 'b1', name: 'Startup Pitch Fest', date: '2025-11-01', location: 'Gurgaon', description: 'Present your startup idea to investors.', price: '$100', attendees: '300+', interests: ['Startup', 'Pitch', 'Investment'] },
    { id: 'b2', name: 'Leadership Summit', date: '2025-12-05', location: 'Chennai', description: 'Insights from industry leaders.', price: '$150', attendees: '400+', interests: ['Leadership', 'Summit', 'Strategy'] },
    { id: 'b3', name: 'Digital Marketing Conference', date: '2025-01-20', location: 'Mumbai', description: 'Learn the latest in digital marketing.', price: '$75', attendees: '250+', interests: ['Digital Marketing', 'Conference', 'Marketing'] },
    { id: 'b4', name: 'E-commerce Workshop', date: '2025-02-15', location: 'Bangalore', description: 'Build and scale your online business.', price: '$50', attendees: '180+', interests: ['E-commerce', 'Workshop', 'Online Business'] },
    { id: 'b5', name: 'Finance & Investment Forum', date: '2025-03-10', location: 'Delhi', description: 'Investment strategies and market insights.', price: '$120', attendees: '350+', interests: ['Finance', 'Investment', 'Forum'] },
    { id: 'b6', name: 'HR Innovation Summit', date: '2025-04-05', location: 'Hyderabad', description: 'Future of work and HR technology.', price: '$80', attendees: '200+', interests: ['HR', 'Innovation', 'Summit'] },
  ],
  sports: [
    { id: 'sp1', name: 'City Marathon', date: '2025-10-05', location: 'Delhi', description: 'Run for a cause and test your endurance.', price: '$25', attendees: '5000+', interests: ['Marathon', 'Running', 'Fitness'] },
    { id: 'sp2', name: 'Badminton Championship', date: '2025-09-22', location: 'Hyderabad', description: 'Local badminton tournament.', price: '$15', attendees: '200+', interests: ['Badminton', 'Competition', 'Indoor Sports'] },
    { id: 'sp3', name: 'Cricket Premier League', date: '2025-11-15', location: 'Mumbai', description: 'Corporate cricket tournament.', price: 'Free', attendees: '1000+', interests: ['Cricket', 'League', 'Team Sports'] },
    { id: 'sp4', name: 'Swimming Competition', date: '2025-12-08', location: 'Chennai', description: 'Annual swimming championship.', price: '$20', attendees: '150+', interests: ['Swimming', 'Competition', 'Aquatics'] },
    { id: 'sp5', name: 'Basketball Tournament', date: '2025-01-25', location: 'Pune', description: 'Inter-college basketball championship.', price: '$10', attendees: '300+', interests: ['Basketball', 'Tournament', 'College Sports'] },
    { id: 'sp6', name: 'Yoga & Wellness Retreat', date: '2025-02-20', location: 'Rishikesh', description: 'Mind and body wellness program.', price: '$60', attendees: '100+', interests: ['Yoga', 'Wellness', 'Retreat'] },
  ],
  'art-culture': [
    { id: 'ac1', name: 'National Art Exhibition', date: '2025-08-20', location: 'Jaipur', description: 'Showcasing contemporary Indian art.', price: '$20', attendees: '500+', interests: ['Art', 'Exhibition', 'Visual Arts'] },
    { id: 'ac2', name: 'Folk Music Gala', date: '2025-09-07', location: 'Kolkata', description: 'Experience traditional Indian folk music.', price: '$30', attendees: '400+', interests: ['Folk Music', 'Gala', 'Cultural'] },
    { id: 'ac3', name: 'Photography Workshop', date: '2025-10-25', location: 'Mumbai', description: 'Learn professional photography techniques.', price: '$40', attendees: '120+', interests: ['Photography', 'Workshop', 'Creative'] },
    { id: 'ac4', name: 'Poetry Slam', date: '2025-11-18', location: 'Delhi', description: 'Express yourself through poetry.', price: '$15', attendees: '200+', interests: ['Poetry', 'Slam', 'Literature'] },
    { id: 'ac5', name: 'Theater Festival', date: '2025-12-12', location: 'Bangalore', description: 'Contemporary theater performances.', price: '$35', attendees: '300+', interests: ['Theater', 'Festival', 'Drama'] },
    { id: 'ac6', name: 'Craft & Design Fair', date: '2025-01-30', location: 'Chennai', description: 'Handmade crafts and design showcase.', price: '$25', attendees: '250+', interests: ['Craft', 'Design', 'Fair'] },
  ],
  food: [
    { id: 'f1', name: 'International Food Fest', date: '2025-08-01', location: 'Mumbai', description: 'Taste cuisines from around the world.', interests: ['Food', 'Festival', 'International Cuisine'] },
    { id: 'f2', name: 'Street Food Carnival', date: '2025-09-05', location: 'Amritsar', description: 'Explore local street food delights.', interests: ['Food', 'Carnival', 'Street Food'] },
  ],
};

// Expand each category to ~22 events deterministically
for (const key of Object.keys(eventsByCategory)) {
  const prefix = key === 'art-culture' ? 'ac' : key === 'sports' ? 'sp' : key.charAt(0);
  eventsByCategory[key] = expand(eventsByCategory[key], prefix, 22);
}

export const allEvents = Object.entries(eventsByCategory).flatMap(([category, events]) =>
  events.map((e) => ({ ...e, category }))
);


