import React, { useState, useEffect } from 'react';
import Layout from './layout';
import Dashboard from './dashboard/Dashboard';
import Login from './Login';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check storage on boot to see if user has already authenticated
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Guard routing layout: if not authorized, enforce login terminal display
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}