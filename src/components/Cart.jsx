import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

/**
 * Displays the shopping cart with course details, order summary,
 * and options to remove courses, update quantities, clear cart, or proceed to checkout.
 */
const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  // Calculate the subtotal amount
  const subtotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container my-5">
      <h1 className="mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div className="alert alert-info" role="alert">
          Your cart is empty.
        </div>
      ) : (
        <>
          {/* Table Layout for Larger Screens */}
          <div className="d-none d-lg-block">
            <table className="table table-striped align-middle">
              <thead>
                <tr>
                  <th scope="col">Course</th>
                  <th scope="col">Price</th>
                  <th scope="col" className="text-end">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="img-thumbnail me-3"
                            style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                          />
                        )}
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td className="text-end">
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card Layout for Smaller Screens */}
          <div className="d-block d-lg-none">
            {cart.map((item) => (
              <div key={item._id} className="card mb-3">
                <div className="row g-0">
                  {item.image && (
                    <div className="col-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid rounded-start"
                        style={{ height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                  <div className="col">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text mb-1">${item.price.toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Section */}
          <div className="row mt-4">
            <div className="col-lg-8">
              <button onClick={clearCart} className="btn btn-outline-danger">
                Clear Cart
              </button>
            </div>
            <div className="col-lg-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {/* Additional details like tax or shipping can be added here */}
                  <hr />
                  <Link to="/checkout" className="btn btn-primary w-100">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
