import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseList from './CourseList';
import Testimonial from './Testimonial'; // Import the testimonial component

/**
 * Home page that displays an enhanced hero banner, a styled search bar,
 * a featured courses section, and the testimonials component.
 */
const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle changes to the search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      {/* Hero Banner Section */}
      <section className="position-relative">
        <div
          className="bg-image"
          style={{
            backgroundImage: "url('/images/hero-banner.jpg')",
            height: '500px',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="position-absolute top-50 start-50 translate-middle text-center bg-dark bg-opacity-50 p-5 rounded">
            <h1 className="display-4 text-white fw-bold">
              Welcome to I Tech Courses
            </h1>
            <p className="lead text-white-50 mt-3">
              Discover, learn, and excel in your career.
            </p>
            <Link to="/register" className="btn btn-primary btn-lg mt-4">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search for courses..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="container mb-5">
        <div className="text-center mb-4">
          <h2 className="fw-bold">Featured Courses</h2>
          <p className="text-muted">
            Explore our top-rated courses curated for your success.
          </p>
        </div>
        <CourseList searchQuery={searchQuery} featuredOnly={true} />
        <div className="text-center mt-4">
          <Link to="/courses" className="btn btn-outline-primary">
            View All Courses
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonial />
    </div>
  );
};

export default Home;
