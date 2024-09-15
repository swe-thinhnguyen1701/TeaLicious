import { Link } from "react-router-dom";
import TLlogo from "../assets/images/TL-logo.png";
import UserStatus from "./UserStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

import "./style.css"
// Anna has the auth form

import {useQuery} from "@apollo/client"
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";

function Navbar() {

    const {loading, data} = useQuery(GET_ME)

    const totalQuantity = data?.me.cart.items.reduce((a, b) => a + b.quantity,
    0) || 0;

    if(loading){
        return (
            <h1>LOADING....</h1>
        )
    }

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
                            <FontAwesomeIcon id="cart-icon" icon={faCartShopping} className="cart-icon"/>
                            <p id="cart-total-quantity">{totalQuantity}</p>
                        </div>
                    </Link>
                    <UserStatus isLoggedIn={Auth.loggedIn()} />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;