import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaGithub, FaApple } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import './RegisterPage.css';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' // Default role
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSocialRegister = (provider) => {
    // Implement social registration functionality
    console.log(`Registering with ${provider}`);
  };

  return (
    <div className="register-container">
      <div className="register-illustration">
        <div className="illustration-content">
          <h1>Join EduTech Academy</h1>
          <p className="subtitle">
            Start your learning journey with access to 500+ courses taught by industry experts.
          </p>
          
          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">🎓</div>
              <div>
                <h4>Personalized Learning Path</h4>
                <p>Courses tailored to your career goals</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🏆</div>
              <div>
                <h4>Industry-Recognized Certificates</h4>
                <p>Boost your resume with valuable credentials</p>
              </div>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">👨‍💻</div>
              <div>
                <h4>Hands-On Projects</h4>
                <p>Build a portfolio of real-world applications</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              "After completing the Full Stack Developer program, I landed my dream job at a tech startup with a 40% salary increase!"
            </div>
            <div className="testimonial-author">
              <img 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Michael Chen" 
                className="author-avatar"
              />
              <div className="author-info">
                <div className="author-name">Michael Chen</div>
                <div className="author-title">Full Stack Developer at TechStart</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="register-form-container">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Start your learning journey today</p>
          </div>

          {error && (
            <div className="error-message">
              <FiAlertCircle className="error-icon" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name" className="input-label">
                Full Name
              </label>
              <div className="input-with-icon">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="form-input"
                />
              </div>
            </div>

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
                  type={showPassword.password ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min 8 chars)"
                  required
                  className="form-input"
                  minLength="8"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('password')}
                  aria-label={showPassword.password ? "Hide password" : "Show password"}
                >
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="input-label">
                Confirm Password
              </label>
              <div className="input-with-icon">
                <FaLock className="input-icon" />
                <input
                  type={showPassword.confirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  className="form-input"
                  minLength="8"
                />
                <button 
                  type="button" 
                  className="password-toggle"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  aria-label={showPassword.confirmPassword ? "Hide password" : "Show password"}
                >
                  {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="role" className="input-label">
                I am registering as:
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="professional">Working Professional</option>
              </select>
            </div>

            <div className="form-check">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                required
                className="form-check-input"
              />
              <label htmlFor="terms" className="form-check-label">
                I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
              </label>
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
                  Create Account
                  {isHovered && <span className="hover-effect"></span>}
                </>
              )}
            </button>

            <div className="divider">
              <span>or sign up with</span>
            </div>

            <div className="social-logins">
              <button 
                type="button" 
                className="social-btn google"
                onClick={() => handleSocialRegister('google')}
              >
                <FaGoogle />
                Google
              </button>
              <button 
                type="button" 
                className="social-btn github"
                onClick={() => handleSocialRegister('github')}
              >
                <FaGithub />
                GitHub
              </button>
              <button 
                type="button" 
                className="social-btn apple"
                onClick={() => handleSocialRegister('apple')}
              >
                <FaApple />
                Apple
              </button>
            </div>

            <div className="form-footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;