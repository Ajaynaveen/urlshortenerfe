import React from 'react';
import NavBar from './Navbar';

const Home = () => {
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const paragraphStyle = {
    fontSize: '18px',
  };

  return (
    <div style={containerStyle}>
      <NavBar />
      <h2 style={headingStyle}>Welcome to the React Application</h2>
      <p style={paragraphStyle}>
        This application allows users to log in and reset the password.
      </p>
    </div>
  );
};

export default Home;
