import React from 'react'
import './About.css';
import {Link} from 'react-router-dom';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About Eventura</h1>
        <p style={{fontWeight: 500, fontSize: '1.25em', color: '#a55233', marginBottom: 24}}>Empowering Connections. Inspiring Experiences.</p>
        <p><span>Eventura</span> is dedicated to curating exceptional events that bring people together, spark innovation, and celebrate creativity. From tech summits to cultural galas, our mission is to deliver memorable experiences for every passion and profession.</p>
        <p>We believe in the power of community, diversity, and inspiration. Our team works tirelessly to ensure every event is impactful, inclusive, and unforgettable.</p>
        <p style={{marginBottom: 0}}>Discover, connect, and grow with us. Explore our upcoming events and become part of a vibrant, forward-thinking community.</p>
        <div className="about-contact-info">
          <h3>Contact Us</h3>
          <p><span role="img" aria-label="email">📧</span> <b>Email:</b> info@youreventwebsite.com</p>
          <p><span role="img" aria-label="phone">📞</span> <b>Phone:</b> +91 98765 43210</p>
          <p><span role="img" aria-label="social">🌐</span> <b>Follow us:</b> @eventura_official</p>
        </div>
      </div>
      <Link to="/" className="back-to-home-button">
        &larr; Back to Home
      </Link>
    </div>
  )
}

export default About;
