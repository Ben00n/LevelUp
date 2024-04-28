import React, { useState } from 'react';
import axios from 'axios';

const EpisodeForm = ({ onEpisodeAdded, courses }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/episodes', {
        title,
        description,
        courseId,
      });
      onEpisodeAdded(response.data);
      setTitle('');
      setDescription('');
      setCourseId('');
    } catch (error) {
      console.error(error);
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
      <select value={courseId} onChange={(e) => setCourseId(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option key={course._id} value={course._id}>
            {course.title}
          </option>
        ))}
      </select>
      <button type="submit">Add Episode</button>
    </form>
  );
};

export default EpisodeForm;