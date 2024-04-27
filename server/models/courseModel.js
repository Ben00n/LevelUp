const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  instructor: String,
  // Add more fields as needed
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;