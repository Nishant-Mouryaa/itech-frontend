import React, { useEffect, useState } from 'react';
import axios from '../axiosConfig';
import { FaStar, FaRegStar, FaUsers, FaClock, FaSearch, FaFilter } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './CourseList.css';

const categoryIcons = {
  web: <FaStar className="category-icon web" />,
  mobile: <FaStar className="category-icon mobile" />,
  data: <FaStar className="category-icon data" />,
  cloud: <FaStar className="category-icon cloud" />,
  cybersecurity: <FaStar className="category-icon cybersecurity" />,
  design: <FaStar className="category-icon design" />,
  business: <FaStar className="category-icon business" />,
};

const difficultyLevels = {
  beginner: { label: 'Beginner', class: 'beginner' },
  intermediate: { label: 'Intermediate', class: 'intermediate' },
  advanced: { label: 'Advanced', class: 'advanced' },
};

const CourseList = ({ searchQuery = '', featuredOnly = false, category = '' }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        let endpoint = '/api/courses';
        const params = [];
        
        if (searchQuery) params.push(`search=${encodeURIComponent(searchQuery)}`);
        if (featuredOnly) params.push(`featured=true`);
        if (category) params.push(`category=${encodeURIComponent(category)}`);
        if (sortOption !== 'default') params.push(`sort=${sortOption}`);
        if (priceRange[0] > 0 || priceRange[1] < 500) {
          params.push(`minPrice=${priceRange[0]}`);
          params.push(`maxPrice=${priceRange[1]}`);
        }
        if (selectedDifficulties.length > 0) {
          params.push(`difficulty=${selectedDifficulties.join(',')}`);
        }

        if (params.length) endpoint += '?' + params.join('&');

        const res = await axios.get(endpoint);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchCourses();
    }, 300); // Debounce to prevent rapid API calls

    return () => clearTimeout(timer);
  }, [searchQuery, featuredOnly, sortOption, category, priceRange, selectedDifficulties]);

  const toggleDifficulty = (level) => {
    setSelectedDifficulties(prev => 
      prev.includes(level) 
        ? prev.filter(l => l !== level) 
        : [...prev, level]
    );
  };

  if (loading) return (
    <div className="course-list-loading">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="course-card-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-line"></div>
          <div className="skeleton-line medium"></div>
          <div className="skeleton-line short"></div>
        </div>
      ))}
    </div>
  );

  if (error) return <div className="course-list-error">{error}</div>;
  if (!courses.length) return <div className="course-list-empty">No courses match your criteria. Try adjusting your filters.</div>;

  return (
    <div className="course-list-container">
      {/* Filters and Sorting */}
      <div className="course-list-controls">
        <button 
          className="filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          {showFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>

        <div className={`filter-panel ${showFilters ? 'open' : ''}`}>
          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-range">
              <span>${priceRange[0]}</span>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              />
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              />
              <span>${priceRange[1]}</span>
            </div>
          </div>

          <div className="filter-section">
            <h4>Difficulty Level</h4>
            <div className="difficulty-filters">
              {Object.entries(difficultyLevels).map(([key, { label, class: levelClass }]) => (
                <button
                  key={key}
                  className={`difficulty-btn ${levelClass} ${selectedDifficulties.includes(key) ? 'active' : ''}`}
                  onClick={() => toggleDifficulty(key)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sort-options">
          <label htmlFor="sort-select">
            <FaSearch className="search-icon" />
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <div className="course-card-image">
              {course.image ? (
                <img src={course.image} alt={course.title} />
              ) : (
                <div className="course-image-placeholder">
                  {categoryIcons[course.category] || categoryIcons.web}
                </div>
              )}
              {course.featured && <span className="featured-badge">Featured</span>}
              <span className={`difficulty-badge ${course.difficulty}`}>
                {difficultyLevels[course.difficulty]?.label || 'Beginner'}
              </span>
            </div>

            <div className="course-card-content">
              <div className="course-category">
                {categoryIcons[course.category] || categoryIcons.web}
                <span>{course.category}</span>
              </div>

              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description.substring(0, 120)}...</p>

              <div className="course-meta">
                <div className="course-rating">
                  {[...Array(5)].map((_, i) => (
                    i < Math.floor(course.rating) ? 
                      <FaStar key={i} className="star-filled" /> : 
                      <FaRegStar key={i} className="star-empty" />
                  ))}
                  <span>({course.reviewsCount})</span>
                </div>
                <div className="course-stats">
                  <span><FaUsers /> {course.enrolled}</span>
                  <span><FaClock /> {course.duration} hrs</span>
                </div>
              </div>

              <div className="course-footer">
                <div className="course-price">
                  {course.discountedPrice ? (
                    <>
                      <span className="original-price">${course.price.toFixed(2)}</span>
                      <span className="discounted-price">${course.discountedPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>${course.price.toFixed(2)}</span>
                  )}
                </div>
                <a href={`/course/${course._id}`} className="view-course-btn">
                  View Course
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;