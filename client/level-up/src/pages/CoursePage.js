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
    </div>
  );
};

export default CoursePage;