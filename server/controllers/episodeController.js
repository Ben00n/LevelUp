const Episode = require('../models/episodeModel');
const path = require('path');

exports.createEpisode = async (req, res) => {
  try {
    const { title, description, courseId } = req.body;
    
    let videoUrl = '';
    if (req.files && req.files.video) {
      const videoFile = req.files.video;
      const videoFileName = `${Date.now()}_${videoFile.name}`;
      const videoPath = path.join(__dirname, '..', 'uploads', videoFileName);
      await videoFile.mv(videoPath);
      videoUrl = `/uploads/${videoFileName}`;
    }

    const newEpisode = new Episode({
      title,
      description,
      course: courseId,
      videoUrl,
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