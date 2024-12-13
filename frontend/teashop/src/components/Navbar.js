import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../photos/logo.png";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../css/navbar.css";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Hamburger menu state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated login state

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user); // Check if user data exists in localStorage
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu state
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data from localStorage
    setIsLoggedIn(false);
    alert("You have been logged out.");
  };

  return (
    <nav className={`navbar ${menuOpen ? "responsive" : ""}`}>
      {/* Logo */}
      <NavLink className="logo" to="/">
        <img src={logo} alt="Tea Shop Logo" />
      </NavLink>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? "nav-links-responsive" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/products" onClick={() => setMenuOpen(false)}>
          Products
        </NavLink>
        <NavLink to="/cart" className="cart" onClick={() => setMenuOpen(false)}>
          <ShoppingCartIcon />
        </NavLink>

        {/* Authentication Links */}
        {isLoggedIn ? (
          <>
            <NavLink to="/account" onClick={() => setMenuOpen(false)}>
              Account
            </NavLink>
            <NavLink to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" onClick={() => setMenuOpen(false)}>
              Log In
            </NavLink>
            <NavLink to="/register" onClick={() => setMenuOpen(false)}>
              Sign Up
            </NavLink>
          </>
        )}
      </div>

      {/* Hamburger Icon */}
      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
    </nav>
  );
};

export default Navbar;
