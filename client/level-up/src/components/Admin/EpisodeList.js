import React, { useState } from 'react';
import axios from 'axios';

const EpisodeList = ({ episodes, onEpisodeRemoved, onEpisodeUpdated, courses }) => {
  const [editingEpisodeId, setEditingEpisodeId] = useState(null);
  const [editedEpisode, setEditedEpisode] = useState({
    title: '',
    description: '',
    courseId: '',
  });

  const handleRemoveEpisode = async (episodeId) => {
    try {
      await axios.delete(`/api/episodes/${episodeId}`);
      onEpisodeRemoved(episodeId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditEpisode = (episode) => {
    setEditingEpisodeId(episode._id);
    setEditedEpisode({
      title: episode.title,
      description: episode.description,
      courseId: episode.course._id,
    });
  };

  const handleUpdateEpisode = async () => {
    try {
      await axios.put(`/api/episodes/${editingEpisodeId}`, editedEpisode);
      onEpisodeUpdated();
      setEditingEpisodeId(null);
      setEditedEpisode({
        title: '',
        description: '',
        courseId: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEpisode((prevEpisode) => ({
      ...prevEpisode,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3>Episodes</h3>
      <ul>
        {episodes.map((episode) => (
          <li key={episode._id} className={editingEpisodeId === episode._id ? 'editing' : ''}>
            {editingEpisodeId === episode._id ? (
              <>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={editedEpisode.title}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={editedEpisode.description}
                  onChange={handleInputChange}
                ></textarea>
                <select
                  name="courseId"
                  value={editedEpisode.courseId}
                  onChange={handleInputChange}
                >
                  <option value="">Select Course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <div className="actions">
                  <button onClick={handleUpdateEpisode}>Save</button>
                  <button onClick={() => setEditingEpisodeId(null)}>Cancel</button>
                </div>
              </>
            ) : (
              <>
                <span>{episode.title}</span>
                <div className="actions">
                  <button onClick={() => handleEditEpisode(episode)}>Edit</button>
                  <button onClick={() => handleRemoveEpisode(episode._id)}>Remove</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeList;