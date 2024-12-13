import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MyOrders from "./MyOrders";
import "../css/account.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  }, [navigate]);

  if (!user) {
    return <p>Loading account details...</p>;
  }

  return (
    <div className="account-container">
      {user && (
        <>
          <h2 className="account-container-h2">Welcome, {user.name}!</h2>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Address:</b> {user.address}
          </p>
          <p>
            <b>City:</b> {user.city}
          </p>
          <p>
            <b>Phone:</b> {user.phone}
          </p>

          {/* Include the MyOrders component */}
          <MyOrders userId={user.id} />
        </>
      )}
    </div>
  );
};

export default Account;
