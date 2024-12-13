import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../css/products.css";
import { CartContext } from "../context/CartContext";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [notification, setNotification] = useState(null); // For showing notifications
  const { addToCart } = useContext(CartContext);

  // Fetch products from the API
  useEffect(() => {
    axios
      .get("http://localhost/tea_shop/backend/get_products.php")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = (product) => { 
    addToCart(product); // Add the product to the cart
    setNotification(`${product.name} has been added to the cart!`); // Set the notification
    setTimeout(() => {
      setNotification(null); // Clear the notification after 2 seconds
    }, 2000);
  };

  return (
    <div className="productsPage">
      <div className="products-container">
        {notification && <div className="notification">{notification}</div>} {/* Notification */}
        {products.map((product) => (
          <div key={product.id} className="product-box">
            <img
              src={product.image_url}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-description">{product.description}</p>

            {/* Hover shows price and Add to Cart button */}
            <div className="product-hover">
              <p className="product-price">{product.price} ₺</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-to-cart"
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
