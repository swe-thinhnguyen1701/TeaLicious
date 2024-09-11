import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth"
import "./style.css";

function Signup() {
    const [userFormData, setUserFormData] = useState({ username: "", email: "", password: "" });

    const [addUser, { error }] = useMutation(ADD_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });
            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }

        setUserFormData({
            username: "",
            email: "",
            password: "",
        });
    }
    return (
        <div className="form-container sign-up">
            <form onSubmit={handleSubmitForm}>
                <h1>Create Account</h1>
                <input
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleInputChange}
                    value={userFormData.username}
                    required />
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default Signup;