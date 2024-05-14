import React, { useState } from 'react';
import axios from 'axios';

const CourseList = ({ courses, onCourseRemoved, onCourseUpdated, genres }) => {
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editedCourse, setEditedCourse] = useState({
    title: '',
    description: '',
    instructor: '',
    image: '',
    genre: '',
  });

  const handleRemoveCourse = async (courseId) => {
    try {
      await axios.delete(`/api/courses/${courseId}`);
      onCourseRemoved(courseId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourseId(course._id);
    setEditedCourse(course);
  };

  const handleUpdateCourse = async () => {
    try {
      await axios.put(`/api/courses/${editingCourseId}`, editedCourse);
      onCourseUpdated();
      setEditingCourseId(null);
      setEditedCourse({
        title: '',
        description: '',
        instructor: '',
        image: '',
        genre: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>Courses</h3>
      <ul>
        {courses.map((course) => (
          <li key={course._id} className={editingCourseId === course._id ? 'editing' : ''}>
            {editingCourseId === course._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={editedCourse.title}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={editedCourse.description}
                  onChange={handleInputChange}
                ></textarea>
                <input
                  type="text"
                  name="instructor"
                  placeholder="Instructor"
                  value={editedCourse.instructor}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="image"
                  placeholder="Image URL"
                  value={editedCourse.image}
                  onChange={handleInputChange}
                />
                <select
                  name="genre"
                  value={editedCourse.genre}
                  onChange={handleInputChange}
                >
                  <option value="">Select Genre</option>
                  {genres.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
                <div className="actions">
                  <button onClick={handleUpdateCourse}>Save</button>
                  <button onClick={() => setEditingCourseId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span>{course.title}</span>
                <div className="actions">
                  <button onClick={() => handleEditCourse(course)}>Edit</button>
                  <button onClick={() => handleRemoveCourse(course._id)}>Remove</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;