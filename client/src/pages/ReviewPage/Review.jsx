import { useQuery } from "@apollo/client";
import {GET_CART} from "../../utils/queries";

function Review() {
    const cartId = localStorage.getItem("id_token");
    const [loading, data] = useQuery(GET_CART);
    if(loading) return <h2>Loading...</h2>
    if(!data || !data.getCart(cartId)) return <h2>No items in cart</h2>

    return (
        <div className="cart-container">
            {data.getCart.map(item => {
                return(
                    <h3 key={item._id}>{item.name}</h3>
                )
            })}
        </div>
    )
}

export default Review;