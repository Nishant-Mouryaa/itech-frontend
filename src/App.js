import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CoursePage from './components/CoursePage';
import CourseDetail from './components/CourseDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import Register from './components/Register';
import AdminPanel from './components/AdminPanel';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import CartDebug from './components/CartDebug'; // Debug component



import InstructorListPage from './components/InstructorListPage';
import InstructorProfilePage from './components/InstructorProfilePage';
import { CartProvider } from './context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import DashboardHome from './components/dashboard/DashboardHome';
import MyCourses from './components/dashboard/MyCourses';
import Learning from './components/dashboard/Learning';
import Progress from './components/dashboard/Progress';
import DashboardCart from './components/dashboard/Cart';
import Profile from './components/dashboard/Profile';
import Settings from './components/dashboard/Settings';

// Inside your Routes component


const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/instructors" element={<InstructorListPage />} />
          <Route path="/instructor/:id" element={<InstructorProfilePage />} />
          <Route path="/cart-debug" element={<CartDebug />} /> {/* Debugging component */}

          {/* Dashboard & nested pages */}
          <Route path="/dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
  <Route path="my-courses" element={<MyCourses />} />
  <Route path="learning" element={<Learning />} />
  <Route path="progress" element={<Progress />} />
  <Route path="cart" element={<DashboardCart />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>

        </Routes>

        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;