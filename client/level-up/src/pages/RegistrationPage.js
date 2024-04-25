import React from 'react';
import RegistrationForm from '../components/RegistrationForm';
import '../styles/RegistrationPage.css';

const RegistrationPage = () => {
  return (
    <div className="registration-page">
      <h1>Registration</h1>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;