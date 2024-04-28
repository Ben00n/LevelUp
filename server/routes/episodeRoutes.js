const express = require('express');
const episodeController = require('../controllers/episodeController');

const router = express.Router();

router.post('/', episodeController.createEpisode);
router.get('/', episodeController.getAllEpisodes);
router.delete('/:id', episodeController.deleteEpisode);

module.exports = router;