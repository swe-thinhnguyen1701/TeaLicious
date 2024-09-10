import { useState } from "react";
import Signup from "./Signup";
import "./style.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);

  const loginHandler = () => {
    setIsLogin(true);
  };

  const signupHandler = () => {
    setIsLogin(false);
  };

  return (
    <div className={`container ${!isLogin ? "active" : ""}`} id="container">
      {/* Signup Form */}
      <Signup />

      {/* Login Form */}
      <div className="form-container sign-in">
        <form>
          <h1>Sign In</h1>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forgot Your Password?</a>
          <button type="button">Sign In</button>
        </form>
      </div>

      {/* Toggle Container */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Enter your personal details to use all of the site features</p>
            <button className="hidden" id="login" onClick={loginHandler}>
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your personal details to use all of the site features</p>
            <button className="hidden" id="register" onClick={signupHandler}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;