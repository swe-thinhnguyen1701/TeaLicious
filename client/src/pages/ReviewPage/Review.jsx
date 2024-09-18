import { useQuery } from "@apollo/client";
import { GET_CART } from "../../utils/queries";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { CHECKOUT } from "../../utils/queries";
import CartItem from "../../components/CartItem";
import { useEffect } from "react";
import "./Review.css";

const stripePromise = loadStripe("pk_test_51Pz97qRqmT90kMSgW4BiW1HnpYXHNTuPSFFhlL5USqio3gGQoIJvbzMpAIGRbJK9hrnupgtKHnyeekRuFyAFwnlp00Nj5b9Nal");

function Review() {
    const cartId = localStorage.getItem("cart_id");
    const [getCheckout, { data: checkoutData }] = useLazyQuery(CHECKOUT);
    const { loading, error, data } = useQuery(GET_CART, {
        variables: { _id: cartId }
    });

    useEffect(() => {
        if (checkoutData) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: checkoutData.getCheckout.session })
                    .then(function (result) {
                        if (result.error) {
                            alert(result.error.message);
                        }
                    });
            });
        }
    }, [checkoutData])

    if (loading) return <h2>Loading...</h2>
    if (!data || !data.getCart || !data.getCart.items || data.getCart.items.length === 0) {
        return (
            <div className="cart-page-image">
                <div className="page">
                    <h2>No items in your cart</h2>
                </div>
            </div>
        )
    }

    const submitCheckout = () => {
        getCheckout({ variables: { cartId } });
    }

    return (
        <div className="cart-page-image">
            <div className="cart-container">
                {data.getCart.items.map(item => {
                    return (
                        <CartItem
                            key={item.productId}
                            productId={item.productId}
                            quantity={item.quantity}
                        />
                    )
                })
                }
                <button className="review-btn" onClick={submitCheckout}>Checkout</button>
            </div>
        </div>
    )
}

export default Review;