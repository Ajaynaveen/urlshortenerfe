import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Define CSS styles
const dashboardStyles = {
  header: {
    textAlign: 'center',
  },
  section: {
    border: '1px solid #ccc',
    padding: '20px',
    margin: '10px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tableHeaderCell: {
    border: '1px solid #ccc',
    padding: '8px',
  },
  tableCell: {
    border: '1px solid #ccc',
    padding: '8px',
  },
  ul: {
    listStyleType: 'none',
    padding: '0',
  },
};

const Dashboard = () => {
  const [todayCount, setTodayCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [dailyCounts, setDailyCounts] = useState([]);

  useEffect(() => {
    // Use Axios for the API request
    axios.get('https://urlshortener-db6x.onrender.com/stats', {
      headers: {
        Authorization: `${localStorage.getItem('token')}`, // Remove the extra space before ${localStorage.getItem('token')}
      },
    })
      .then((response) => {
        const data = response.data;
        setTodayCount(data.todayCount);
        setMonthCount(data.monthCount);
        setDailyCounts(data.dailyCounts || []);
      })
      .catch((error) => {
        console.error('Error fetching statistics:', error);
        // Handle the error, e.g., show an error message to the user
      });
  }, []);

  return (
    <div>
      <h1 style={dashboardStyles.header}>URL Shortener Dashboard</h1>

      <div style={dashboardStyles.section}>
        <h2>Statistics</h2>
        <p>Total URLs Created Today: {todayCount}</p>
        <p>Total URLs Created in the Last Month: {monthCount}</p>
      </div>

      <div style={dashboardStyles.section}>
        <h2>Daily Counts</h2>
        <table style={dashboardStyles.table}>
          <thead>
            <tr>
              <th style={dashboardStyles.tableHeaderCell}>Date</th>
              <th style={dashboardStyles.tableHeaderCell}>Count</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(dailyCounts) && dailyCounts.map((item, index) => (
              <tr key={index}>
                <td style={dashboardStyles.tableCell}>{item.date}</td>
                <td style={dashboardStyles.tableCell}>{item.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={dashboardStyles.section}>
        <h2>Navigation</h2>
        <ul style={dashboardStyles.ul}>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/urls">URLs Table</Link>
          </li>
          <li>
            <Link to="/shorten">Shorten URL</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
