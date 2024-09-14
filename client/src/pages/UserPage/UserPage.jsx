
import { useEffect, useState } from "react";
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import './UserPage.css';

const UserPage = () => {
  const { loading, data, error } = useQuery(GET_ME);
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  });

  useEffect(() => {
    if (data) {
      setUserInfo({
        username: data.me.username,
        email: data.me.email,
        address: data.me.address
      });
    }
  }, [data]);

  const hideData = (dataType, data) => {
    if (dataType === "username") {
      setUserInfo({ ...userInfo, username: data.slice(0, 3) + "*******" });
    } else {
      const [emailUsername, emailDomain] = userInfo.email.split("@");
      setUserInfo({ ...userInfo, email: emailUsername.slice(0, 3) + "********@" + emailDomain });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['street', 'city', 'state', 'zip'].includes(name)) {
      setUserInfo({ ...userInfo, address: { ...userInfo.address, [name]: value } });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  };

  const handleUpdate = () => {
    // Update the user's data here
    console.log('User info updated', userInfo);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="user-page page">
      <h1 className="profile">Profile</h1>
      <div className="form-container">
        <div className="input-field">
          <label>Username:</label>
          <input type="text" name="username" value={userInfo.username} />
        </div>
        <div className="input-field">
          <label>Email:</label>
          <input type="text" name="email" value={userInfo.email} />
        </div>
        <div className="input-field">
          <label>Password:</label>
          <input type="password" name="password" value={userInfo.password} onChange={handleChange} />
        </div>
        <div className="input-field">
          <label>Address:</label>
          <input className="address-input" type="text" name="street" placeholder="Street" value={userInfo.address.street} onChange={handleChange} />
          <input className="address-input" type="text" name="city" placeholder="City" value={userInfo.address.city} onChange={handleChange} />
          <input className="address-input" type="text" name="state" placeholder="State" value={userInfo.address.state} onChange={handleChange} />
          <input className="address-input" type="text" name="zip code" placeholder="Zip code" value={userInfo.address.zip} onChange={handleChange} />
        </div>
        <button className="update-button" onClick={handleUpdate}>UPDATE</button>
      </div>
    </div>
  );
};

export default UserPage;
