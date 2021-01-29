const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const movieHelpers = require('../helpers/movies');

router.get('/', movieHelpers.getAllMovies);

router.get('/search/:value', movieHelpers.searchMovies);

router.post('/', auth, movieHelpers.postMovie);

router.get('/:movieId', movieHelpers.getMovie);

router.patch('/:movieId', auth, movieHelpers.updateMovie);

router.delete('/:movieId', auth, movieHelpers.deleteMovie);

module.exports = router;
