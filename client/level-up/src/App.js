import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import CoursePage from './pages/CoursePage';
import EpisodePage from './pages/EpisodePage';
import AdminDashboard from './components/Admin/AdminDashboard';
import AuthStatus from './components/AuthStatus';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get('token');
        if (token) {
          const response = await axios.get('/api/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsLoggedIn(true);
          setUser(response.data);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          handleLogout();
        } else {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, [location]);

  const handleLogin = (user, token) => {
    setIsLoggedIn(true);
    setUser(user);
    Cookies.set('token', token, { expires: 1 });
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      setIsLoggedIn(false);
      setUser(null);
      Cookies.remove('token');
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="app-content">
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
          <Route
            path="/courses/:id"
            element={<CoursePage isLoggedIn={isLoggedIn} />}
          />
          <Route
          path="/episodes/:id"
          element={<EpisodePage />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default AppWrapper;