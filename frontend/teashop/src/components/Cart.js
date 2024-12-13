import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../css/cart.css";

const Cart = () => {
  const navigate = useNavigate(); // Add this hook for navigation
  const {
    cartItems,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useContext(CartContext);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity >= 1) {
      updateCartItemQuantity(id, newQuantity);
    }
  };

  return (
    <div className="cartPage">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items-list">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: {item.price} ₺</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p>Total: {(item.price * item.quantity).toFixed(2)} ₺</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="remove-button"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Cart Price: {totalPrice.toFixed(2)} ₺</h3>
            <button className="checkout-button"  onClick={() => navigate("/address-form")}>
              Go to Payment
            </button>
            <button className="clear-cart-button" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
