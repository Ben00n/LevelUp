import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import GenreForm from './GenreForm';
import GenreList from './GenreList';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchGenres();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('/api/genres');
      setGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCourseAdded = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  const handleCourseRemoved = (courseId) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const handleGenreAdded = (newGenre) => {
    setGenres([...genres, newGenre]);
  };

  const handleGenreRemoved = (genreId) => {
    setGenres(genres.filter((genre) => genre._id !== genreId));
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <CourseForm onCourseAdded={handleCourseAdded} genres={genres} />
      <CourseList courses={courses} onCourseRemoved={handleCourseRemoved} />
      <GenreForm onGenreAdded={handleGenreAdded} />
      <GenreList genres={genres} onGenreRemoved={handleGenreRemoved} />
    </div>
  );
};

export default AdminDashboard;