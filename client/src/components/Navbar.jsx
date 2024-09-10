import { Link } from "react-router-dom";
// import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/black tea">BLACK TEA</Link>
            <Link to="/green tea">GREEN TEA</Link>
            <Link to="/oolong">OOLONG</Link>
            <Link to="/white tea">WHITE TEA</Link>
        </nav>
    );
}

export default Navbar;