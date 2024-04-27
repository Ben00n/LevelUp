import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthStatus.css';

const AuthStatus = ({ isLoggedIn, user, onLogout }) => {
  const handleLogoutClick = () => {
    onLogout();
  };

  return (
    <div className="auth-status">
      {isLoggedIn && user && user.isAdmin && (
        <div className="admin-dashboard-link">
          <Link to="/admin">Admin Dashboard</Link>
        </div>
      )}
      <div className="user-info">
        {isLoggedIn ? (
          <>
            <span>
              Logged in as {user ? `${user.name} ${user.lastName}` : ''}
            </span>
            <button onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <div className="auth-links">
            <span className="spacer"></span>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthStatus;