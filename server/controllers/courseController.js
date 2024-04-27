const Course = require('../models/courseModel');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor } = req.body;
    const newCourse = new Course({ title, description, instructor });
    await newCourse.save();
    res.json({ message: 'Course created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add more controller functions as needed