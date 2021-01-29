const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Movie'
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  },
  publishDate: {
    type: Date
  }
});

module.exports = mongoose.model('Rating', ratingSchema);
