import "./style.css";

function Signup() {
    return (
        <div className="form-container sign-up">
            <form>
                <h1>Create Account</h1>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button type="button">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;