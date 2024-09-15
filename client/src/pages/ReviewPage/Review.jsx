import { useQuery } from "@apollo/client";
import { GET_CART } from "../../utils/queries";
import CartItem from "../../components/CartItem";

function Review() {
    const cartId = localStorage.getItem("cart_id");
    const { loading, error, data } = useQuery(GET_CART, {
        variables: { _id: cartId }
    });
    console.log(data);

    if (loading) return <h2>Loading...</h2>
    if (!data || !data.getCart) return <h2>No items in cart</h2>

    return (
        <div className="page cart-container">
            {data.getCart.items.length === 0
                ? <h2>No items in cart</h2>
                : data.getCart.items.map(item => {
                    return (
                        <CartItem
                            key={item.productId}
                            productId={item.productId}
                            quantity={item.quantity}
                        />
                    )
                })}
        </div>
    )
}

export default Review;