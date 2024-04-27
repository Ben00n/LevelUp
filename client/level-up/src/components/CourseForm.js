import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/courses', { title, description, instructor });
      // Reset form fields and show success message
    } catch (error) {
      console.error(error);
      // Show error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="text"
        placeholder="Instructor"
        value={instructor}
        onChange={(e) => setInstructor(e.target.value)}
      />
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CourseForm;