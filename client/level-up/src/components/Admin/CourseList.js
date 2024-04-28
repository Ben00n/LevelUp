import React from 'react';
import axios from 'axios';

const CourseList = ({ courses, onCourseRemoved }) => {
  const handleRemoveCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      onCourseRemoved(courseId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <span>{course.title}</span>
            <button onClick={() => handleRemoveCourse(course._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;