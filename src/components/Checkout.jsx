import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import handlePayment from '../payment/handlePayment';
import { FaLock, FaArrowLeft, FaCheckCircle, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import './Checkout.css';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + item.price, 0);
  const tax = subtotal * 0.1; // 10% tax for example
  const total = subtotal + tax;

  const onCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      await handlePayment(total);
      setSuccess(true);
    } catch (err) {
      console.error('Payment failed', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="checkout-success">
        <div className="success-container">
          <FaCheckCircle className="success-icon" />
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. Your courses are now available in your dashboard.</p>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cart.map(item => (
                <li key={item._id}>
                  <span>{item.title}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="order-total">
              <span>Total Paid:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="success-actions">
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
            <Link to="/courses" className="btn btn-outline">
              Browse More Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <Link to="/cart" className="back-link">
            <FaArrowLeft /> Back to Cart
          </Link>
          <h1><FaLock /> Secure Checkout</h1>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>There are no items to checkout.</p>
            <Link to="/courses" className="btn btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="checkout-content">
            <div className="checkout-form">
              <section className="payment-section">
                <h2><FaCreditCard /> Payment Method</h2>
                <div className="payment-methods">
                  <div className="payment-method active">
                    <div className="method-radio">
                      <div className="radio-dot"></div>
                    </div>
                    <div className="method-info">
                      <div className="method-name">Credit/Debit Card</div>
                      <div className="method-icons">
                        <img src="/images/visa.png" alt="Visa" />
                        <img src="/images/mastercard.png" alt="Mastercard" />
                        <img src="/images/amex.png" alt="American Express" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="billing-section">
                <h2>Billing Information</h2>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="Enter your email" />
                </div>
              </section>
            </div>

            <div className="order-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>
                <ul className="order-items">
                  {cart.map(item => (
                    <li key={item._id} className="order-item">
                      <div className="item-image">
                        <img 
                          src={item.image || '/images/course-placeholder.jpg'} 
                          alt={item.title} 
                        />
                      </div>
                      <div className="item-details">
                        <h4>{item.title}</h4>
                        <span>${item.price.toFixed(2)}</span>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="summary-totals">
                  <div className="total-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="total-row">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="total-row grand-total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {error && (
                  <div className="error-message">
                    <MdErrorOutline className="error-icon" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  onClick={onCheckout}
                  disabled={loading}
                  className={`btn btn-primary ${loading ? 'loading' : ''}`}
                >
                  {loading ? 'Processing Payment...' : 'Pay Now'}
                </button>

                <div className="security-assurance">
                  <FaShieldAlt className="shield-icon" />
                  <span>Your payment is secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;