import React from 'react';
import axios from 'axios';

const GenreList = ({ genres, onGenreRemoved }) => {
  const handleRemoveGenre = async (genreId) => {
    try {
      await axios.delete(`/api/genres/${genreId}`);
      onGenreRemoved(genreId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Genres</h3>
      <ul>
        {genres.map((genre) => (
          <li key={genre._id}>
            {genre.name}
            <button onClick={() => handleRemoveGenre(genre._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;