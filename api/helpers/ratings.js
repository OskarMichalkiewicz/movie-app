require('dotenv').config();
const Rating = require('../models/rating');
const Movie = require('../models/movie');
const User = require('../models/user');
const user = require('../models/user');
const { findOneAndUpdate } = require('../models/rating');

exports.getAllRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find()
      .select('_id userId movie score publishDate')
      .populate('movie', 'title')
      .orFail();
    return res.status(200).json(ratings);
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    })
  }
};
exports.getMovieRatings = async (req, res, next) => {
  try {
    let movId = req.params.movieId
    const ratings = await Rating.find({movie: movId})
      .select('_id userId movie score publishDate')
      .populate('movie', 'title')
      .orFail();
    return res.status(200).json(ratings);
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    })
  }
};

// exports.modifyRating = async (req, res, next) => {
//   try {
//     const movie = await MovieItem.findById(req.body.movieId).orFail();
//     if(!movie){
//       return next({
//         status: 404,
//         message: 'Movie not found'
//       })
//     }
    
//     const foundRating = await Rating.find({userId: req.body.userId}).select("_id");
//     if(!foundRating){
//       return next({
//         status: 404,
//         message: 'Movie not found'
//       })
//     }
//     await Rating.update({ _id: id }, { $set: {score: req.body.score} })
//   }
// }

exports.postRating = async (req, res, next) => {
  try {
    console.log(req.body.score)
    const movie = await Movie.findById(req.body.movieId).orFail();
    if (!movie) {
      return next({
        status: 404,
        message: 'Movie not found'
      })
    }
    const foundUser = await user.findOne({ _id: req.body.userId }).select("_id");
    if(!foundUser){
      return next ({
        status: 404,
        message: "User not found"
      })
    }
    const foundRating = await Rating.findOne({userId: foundUser._id, movie: req.body.movieId}).select("_id");
    if(foundRating){
      await Rating.updateOne({_id: foundRating._id }, { $set: { score: req.body.score }})
    }else{
      await Rating.create({
        movie: req.body.movieId,
        score: req.body.score, 
        userId: foundUser._id,
        publishDate: new Date()
      });
    }
    return res.status(200).json({
      message: 'rated'
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    })
  }
};

exports.getRating = async (req, res, next) => {
  try {
    const rating = await Rating.findById(req.params.ratingId)
      .populate('movie', 'title')
      .orFail();
    return res.status(200).json({
      rating: rating,
      request: {
        type: 'GET',
        url: '/ratings/'
      }
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    })
  }
};

exports.deleteRating = async (req, res, next) => {
  try {
    const result = await Rating.remove({ _id: req.params.ratingId }).orFail();
    if (!result) {
      return res.status(404).json({ message: 'Rating not found' });
    }
    return res.status(200).json({
      message: 'Rating deleted',
      request: {
        type: 'POST',
        url: '/ratings',
        body: {
          movieId: 'ID',
          score: 'Number(1-10)'
        }
      }
    });
  } catch (err) {
    return next({
      status: 400,
      message: err.message
    })
  }
};
