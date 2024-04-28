const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  title: String,
  // Add more fields as needed
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;