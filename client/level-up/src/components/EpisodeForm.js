import React, { useState } from 'react';
import axios from 'axios';

const EpisodeForm = ({ onEpisodeAdded, courses }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('courseId', courseId);
      formData.append('video', videoFile);
    
      const response = await axios.post('/api/episodes', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      onEpisodeAdded(response.data);
      setTitle('');
      setDescription('');
      setCourseId('');
      setVideoFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
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
      <input type="file" name="video" accept="video/*" onChange={handleVideoChange} />
      <button type="submit">Add Episode</button>
    </form>
  );
};

export default EpisodeForm;