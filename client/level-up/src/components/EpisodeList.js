import React from 'react';
import axios from 'axios';

const EpisodeList = ({ episodes, onEpisodeRemoved }) => {
  const handleRemoveEpisode = async (episodeId) => {
    try {
      await axios.delete(`/api/episodes/${episodeId}`);
      onEpisodeRemoved(episodeId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Episodes</h3>
      <ul>
        {episodes.map((episode) => (
          <li key={episode._id}>
            <span>{episode.title}</span>
            <button onClick={() => handleRemoveEpisode(episode._id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;