import { useEffect, useState } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { UPDATE_ADDRESS } from '../../utils/mutations';
import './UserPage.css';
const UserPage = () => {
    const { loading, data } = useQuery(GET_ME);
    const [updateAddressMutation] = useMutation(UPDATE_ADDRESS);
    const [currentAddress, setCurrentAddress] = useState({ street: "", city: "", state: "", zip: "" });

    useEffect(() => {
        setCurrentAddress({
            street: data?.me.address.street || "",
            city: data?.me.address.city || "",
            state: data?.me.address.state || "",
            zip: data?.me.address.zip || ""
        })
    }, [data, updateAddressMutation])

    const hideData = (dataType, value) => {
        if (!value) {
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
            setCurrentAddress({ ...currentAddress, [name]: value });
        }
    };
    const userInfo = {
        username: hideData("username", data?.me.username),
        email: hideData("email", data?.me.email),
    }
    if (loading) {
        return (
            <h1>Still loading, please wait!</h1>
        )
    }

    const formSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateAddressMutation({
                variables: {
                    street: currentAddress.street,
                    city: currentAddress.city,
                    state: currentAddress.state,
                    zip: currentAddress.zip
                }
            });
            confirm("Update address success");
        } catch (err) {
            confirm("Update address failed");
        }
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
                        readOnly
                    />
                </div>
                <div className="input-field">
                    <label>Email:</label>
                    <input type="text"
                        name="email"
                        value={userInfo.email}
                        readOnly
                    />
                </div>
                <form onSubmit={formSubmitHandler}>
                    <div className="input-field">
                        <label>Address:</label>
                        <input className="address-input" type="text"
                            name="street"
                            placeholder="Street"
                            value={currentAddress.street}
                            onChange={handleChange} />
                        <input className="address-input" type="text"
                            name="city"
                            placeholder="City"
                            value={currentAddress.city}
                            onChange={handleChange} />
                        <input className="address-input" type="text"
                            name="state"
                            placeholder="State"
                            value={currentAddress.state}
                            maxLength={2}
                            onChange={handleChange} />
                        <input className="address-input" type="text"
                            name="zip"
                            placeholder="Zip code"
                            value={currentAddress.zip}
                            maxLength={5}
                            minLength={5}
                            onChange={handleChange} />
                    </div>
                    <button type="submit" className="update-button">UPDATE</button>
                </form>
            </div>
        </div>
    );
};
export default UserPage;