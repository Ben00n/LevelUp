import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import '../styles/HomePage.css';

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, genresResponse] = await Promise.all([
          axios.get('/api/courses'),
          axios.get('/api/genres'),
        ]);

        setCourses(coursesResponse.data);
        setGenres(genresResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getCoursesByGenre = (genreId) => {
    return courses.filter((course) => course.genre === genreId);
  };

  return (
    <div className="home-page">
      {genres.map((genre) => (
        <section key={genre._id}>
          <h2>{genre.name}</h2>
          <div className="course-list">
            {getCoursesByGenre(genre._id).map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default HomePage;