import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/tea_shop/backend/register.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.message) {
        alert(data.message);
        navigate("/login");
      } else if (data.error) {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autocomplete="name"
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          autocomplete="email"
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          autocomplete="new-password"
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button className="register-button" type="submit">
          Register
        </button>
      </form>
      <p>
        <span className="login-link" onClick={() => navigate("/login")}>
          Already have an account? Login here
        </span>
      </p>
    </div>
  );
};

export default Register;
