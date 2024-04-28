const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();

router.post('/', genreController.createGenre);
router.get('/', genreController.getAllGenres);
router.delete('/:id', genreController.deleteGenre);

module.exports = router;