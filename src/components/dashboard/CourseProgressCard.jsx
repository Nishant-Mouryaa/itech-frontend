import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import './CourseProgressCard.css';

const CourseProgressCard = ({ course }) => {
  return (
    <div className="course-progress-card">
      <div className="course-image">
        <img src={course.image} alt={course.title} />
        <div className="progress-overlay">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
          <span className="progress-text">{course.progress}% complete</span>
        </div>
      </div>
      <div className="course-content">
        <h3>{course.title}</h3>
        <p className="instructor">By {course.instructor}</p>
        <div className="next-lesson">
          <FaPlayCircle className="play-icon" />
          <span>Next: {course.nextLesson}</span>
        </div>
        <div className="course-actions">
          <Link 
            to={`/course/${course.id}/continue`} 
            className="continue-btn"
          >
            Continue
          </Link>
          <Link 
            to={`/course/${course.id}`} 
            className="view-btn"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseProgressCard;