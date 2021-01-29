require('dotenv').config();

const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    let { id, username } = user;
    let token = jwt.sign(
      {
        id,
        username
      },
      process.env.SECRET_KEY
    );
    return res.status(200).json({
      id,
      username,
      token
    });
  } catch (err) {
    if (err.code == 11000) {
      err.message = 'Sorry, that username is taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    let user = await User.findOne({
      username: req.body.username
    });
    let { id, username } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username
        },
        process.env.SECRET_KEY
      );
      process.env.CURRENT_USER = id;
      return res.status(200).json({
        id,
        username,
        token
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid Username/Password'
      });
    }
  } catch (e) {
    return next({
      status: 400,
      message: 'Invalid Username/Password'
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    return res.status(200).json({
      message: 'User deleted'
    });
  } catch (err) {
    return next({
      status: 500,
      message: err.message
    });
  }
};
