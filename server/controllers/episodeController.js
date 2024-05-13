const Episode = require('../models/episodeModel');
const axios = require('axios');
const FormData = require('form-data');

exports.createEpisode = async (req, res) => {
  try {
    const { title, description, courseId } = req.body;

    const videoFile = req.files.video;
    const formData = new FormData();
    formData.append('file', videoFile.data, videoFile.name);

    const uploadResponse = await axios.post('https://api.vimeo.com/me/videos', formData, {
      headers: {
        'Authorization': `Bearer ${process.env.VIMEO_ACCESS_TOKEN}`,
        ...formData.getHeaders(),
      },
    });

    const vimeoVideoId = uploadResponse.data.uri.split('/').pop();

    const newEpisode = new Episode({
      title,
      description,
      course: courseId,
      vimeoId: vimeoVideoId,
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
    const deletedEpisode = await Episode.findByIdAndDelete(req.params.id);

    if (!deletedEpisode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    
    res.json({ message: 'Episode deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
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