import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/CoursePage.css';

const CoursePage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-page">
      <section className="course-details">
        <h1>{course.title}</h1>
        <p>{course.description}</p>
        <p>Instructor: {course.instructor}</p>
      </section>
      <section className="episodes">
        <h2>Episodes</h2>
        <ul>
          {course.episodes.map((episode, index) => (
            <li key={index}>{episode.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default CoursePage;