// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AuthStatus from './components/AuthStatus';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleLogin = (name, lastName) => {
    setIsLoggedIn(true);
    setName(name);
    setLastName(lastName);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
    setLastName('');
  };

  return (
    <Router>
      <AuthStatus isLoggedIn={isLoggedIn} name={name} lastName={lastName} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
}

export default App;