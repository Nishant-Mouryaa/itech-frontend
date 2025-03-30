import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUserGraduate, FaShoppingCart, FaChevronDown, FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const navbarClasses = `navbar navbar-expand-lg fixed-top ${
    isHomePage && !scrolled ? 'navbar-transparent' : 'navbar-solid'
  } ${mobileMenuOpen ? 'mobile-menu-open' : ''}`;

  return (
    <nav className={navbarClasses}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="logo-icon"><FaUserGraduate /></span>
          <span className="logo-text">EduTech</span>
          <span className="logo-suffix">Academy</span>
        </Link>

        <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
          <input
            type="text"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>

        <div className="navbar-actions">
          <button 
            className="search-toggle" 
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Toggle search"
          >
            <FaSearch />
          </button>
          
          <button
            className={`navbar-toggler ${mobileMenuOpen ? 'open' : ''}`}
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className={`collapse navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink end className="nav-link" to="/" onClick={() => setMobileMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            
            <li className="nav-item dropdown">
              <NavLink 
                className="nav-link dropdown-toggle" 
                to="/courses"
                onClick={(e) => {
                  if (window.innerWidth < 992) {
                    e.preventDefault();
                    const dropdown = e.currentTarget.closest('.nav-item');
                    dropdown.classList.toggle('show');
                  } else {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                Courses <FaChevronDown className="dropdown-arrow" />
              </NavLink>
              <div className="dropdown-menu">
                <Link className="dropdown-item" to="/courses/programming" onClick={() => setMobileMenuOpen(false)}>
                  Programming
                </Link>
                <Link className="dropdown-item" to="/courses/design" onClick={() => setMobileMenuOpen(false)}>
                  Design
                </Link>
                <Link className="dropdown-item" to="/courses/business" onClick={() => setMobileMenuOpen(false)}>
                  Business
                </Link>
                <Link className="dropdown-item" to="/courses/data-science" onClick={() => setMobileMenuOpen(false)}>
                  Data Science
                </Link>
              </div>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/instructors" onClick={() => setMobileMenuOpen(false)}>
                Instructors
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link cart-link" to="/cart" onClick={() => setMobileMenuOpen(false)}>
                <FaShoppingCart />
                <span className="cart-count">3</span>
              </NavLink>
            </li>

            {user ? (
              <li className="nav-item dropdown">
                <div 
                  className="nav-link user-profile"
                  onClick={(e) => {
                    if (window.innerWidth < 992) {
                      e.preventDefault();
                      const dropdown = e.currentTarget.closest('.nav-item');
                      dropdown.classList.toggle('show');
                    }
                  }}
                >
                  <img 
                    src={user.avatar || 'https://via.placeholder.com/30'} 
                    alt={user.name} 
                    className="user-avatar"
                  />
                  <span className="user-name">{user.name}</span>
                  <FaChevronDown className="dropdown-arrow" />
                </div>
                <div className="dropdown-menu dropdown-menu-end">
                  <Link className="dropdown-item" to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    My Dashboard
                  </Link>
                  <Link className="dropdown-item" to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    My Profile
                  </Link>
                  {user.role === 'admin' && (
                    <Link className="dropdown-item" to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      Admin Panel
                    </Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/login" onClick={() => setMobileMenuOpen(false)}>
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className="nav-link btn btn-primary signup-btn" 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign Up
                  </NavLink>
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