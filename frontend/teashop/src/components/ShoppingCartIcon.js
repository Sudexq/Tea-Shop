import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import "../css/cart.css"

const ShoppingCartIcon = () => {
  return (
    <div className="shopping-cart-icon">
      <FontAwesomeIcon icon={faShoppingCart} size="2x" />
    </div>
  );
};

export default ShoppingCartIcon;
