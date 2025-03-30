import React from 'react';
import CourseList from './CourseList';
import './CoursePage.css';

const CoursePage = () => {
  // Define your categories with display names and filter values
  const categories = [
    { name: 'Web Development', value: 'web' },
    { name: 'Mobile Development', value: 'mobile' },
    { name: 'Data Science', value: 'data' },
    { name: 'Cloud Computing', value: 'cloud' },
    { name: 'Cybersecurity', value: 'cybersecurity' },
  ];

  return (
    <div className="course-page">
      <header className="course-header">
        <h1>Explore IT Courses</h1>
        <p>Unlock your potential with our expertly curated courses tailored for today's tech landscape.</p>
      </header>
      <div className="course-content">
        {categories.map((cat) => (
          <section key={cat.value} className="course-section">
            <h2 className="category-title">{cat.name}</h2>
            <CourseList category={cat.value} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;
