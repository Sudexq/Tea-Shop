import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost/tea_shop/backend/login.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (data.message) {
        alert(data.message);
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user data locally
        navigate(`/account`); // Redirect to the Account page
      } else if (data.error) {
        setErrorMessage(data.error);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
          id="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          
          required
        />

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button className="login-button" type="submit">
          Login
        </button>
      </form>
      <p>
        <span className="signup-link" onClick={() => navigate("/register")}>
          Don't have an account? Register here
        </span>
      </p>
    </div>
  );
};

export default Login;
