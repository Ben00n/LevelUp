// HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import '../styles/HomePage.css';

const HomePage = () => {
  const [gameDevCourses, setGameDevCourses] = useState([]);
  const [gameHackingCourses, setGameHackingCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses');
        const courses = response.data;
        setGameDevCourses(courses.filter((course) => course.genre === 'Game Development'));
        setGameHackingCourses(courses.filter((course) => course.genre === 'Game Hacking'));
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="home-page">
      <section>
        <h2>Game Development</h2>
        <div className="course-list">
          {gameDevCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
      <section>
        <h2>Game Hacking</h2>
        <div className="course-list">
          {gameHackingCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;