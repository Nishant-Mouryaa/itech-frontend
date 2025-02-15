import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import handlePayment from '../payment/handlePayment';

/**
 * Enhanced Checkout component with order summary, error handling, and improved UI.
 */
const Checkout = () => {
  const { cart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Calculate the total amount of the cart
  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  const onCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      // Trigger Razorpay payment flow
      await handlePayment(totalAmount);
      // After successful payment, you can implement order confirmation logic here.
    } catch (err) {
      console.error('Payment failed', err);
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-4 p-6 border rounded shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {/* Order Summary */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="divide-y">
              {cart.map(item => (
                <li key={item._id} className="py-3 flex justify-between items-center">
                  <span>{item.title}</span>
                  <span>${item.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          {/* Display error if payment fails */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              onClick={onCheckout}
              disabled={loading}
              className={`${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
              } text-white px-6 py-3 rounded transition duration-200`}
            >
              {loading ? 'Processing...' : 'Proceed to Payment'}
            </button>
            <a
              href="/cart"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded transition duration-200 text-center"
            >
              Return to Cart
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
