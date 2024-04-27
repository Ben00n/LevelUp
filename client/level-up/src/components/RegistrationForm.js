import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const validateRegistrationForm = (email, password, name, lastName) => {
  const errors = {};

  if (email.length < 4) {
    errors.email = 'Entered an invalid email address.';
  }

  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters long.';
  }

  if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters long.';
  }

  if (lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters long.';
  }

  return errors;
};

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegistrationForm(email, password, name, lastName);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('/api/register', { email, password, name, lastName });
        setMessage('Registration successful. Please login.');
        setErrors({});
        navigate('/login');
      } catch (error) {
        if (error.response && error.response.status === 409) {
          setErrors({ email: 'Email is already taken. Please choose a different email.' });
        } else {
          setErrors({ general: 'Registration failed. Please try again.' });
        }
        setMessage('');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p className="error">{errors.password}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {errors.name && <p className="error">{errors.name}</p>}
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {errors.lastName && <p className="error">{errors.lastName}</p>}
      <button type="submit">Register</button>
      {message && <p className="message">{message}</p>}
      {errors.general && <p className="error">{errors.general}</p>}
    </form>
  );
};

export default RegistrationForm;