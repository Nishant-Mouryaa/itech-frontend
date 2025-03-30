import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';
import { FaUserGraduate } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            {/* About Section */}
            <div className="footer-col footer-about">
              <div className="footer-logo">
                <FaUserGraduate className="logo-icon" />
                <span>EduTech</span>
                <span className="logo-suffix">Academy</span>
              </div>
              <p className="about-text">
                Empowering learners worldwide with industry-relevant skills and knowledge through 
                high-quality online education.
              </p>
              <div className="footer-social">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/courses">All Courses</Link></li>
                <li><Link to="/instructors">Our Instructors</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            {/* Course Categories */}
            <div className="footer-col">
              <h3 className="footer-title">Categories</h3>
              <ul className="footer-links">
                <li><Link to="/courses/web-development">Web Development</Link></li>
                <li><Link to="/courses/data-science">Data Science</Link></li>
                <li><Link to="/courses/mobile-apps">Mobile Development</Link></li>
                <li><Link to="/courses/cloud-computing">Cloud Computing</Link></li>
                <li><Link to="/courses/cybersecurity">Cybersecurity</Link></li>
                <li><Link to="/courses/business">Business</Link></li>
              </ul>
            </div>

            {/* Contact Info & Newsletter */}
            <div className="footer-col">
              <h3 className="footer-title">Contact Us</h3>
              <ul className="footer-contact">
                <li>
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>123 Education Street, Learning City, 10101</span>
                </li>
                <li>
                  <FaPhone className="contact-icon" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li>
                  <FaEnvelope className="contact-icon" />
                  <span>info@edutechacademy.com</span>
                </li>
              </ul>

              <div className="footer-newsletter">
                <h4>Subscribe to Newsletter</h4>
                <p>Get the latest updates on new courses and offers</p>
                <form className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    required 
                  />
                  <button type="submit">
                    <FiSend className="send-icon" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              &copy; {new Date().getFullYear()} EduTech Academy. All rights reserved.
            </div>
            <div className="footer-legal">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/faq">FAQs</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;