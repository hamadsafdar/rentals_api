const router = require('express').Router();
const { authToken } = require('../../user-management/middlewares');
const controller = require('../controllers');

router
	.post('/', authToken, controller.create)
	.get('/hosted', authToken, controller.getHostedLisitngs)
	.get('/', authToken, controller.getRandomListings)
	.get('/:listingId', authToken, controller.getListing)
	.delete('/:listingId', authToken, (req, res) => {});

module.exports = router;
