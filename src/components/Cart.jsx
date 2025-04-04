import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaShoppingCart, FaArrowLeft, FaLock } from 'react-icons/fa';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.1; // 10% tax for example
  const total = subtotal + tax;

  return (
    <div className="cart-page">
      <div className="container">
        {/* Header with navigation */}
        <div className="cart-header">
          <Link to="/courses" className="back-link">
            <FaArrowLeft /> Continue Shopping
          </Link>
          <h1 className="cart-title">
            <FaShoppingCart /> Your Shopping Cart
          </h1>
          <div className="cart-count">{cart.length} {cart.length === 1 ? 'Course' : 'Courses'}</div>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingCart size={48} />
            </div>
            <h2>Your cart is empty</h2>
            <p>Browse our courses and find something to learn!</p>
            <Link to="/courses" className="btn btn-primary">
              Explore Courses
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items - Desktop View */}
            <div className="cart-items desktop-view">
              <div className="cart-items-header">
                <div className="header-item">Course</div>
                <div className="header-item">Price</div>
                <div className="header-item">Action</div>
              </div>
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-details">
                    <div className="course-image">
                      <img
                        src={item.image || '/images/course-placeholder.jpg'}
                        alt={item.title}
                      />
                    </div>
                    <div className="course-info">
                      <h3 className="course-title">{item.title}</h3>
                      <div className="instructor">By {item.instructor || 'I-Tech Academy'}</div>
                    </div>
                  </div>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                  <div className="item-actions">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="btn btn-remove"
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Items - Mobile View */}
            <div className="cart-items mobile-view">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-details">
                    <div className="course-image">
                      <img
                        src={item.image || '/images/course-placeholder.jpg'}
                        alt={item.title}
                      />
                    </div>
                    <div className="course-info">
                      <h3 className="course-title">{item.title}</h3>
                      <div className="instructor">By {item.instructor || 'I-Tech Academy'}</div>
                      <div className="item-price">${item.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="item-actions">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="btn btn-remove"
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <div className="summary-card">
                <h3 className="summary-title">Order Summary</h3>
                <div className="summary-row">
                  <span>Subtotal ({cart.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Link to="/checkout" className="btn btn-checkout">
                  <FaLock /> Secure Checkout
                </Link>
                <button onClick={clearCart} className="btn btn-clear">
                  <FaTrash /> Clear Cart
                </button>
                <div className="security-info">
                  <FaLock className="lock-icon" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;