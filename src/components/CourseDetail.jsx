import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { CartContext } from '../context/CartContext';

/**
 * Displays detailed information for a specific course using a modern, tabbed layout.
 */
const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load course details.');
      }
    };

    fetchCourse();
  }, [id]);

  if (error)
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );

  if (!course)
    return (
      <div className="container my-5">
        <div className="text-center">Loading...</div>
      </div>
    );

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        {course.image && (
          <img
            src={course.image}
            className="card-img-top"
            alt={course.title}
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
        )}
        <div className="card-body">
          <div className="mb-3">
            <h2 className="card-title">{course.title}</h2>
            {/* Placeholder for course rating */}
            <div className="mb-2">
              <small className="text-muted">Rating: 4.5 / 5</small>
            </div>
          </div>
          {/* Tab Navigation */}
          <ul className="nav nav-tabs mb-4" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
                type="button"
                role="tab"
              >
                Overview
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
                type="button"
                role="tab"
              >
                Reviews & Syllabus
              </button>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="tab-pane fade show active">
                <p className="card-text">{course.description}</p>
                <p className="card-text">
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                <p className="card-text">
                  <strong>Price:</strong> ${course.price.toFixed(2)}
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="tab-pane fade show active">
                {/* Placeholder content for reviews and syllabus */}
                <h5>Course Syllabus</h5>
                <p>Coming soon...</p>
                <h5>Student Reviews</h5>
                <p>Coming soon...</p>
              </div>
            )}
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-between mt-4">
            <Link to="/courses" className="btn btn-outline-secondary mb-2 mb-md-0">
              &laquo; Back to Courses
            </Link>
            <div>
              <button
                className="btn btn-success me-2"
                onClick={() => {
                  /* Placeholder: Add enrollment logic here */
                  alert('Enroll Now clicked');
                }}
              >
                Enroll Now
              </button>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(course)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
