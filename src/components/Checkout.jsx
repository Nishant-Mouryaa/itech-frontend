import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import handlePayment from '../payment/handlePayment';

/**
 * Handles checkout and payment processing.
 */
const Checkout = () => {
  const { cart } = useContext(CartContext);

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  const onCheckout = async () => {
    try {
      // Trigger Razorpay payment flow
      await handlePayment(totalAmount);
      // After successful payment, order confirmation logic would go here
    } catch (err) {
      console.error('Payment failed', err);
    }
  };

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <p className="mb-4">Total: ${totalAmount}</p>
      <button
        onClick={onCheckout}
        className="bg-green-500 text-white px-4 py-2"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default Checkout;
 
