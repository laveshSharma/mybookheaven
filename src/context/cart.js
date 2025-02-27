import React, { useState, useEffect } from "react";

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Calculate total price whenever cart changes
  useEffect(() => {
    const total = cart.reduce((acc, { amount, price }) => acc + amount * price, 0);
    setTotal(parseFloat(total.toFixed(2)));
  }, [cart]);

  // Increase the amount of a specific item in the cart
  const increaseAmount = (id) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, amount: item.amount + 1 } : item
    ));
  };

  // Decrease the amount of an item, remove it if amount reaches 0
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(cart.map((item) =>
        item.id === id ? { ...item, amount: item.amount - 1 } : item
      ));
    }
  };

  // Add a new book to the cart, increase quantity if already in cart
  const addToCart = (book) => {
    const { id, title, price, image } = book;
    const cartItem = cart.find((item) => item.id === id);
    if (cartItem) {
      increaseAmount(id);
    } else {
      setCart([...cart, { id, title, image, price, amount: 1 }]);
    }
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, total, addToCart, increaseAmount, decreaseAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
