import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';

/**
 * Displays detailed information for a specific course using a Bootstrap card.
 */
const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(`/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourse();
  }, [id]);

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
          <h2 className="card-title">{course.title}</h2>
          <p className="card-text">{course.description}</p>
          <p className="card-text">
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ${course.price}
          </p>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
