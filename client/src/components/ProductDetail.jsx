/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT } from "../utils/queries";
import { ADD_ITEM_TO_CART } from "../utils/mutations";
import "./style.css";

function ProductDetail({ productId }) {
    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { _id: productId }
    });
    const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
    const [quantity, setQuantity] = useState(1);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR happens</p>

    const product = data.getProduct;

    const cartId = localStorage.getItem("cart_id");
    // console.log(cartId);
    

    const quantityOnChange = (e) => {
        if(e.target.value === ""){
            setQuantity(0);
            return;
        }
        setQuantity(parseInt(e.target.value));
    }

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

    const addToCartHandler = async () => {
        try {
            if(quantity <= 1 || quantity > product.stock)
                return;

            await addItemToCart({
                variables: {
                    _id: cartId,
                    productId: product._id,
                    quantity: quantity
                }
            });
            confirm(`${product.name} has been added to your cart`);
        } catch (error) {
            console.error("ERROR occurs while adding ITEM to CART", error);
            throw new Error("Failed to add item to cart");
        }
    }

    return (
        <div className="product-container">
            <div className="product-img-container">
                <img
                    className="product-img"
                    src={product.image}
                    alt="Product Image">
                </img>
            </div>
            <div className="product-info-container">
                <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-stock">{product.stock}</p>
                    <p className="product-weight">{product.weight}</p>
                    <p className="product-price">${product.price}</p>
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
                            min={1}
                            onChange={quantityOnChange} />
                        <button
                            className="btn"
                            onClick={addItemHandler}>+</button>
                    </div>
                    <button className="btn" onClick={addToCartHandler}>Add to Cart</button>
                </div>
            </div>
        </div>
    );

}


export default ProductDetail;