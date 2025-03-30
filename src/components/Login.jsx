import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaApple } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import './Login.css';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSocialLogin = (provider) => {
    // Implement social login functionality
    console.log(`Logging in with ${provider}`);
  };

  return (
    <div className="login-container">
      <div className="login-illustration">
        <div className="illustration-content">
          <h1>Welcome to EduTech Academy</h1>
          <p className="subtitle">
            Unlock your potential with our world-class online courses and expert instructors.
          </p>
          
          <div className="features-list">
            <div className="feature-item">
              <div className="feature-icon">🎓</div>
              <span>500+ Professional Courses</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">👨‍🏫</div>
              <span>Industry Expert Instructors</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <span>Learn Anytime, Anywhere</span>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              "This platform helped me transition from marketing to a full-stack developer role in just 6 months!"
            </div>
            <div className="testimonial-author">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Sarah Johnson" 
                className="author-avatar"
              />
              <div className="author-info">
                <div className="author-name">Sarah Johnson</div>
                <div className="author-title">Full-Stack Developer at TechCorp</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="login-form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Sign In</h2>
            <p>Access your personalized learning dashboard</p>
          </div>

          {error && (
            <div className="error-message">
              <FiAlertCircle className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email" className="input-label">
                Email Address
              </label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="form-input"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="form-options">
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                  Remember me
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button 
              type="submit" 
              className={`submit-btn ${loading ? 'loading' : ''}`}
              disabled={loading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {loading ? (
                <span className="spinner"></span>
              ) : (
                <>
                  Sign In
                  {isHovered && <span className="hover-effect"></span>}
                </>
              )}
            </button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="social-logins">
              <button 
                type="button" 
                className="social-btn google"
                onClick={() => handleSocialLogin('google')}
              >
                <FaGoogle />
                Google
              </button>
              <button 
                type="button" 
                className="social-btn github"
                onClick={() => handleSocialLogin('github')}
              >
                <FaGithub />
                GitHub
              </button>
              <button 
                type="button" 
                className="social-btn apple"
                onClick={() => handleSocialLogin('apple')}
              >
                <FaApple />
                Apple
              </button>
            </div>

            <div className="form-footer">
              Don't have an account? <Link to="/register">Create account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;