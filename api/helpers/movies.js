const Rating = require('../models/rating');
const Movie = require('../models/movie');

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

exports.getAllMovies = async (req, res, next) => {
  try {
    let movies = await Movie.find()
      .select('title summary _id imgUrl genre')
      .orFail();
    return res.status(200).json(movies);
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};
exports.searchMovies = async (req, res, next) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.value), 'gi');
    let movies = await Movie.find({ title: regex })
      .select('title summary _id imgUrl genre')
      .orFail();
    return res.status(200).json(movies);
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.postMovie = async (req, res, next) => {
  try {
    const movie = await Movie.create({
      title: req.body.title,
      summary: req.body.summary,
      genre: req.body.genre,
      imgUrl: req.body.imgUrl
    });
    return res.status(200).json({
      message: 'Movie added successfully',
      createdMovie: {
        title: movie.title,
        summary: movie.summary,
        _id: movie._id
      },
      request: {
        type: 'GET',
        url: '3000/movies/' + movie._id
      }
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.getMovie = async (req, res, next) => {
  const id = req.params.movieId;
  try {
    let movieRatings = await Rating.find({ movie: id });
    const ratings = movieRatings.map(rating => rating.score);
    const average = ratings.reduce((a, b) => a + b, 0) / movieRatings.length;
    const result = await Movie.findById(id)
      .select('title genre summary _id imgUrl')
      .orFail();
    res.status(200).json({
      result,
      averageScore: average,
      score: {
        ratings: movieRatings.map(rating => {
          return {
            score: rating.score,
            userId: rating.userId,
            publishDate: rating.publishDate
          };
        })
      }
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.updateMovie = async (req, res, next) => {
  const id = req.params.movieId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  try {
    await Movie.update({ _id: id }, { $set: updateOps });
    return res.status(200).json({
      message: 'Movie updated',
      request: {
        type: 'GET',
        url: '3000/movies/' + id
      }
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.deleteMovie = async (req, res, next) => {
  const id = req.params.movieId;
  try {
    await Movie.remove({ _id: id });
    return res.status(200).json({
      message: 'Movie deleted',
      request: {
        type: 'POST',
        url: '3000/movies',
        body: {
          title: 'String',
          summary: 'String'
        }
      }
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    });
  }
};
