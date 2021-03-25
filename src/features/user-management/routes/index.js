const express = require('express');
const router = express.Router();
const controller = require('../controller');
const { authToken } = require('../middlewares');
const { multer } = require('../../../util');

//TODO
// Edit a user attribute
// Upload Image

router.post('/register', controller.register);
router.post('/authenticate', controller.authenticate);
router.get('/', authToken, controller.getUser);
router.patch('/update', authToken, controller.editUser);
router.post(
	'/image',
	authToken,
	multer.single('file'),
	controller.uploadProfilePic
);

module.exports = router;
