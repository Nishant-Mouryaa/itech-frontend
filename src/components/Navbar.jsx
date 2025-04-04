import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  FaUserGraduate, 
  FaShoppingCart, 
  FaChevronDown, 
  FaSearch,
  FaTimes,
  FaUserCircle
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState(3); // Would normally come from context
  const searchRef = useRef(null);
  
  const isHomePage = location.pathname === '/';

  // Handle scroll effect
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

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target) && 
          !event.target.closest('.search-toggle')) {
        setSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const navbarClasses = `navbar navbar-expand-lg fixed-top ${
    isHomePage && !scrolled ? 'navbar-transparent' : 'navbar-solid'
  } ${mobileMenuOpen ? 'mobile-menu-open' : ''}`;

  // Animation variants
  const menuVariants = {
    open: { 
      opacity: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <nav className={navbarClasses}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <span className="logo-icon"><FaUserGraduate /></span>
          <span className="logo-text">I-Tech</span>
          <span className="logo-suffix">Academy</span>
        </Link>

        {/* Enhanced Search Bar */}
        <div className={`search-container ${searchOpen ? 'open' : ''}`} ref={searchRef}>
          <motion.div 
            className="search-bar"
            initial={{ width: 0 }}
            animate={{ width: searchOpen ? '100%' : 0 }}
            transition={{ duration: 0.3 }}
          >
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={searchOpen}
            />
            <button 
              className="search-button" 
              onClick={() => searchQuery && console.log('Search:', searchQuery)}
            >
              <FaSearch />
            </button>
            <button 
              className="search-close" 
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <FaTimes />
            </button>
          </motion.div>
        </div>

        <div className="navbar-actions">
          <button 
            className="search-toggle" 
            onClick={() => {
              setSearchOpen(!searchOpen);
              setMobileMenuOpen(false);
            }}
            aria-label={searchOpen ? "Close search" : "Open search"}
          >
            {searchOpen ? <FaTimes /> : <FaSearch />}
          </button>
          
          <button
            className={`navbar-toggler ${mobileMenuOpen ? 'open' : ''}`}
            type="button"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setSearchOpen(false);
            }}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <AnimatePresence>
          {(mobileMenuOpen || window.innerWidth > 991) && (
            <motion.div
              className={`navbar-collapse ${mobileMenuOpen ? 'show' : ''}`}
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink 
                    end 
                    className="nav-link" 
                    to="/" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
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
                    <Link 
                      className="dropdown-item" 
                      to="/courses/programming" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Programming
                    </Link>
                    <Link 
                      className="dropdown-item" 
                      to="/courses/design" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Design
                    </Link>
                    <Link 
                      className="dropdown-item" 
                      to="/courses/business" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Business
                    </Link>
                    <Link 
                      className="dropdown-item" 
                      to="/courses/data-science" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Data Science
                    </Link>
                  </div>
                </li>
                
                <li className="nav-item">
                  <NavLink 
                    className="nav-link" 
                    to="/instructors" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Instructors
                  </NavLink>
                </li>
                
                <li className="nav-item">
                  <NavLink 
                    className="nav-link cart-link" 
                    to="/cart" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaShoppingCart />
                    {cartItems > 0 && (
                      <span className="cart-count">{cartItems > 9 ? '9+' : cartItems}</span>
                    )}
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
                      {user.avatar ? (
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="user-avatar"
                        />
                      ) : (
                        <FaUserCircle className="user-avatar default-avatar" />
                      )}
                      <span className="user-name">{user.name}</span>
                      <FaChevronDown className="dropdown-arrow" />
                    </div>
                    <div className="dropdown-menu dropdown-menu-end">
                      <Link 
                        className="dropdown-item" 
                        to="/dashboard" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Dashboard
                      </Link>
                      <Link 
                        className="dropdown-item" 
                        to="/profile" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      {user.role === 'admin' && (
                        <Link 
                          className="dropdown-item" 
                          to="/admin" 
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Admin Panel
                        </Link>
                      )}
                      <div className="dropdown-divider"></div>
                      <button 
                        className="dropdown-item" 
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink 
                        className="nav-link" 
                        to="/login" 
                        onClick={() => setMobileMenuOpen(false)}
                      >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;