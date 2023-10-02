import React, { useState } from 'react';
import axios from 'axios';


const forgetPasswordStyles = {
  container: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    margin: '10px 0',
  },
  label: {
    fontSize: '18px',
  },
  input: {
    padding: '8px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

function ForgetPassword() {
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://urlshortener-db6x.onrender.com/forgetpassword', formData);

      console.log(response, "res");

      if (response.status === 200) {
        console.log('Password reset email sent successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={forgetPasswordStyles.container}>
      <h1 style={forgetPasswordStyles.heading}>Forget Password</h1>
      <form style={forgetPasswordStyles.form} onSubmit={handleSubmit}>
        <div style={forgetPasswordStyles.formGroup}>
          <label style={forgetPasswordStyles.label} htmlFor="email">Email:</label>
          <input
            style={forgetPasswordStyles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button style={forgetPasswordStyles.button} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ForgetPassword;
