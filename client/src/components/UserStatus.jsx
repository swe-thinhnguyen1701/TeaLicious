import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Auth from "../utils/auth";

function UserStatus({ isLoggedIn }) {
    if (isLoggedIn) {
        return (
            <ul className="list list-inline" id = "bullet-points">
                <li className="list-item">
                    <Link to="/my-profile" id="profile-link">My Profile</Link>
                </li>
                <li className="list-item">
                    <button className="logout-btn" onClick={Auth.logout}>Logout</button>
                </li>
            </ul>
        );
    }

    return (
        <Link to="/auth" className="link auth-link">Login / Sign up</Link>
    )
}

UserStatus.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default UserStatus;