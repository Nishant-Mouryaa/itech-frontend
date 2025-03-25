import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="position-relative">
      <div className="hero-background">
        <div className="hero-overlay">
          <div className="hero-content p-5 rounded">
            <h1 className="display-4 fw-bold">Unlock Your Potential with I Tech Courses</h1>
            <p className="lead mt-3">Empower Your Future Through Expert-Led, Flexible Online Learning</p>
            <Link to="/register" className="btn btn-lg mt-4 hero-button">
            Start Learning Today!
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
