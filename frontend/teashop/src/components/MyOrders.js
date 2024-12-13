import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/myOrders.css";

const MyOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost/tea_shop/backend/get_orders.php",
          {
            credentials: "include",
          }
        );
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
          setOrders([]); // No orders
        } else {
          setOrders(data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="my-orders-container">
      <h3>My Orders</h3>
      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length > 0 ? (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-item">
              <h4>Order #{order.order_number}</h4>
              <p>
                <b>Date:</b> {order.order_date}
              </p>
              <p>
                <b>Total Price:</b> {order.total_price} ₺
              </p>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} x {item.price} ₺
                    <span>{(item.quantity * item.price).toFixed(2)} ₺</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
          <button
            onClick={() => navigate("/products")}
            className="browse-products"
          >
            Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
