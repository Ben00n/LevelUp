const Genre = require('../models/genreModel');

exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const newGenre = new Genre({ name });
    await newGenre.save();
    res.json(newGenre);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteGenre = async (req, res) => {
  try {
    const deletedGenre = await Genre.findByIdAndDelete(req.params.id);

    if (!deletedGenre) {
      return res.status(404).json({ error: 'Genre not found' });
    }

    res.json({ message: 'Genre deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};