import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CoursePage.css';

const CoursePage = ({ isLoggedIn }) => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchEpisodes = async () => {
      try {
        const response = await axios.get(`/api/episodes?course=${id}`);
        setEpisodes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
    fetchEpisodes();
  }, [id]);

  const handleEpisodeClick = (episodeId) => {
    if (isLoggedIn) {
      navigate(`/episodes/${episodeId}`);
    } else {
      navigate('/login');
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-page">
      <section className="course-header">
        <h1 className="course-title">{course.title}</h1>
        <p className="course-instructor">Instructor: {course.instructor}</p>
      </section>
      <section className="course-description">
        <div className="description-container">
          <h2>Description</h2>
          <p>{course.description}</p>
        </div>
      </section>
      <section className="course-episodes">
        <div className="episodes-container">
          <h2>Subjects</h2>
          {episodes.map((episode) => (
            <button
              key={episode._id}
              onClick={() => handleEpisodeClick(episode._id)}
            >
              {episode.title}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CoursePage;