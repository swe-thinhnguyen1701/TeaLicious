import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations"
import Auth from '../../utils/auth';

function Signin() {
  const [userFormData, setUserFormData] = useState({ identifier: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
    setUserFormData({
      identifier: "",
      password: "",
    });
  };
  return (
    <div className="form-container sign-in">
      <form onSubmit={handleFormSubmit}>
        <h1>Sign In</h1>
        <input
          type="text"
          placeholder="Email or Username"
          name="identifier"
          onChange={handleInputChange}
          required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleInputChange}
          required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default Signin;