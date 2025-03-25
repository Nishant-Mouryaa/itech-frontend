import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseList from './CourseList';
import Testimonial from './Testimonial';
import Hero from './Hero'; // Import the new Hero component

/**
 * Home page that displays an enhanced hero banner (with gradient background),
 * a styled search bar, a featured courses section, and the testimonials component.
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
      <Hero />

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
