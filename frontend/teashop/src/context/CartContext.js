import React, { createContext, useState } from "react";

// Create the Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Store cart items

  // Add item to the cart
  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        )
      );
    } else {
      setCartItems([
        ...cartItems,
        { ...product, quantity: 1, totalPrice: product.price },
      ]);
    }
  };

  // Update item quantity
  const updateCartItemQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity, totalPrice: quantity * item.price }
          : item
      )
    );
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]); // Reset the cart to an empty array
  };

  // Calculate the total price of the cart
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  // Provide the context values to children
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
