import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username and password length
    if (username.length < 4) {
      setError('Username must be at least 4 characters long.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post('/api/register', { username, password });
      setMessage('Registration successful. Please login.');
      setError('');
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Username is already taken. Please choose a different username.');
      } else {
        setError('Registration failed. Please try again.');
      }
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>
      {message && <p className="message">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default RegistrationForm;