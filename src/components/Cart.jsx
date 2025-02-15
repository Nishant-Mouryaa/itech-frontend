import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

/**
 * Displays the shopping cart with course details, order summary,
 * and options to remove courses or proceed to checkout.
 */
const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);

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
        <div className="row">
          <div className="col-lg-8">
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
          {/* Order Summary Section */}
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {/* Optionally, you can add tax and shipping details here */}
                <hr />
                <Link to="/checkout" className="btn btn-primary w-100">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
