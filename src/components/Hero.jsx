import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-background">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="hero-title">
                  Transform Your Career with <span className="highlight">I Tech</span>
                </h1>
                <p className="hero-subtitle">
                  Master in-demand skills with our expert-led online courses
                </p>
                <div className="hero-cta">
                  <Link to="/register" className="hero-button primary">
                    Start Learning Free
                  </Link>
                  <Link to="/courses" className="hero-button outline">
                    Explore Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;