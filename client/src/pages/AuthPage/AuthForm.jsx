import { useState } from "react";
import Signup from "./Signup";
import Signin from "./Signin";
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
    <section className="page d-center-xy auth-form">
      <div className={`page d-center-xy container ${!isLogin ? "active" : ""}`}>
        {/* Signup Form */}
        <Signup />

        {/* Signin Form */}
        <Signin />

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
    </section>
  );
}

export default AuthForm;