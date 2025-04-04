import React from 'react';
import { useParams } from 'react-router-dom';
import { FaChalkboardTeacher, FaLinkedin, FaTwitter, FaGithub, FaGlobe, FaStar } from 'react-icons/fa';
import { MdEmail, MdSchool, MdWork } from 'react-icons/md';
import CourseCard from '../components/CourseCard';
import './InstructorProfilePage.css';

// Sample data - in a real app, this would come from an API based on the ID
const getInstructorData = (id) => {
  const instructors = {
    1: {
      id: 1,
      name: "Dr. Sarah Johnson",
      title: "Senior Software Engineer & Educator",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "With over 15 years of experience in software development and education, Sarah specializes in making complex technical concepts accessible to learners of all levels. She holds a PhD in Computer Science from MIT and has worked at leading tech companies including Google and Amazon.",
      experience: [
        { role: "Senior Software Engineer", company: "Google", years: "2015-2020" },
        { role: "Tech Lead", company: "Amazon", years: "2010-2015" },
        { role: "Software Developer", company: "Microsoft", years: "2005-2010" }
      ],
      education: [
        { degree: "PhD in Computer Science", institution: "MIT", year: "2005" },
        { degree: "MSc in Software Engineering", institution: "Stanford", year: "2001" }
      ],
      courses: [
        { id: 101, title: "Advanced React Patterns", students: 1245, rating: 4.9 },
        { id: 102, title: "Cloud Architecture with AWS", students: 892, rating: 4.8 },
        { id: 103, title: "Machine Learning Fundamentals", students: 2103, rating: 4.7 }
      ],
      social: {
        linkedin: "https://linkedin.com/sarahjohnson",
        twitter: "https://twitter.com/sarahjohnson",
        github: "https://github.com/sarahjohnson",
        website: "https://sarahjohnson.dev"
      },
      stats: {
        rating: 4.9,
        reviews: 1248,
        students: 15000
      }
    }
  };
  return instructors[id] || null;
};

const InstructorProfilePage = () => {
  const { id } = useParams();
  const instructor = getInstructorData(id);

  if (!instructor) {
    return <div className="container">Instructor not found</div>;
  }

  return (
    <div className="instructor-profile-page">
      {/* Hero Section */}
      <section className="instructor-hero">
        <div className="container">
          <div className="hero-content">
            <div className="avatar-container">
              <img src={instructor.avatar} alt={instructor.name} className="instructor-avatar" />
              <div className="avatar-badge">
                <FaChalkboardTeacher />
              </div>
            </div>
            <div className="hero-text">
              <h1>{instructor.name}</h1>
              <p className="title">{instructor.title}</p>
              <div className="stats">
                <div className="stat-item">
                  <span className="stat-value">{instructor.stats.rating}</span>
                  <span className="stat-label">Rating</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{instructor.stats.reviews.toLocaleString()}+</span>
                  <span className="stat-label">Reviews</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{instructor.stats.students.toLocaleString()}+</span>
                  <span className="stat-label">Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container instructor-main">
        <div className="instructor-content">
          {/* Left Column */}
          <div className="left-column">
            {/* Bio Section */}
            <section className="bio-section">
              <h2>About Me</h2>
              <p>{instructor.bio}</p>
              
              {/* Experience */}
              <div className="info-section">
                <h3>
                  <MdWork className="section-icon" />
                  Experience
                </h3>
                <ul className="experience-list">
                  {instructor.experience.map((exp, index) => (
                    <li key={index}>
                      <h4>{exp.role}</h4>
                      <p>{exp.company} • {exp.years}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Education */}
              <div className="info-section">
                <h3>
                  <MdSchool className="section-icon" />
                  Education
                </h3>
                <ul className="education-list">
                  {instructor.education.map((edu, index) => (
                    <li key={index}>
                      <h4>{edu.degree}</h4>
                      <p>{edu.institution} • {edu.year}</p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="social-links">
                <h3>Connect With Me</h3>
                <div className="social-icons">
                  <a href={instructor.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                  </a>
                  <a href={instructor.social.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                  </a>
                  <a href={instructor.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                  <a href={instructor.social.website} target="_blank" rel="noopener noreferrer">
                    <FaGlobe />
                  </a>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Courses Section */}
            <section className="courses-section">
              <h2>My Courses</h2>
              <div className="course-list">
                {instructor.courses.map(course => (
                  <CourseCard 
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    students={course.students}
                    rating={course.rating}
                    instructor={instructor}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfilePage;