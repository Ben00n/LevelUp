import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthStatus.css';

const AuthStatus = ({ isLoggedIn, username, onLogout }) => {
  return (
    <div className="auth-status">
      {isLoggedIn ? (
        <div>
          <span>Logged in as {username}</span>
          <button onClick={onLogout}>Logout</button>
        </div>
      ) : (
        <Link to="/login">Sign In</Link>
      )}
    </div>
  );
};

export default AuthStatus;