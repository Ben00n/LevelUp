import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import GenreForm from './GenreForm';
import GenreList from './GenreList';
import EpisodeForm from './EpisodeForm';
import EpisodeList from './EpisodeList';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [genres, setGenres] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [activeSection, setActiveSection] = useState('genres');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesResponse, genresResponse, episodesResponse] = await Promise.all([
        axios.get('/api/courses'),
        axios.get('/api/genres'),
        axios.get('/api/episodes'),
      ]);

      setCourses(coursesResponse.data);
      setGenres(genresResponse.data);
      setEpisodes(episodesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'genres':
        return (
          <>
            <GenreForm onGenreAdded={fetchData} />
            <GenreList genres={genres} onGenreRemoved={fetchData} />
          </>
        );
      case 'courses':
        return (
          <>
            <CourseForm onCourseAdded={fetchData} genres={genres} />
            <CourseList courses={courses} onCourseRemoved={fetchData} />
          </>
        );
      case 'episodes':
        return (
          <>
            <EpisodeForm onEpisodeAdded={fetchData} courses={courses} />
            <EpisodeList episodes={episodes} onEpisodeRemoved={fetchData} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="admin-menu">
        <button onClick={() => handleSectionChange('genres')}>Genres</button>
        <button onClick={() => handleSectionChange('courses')}>Courses</button>
        <button onClick={() => handleSectionChange('episodes')}>Episodes</button>
      </div>
      <div className="admin-content">{renderSection()}</div>
    </div>
  );
};

export default AdminDashboard;