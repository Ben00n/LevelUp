import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CourseCard.css';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${course._id}`);
  };

  return (
    <div className="course-card" onClick={handleClick}>
      <h3>{course.title}</h3>
      <img src={course.image} alt={course.title} />
    </div>
  );
};

export default CourseCard;