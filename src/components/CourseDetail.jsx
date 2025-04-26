import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { CartContext } from '../context/CartContext';
import { 
  FaStar, FaRegStar, FaStarHalfAlt, FaClock, FaUserTie, 
  FaMoneyBillWave, FaBook, FaChartBar, FaShoppingCart, 
  FaPlayCircle, FaCheck, FaVideo, FaFileAlt, FaMobileAlt, 
  FaCertificate, FaInfinity, FaChevronRight, FaChevronDown
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import ReactPlayer from 'react-player';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const { addToCart } = useContext(CartContext);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/courses/${id}`);
        setCourse(res.data);
        // Initialize all sections as collapsed
        const sections = {};
        res.data?.curriculum?.forEach((_, index) => {
          sections[index] = index === 0; // Only first section expanded by default
        });
        setExpandedSections(sections);
      } catch (err) {
        console.error(err);
        setError('Failed to load course details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star-icon" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="star-icon" />);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon" />);
      }
    }
    
    return stars;
  };

  const renderRatingDistribution = () => {
    // Sample distribution - in a real app this would come from your data
    const distribution = [
      { stars: 5, percentage: 65 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 10 },
      { stars: 2, percentage: 3 },
      { stars: 1, percentage: 2 }
    ];

    return (
      <div className="rating-distribution">
        {distribution.map((item, index) => (
          <div key={index} className="rating-bar-container">
            <div className="rating-label">
              {item.stars} <FaStar className="star-icon small" />
            </div>
            <div className="rating-bar-bg">
              <div 
                className="rating-bar-fill" 
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <div className="rating-percentage">{item.percentage}%</div>
          </div>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="course-detail-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button 
            className="btn-retry"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="course-detail-container">
      {/* Course Hero Section */}
      <section className="course-hero">
        <div className="hero-container">
          <nav aria-label="breadcrumb" className="breadcrumb-nav">
            <ol className="breadcrumb-list">
              <li className="breadcrumb-item">
                <Link to="/courses" className="breadcrumb-link">Courses</Link>
              </li>
              <li className="breadcrumb-divider">/</li>
              <li className="breadcrumb-item">
                <Link to={`/courses/${course.category}`} className="breadcrumb-link">
                  {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                </Link>
              </li>
              <li className="breadcrumb-divider">/</li>
              <li className="breadcrumb-item active">{course.title}</li>
            </ol>
          </nav>
          
          <div className="hero-content">
            <div className="course-info">
              <motion.h1 
                className="course-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {course.title}
              </motion.h1>
              
              <div className="course-meta">
                <div className="rating-badge">
                  <div className="rating-stars">
                    {renderRatingStars(course.rating || 4.5)}
                  </div>
                  <div className="rating-text">
                    <span className="rating-value">{course.rating || 4.5}</span>
                    <span className="rating-count">({course.reviewsCount || 124} reviews)</span>
                  </div>
                </div>
                
                <div className="enrollment-badge">
                  <FaUserTie className="enrollment-icon" />
                  <span>{course.students?.toLocaleString() || '1,250'} students enrolled</span>
                </div>
                
                <div className="level-badge">
                  <span>{course.level || 'Intermediate'} Level</span>
                </div>
              </div>
              
              <p className="course-excerpt">
                {course.shortDescription || course.description.substring(0, 180)}...
              </p>
              
              <div className="instructor-info">
                <div className="instructor-avatar-container">
                  <img 
                    src={course.instructorAvatar || 'https://via.placeholder.com/80'} 
                    alt={course.instructor} 
                    className="instructor-avatar"
                  />
                  <div className="instructor-verified">✓</div>
                </div>
                <div className="instructor-details">
                  <span className="instructor-label">Created by</span>
                  <h4 className="instructor-name">{course.instructor}</h4>
                  <p className="instructor-title">{course.instructorTitle || 'Senior Instructor'}</p>
                </div>
              </div>
            </div>
            
            <div className="course-card">
              <motion.div 
                className="preview-container"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {course.previewVideo ? (
                  <ReactPlayer
                    url={course.previewVideo}
                    width="100%"
                    height="100%"
                    controls
                    playing={previewPlaying}
                    light={course.image}
                    playIcon={
                      <div className="play-button">
                        <FaPlayCircle size={48} />
                        <span>Preview this course</span>
                      </div>
                    }
                    onClickPreview={() => setPreviewPlaying(true)}
                  />
                ) : (
                  <img
                    src={course.image}
                    className="course-image"
                    alt={course.title}
                  />
                )}
              </motion.div>
              
              <div className="pricing-section">
                {course.discount ? (
                  <div className="price-container">
                    <div className="current-price">${course.price.toFixed(2)}</div>
                    <div className="original-price">${course.originalPrice.toFixed(2)}</div>
                    <div className="discount-badge">Save {course.discount}%</div>
                  </div>
                ) : (
                  <div className="price-container">
                    <div className="current-price">${course.price.toFixed(2)}</div>
                  </div>
                )}
                
                <div className="action-buttons">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-enroll"
                    onClick={() => {
                      // Enrollment logic here
                      alert('Enrollment successful!');
                    }}
                  >
                    Enroll Now
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-cart"
                    onClick={() => addToCart(course)}
                  >
                    <FaShoppingCart className="cart-icon" />
                    Add to Cart
                  </motion.button>
                </div>
                
                <div className="guarantee-badge">
                  <FaMoneyBillWave className="guarantee-icon" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
                
                <div className="course-highlights">
                  <h4>This course includes:</h4>
                  <ul className="highlight-list">
                    <li>
                      <FaVideo className="highlight-icon" />
                      <span>{course.videoHours || 8} hours on-demand video</span>
                    </li>
                    <li>
                      <FaFileAlt className="highlight-icon" />
                      <span>{course.resourcesCount || 5} downloadable resources</span>
                    </li>
                    <li>
                      <FaMobileAlt className="highlight-icon" />
                      <span>Access on mobile and TV</span>
                    </li>
                    <li>
                      <FaCertificate className="highlight-icon" />
                      <span>Certificate of completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Section */}
      <section className="course-content-section">
        <div className="content-container">
          <div className="main-content">
            <div className="tab-navigation">
              <button
                className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`tab-button ${activeTab === 'curriculum' ? 'active' : ''}`}
                onClick={() => setActiveTab('curriculum')}
              >
                Curriculum
              </button>
              <button
                className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab">
                  <div className="section">
                    <h3>About This Course</h3>
                    <p className="course-description">{course.description}</p>
                  </div>
                  
                  <div className="section">
                    <h3>What You'll Learn</h3>
                    <ul className="learning-outcomes">
                      {course.learningOutcomes?.map((outcome, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <FaCheck className="outcome-icon" />
                          <span>{outcome}</span>
                        </motion.li>
                      )) || (
                        <>
                          <li><FaCheck className="outcome-icon" />Key concept 1</li>
                          <li><FaCheck className="outcome-icon" />Key concept 2</li>
                          <li><FaCheck className="outcome-icon" />Key concept 3</li>
                          <li><FaCheck className="outcome-icon" />Key concept 4</li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <div className="section">
                    <h3>Requirements</h3>
                    <ul className="requirements-list">
                      {course.requirements?.map((req, index) => (
                        <li key={index}>{req}</li>
                      )) || (
                        <>
                          <li>Basic computer skills</li>
                          <li>Internet connection</li>
                          <li>Willingness to learn</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="curriculum-tab">
                  <div className="curriculum-stats">
                    <div className="stat-item">
                      <span className="stat-value">{course.lessonsCount || 42}</span>
                      <span className="stat-label">Lessons</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-value">{course.duration || '8h 15m'}</span>
                      <span className="stat-label">Total length</span>
                    </div>
                  </div>
                  
                  <div className="curriculum-sections">
                    {course.curriculum?.map((section, sectionIndex) => (
                      <div key={sectionIndex} className="curriculum-section">
                        <div 
                          className="section-header"
                          onClick={() => toggleSection(sectionIndex)}
                        >
                          <div className="section-title">
                            {expandedSections[sectionIndex] ? (
                              <FaChevronDown className="chevron-icon" />
                            ) : (
                              <FaChevronRight className="chevron-icon" />
                            )}
                            <h4>{section.title}</h4>
                          </div>
                          <div className="section-meta">
                            <span>{section.lessons.length} lessons</span>
                            <span>•</span>
                            <span>{
                              section.lessons.reduce((total, lesson) => {
                                const [mins, secs] = lesson.duration.split(':').map(Number);
                                return total + mins + (secs / 60);
                              }, 0).toFixed(1)
                            }h</span>
                          </div>
                        </div>
                        
                        {expandedSections[sectionIndex] && (
                          <motion.div
                            className="section-content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ul className="lesson-list">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="lesson-item">
                                  <div className="lesson-info">
                                    <FaPlayCircle className="lesson-icon" />
                                    <span className="lesson-title">{lesson.title}</span>
                                  </div>
                                  <span className="lesson-duration">{lesson.duration}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </div>
                    )) || (
                      <div className="empty-curriculum">
                        <p>Curriculum details coming soon!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="reviews-tab">
                  <div className="reviews-summary">
                    <div className="average-rating">
                      <h2>{course.rating || 4.5}</h2>
                      <div className="rating-stars">
                        {renderRatingStars(course.rating || 4.5)}
                      </div>
                      <p>Course Rating</p>
                      <span className="rating-count">{course.reviewsCount || 124} reviews</span>
                    </div>
                    
                    <div className="rating-distribution">
                      {renderRatingDistribution()}
                    </div>
                  </div>
                  
                  <div className="reviews-list">
                    {course.reviews?.slice(0, 5).map((review, index) => (
                      <motion.div 
                        key={index}
                        className="review-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="review-header">
                          <img 
                            src={review.userAvatar || 'https://via.placeholder.com/60'} 
                            alt={review.userName} 
                            className="reviewer-avatar"
                          />
                          <div className="reviewer-info">
                            <h5 className="reviewer-name">{review.userName}</h5>
                            <div className="review-rating">
                              {renderRatingStars(review.rating)}
                              <span className="review-date">
                                {new Date(review.date).toLocaleDateString('en-US', {
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="review-content">{review.content}</p>
                      </motion.div>
                    )) || (
                      <div className="no-reviews">
                        <p>No reviews yet. Be the first to review!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="sidebar">
            <div className="sidebar-card instructor-card">
              <h4>About the Instructor</h4>
              <div className="instructor-profile">
                <img 
                  src={course.instructorAvatar || 'https://via.placeholder.com/120'} 
                  alt={course.instructor} 
                  className="instructor-sidebar-avatar"
                />
                <h5 className="instructor-sidebar-name">{course.instructor}</h5>
                <p className="instructor-sidebar-title">{course.instructorTitle || 'Senior Instructor'}</p>
                
                <div className="instructor-stats">
                  <div className="stat-item">
                    <FaStar className="stat-icon" />
                    <span>{course.instructorRating || 4.7} Instructor Rating</span>
                  </div>
                  <div className="stat-item">
                    <FaUserTie className="stat-icon" />
                    <span>{course.instructorStudents?.toLocaleString() || '2,450'} Students</span>
                  </div>
                  <div className="stat-item">
                    <FaBook className="stat-icon" />
                    <span>{course.instructorCourses || 5} Courses</span>
                  </div>
                </div>
                
                <p className="instructor-bio">
                  {course.instructorBio || 'Experienced professional with years of industry experience.'}
                </p>
              </div>
            </div>
            
            <div className="sidebar-card more-courses-card">
              <h4>More Courses by {course.instructor}</h4>
              {/* In a real app, these would be fetched from the API */}
              <div className="course-teaser">
                <div className="teaser-image"></div>
                <div className="teaser-info">
                  <h5>Advanced React Patterns</h5>
                  <div className="teaser-meta">
                    <span>12 hours</span>
                    <span>•</span>
                    <span>4.8 ★</span>
                  </div>
                </div>
              </div>
              <div className="course-teaser">
                <div className="teaser-image"></div>
                <div className="teaser-info">
                  <h5>JavaScript Masterclass</h5>
                  <div className="teaser-meta">
                    <span>15 hours</span>
                    <span>•</span>
                    <span>4.9 ★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;