import React, { useState } from 'react';
import './Testimonial.css'; // Custom CSS for additional styling if needed

/**
 * TestimonialCard displays an individual testimonial along with a
 * "Was this feedback helpful?" section including like/dislike buttons.
 */
const TestimonialCard = ({ testimonial }) => {
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

  // Helper to render star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <i key={i} className="bi bi-star-fill text-warning me-1"></i>
      );
    }
    return stars;
  };

  return (
    <div className="card testimonial-card mx-2" style={{ minWidth: '300px' }}>
      {testimonial.image && (
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="card-img-top rounded-circle mx-auto mt-3"
          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
        />
      )}
      <div className="card-body">
        <div className="mb-2">{renderStars(testimonial.rating)}</div>
        <p className="card-text">"{testimonial.comment}"</p>
        <h5 className="mt-2">- {testimonial.name}</h5>
        <hr />
        <div>
          <small className="text-muted">Was this feedback helpful?</small>
          <div className="d-flex mt-2">
            <button
              className="btn btn-sm btn-outline-success me-2"
              onClick={handleLike}
              disabled={feedbackSubmitted}
            >
              <i className="bi bi-hand-thumbs-up"></i> {likes}
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={handleDislike}
              disabled={feedbackSubmitted}
            >
              <i className="bi bi-hand-thumbs-down"></i> {dislikes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Testimonial component displays all testimonials in a horizontally
 * scrollable container.
 */
const Testimonial = () => {
  // Static testimonial data; you can later fetch this from an API.
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      comment:
        "This platform transformed my career. The courses are insightful and the instructors are top-notch.",
      image: "/images/testimonial1.jpg", // Ensure the path is correct
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      comment:
        "Excellent courses and fantastic support. I've learned so much and grown professionally.",
      image: "/images/testimonial2.jpg",
    },
    {
      id: 3,
      name: "Michael Brown",
      rating: 5,
      comment:
        "The best online learning experience I've ever had. Highly recommended!",
      image: "/images/testimonial3.jpg",
    },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-4">
          <h2 className="fw-bold">What Our Students Say</h2>
          <p className="text-muted">
            Hear from those who have transformed their careers.
          </p>
        </div>
        <div className="d-flex overflow-auto pb-3">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
