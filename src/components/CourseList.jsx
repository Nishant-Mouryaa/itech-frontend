import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

/**
 * Fetches and lists courses dynamically with basic search/filter options.
 */
const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get('/api/courses');
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {courses.map(course => (
        <div key={course._id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{course.title}</h2>
          <p>{course.description.substring(0, 100)}...</p>
          <p className="font-bold">${course.price}</p>
          <a href={`/course/${course._id}`} className="text-blue-500">
            View Details
          </a>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
 
