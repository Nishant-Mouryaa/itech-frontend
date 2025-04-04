import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const CourseCard = ({ id, title, students, rating, instructor }) => {
  return (
    <div className="course-card">
      <div className="course-info">
        <h3>{title}</h3>
        <div className="course-meta">
          <div className="rating">
            <FaStar className="star-icon" />
            <span>{rating}</span>
          </div>
          <span className="students">{students.toLocaleString()} students</span>
        </div>
        <div className="instructor-mini">
          <img src={instructor.avatar} alt={instructor.name} className="mini-avatar" />
          <span>{instructor.name}</span>
        </div>
      </div>
      <Link to={`/courses/${id}`} className="btn btn-outline">
        View Course
      </Link>
    </div>
  );
};

export default CourseCard;