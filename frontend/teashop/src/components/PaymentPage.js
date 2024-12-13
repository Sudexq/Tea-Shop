import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../css/payment.css";

const PaymentPage = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetails(storedUser);
  }, []);

  const handlePayment = async () => {
    // Simulate payment processing
    alert("Processing payment...");
    try {
      // Send order data to the backend
      const response = await fetch(
        "http://localhost/tea_shop/backend/place_order.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Include session cookies
          body: JSON.stringify({
            cartItems,
            totalPrice,
          }),
        }
      );

      const data = await response.json();

      if (data.message) {
        alert(`Payment successful! Your order number is ${data.order_number}.`);
        clearCart(); // Clear the cart after successful payment
        navigate("/account"); // Redirect to the account page
      } else {
        console.error("Backend Error:", data.error);
        alert("Failed to place the order. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred during payment. Please try again.");
    }
  };

  return (
    <div className="paymentPage">
      <h2>Payment</h2>
      {userDetails && (
        <div className="user-details">
          <h3>Shipping and Contact Details:</h3>
          <p>
            <b>Address:</b> {userDetails.address}
          </p>
          <p>
            <b>City:</b> {userDetails.city}
          </p>
          <p>
            <b>Postal Code:</b> {userDetails.postalCode}
          </p>
          <p>
            <b>Phone:</b> {userDetails.phone}
          </p>
        </div>
      )}
      <div className="payment-summary">
        <h3>Order Summary</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - {item.quantity} x {item.price} ₺ ={" "}
              {(item.quantity * item.price).toFixed(2)} ₺
            </li>
          ))}
        </ul>
        <h3>Total: {totalPrice.toFixed(2)} ₺</h3>
      </div>
      <button onClick={handlePayment} className="pay-button">
        Pay Now
      </button>
    </div>
  );
};

export default PaymentPage;
