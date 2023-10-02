import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const shortenerStyles = {
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
  label: {
    fontSize: '18px',
    margin: '10px 0',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '18px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  link: {
    fontSize: '18px',
    marginTop: '20px',
    display: 'block',
  },
  successMessage: {
    fontSize: '18px',
    margin: '10px 0',
    color: 'green',
  },
  errorMessage: {
    fontSize: '18px',
    margin: '10px 0',
    color: 'red',
  },
};

const Shortener = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

   
    const token = localStorage.getItem('token');

    
    if (!token) {
      console.error('Authentication token is missing');
      
      return;
    }

    try {
     
      const axiosInstance = axios.create({
        baseURL: 'http://localhost:3003',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`, 
        },
      });

     
      const response = await axiosInstance.post('/shorten', { longUrl });

      if (response.status !== 200) {
        throw new Error('Failed to create a short URL');
      }

      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Error creating short URL:', error);
      setError('Failed to create a short URL');
    }
  };

  return (
    <div style={shortenerStyles.container}>
      <h1 style={shortenerStyles.heading}>URL Shortener</h1>

      <div>
        <h2>Create a Short URL</h2>
        <form style={shortenerStyles.form} onSubmit={handleFormSubmit}>
          <label style={shortenerStyles.label} htmlFor="longUrl">
            Long URL:
          </label>
          <input
            style={shortenerStyles.input}
            type="url"
            id="longUrl"
            required
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <button style={shortenerStyles.button} type="submit">
            Shorten
          </button>
        </form>
        {shortUrl && (
          <p style={shortenerStyles.successMessage}>
            Shortened URL: {shortUrl}
          </p>
        )}
        {error && (
          <p style={shortenerStyles.errorMessage}>Error: {error}</p>
        )}
      </div>
      <Link style={shortenerStyles.link} to="/dashboard">
        Dashboard
      </Link>
    </div>
  );
};

export default Shortener;
