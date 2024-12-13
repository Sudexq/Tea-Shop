import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/addressForm.css";

const AddressForm = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address || !city || !postalCode || !phone) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Get the logged-in user ID from localStorage or session
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You need to log in first.");
      navigate("/login");
      return;
    }

    try {
      // Make an API request to save the address
      const response = await fetch(
        "http://localhost/tea_shop/backend/save_address.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: user.id, // Pass the user ID
            address,
            city,
            postal_code: postalCode,
            phone,
          }),
        }
      );

      const data = await response.json();

      if (data.message) {
        // Save the data to localStorage
        const userDetails = { address, city, postalCode, phone };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));

        setSuccessMessage(data.message);
        setTimeout(() => navigate("/payment"), 2000); // Redirect to payment after 2 seconds
      } else {
        setErrorMessage(
          data.error || "Failed to save address. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="address-form-container">
      <h2>Shipping Address</h2>
      <form onSubmit={handleSubmit} className="address-form">
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autocomplete="street-address"
          required
        />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          autocomplete="address-level2"
          required
        />

        <label htmlFor="postal-code">Postal Code:</label>
        <input
          type="text"
          id="postal-code"
          name="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          autocomplete="postal-code"
          required
        />

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autocomplete="tel"
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit" className="submit-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default AddressForm;
