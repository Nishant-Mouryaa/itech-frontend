import axios from '../axiosConfig';

/**
 * Handles payment by initiating Razorpay payment flow
 */
const handlePayment = async totalAmount => {
  try {
    // Create order on the backend and get order details
    const orderResponse = await axios.post('/api/orders/payment', {
      amount: totalAmount
    });
    const { id: orderId, amount, currency } = orderResponse.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Razorpay Key
      amount: amount,
      currency: currency,
      name: 'I Tech',
      description: 'Course Purchase',
      order_id: orderId,
      handler: function (response) {
        console.log(response);
        // Payment verification and order update logic goes here
      },
      prefill: {
        name: '',
        email: ''
      },
      theme: {
        color: '#3399cc'
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error('Payment error: ', err);
    throw err;
  }
};

export default handlePayment;
 
