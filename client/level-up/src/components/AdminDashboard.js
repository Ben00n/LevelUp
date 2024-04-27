import React from 'react';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <CourseForm />
      <CourseList />
    </div>
  );
};

export default AdminDashboard;