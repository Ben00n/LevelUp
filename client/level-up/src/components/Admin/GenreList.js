import React, { useState } from 'react';
import axios from 'axios';

const GenreList = ({ genres, onGenreRemoved, onGenreUpdated }) => {
  const [editingGenreId, setEditingGenreId] = useState(null);
  const [editedGenreName, setEditedGenreName] = useState('');

  const handleRemoveGenre = async (genreId) => {
    try {
      await axios.delete(`/api/genres/${genreId}`);
      onGenreRemoved(genreId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditGenre = (genreId, genreName) => {
    setEditingGenreId(genreId);
    setEditedGenreName(genreName);
  };

  const handleUpdateGenre = async () => {
    try {
      await axios.put(`/api/genres/${editingGenreId}`, { name: editedGenreName });
      onGenreUpdated();
      setEditingGenreId(null);
      setEditedGenreName('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Genres</h3>
      <ul>
        {genres.map((genre) => (
          <li key={genre._id} className={editingGenreId === genre._id ? 'editing' : ''}>
            {editingGenreId === genre._id ? (
              <>
                <input
                  type="text"
                  value={editedGenreName}
                  onChange={(e) => setEditedGenreName(e.target.value)}
                />
                <div className="actions">
                  <button onClick={handleUpdateGenre}>Save</button>
                  <button onClick={() => setEditingGenreId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                {genre.name}
                <div className="actions">
                  <button onClick={() => handleEditGenre(genre._id, genre.name)}>Edit</button>
                  <button onClick={() => handleRemoveGenre(genre._id)}>Remove</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GenreList;