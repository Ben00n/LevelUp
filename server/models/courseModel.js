const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  genre: String,
  title: String,
  description: String,
  instructor: String,
  image: String,
  episodes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Episode' }],
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;