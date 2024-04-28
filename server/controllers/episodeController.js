const Episode = require('../models/episodeModel');

exports.createEpisode = async (req, res) => {
  try {
    const { title, description, courseId } = req.body;
    const newEpisode = new Episode({ title, description, course: courseId });
    await newEpisode.save();
    res.json(newEpisode);
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