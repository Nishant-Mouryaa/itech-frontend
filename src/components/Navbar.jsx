import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Check if the current route is the home page.
  const isHomePage = location.pathname === '/';
  
  // If home page, use a transparent style; otherwise, use a light background.
  const navbarClasses = isHomePage
    ? 'navbar navbar-expand-lg navbar-dark navbar-custom fixed-top'
    : 'navbar navbar-expand-lg navbar-light fixed-top navbar-solid';

  return (
    <nav className={navbarClasses}>
      <div className="container">
        <Link className="navbar-brand" to="/">I Tech</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/courses">Courses</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">Cart</NavLink>
            </li>
            {user ? (
              <>
                {user.role === 'admin' && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/admin">Admin</NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{ cursor: 'pointer' }}
                    onClick={logout}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">Register</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
