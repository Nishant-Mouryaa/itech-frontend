import React from 'react';
import { Link } from 'react-router-dom';
import { FaChalkboardTeacher, FaStar } from 'react-icons/fa';
import './InstructorListPage.css';

// Sample data - in a real app, this would come from an API
const instructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Senior Software Engineer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    specialty: "React, AWS, Machine Learning",
    rating: 4.9,
    courses: 12,
    students: 15000
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Data Science Lead",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    specialty: "Python, Data Analysis, AI",
    rating: 4.8,
    courses: 8,
    students: 8500
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    title: "UX/UI Design Expert",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    specialty: "Figma, User Research, Prototyping",
    rating: 4.7,
    courses: 5,
    students: 6200
  },
  {
    id: 4,
    name: "David Kim",
    title: "Cloud Architect",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    specialty: "AWS, Azure, DevOps",
    rating: 4.9,
    courses: 7,
    students: 11000
  }
];

const InstructorListPage = () => {
  return (
    <div className="instructor-list-page">
      <header className="page-header">
        <div className="container">
          <h1>Our Expert Instructors</h1>
          <p>Learn from industry professionals with real-world experience</p>
        </div>
      </header>

      <div className="container">
        <div className="instructor-grid">
          {instructors.map(instructor => (
            <Link 
              to={`/instructors/${instructor.id}`} 
              key={instructor.id} 
              className="instructor-card"
            >
              <div className="card-avatar">
                <img src={instructor.avatar} alt={instructor.name} />
                <div className="avatar-badge">
                  <FaChalkboardTeacher />
                </div>
              </div>
              <div className="card-body">
                <h3>{instructor.name}</h3>
                <p className="title">{instructor.title}</p>
                <p className="specialty">{instructor.specialty}</p>
                
                <div className="card-stats">
                  <div className="stat">
                    <FaStar className="star-icon" />
                    <span>{instructor.rating}</span>
                  </div>
                  <div className="stat">
                    <span>{instructor.courses} courses</span>
                  </div>
                  <div className="stat">
                    <span>{instructor.students.toLocaleString()} students</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorListPage;