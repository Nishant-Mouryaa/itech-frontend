import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaBookOpen, 
  FaChartBar, 
  FaCalendarAlt, 
  FaCertificate,
  FaClock,
  FaStar
} from 'react-icons/fa';
import CourseProgressCard from './CourseProgressCard';
import './DashboardHome.css';

const DashboardHome = () => {
  const [activeCourses, setActiveCourses] = useState([
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      progress: 65,
      nextLesson: 'State Management with Redux',
      image: '/images/react-course.jpg'
    },
    {
      id: 2,
      title: 'Node.js Backend Fundamentals',
      instructor: 'Michael Chen',
      progress: 42,
      nextLesson: 'Building RESTful APIs',
      image: '/images/node-course.jpg'
    }
  ]);

  const [completedCourses, setCompletedCourses] = useState([
    {
      id: 3,
      title: 'JavaScript for Beginners',
      instructor: 'Emma Rodriguez',
      completedDate: '2023-05-15',
      certificate: true,
      image: '/images/js-course.jpg'
    }
  ]);

  const stats = [
    { icon: <FaBookOpen />, label: 'Active Courses', value: activeCourses.length },
    { icon: <FaCertificate />, label: 'Certificates', value: 1 },
    { icon: <FaClock />, label: 'Learning Hours', value: '47' },
    { icon: <FaStar />, label: 'Courses Rated', value: '3' }
  ];

  return (
    <div className="dashboard-home">
      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Welcome back, <span className="highlight">User</span>!</h1>
          <p className="subtitle">Continue your learning journey today</p>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-info">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="welcome-image">
          <img src="/images/dashboard-hero.png" alt="Learning illustration" />
        </div>
      </section>

      {/* Active Courses */}
      <section className="courses-section">
        <div className="section-header">
          <h2>Continue Learning</h2>
          <Link to="/dashboard/my-courses" className="view-all">
            View All Courses
          </Link>
        </div>
        
        <div className="courses-grid">
          {activeCourses.map(course => (
            <CourseProgressCard 
              key={course.id}
              course={course}
            />
          ))}
        </div>
      </section>

      {/* Completed Courses */}
      <section className="courses-section">
        <div className="section-header">
          <h2>Completed Courses</h2>
        </div>
        
        <div className="completed-courses">
          {completedCourses.map(course => (
            <div key={course.id} className="completed-course-card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
                <div className="completed-badge">Completed</div>
              </div>
              <div className="course-details">
                <h3>{course.title}</h3>
                <p className="instructor">By {course.instructor}</p>
                <div className="course-meta">
                  <span className="date">
                    <FaCalendarAlt /> Completed on {course.completedDate}
                  </span>
                  {course.certificate && (
                    <Link to={`/certificate/${course.id}`} className="certificate-link">
                      <FaCertificate /> View Certificate
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommendations */}
      <section className="recommendations-section">
        <div className="section-header">
          <h2>Recommended For You</h2>
          <Link to="/courses" className="view-all">
            Browse All Courses
          </Link>
        </div>
        
        <div className="recommendations-grid">
          {/* These would be populated with API data */}
          <div className="recommendation-card">
            <div className="recommendation-image">
              <img src="/images/cloud-course.jpg" alt="Cloud Computing" />
            </div>
            <div className="recommendation-info">
              <h3>Cloud Computing with AWS</h3>
              <p className="instructor">By David Kim</p>
              <div className="course-stats">
                <span className="rating">
                  <FaStar /> 4.8
                </span>
                <span className="students">12,450 students</span>
              </div>
              <Link to="/course/cloud-computing" className="view-course-btn">
                View Course
              </Link>
            </div>
          </div>
          
          <div className="recommendation-card">
            <div className="recommendation-image">
              <img src="/images/ux-course.jpg" alt="UX Design" />
            </div>
            <div className="recommendation-info">
              <h3>UX Design Fundamentals</h3>
              <p className="instructor">By Emma Rodriguez</p>
              <div className="course-stats">
                <span className="rating">
                  <FaStar /> 4.7
                </span>
                <span className="students">8,920 students</span>
              </div>
              <Link to="/course/ux-design" className="view-course-btn">
                View Course
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DashboardHome;