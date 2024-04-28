const Course = require('../models/courseModel');
const Episode = require('../models/episodeModel');

exports.createCourse = async (req, res) => {
  try {
    const { title, description, instructor, image, episodes, genre } = req.body;
    const newCourse = new Course({ title, description, instructor, image, genre });

    const createdEpisodes = await Promise.all(
      episodes.map(async (episode) => {
        const newEpisode = new Episode({ title: episode.title });
        await newEpisode.save();
        return newEpisode._id;
      })
    );

    newCourse.episodes = createdEpisodes;
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

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('episodes');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};