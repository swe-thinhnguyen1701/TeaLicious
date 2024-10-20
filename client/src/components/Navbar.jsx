import { Link } from "react-router-dom";
import TLlogo from "../assets/images/TL-logo.png";

import UserStatus from "./UserStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

import "./style.css"
// Anna has the auth form

import { useQuery } from "@apollo/client"
import { GET_CART } from "../utils/queries";

import Auth from "../utils/auth";
import { useEffect, useState, useContext } from "react";
import { CategoryContext } from "../utils/CategoryContext";

function Navbar() {
    const { shouldUpdateCart, setShouldUpdateCart } = useContext(CategoryContext);
    const cartId = localStorage.getItem("cart_id");
    const { loading, data } = useQuery(GET_CART, {
        variables: { _id: cartId }
    });

    const [totalItem, setTotalItem] = useState(0);

    useEffect(() => {
        if (data && data.getCart) {
            setTotalItem(data.getCart.items.length);
            setShouldUpdateCart(false);
        }
    }, [data, loading, shouldUpdateCart]);


    return (
        <header className="mb-20">

            <nav>
                <div className="nav-left">
                    <Link to="/products">
                        <img src={TLlogo} className="logo" alt="TeaLicious logo" />
                    </Link>
                </div>
                <div className="nav-right">
                    <Link to="/cart">
                        <div id="cart-icon-parent">
                            <FontAwesomeIcon id="cart-icon" icon={faCartShopping} className="cart-icon" />
                            <p id="cart-total-quantity">{totalItem}</p>
                        </div>
                    </Link>
                    <UserStatus isLoggedIn={Auth.loggedIn()} />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;