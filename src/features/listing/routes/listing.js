const router = require('express').Router();
const { authToken } = require('../../user-management/middlewares');
const { listing, booking } = require('../controllers');

router
	.post('/booking', authToken, booking.bookListing)
	.get('/booking', authToken, booking.getBookings)
	.post('/', authToken, listing.create)
	.get('/hosted', authToken, listing.getHostedLisitngs)
	.get('/', authToken, listing.getRandomListings)
	.post('/search', authToken, listing.getListingsByCity)
	.get('/:listingId', authToken, listing.getListing)
	.delete('/:listingId', authToken, (req, res) => {});

module.exports = router;
