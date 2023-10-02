import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const containerStyle = {
  textAlign: 'center',
  margin: '20px',
};

const headingStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '20px 0',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const labelStyle = {
  fontSize: '18px',
};

const inputStyle = {
  padding: '8px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '18px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  marginTop: '10px',
};

const linkStyle = {
  fontSize: '18px',
  margin: '20px 0',
  textDecoration: 'none',
  color: '#007bff',
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
        baseURL: 'https://urlshortener-db6x.onrender.com',
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
    <div style={containerStyle}>
      <h1 style={headingStyle}>URL Shortener</h1>
      <form style={formStyle} onSubmit={handleFormSubmit}>
        <label style={labelStyle} htmlFor="longUrl">
          Long URL:
        </label>
        <input
          style={inputStyle}
          type="url"
          id="longUrl"
          required
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <button style={buttonStyle} type="submit">
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div>
          <p>Shortened URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {shortUrl}
          </a>
        </div>
      )}
      {error && <p>Error: {error}</p>}
      <Link style={linkStyle} to="/dashboard">
        Dashboard
      </Link>
    </div>
  );
};

export default Shortener;
