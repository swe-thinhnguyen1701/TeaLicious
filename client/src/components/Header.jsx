// Reusable Header.jsx, which conditionally renders the auth buttons and categories based on the showAuthButtons and showCategories props.
import { Link } from "react-router-dom";
// import "./Header.css";
function Header({ showAuthButtons, showCategories }) {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">TeaLicious</Link>
      </div>
      {showAuthButtons && (
        <div className="auth-buttons">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      {showCategories && (
        <nav className="navbar">
          <Link to="/products?category=black">BLACK TEA</Link>
          <Link to="/products?category=green">GREEN </Link>
          <Link to="/products?category=oolong">Oolong</Link>
          <Link to="/products?category=white">WHITE TEA</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;