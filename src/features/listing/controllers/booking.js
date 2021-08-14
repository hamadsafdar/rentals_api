const helpers = require('../../../helpers');
const { booking: bookingServices } = require('../services');

async function bookListing(req, res) {
	try {
		const { listingId, bookingDetails } = req.body;
		await bookingServices.bookListing({
			listingId,
			bookingDetails,
			bookedBy: req.user.userId
		});
		return res.json({ message: 'BOOKING_CREATED' });
	} catch (error) {
		console.log(error);
		return helpers.response.send500(res);
	}
}

async function getBookings(req, res) {
	try {
		const bookings = await bookingServices.getBookingsByUser(
			req.user.userId
		);
		return res.json({
			booked: bookings
		});
	} catch (error) {
		console.log(error);
		return helpers.response.send500(res);
	}
}

async function getBookedLisitngs() {}

module.exports = { bookListing, getBookings };
