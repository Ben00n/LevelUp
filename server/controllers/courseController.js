const Course = require('../models/courseModel');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor, image, genre } = req.body;
    const newCourse = new Course({ title, description, instructor, image, genre });

    await newCourse.save();

    res.json({ message: 'Course created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCourse = async (req, res) => {
  try {
    const { title, description, instructor, image, genre } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, instructor, image, genre },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(updatedCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json({ message: 'Course deleted successfully' });
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

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};