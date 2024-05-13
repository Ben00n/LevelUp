const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  title: String,
  description: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  videoUrl: String,
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;