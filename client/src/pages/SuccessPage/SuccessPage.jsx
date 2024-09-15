/**
 * 1. remove the cart
 * 1.a. if customer are guest, then remove cart id in the local storage only.
 * 1.b. if customer are member, then remove cart id in local storage and set new cart for them.
 */
import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_CART } from "../utils/mutations";

function Success() {
    const [removeCart] = useMutation(REMOVE_CART);
    useEffect(() => {
        async function cleanUp() {
            const cartId = localStorage.getItem("cart_id");
            if (cartId) {
                await removeCart({ variables: { _id: cartId } });
                localStorage.removeItem("cart_id");
            }

            setTimeout(() => {
                window.location.assign('/');
            }, 3000);
        }
        cleanUp();
    }, [removeCart]);

    return (
        <div className="page">
            <h1>Success!</h1>
            <h2>Thank you for your purchase!</h2>
            <h2>You will now be redirected to the home page</h2>
        </div>
    )
}

export default Success;