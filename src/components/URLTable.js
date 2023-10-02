import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '8px',
};

const tdStyle = {
  border: '1px solid #ccc',
  padding: '8px',
};

const linkStyle = {
  textDecoration: 'none',
  color: '#007bff',
};

const URLTable = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const axiosInstance = axios.create({
      baseURL: 'https://urlshortener-db6x.onrender.com',
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    });

    axiosInstance
      .get('/userinfo')
      .then((response) => {
        setUrls(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user URLs:', error);
      });
  }, []);

  return (
    <div>
      <h1>Created URLs</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Long URL</th>
            <th style={thStyle}>Short URL</th>
            <th style={thStyle}>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.map((url, index) => (
            <tr key={index}>
              <td style={tdStyle}>{url.longUrl}</td>
              <td style={tdStyle}>
                <a
                  href={url.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={linkStyle}
                >
                  {url.shortUrl}
                </a>
              </td>
              <td style={tdStyle}>{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/dashboard">Dashboard</Link>
    </div>
  );
};

export default URLTable;
