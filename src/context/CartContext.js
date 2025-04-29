import React, { createContext, useContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Update localStorage and total whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setCartTotal(calculateTotal(cart));
  }, [cart]);

  const calculateTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const addToCart = (course) => {
    setCart(prevCart => {
      // Check if course already exists in cart
      const exists = prevCart.some(item => item._id === course._id);
      if (exists) {
        return prevCart; // Don't add duplicate
      }
      return [...prevCart, course];
    });
  };

  const removeFromCart = (courseId) => {
    setCart(prevCart => prevCart.filter(item => item._id !== courseId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        cartTotal, 
        addToCart, 
        removeFromCart, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

