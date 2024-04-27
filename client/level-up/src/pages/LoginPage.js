import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import '../styles/LoginPage.css';

const LoginPage = ({ onLogin }) => {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <LoginForm onLogin={onLogin} />
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;