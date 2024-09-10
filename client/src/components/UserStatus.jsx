import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Auth from "../utils/auth";

function UserStatus({ isLoggedIn }) {
    if (isLoggedIn) {
        return (
            <ul className="list">
                <li className="list-item">
                    <Link to="/my-profile">My Profile</Link>
                </li>
                <li className="list-item">
                    <button className="btn" onClick={Auth.logout}>Logout</button>
                </li>
            </ul>
        );
    }

    return (
        <Link to="/auth">Login/Sign up</Link>
    )
}

UserStatus.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default UserStatus;