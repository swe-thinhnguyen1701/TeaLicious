import React from "react";
import { Link } from "react-router-dom";

function Card() {
  function addtoCart () {
    console.log()

  }
  return (
    <div className="card-container">
      <img 
      className="card-img"
      src="" 
      alt="">
      </img>
      <h2 className="card-title">Product Name</h2>
      <p className="card-description">Product Description</p>
      <p className="card-description">Price</p>
      <button className="Add-Cart" onClick={addtoCart}>Add to Cart</button>
    </div>
  );

}

export default Card;



