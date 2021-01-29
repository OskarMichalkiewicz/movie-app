const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ratingHelpers = require('../helpers/ratings');

router.get('/', ratingHelpers.getAllRatings);

router.get('/:movieId', ratingHelpers.getMovieRatings);

router.post('/', auth, ratingHelpers.postRating);

// router.get('/:ratingId', ratingHelpers.getRating);

router.delete('/:ratingId', auth, ratingHelpers.deleteRating);

module.exports = router;
