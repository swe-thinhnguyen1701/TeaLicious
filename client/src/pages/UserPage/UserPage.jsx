import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import './UserPage.css';

const UserPage = () => {
    const {loading, data, error} = useQuery(GET_ME);
    // const user = data?.me || {}
    const user = data?.me || {};
    useEffect(() => {
        console.log("loading:", loading);
        console.log("error:", error);
        console.log("data:", data);
        if (error) {
            console.error("ERROR :>>", error);
        }
    }, [data, error, loading]);
    
    // const [userInfo, setUserInfo] = useState({
    //     username: user.username,
    //     email: user.email,
    //     password: '',
    //     address: {
    //         street: user.address.street ? user.address.street : "",
    //         city: user.address.city ? user.address.city : "",
    //         state: user.address.state ? user.address.state : "",
    //         zip: user.address.zip ? user.address.zip : ""
    //     }
    // });

    useEffect(() => {
        hideData("username", user.username);
        hideData("email", user.email);
    }, [user]);

    if (loading) return <p>Loading...</p>;

    const hideData = (dataType, data) => {
        if (dataType === "username")
            userInfo.username = data.slice(0, 3) + "*******";
        else {
            const [emailUsername, emailDomain] = userInfo.email.split("@");
            userInfo.email = emailUsername.slice(0, 3) + "********@" + emailDomain;
        }
    }

    const handleUpdate = () => {
        console.log('User info updated', userInfo);
    };

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
    return (
        <div className="user-page page">
            <h1 className="profile">Profile</h1>
            <div className="form-container">
                <div className="input-field">
                    <label>Username:</label>
                    <input type="text"
                        name="username"
                        value={userInfo.username} />
                </div>
                <div className="input-field">
                    <label>Email:</label>
                    <input type="text"
                        name="email"
                        value={userInfo.email} />
                </div>
                <div className="input-field">
                    <label>Password:</label>
                    <input type="password"
                        name="password"
                        value={userInfo.password}
                        onChange={handleChange} />
                </div>
                <div className="input-field">
                    <label>Address:</label>
                    <input className="address-input" type="text"
                        name="street"
                        placeholder="Street"
                        value={userInfo.address.street}
                        onChange={handleChange} />
                    <input className="address-input" type="text"
                        name="city"
                        placeholder="City"
                        value={userInfo.address.city}
                        onChange={handleChange} />
                    <input className="address-input" type="text"
                        name="state"
                        placeholder="State"
                        value={userInfo.address.state}
                        onChange={handleChange} />
                    <input className="address-input" type="text"
                        name="zip code"
                        placeholder="Zip code"
                        value={userInfo.address.zip}
                        onChange={handleChange} />
                </div>
                <button className="update-button" onClick={handleUpdate}>UPDATE</button>
            </div>
        </div>
    );

};

export default UserPage;
