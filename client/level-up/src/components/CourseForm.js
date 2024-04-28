import React, { useState } from 'react';
import axios from 'axios';

const CourseForm = ({ onCourseAdded, genres }) => {
  const [genre, setGenre] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructor, setInstructor] = useState('');
  const [image, setImage] = useState('');
  const [episodes, setEpisodes] = useState([{ title: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/courses', {
        title,
        description,
        instructor,
        image,
        episodes,
        genre,
      });
      onCourseAdded(response.data);
      // Reset form fields
      setGenre('');
      setTitle('');
      setDescription('');
      setInstructor('');
      setImage('');
      setEpisodes([{ title: '' }]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEpisodeChange = (index, value) => {
    const updatedEpisodes = [...episodes];
    updatedEpisodes[index].title = value;
    setEpisodes(updatedEpisodes);
  };

  const addEpisode = () => {
    setEpisodes([...episodes, { title: '' }]);
  };

  const removeEpisode = (index) => {
    const updatedEpisodes = [...episodes];
    updatedEpisodes.splice(index, 1);
    setEpisodes(updatedEpisodes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Select Genre</option>
        {genres.map((genre) => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>
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
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <div>
        <h4>Episodes</h4>
        {episodes.map((episode, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Episode ${index + 1} Title`}
              value={episode.title}
              onChange={(e) => handleEpisodeChange(index, e.target.value)}
            />
            <button type="button" onClick={() => removeEpisode(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addEpisode}>
          Add Episode
        </button>
      </div>
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CourseForm;