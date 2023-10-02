import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';


const urlTableStyles = {
  container: {
    textAlign: 'center',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderCell: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: '8px',
  },
  noUrlsMessage: {
    fontSize: '18px',
    margin: '10px 0',
    color: 'red',
  },
  link: {
    fontSize: '18px',
    marginTop: '20px',
    display: 'block',
  },
};

const URLTable = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
   
    const token = localStorage.getItem('token'); 

    if (!token) {
     
      console.error('Token missing');
      return;
    }

    const axiosInstance = axios.create({
      baseURL: 'http://localhost:3003',
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
    <div style={urlTableStyles.container}>
      <h1 style={urlTableStyles.heading}>Created URLs</h1>

      <table style={urlTableStyles.table}>
        <thead>
          <tr>
            <th style={urlTableStyles.tableHeaderCell}>Long URL</th>
            <th style={urlTableStyles.tableHeaderCell}>Short URL</th>
            <th style={urlTableStyles.tableHeaderCell}>Clicks</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(urls) && urls.length > 0 ? (
            urls.map((url, index) => (
              <tr key={index}>
                <td style={urlTableStyles.tableCell}>{url.longUrl}</td>
                <td style={urlTableStyles.tableCell}>{url.shortUrl}</td>
                <td style={urlTableStyles.tableCell}>{url.clicks}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td style={urlTableStyles.noUrlsMessage} colSpan="3">
                No URLs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Link style={urlTableStyles.link} to="/dashboard">
        Dashboard
      </Link>
    </div>
  );
};

export default URLTable;
