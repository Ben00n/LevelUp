const express = require('express');
const episodeController = require('../controllers/episodeController');

const router = express.Router();

router.post('/', episodeController.createEpisode);
router.get('/', episodeController.getAllEpisodes);
router.get('/:id', episodeController.getEpisodeById);
router.delete('/:id', episodeController.deleteEpisode);
router.get('/course/:courseId', episodeController.getEpisodesByCourseId);

module.exports = router;