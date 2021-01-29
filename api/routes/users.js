const express = require('express');
const router = express.Router();
const userHelpers = require('../helpers/users');
const auth = require('../middleware/auth');

router.post('/signup', userHelpers.signup);

router.post('/login', userHelpers.login);

router.delete('/:userId', auth, userHelpers.deleteUser);

module.exports = router;
