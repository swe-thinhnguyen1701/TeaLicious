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
            <p className="card-description">Stock</p>
            <p className="card-description">weight</p>
            <p className="card-description">Price</p>
            <button className="Add-Cart" onClick={AddtoCart}>Add to Cart</button>
        </div>
    );

}


export default ProductsPage;