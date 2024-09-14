import { Link } from "react-router-dom";
import sampleLogo from "../assets/sample-logo.jpg";
import UserStatus from "./UserStatus";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"

import "./style.css"
// Anna has the auth form

import Auth from "../utils/auth";

function Navbar() {
    return (
        <header className="mb-20">
            <nav>
                <div className="nav-left">
                    <Link to="/">
                        <img src={sampleLogo} className="logo" alt="TeaLicious logo" />
                    </Link>
                </div>
                <div className="nav-right">
                    <Link to="/cart">
                        <FontAwesomeIcon icon={faCartShopping} className="cart-icon"/>
                    </Link>
                    <UserStatus isLoggedIn={Auth.loggedIn()} />
                </div>
            </nav>
        </header>
    );
}

export default Navbar;