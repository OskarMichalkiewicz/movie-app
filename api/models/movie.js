const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: {
      type: String,
      required: true
  },
  summary:{
      type: String,
      required: true
  },
  genre:[
      {
          type:String,
          required: true
    }
    ],
  imgUrl:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Movie', movieSchema);
