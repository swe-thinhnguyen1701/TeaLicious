// import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CART } from "../../utils/queries";

function Review() {
    const [loading, data] = useQuery(GET_CART);
    const cartId = localStorage.getItem("cart_id");
    console.log(cartId);
    

    if (loading) return <h2>Loading...</h2>
    if (!data || !data.getCart(cartId)) return <h2>No items in cart</h2>

    const addItemHandler = () => {
        if (quantity < product.stock) {
            setQuantity(quantity + 1);
        }
    }

    const reduceItemHandler = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    return (
        <div className="page cart-container">
            {data.getCart.map(item => {
                return (
                    <div className="cart-item" key={item.id}>
                        <div className="product-info">
                            <h2 className="product-name">{item.name}</h2>
                            <p className="product-description">{item.description}</p>
                            <p className="product-price">${item.price}</p>
                        </div>
                        <div className="product-action">
                    <div className="product-quantity">
                        <button
                            className="btn"
                            onClick={reduceItemHandler}>-</button>
                        <input
                            className="input"
                            type="number"
                            value={quantity}
                            onChange={quantityOnChange} />
                        <button
                            className="btn"
                            onClick={addItemHandler}>+</button>
                    </div>
                    <button className="btn" onClick={addToCartHandler}>Add to Cart</button>
                </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Review;