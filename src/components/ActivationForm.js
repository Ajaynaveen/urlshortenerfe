import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const ActivationForm = () => {
  const [activationToken, setActivationToken] = useState('');
  const [message, setMessage] = useState('');
  const navigate=useNavigate();

  const handleActivation = async () => {
    try {
      const response = await axios.get('https://urlshortener-db6x.onrender.com/activate', { token: activationToken });
      setMessage(response.data.message);
      navigate('/login')
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Account Activation</h2>
      <p>Enter your activation token received via email:</p>
      <input
        type="text"
        value={activationToken}
        onChange={(e) => setActivationToken(e.target.value)}
      />
      <button onClick={handleActivation}>Activate</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ActivationForm;
