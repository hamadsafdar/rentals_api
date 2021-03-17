const express = require('express');
const router = express.Router();
const controller = require('../controller');
const { authToken } = require('../middlewares');

//TODO
// Edit a user attribute
// Upload Image

router.post('/register', controller.register);
router.post('/authenticate', controller.register);

module.exports = router;
