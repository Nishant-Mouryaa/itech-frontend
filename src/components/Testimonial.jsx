import React, { useState } from 'react';
import { FaQuoteLeft, FaQuoteRight, FaStar, FaRegStar, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Testimonial.css';

const TestimonialCard = ({ testimonial, active }) => {
  const [likes, setLikes] = useState(testimonial.likes || 0);
  const [dislikes, setDislikes] = useState(testimonial.dislikes || 0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
    setFeedbackSubmitted(true);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
    setFeedbackSubmitted(true);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      i < rating ? 
        <FaStar key={i} className="star-filled" /> : 
        <FaRegStar key={i} className="star-empty" />
    ));
  };

  return (
    <div className={`testimonial-card ${active ? 'active' : ''}`}>
      <div className="testimonial-content">
        <FaQuoteLeft className="quote-icon quote-left" />
        <p className="testimonial-text">"{testimonial.comment}"</p>
        <FaQuoteRight className="quote-icon quote-right" />
      </div>
      
      <div className="testimonial-author">
        <div className="author-image">
          <img src={testimonial.image} alt={testimonial.name} />
        </div>
        <div className="author-info">
          <h4 className="author-name">{testimonial.name}</h4>
          <p className="author-title">{testimonial.title}</p>
          <div className="author-rating">
            {renderStars(testimonial.rating)}
          </div>
        </div>
      </div>
      
      <div className="testimonial-feedback">
        <span className="feedback-question">Was this review helpful?</span>
        <div className="feedback-buttons">
          <button
            className={`feedback-btn like-btn ${feedbackSubmitted ? 'disabled' : ''}`}
            onClick={handleLike}
            disabled={feedbackSubmitted}
            aria-label="Like this review"
          >
            <FaThumbsUp /> <span>{likes}</span>
          </button>
          <button
            className={`feedback-btn dislike-btn ${feedbackSubmitted ? 'disabled' : ''}`}
            onClick={handleDislike}
            disabled={feedbackSubmitted}
            aria-label="Dislike this review"
          >
            <FaThumbsDown /> <span>{dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      title: "Web Developer at TechCorp",
      rating: 5,
      comment: "This platform completely transformed my career. The courses are insightful, well-structured, and the instructors are top-notch industry professionals. I went from beginner to job-ready in just 6 months!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      likes: 24,
      dislikes: 2
    },
    {
      id: 2,
      name: "Jane Smith",
      title: "Data Scientist at DataWorld",
      rating: 4,
      comment: "Excellent courses and fantastic support system. The hands-on projects were invaluable for building my portfolio. The community aspect really helped me stay motivated throughout my learning journey.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      likes: 18,
      dislikes: 1
    },
    {
      id: 3,
      name: "Michael Brown",
      title: "Mobile Developer at AppWorks",
      rating: 5,
      comment: "The best online learning experience I've ever had. The curriculum is constantly updated with the latest technologies. Career services helped me negotiate a 30% higher salary for my first developer role!",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      likes: 31,
      dislikes: 0
    },
    {
      id: 4,
      name: "Sarah Johnson",
      title: "UX Designer at CreativeMinds",
      rating: 5,
      comment: "As a career changer, I was nervous about breaking into tech. The structured learning path and mentor support gave me the confidence I needed. Now I'm working at my dream company!",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      likes: 15,
      dislikes: 1
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Success Stories</h2>
          <p className="section-subtitle">Hear from our students who transformed their careers</p>
        </div>
        
        <div className="testimonials-container">
          <button 
            className="nav-btn prev-btn" 
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <FiChevronLeft />
          </button>
          
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
                active={index === currentIndex}
              />
            ))}
          </div>
          
          <button 
            className="nav-btn next-btn" 
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <FiChevronRight />
          </button>
        </div>
        
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;