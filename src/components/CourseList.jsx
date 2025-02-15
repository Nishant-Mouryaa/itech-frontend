import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import './CourseList.css'; // Import custom CSS for additional spacing and hover effects

/**
 * Fetches and lists courses dynamically from the backend.
 * Optionally filters courses based on search and featured flags.
 */
const CourseList = ({ searchQuery = '', featuredOnly = false }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('default');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Build query parameters if needed.
        let endpoint = '/api/courses';
        const params = [];
        if (searchQuery) {
          params.push(`search=${encodeURIComponent(searchQuery)}`);
        }
        if (featuredOnly) {
          params.push(`featured=true`);
        }
        if (sortOption !== 'default') {
          params.push(`sort=${sortOption}`);
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
  }, [searchQuery, featuredOnly, sortOption]);

  if (loading)
    return (
      <div className="d-flex justify-content-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return <p className="text-danger text-center my-5">{error}</p>;
  if (!courses.length)
    return <p className="text-center my-5">No courses found.</p>;

  return (
    <div>
      {/* Sorting Dropdown */}
      <div className="d-flex justify-content-end mb-3">
        <select
          className="form-select w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Sort by</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="titleAsc">Title: A to Z</option>
          <option value="titleDesc">Title: Z to A</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm course-card-custom">
              {course.image ? (
                <img
                  src={course.image}
                  className="card-img-top"
                  alt={course.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              ) : (
                <div
                  className="bg-secondary d-flex align-items-center justify-content-center"
                  style={{ height: '200px', color: '#fff' }}
                >
                  No Image Available
                </div>
              )}
              <div className="card-body p-4">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text flex-grow-1">
                  {course.description.substring(0, 100)}...
                </p>
                <p className="fw-bold">${course.price.toFixed(2)}</p>
                <a href={`/course/${course._id}`} className="btn btn-primary mt-3 w-100">
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
