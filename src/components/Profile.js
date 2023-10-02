import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const profileStyles = {
  container: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  userInfo: {
    fontSize: '18px',
    margin: '10px 0',
  },
};

const Profile = () => {
  const [userData, setUserData] = useState({});


  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    axios
      .get('http://localhost:3003/profile', {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  return (
    <div style={profileStyles.container}>
      <h1 style={profileStyles.heading}>User Profile</h1>
      <p style={profileStyles.userInfo}>Name: {userData.fname}</p>
      <p style={profileStyles.userInfo}>Email: {userData.email}</p>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default Profile;
