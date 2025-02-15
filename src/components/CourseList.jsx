// frontend/src/components/CourseList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

/**
 * Fetches and lists courses dynamically from the backend.
 * Optionally, you can filter courses based on a search query.
 */
const CourseList = ({ searchQuery = '', featuredOnly = false }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Build query parameters if needed, e.g., search or featured filters.
        let endpoint = '/api/courses';
        const params = [];
        if (searchQuery) {
          params.push(`search=${encodeURIComponent(searchQuery)}`);
        }
        if (featuredOnly) {
          params.push(`featured=true`);
        }
        if (params.length) {
          endpoint += '?' + params.join('&');
        }

        const res = await axios.get(endpoint);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [searchQuery, featuredOnly]);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!courses.length) return <p>No courses found.</p>;

  return (
    <div className="row">
      {courses.map((course) => (
        <div key={course._id} className="col-md-4 mb-4">
          <div className="card h-100 shadow-sm">
            {course.image && (
              <img
                src={course.image}
                className="card-img-top"
                alt={course.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              <h5 className="card-title">{course.title}</h5>
              <p className="card-text">
                {course.description.substring(0, 100)}...
              </p>
              <p className="fw-bold">${course.price.toFixed(2)}</p>
              <a href={`/course/${course._id}`} className="btn btn-primary">
                View Details
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
