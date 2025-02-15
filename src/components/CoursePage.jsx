import React from 'react';
import CourseList from './CourseList';

const CoursePage = () => {
  // Define your categories. Adjust the `value` to match your backend's expected category filter.
  const categories = [
    { name: 'Web Development', value: 'web' },
    { name: 'Mobile Development', value: 'mobile' },
    { name: 'Data Science', value: 'data' },
    { name: 'Cloud Computing', value: 'cloud' },
    { name: 'Cybersecurity', value: 'cybersecurity' },
  ];

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Explore IT Courses</h1>
      {categories.map((cat) => (
        <section key={cat.value} className="mb-5">
          <h2 className="mb-3">{cat.name}</h2>
          <CourseList category={cat.value} />
        </section>
      ))}
    </div>
  );
};

export default CoursePage;
