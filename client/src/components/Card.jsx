/* eslint-disable react/prop-types */
// import { useState } from "react";
import { Link } from "react-router-dom";

function Card({ product }) {
  const truncateDescription = (description) => {
    if (description.length > 70) {
      return description.substring(0, 70) + "...";
    }
    return description;
  };

  return (
    <Link className="card-link" to={`/product/${product._id}`}>
      <div className="card">
        <div className="card-img mb-20">
          <img src={product.image} alt="product image" />
        </div>
        <div className="card-info">
          <h2 className="product-name">{product.name}</h2>
          <p className="product-description">{truncateDescription(product.description)}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <button className="add-item-btn">Add to Cart</button>
        </div>
      </div>
    </Link>
  );

}

export default Card;