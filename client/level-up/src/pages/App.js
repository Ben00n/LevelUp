import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      setMessage(response.data.message);
      // Handle successful login, e.g., redirect to a dashboard page
    } catch (error) {
      setMessage(error.response.data.error);
      // Handle login error, e.g., display an error message
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { username, password });
      setMessage(response.data.message);
      // Handle successful registration, e.g., redirect to a login page
    } catch (error) {
      setMessage(error.response.data.error);
      // Handle registration error, e.g., display an error message
    }
  };

  return (
    <div>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={(e) => setUsername(e.target.value)}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handleLogin={handleLogin}
      />

      <RegistrationForm
        username={username}
        password={password}
        handleUsernameChange={(e) => setUsername(e.target.value)}
        handlePasswordChange={(e) => setPassword(e.target.value)}
        handleRegister={handleRegister}
      />

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;