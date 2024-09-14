// import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import './UserPage.css';
const UserPage = () => {
    const {loading, data} = useQuery(GET_ME)
    const hideData = (dataType, value) => {
        if(!value) {
            return "";
        } else {
            if (dataType === "username")
                return value?.slice(0, 3) + "*******";
            else {
                const [emailUsername, emailDomain] = value?.split("@");
                return emailUsername.slice(0, 3) + "********@" + emailDomain;
            }
        }
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (['street', 'city', 'state', 'zip'].includes(name)) {
            setUserInfo((prevState) => ({
                ...prevState,
                address: {
                    ...prevState.address,
                    [name]: value
                }
            }));
        } else {
            setUserInfo({
                ...userInfo,
                [name]: value
            });
        }
    };
    const userInfo = {
        username: hideData("username", data?.me.username),
        email: hideData("email", data?.me.email),
        // password: data?.me.password,
        address: data?.me.address
    }
    if(loading) {
        return (
            <h1>Still loading, please wait!</h1>
        )
    }
    return (
        <div className="user-page page">
            <h1 className="profile">Profile</h1>
            <div className="form-container">
                <div className="input-field">
                    <label>Username:</label>
                    <input type="text"
                        name="username"
                        value={userInfo.username}
                        // onChange={handleChange}
                        readOnly
                        />
                </div>
                <div className="input-field">
                    <label>Email:</label>
                    <input type="text"
                        name="email"
                        value={userInfo.email}
                        // onChange={handleChange}
                        readOnly
                        />
                </div>
                {/* <div className="input-field">
                    <label>Password:</label>
                    <input type="password"
                        name="password"
                        value={userInfo.password}
                        onChange={handleChange} />
                </div> */}
                <div className="input-field">
                    <label>Address:</label>
                    <input className="address-input" type="text"
                        name="street"
                        placeholder="Street"
                        value={userInfo.address?.street || ""}
                        onChange={handleChange} />
                    <input className="address-input" type="text"
                        name="city"
                        placeholder="City"
                        value={userInfo.address.city || ""}
                        onChange={handleChange} />
                    <input className="address-input" type="text"
                        name="state"
                        placeholder="State"
                        value={userInfo.address.state || ""}
                        onChange={handleChange} />
                    <input className="address-input" type="text"
                        name="zip code"
                        placeholder="Zip code"
                        value={userInfo.address.zip || ""}
                        onChange={handleChange} />
                </div>
                <button className="update-button" onClick={() => {}}>UPDATE</button>
            </div>
        </div>
    );
};
export default UserPage;