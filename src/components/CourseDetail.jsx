import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { CartContext } from '../context/CartContext';

/**
 * Displays detailed information for a specific course using a Bootstrap card.
 */
const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
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
          <h2 className="card-title mb-3">{course.title}</h2>
          <p className="card-text">{course.description}</p>
          <p className="card-text">
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ${course.price.toFixed(2)}
          </p>
          {/* Placeholder for additional course details such as reviews or syllabus */}
          {/* <div className="mt-4">
            <h5>Course Reviews</h5>
            <p>Coming soon...</p>
          </div> */}
          <div className="d-flex justify-content-between mt-4">
            <Link to="/courses" className="btn btn-outline-secondary">
              &laquo; Back to Courses
            </Link>
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
  );
};

export default CourseDetail;
