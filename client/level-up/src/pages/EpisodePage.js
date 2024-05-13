import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/EpisodePage.css';

const EpisodePage = () => {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEpisode = async () => {
      try {
        const response = await axios.get(`/api/episodes/${id}`);
        setEpisode(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEpisode();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!episode) {
    return <div>Loading...</div>;
  }

  return (
    <div className="episode-page">
      <div className="episode-header">
        <h1 className="episode-title">{episode.title}</h1>
      </div>
      <div className="episode-description">
        <div className="description-container">
          <p>{episode.description}</p>
        </div>
      </div>
      <div className="episode-video">
        <div className="video-container">
          <div className="video-player">
          <iframe
              src={`https://player.vimeo.com/video/${episode.vimeoId}`}
              title={`Episode: ${episode.title}`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <button className="back-button" onClick={handleBackClick}>
        Back to Course
      </button>
    </div>
  );
};

export default EpisodePage;