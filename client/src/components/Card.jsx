/* eslint-disable react/prop-types */
// import { useState } from "react";

function Card({product}) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={product.image} alt="product image" />
      </div>
      <div className="card-info">
        <h2 className="product-name">{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );

}

export default Card;