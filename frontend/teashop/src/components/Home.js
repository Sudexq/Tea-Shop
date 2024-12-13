import React from "react";
import "../css/home.css";
import { useNavigate } from "react-router-dom"; // useNavigate'i import ettik

export const Home = () => {
  const navigate = useNavigate(); // Yönlendirme için hook

  const handleDiscoverClick = () => {
    navigate("/products"); // Discover'a tıklayınca Products sayfasına git
  };
  return (
    <div className="welcome-container">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="welcome-title">Welcome To Teashop</h1>
        <p className="welcome-text">
          Welcome to the fascinating world of fresh and natural teas. Enjoy
          nature in every sip.
        </p>
        <button onClick={handleDiscoverClick} className="cta-button">
          Discover
        </button>
      </div>
    </div>
  );
};
