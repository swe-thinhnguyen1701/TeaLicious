import React from "react";
import { Link } from "react-router-dom";

function ProductsPage() {
    return (
        <div className="card-container">
            <img
                className="card-img"
                src=""
                alt="Card Image">
            </img>
            <h2 className="card-title">Product Name</h2>
            <p className="card-description">Product Description</p>
            <p className="card-stock">Stock</p>
            <p className="card-weight">weight</p>
            <p className="card-price">Price</p>
            <button className="add-cart" onClick={addToCart}>Add to Cart</button>
        </div>
    );

}


export default ProductsPage;git