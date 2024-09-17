/* eslint-disable react/prop-types */
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PRODUCT, GET_ME } from "../utils/queries";
import { UPDATE_CART_ITEM, REMOVE_ITEM_FROM_CART } from "../utils/mutations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

function CartItem({ productId, quantity }) {
    const { loading, error, data } = useQuery(GET_PRODUCT, {
        variables: { _id: productId }
    });
    const [removeItem] = useMutation(REMOVE_ITEM_FROM_CART, {
        refetchQueries: [GET_ME]
    });
    const [updateItemToCart] = useMutation(UPDATE_CART_ITEM);
    const [updateQuantity, setUpdateQuantity] = useState(quantity);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR happens</p>

    const product = data?.getProduct || {};

    const cartId = localStorage.getItem("cart_id");
    // console.log(cartId);

    const quantityOnChange = (e) => {
        if (e.target.value === "") {
            setUpdateQuantity(0);
            return;
        }
        setUpdateQuantity(parseInt(e.target.value));
    }

    const removeItemHandler = async () => {
        try {
            await removeItem({
                variables: {
                    _id: cartId,
                    productId: product._id,
                }
            });
        } catch (error) {
            console.error("ERROR occurs while adding ITEM to CART", error);
            throw new Error("Failed to add item to cart");
        }
    }

    const updateQuantityHandler = () => {
        try {
            updateItemToCart({
                variables: {
                    _id: cartId,
                    productId: product._id,
                    quantity: updateQuantity,
                }
            });
        } catch (error) {
            console.error("ERROR occurs while adding ITEM to CART", error);
            throw new Error("Failed to add item to cart");
        }
    }

    if(loading) {
        return (
            <h1>LOADING....</h1>
        )
    }

    return (
        <div className="cart-item-container">

            <div className="cart-item-img-container">
                <img
                    className="cart-item-img"
                    src={product?.image}
                    alt="Product Image">
                </img>
            </div>
            <div className="cart-item-info-container">
                <div className="cart-item-info">
                    <h2 className="cart-item-name"> {product.name}</h2>
                    <p className="cart-item-price">Price: ${product.price}</p>
                </div>
            </div>
            <div className="cart-item-action">
                <div className="cart-item-quantity">
                    {/* <button
                        className="btn"
                        onClick={reduceItemHandler}>-</button> */}
                    <input
                        className="input"
                        type="number"
                        value={updateQuantity}
                        min={1}
                        max={999}
                        onChange={quantityOnChange} />
                    {/* <button
                        className="btn"
                        onClick={addItemHandler}>+</button> */}
                    <button
                        className="btn"
                        onClick={updateQuantityHandler}
                        disabled={quantity === updateQuantity}
                    >Update
                    </button>
                </div>
            </div>
            <div className="cart-item-subtotal">
                <span>Total amount: ${product.price * quantity}</span>
            </div>
            <div className="cart-item-remove" onClick={removeItemHandler}>
                <FontAwesomeIcon icon={faTrash} className="icon" />
            </div>
        </div>
    );

}


export default CartItem;