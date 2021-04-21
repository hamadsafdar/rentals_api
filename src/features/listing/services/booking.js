const { Booking } = require('../models');

const CONSTANTS = Object.freeze({
	PENDING: 'PENDING',
	STARTED: 'STARTED',
	CONFIRMED: 'CONFIRMED',
	COMPLETED: 'COMPLETED',
	CANCELLED: 'CANCELLED'
});

async function bookListing({ listingId, bookingDetails }) {
	try {
		const booking = new Booking({
			start: bookingDetails.startDate,
			end: bookingDetails.endDate,
			lisitng: listingId,
			bookedBy: bookingDetails.bookedBy
		});
		const saved = await booking.save();
		return saved._id;
	} catch (error) {
		throw error;
	}
}

async function bookingAvailable({ listingId, bookingDetails }) {
	try {
		const bookings = Booking.find({
			lisitng: listingId
		})
			.where('start')
			.gt()
			.exec();
	} catch (error) {
		throw error;
	}
}

async function changeStatus({ bookingId, updatedStatus }) {
	try {
		await Booking.findByIdAndUpdate(bookingId, { status: updatedStatus });
		return;
	} catch (error) {
		throw error;
	}
}

module.exports = { bookListing, bookingAvailable, changeStatus, CONSTANTS };