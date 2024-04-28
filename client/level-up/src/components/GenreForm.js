import React, { useState } from 'react';
import axios from 'axios';

const GenreForm = ({ onGenreAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/genres', { name });
      onGenreAdded(response.data);
      setName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Genre Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Add Genre</button>
    </form>
  );
};

export default GenreForm;