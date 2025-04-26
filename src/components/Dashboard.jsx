import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  FaBook, 
  FaHome, 
  FaUser, 
  FaShoppingCart, 
  FaGraduationCap, 
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaBell,
  FaSearch,
  FaChevronRight,
  FaChevronLeft
} from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const [hoveringSidebar, setHoveringSidebar] = useState(false);

  // Set active tab based on current route
  useEffect(() => {
    const path = location.pathname.split('/')[2] || 'dashboard';
    setActiveTab(path);
  }, [location]);

  // Close mobile sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    // Save preference to localStorage
    localStorage.setItem('sidebarCollapsed', !sidebarOpen);
  };

  // Initialize sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setSidebarOpen(savedState === 'false');
    }
  }, []);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const navItems = [
    { path: 'dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: 'my-courses', icon: <FaBook />, label: 'My Courses' },
    { path: 'learning', icon: <FaGraduationCap />, label: 'Learning' },
    { path: 'progress', icon: <FaChartLine />, label: 'Progress' },
    { path: 'cart', icon: <FaShoppingCart />, label: 'Cart' },
    { path: 'profile', icon: <FaUser />, label: 'Profile' },
    { path: 'settings', icon: <FaCog />, label: 'Settings' },
  ];

  // Determine if we should show tooltips (sidebar collapsed but user hovering)
  const shouldShowTooltip = !sidebarOpen && hoveringSidebar;

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-collapsed'}`}>
      {/* Desktop Sidebar */}
      <aside 
        className={`dashboard-sidebar ${sidebarOpen ? 'open' : 'collapsed'} ${hoveringSidebar ? 'hovering' : ''}`}
        onMouseEnter={() => setHoveringSidebar(true)}
        onMouseLeave={() => setHoveringSidebar(false)}
      >
        <div className="sidebar-header">
          <Link to="/dashboard" className="logo">
            <span className="logo-icon">🎓</span>
            {(sidebarOpen || hoveringSidebar) && <span className="logo-text">EduTech</span>}
          </Link>
          <button 
            className="sidebar-toggle" 
            onClick={toggleSidebar}
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            data-tooltip-id="sidebar-toggle-tooltip"
            data-tooltip-content={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
          <Tooltip id="sidebar-toggle-tooltip" place="right" />
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={`/dashboard/${item.path}`}
                  className={`nav-item ${activeTab === item.path ? 'active' : ''}`}
                  data-tooltip-id={`nav-tooltip-${item.path}`}
                  data-tooltip-content={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {(sidebarOpen || hoveringSidebar) && <span className="nav-label">{item.label}</span>}
                  <Tooltip 
                    id={`nav-tooltip-${item.path}`} 
                    place="right" 
                    delayShow={300}
                    disable={!shouldShowTooltip}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="logout-btn" 
            onClick={handleLogout}
            title="Logout"
            data-tooltip-id="logout-tooltip"
            data-tooltip-content="Logout"
          >
            <FaSignOutAlt className="logout-icon" />
            {(sidebarOpen || hoveringSidebar) && <span>Logout</span>}
            <Tooltip id="logout-tooltip" place="right" disable={!shouldShowTooltip} />
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div 
          className="mobile-sidebar-overlay"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`mobile-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/dashboard" className="logo" onClick={toggleMobileSidebar}>
            <span className="logo-icon">🎓</span>
            <span className="logo-text">EduTech</span>
          </Link>
          <button 
            className="sidebar-toggle" 
            onClick={toggleMobileSidebar}
            aria-label="Close sidebar"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={`/dashboard/${item.path}`}
                  className={`nav-item ${activeTab === item.path ? 'active' : ''}`}
                  onClick={toggleMobileSidebar}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button 
            className="logout-btn" 
            onClick={handleLogout}
          >
            <FaSignOutAlt className="logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Navigation */}
        <header className="dashboard-header">
          <div className="header-left">
            <button 
              className="mobile-sidebar-toggle" 
              onClick={toggleMobileSidebar}
              aria-label="Toggle sidebar"
            >
              <FaBars />
            </button>
            <h1 className="page-title">
              {navItems.find(item => item.path === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="header-right">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search courses, resources..." 
                className="search-input"
              />
            </div>
            
            <button className="notification-btn" aria-label="Notifications">
              <FaBell />
              {unreadNotifications > 0 && (
                <span className="notification-badge">{unreadNotifications}</span>
              )}
            </button>

            <div className="user-profile">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="user-avatar" />
              ) : (
                <div className="avatar-placeholder">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="user-name">{user?.name}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;