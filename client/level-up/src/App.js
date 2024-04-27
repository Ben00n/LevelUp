import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AdminDashboard from './components/AdminDashboard';
import AuthStatus from './components/AuthStatus';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/user');
        setIsLoggedIn(true);
        setUser(response.data);
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setUser(user);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Router>
      <AuthStatus isLoggedIn={isLoggedIn} user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route
          path="/admin"
          element={
            isLoggedIn && user && user.isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;