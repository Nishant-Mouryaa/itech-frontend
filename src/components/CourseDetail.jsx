import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from '../axiosConfig';
import { CartContext } from '../context/CartContext';
import { FaStar, FaRegStar, FaStarHalfAlt, FaClock, FaUserTie, FaMoneyBillWave, FaBook, FaChartBar, FaShoppingCart, FaPlayCircle, FaCheck, FaVideo, FaFileAlt, FaMobileAlt, FaCertificate, FaInfinity } from 'react-icons/fa';
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

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/courses/${id}`);
        setCourse(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load course details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="course-detail-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p>Loading course details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger text-center">
          {error}
          <button 
            className="btn btn-link p-0 ms-2"
            onClick={() => window.location.reload()}
          >
            Try again
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
      <div className="course-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/courses">Courses</Link></li>
                  <li className="breadcrumb-item"><Link to={`/courses/${course.category}`}>{course.category}</Link></li>
                  <li className="breadcrumb-item active" aria-current="page">{course.title}</li>
                </ol>
              </nav>
              
              <h1 className="course-title">{course.title}</h1>
              
              <div className="course-meta">
                <div className="rating">
                  {renderRatingStars(course.rating || 4.5)}
                  <span>({course.reviewsCount || 124} reviews)</span>
                </div>
                <div className="students">
                  <FaUserTie className="me-1" />
                  {course.students || 0} students enrolled
                </div>
              </div>
              
              <p className="course-excerpt">{course.shortDescription || course.description.substring(0, 150)}...</p>
              
              <div className="instructor-info">
                <img 
                  src={course.instructorAvatar || 'https://via.placeholder.com/50'} 
                  alt={course.instructor} 
                  className="instructor-avatar"
                />
                <div>
                  <span className="instructor-label">Created by</span>
                  <h4 className="instructor-name">{course.instructor}</h4>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="course-card">
                {course.previewVideo ? (
                  <div className="preview-video">
                    <ReactPlayer
                      url={course.previewVideo}
                      width="100%"
                      height="200px"
                      controls
                      playing={previewPlaying}
                      light={course.image}
                      playIcon={<FaPlayCircle size={48} />}
                      onClickPreview={() => setPreviewPlaying(true)}
                    />
                  </div>
                ) : (
                  <img
                    src={course.image}
                    className="card-img-top"
                    alt={course.title}
                  />
                )}
                
                <div className="course-pricing">
                  <div className="price">
                    ${course.price.toFixed(2)}
                    {course.originalPrice && (
                      <span className="original-price">${course.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {course.discount && (
                    <div className="discount-badge">
                      {course.discount}% OFF
                    </div>
                  )}
                </div>
                
                <div className="course-features">
                  <div className="feature">
                    <FaClock className="feature-icon" />
                    <span>{course.duration || '8 hours'} of content</span>
                  </div>
                  <div className="feature">
                    <FaBook className="feature-icon" />
                    <span>{course.lessonsCount || 12} lessons</span>
                  </div>
                  <div className="feature">
                    <FaChartBar className="feature-icon" />
                    <span>{course.level || 'Intermediate'} level</span>
                  </div>
                </div>
                
                <div className="course-actions">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-enroll"
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
                    className="btn btn-cart"
                    onClick={() => addToCart(course)}
                  >
                    <FaShoppingCart className="me-2" />
                    Add to Cart
                  </motion.button>
                </div>
                
                <div className="money-back">
                  <FaMoneyBillWave className="me-2" />
                  30-day money-back guarantee
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="course-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {/* Tab Navigation */}
              <ul className="nav nav-tabs" id="courseTabs" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                    type="button"
                    role="tab"
                  >
                    Overview
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'curriculum' ? 'active' : ''}`}
                    onClick={() => setActiveTab('curriculum')}
                    type="button"
                    role="tab"
                  >
                    Curriculum
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                    type="button"
                    role="tab"
                  >
                    Reviews
                  </button>
                </li>
              </ul>

              {/* Tab Content */}
              <div className="tab-content mt-4">
                {activeTab === 'overview' && (
                  <div className="tab-pane fade show active">
                    <h3>About This Course</h3>
                    <p className="course-description">{course.description}</p>
                    
                    <h3 className="mt-5">What You'll Learn</h3>
                    <ul className="learning-outcomes">
                      {course.learningOutcomes?.map((outcome, index) => (
                        <li key={index}>
                          <FaCheck className="me-2" />
                          {outcome}
                        </li>
                      )) || (
                        <>
                          <li><FaCheck className="me-2" />Key concept 1</li>
                          <li><FaCheck className="me-2" />Key concept 2</li>
                          <li><FaCheck className="me-2" />Key concept 3</li>
                          <li><FaCheck className="me-2" />Key concept 4</li>
                        </>
                      )}
                    </ul>
                    
                    <h3 className="mt-5">Requirements</h3>
                    <ul className="requirements">
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
                )}

                {activeTab === 'curriculum' && (
                  <div className="tab-pane fade show active">
                    <div className="accordion" id="curriculumAccordion">
                      {course.curriculum?.map((section, sectionIndex) => (
                        <div className="accordion-item" key={sectionIndex}>
                          <h2 className="accordion-header" id={`heading${sectionIndex}`}>
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse${sectionIndex}`}
                              aria-expanded={sectionIndex === 0 ? 'true' : 'false'}
                              aria-controls={`collapse${sectionIndex}`}
                            >
                              {section.title}
                              <span className="ms-auto badge bg-secondary">
                                {section.lessons.length} lessons
                              </span>
                            </button>
                          </h2>
                          <div
                            id={`collapse${sectionIndex}`}
                            className={`accordion-collapse collapse ${sectionIndex === 0 ? 'show' : ''}`}
                            aria-labelledby={`heading${sectionIndex}`}
                            data-bs-parent="#curriculumAccordion"
                          >
                            <div className="accordion-body">
                              <ul className="lesson-list">
                                {section.lessons.map((lesson, lessonIndex) => (
                                  <li key={lessonIndex}>
                                    <div className="lesson-item">
                                      <FaPlayCircle className="lesson-icon" />
                                      <span>{lesson.title}</span>
                                      <span className="lesson-duration">{lesson.duration}</span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )) || (
                        <div className="alert alert-info">
                          Curriculum details coming soon!
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="tab-pane fade show active">
                    <div className="reviews-summary">
                      <div className="average-rating">
                        <h2>{course.rating || 4.5}</h2>
                        <div className="stars">
                          {renderRatingStars(course.rating || 4.5)}
                        </div>
                        <p>Course Rating</p>
                      </div>
                      <div className="rating-distribution">
                        {/* Rating distribution bars would go here */}
                      </div>
                    </div>
                    
                    <div className="reviews-list">
                      {course.reviews?.slice(0, 5).map((review, index) => (
                        <div className="review-card" key={index}>
                          <div className="review-header">
                            <img src={review.userAvatar} alt={review.userName} />
                            <div>
                              <h5>{review.userName}</h5>
                              <div className="review-rating">
                                {renderRatingStars(review.rating)}
                                <span>{new Date(review.date).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <p className="review-content">{review.content}</p>
                        </div>
                      )) || (
                        <div className="alert alert-info">
                          No reviews yet. Be the first to review!
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="course-sidebar">
                <div className="sidebar-card">
                  <h4>This Course Includes</h4>
                  <ul className="course-includes">
                    <li><FaVideo className="me-2" />{course.videoHours || 8} hours on-demand video</li>
                    <li><FaFileAlt className="me-2" />{course.resourcesCount || 5} downloadable resources</li>
                    <li><FaMobileAlt className="me-2" />Access on mobile and TV</li>
                    <li><FaCertificate className="me-2" />Certificate of completion</li>
                    <li><FaInfinity className="me-2" />Full lifetime access</li>
                  </ul>
                </div>
                
                <div className="sidebar-card">
                  <h4>About the Instructor</h4>
                  <div className="instructor-details">
                    <img 
                      src={course.instructorAvatar || 'https://via.placeholder.com/100'} 
                      alt={course.instructor} 
                    />
                    <h5>{course.instructor}</h5>
                    <p className="instructor-title">{course.instructorTitle || 'Senior Instructor'}</p>
                    <div className="instructor-rating">
                      <FaStar className="text-warning" />
                      <span>{course.instructorRating || 4.7} Instructor Rating</span>
                    </div>
                    <div className="instructor-stats">
                      <span>{course.instructorReviews || 124} Reviews</span>
                      <span>{course.instructorStudents || 2450} Students</span>
                      <span>{course.instructorCourses || 5} Courses</span>
                    </div>
                    <p className="instructor-bio">
                      {course.instructorBio || 'Experienced professional with years of industry experience.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;