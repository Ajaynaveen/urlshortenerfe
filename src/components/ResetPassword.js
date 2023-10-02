import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


const resetPasswordStyles = {
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

function ResetPassword() {
  const navigate = useNavigate();
  const { token } = useParams();

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
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
    const { newPassword, confirmPassword } = formData;
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please make sure both fields have the same value.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3003/reset-password/${token}`, {
        newPassword,
      });

      if (response.status === 200) {
        console.log('Password reset successfully');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div style={resetPasswordStyles.container}>
      <h1 style={resetPasswordStyles.heading}>Reset Password</h1>
      <form style={resetPasswordStyles.form} onSubmit={handleSubmit}>
        <div style={resetPasswordStyles.formGroup}>
          <label style={resetPasswordStyles.label} htmlFor="newPassword">New Password:</label>
          <input
            style={resetPasswordStyles.input}
            type="password"
            id="newPassword"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div style={resetPasswordStyles.formGroup}>
          <label style={resetPasswordStyles.label} htmlFor="confirmPassword">Confirm Password:</label>
          <input
            style={resetPasswordStyles.input}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button style={resetPasswordStyles.button} type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
