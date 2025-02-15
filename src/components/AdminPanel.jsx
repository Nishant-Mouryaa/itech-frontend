import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';

/**
 * Admin Dashboard for managing users and courses (CRUD operations).
 */
const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch users and courses for admin management
    const fetchData = async () => {
      try {
        const [usersRes, coursesRes] = await Promise.all([
          axios.get('/api/admin/users'),
          axios.get('/api/courses')
        ]);
        setUsers(usersRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <section>
        <h2 className="text-2xl font-semibold">Users</h2>
        <ul>
          {users.map(user => (
            <li key={user._id} className="border p-2 my-2">
              {user.name} - {user.email} - {user.role}
            </li>
          ))}
        </ul>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Courses</h2>
        <ul>
          {courses.map(course => (
            <li key={course._id} className="border p-2 my-2">
              {course.title} - ${course.price}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
 
