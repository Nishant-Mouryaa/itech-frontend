// Create a new component called CartDebug.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartDebug = () => {
  const { cart } = useContext(CartContext);
  
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      right: 0,
      background: 'white',
      padding: '10px',
      border: '1px solid #ccc',
      zIndex: 1000,
      maxHeight: '200px',
      overflow: 'auto'
    }}>
      <h4>Cart Debug</h4>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  );
};

export default CartDebug;