const Episode = require('../models/episodeModel');
const axios = require('axios');
const FormData = require('form-data');

exports.createEpisode = async (req, res) => {
  try {
    const { title, description, courseId } = req.body;

    const videoFile = req.files.video;
    const formData = new FormData();
    formData.append('file', videoFile.data, videoFile.name);

    const uploadResponse = await axios.post('https://api.sproutvideo.com/v1/videos', formData, {
      headers: {
        'SproutVideo-Api-Key': process.env.SPROUTVIDEO_API_KEY,
        ...formData.getHeaders(),
      },
    });

    const sproutVideoEmbedCode = uploadResponse.data.embed_code;

    const embedCodeMatch = sproutVideoEmbedCode.match(/embed\/([^/]+)\/([^'"]+)/);
    const embedPath = embedCodeMatch ? embedCodeMatch[0] : '';

    const newEpisode = new Episode({
      title,
      description,
      course: courseId,
      sproutVideoEmbedPath: embedPath,
    });

    await newEpisode.save();
    res.json(newEpisode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getEpisodeById = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id).populate('course', 'title');
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    res.json(episode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find().populate('course', 'title');
    res.json(episodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteEpisode = async (req, res) => {
  try {
    const episode = await Episode.findById(req.params.id);

    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    const videoId = episode.sproutVideoEmbedPath.split('/')[1];

    await axios.delete(`https://api.sproutvideo.com/v1/videos/${videoId}`, {
      headers: {
        'SproutVideo-Api-Key': process.env.SPROUTVIDEO_API_KEY,
      },
    });

    await Episode.findByIdAndDelete(req.params.id);

    res.json({ message: 'Episode deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.response && error.response.data && error.response.data.error === 'Video Not Found') {
      // If the video is not found on Sprout Video, delete the episode from the database
      await Episode.findByIdAndDelete(req.params.id);
      res.json({ message: 'Episode deleted successfully from the database' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

exports.getEpisodesByCourseId = async (req, res) => {
  try {
    const { course } = req.query;
    const episodes = await Episode.find({ course }).populate('course', 'title');
    res.json(episodes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEpisode = async (req, res) => {
  try {
    const { title, description, courseId } = req.body;
    const updatedEpisode = await Episode.findByIdAndUpdate(
      req.params.id,
      { title, description, course: courseId },
      { new: true }
    ).populate('course', 'title');

    if (!updatedEpisode) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    res.json(updatedEpisode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};