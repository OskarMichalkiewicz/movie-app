require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3001;
const movieRoutes = require('./api/routes/movies');
const ratingRoutes = require('./api/routes/ratings');
const userRoutes = require('./api/routes/users');
const MONGODB_URI = 'mongodb+srv://OskarM:27422722q@movies-api.aycjx.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI || 'mongodb://localhost/movies-api', {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
  keepAlive: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('./movie-client/build'));
}

app.use('/ratings', ratingRoutes);
app.use('/movies', movieRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) => {
  let error = new Error('Not Found');
  res.status(404);
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500)
    .json({
    error: {
      message: error.message
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
