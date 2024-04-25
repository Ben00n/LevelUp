import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthStatus.css';

const AuthStatus = ({ isLoggedIn, name, lastName, onLogout }) => {
  return (
    <div className="auth-status">
      {isLoggedIn ? (
        <div>
          <span>Logged in as {name} {lastName}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <span>You are not logged in</span>
          <Link to="/login">Sign In</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default AuthStatus;