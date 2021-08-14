const helpers = require('../../../helpers');
const { Booking } = require('../models');

const constants = Object.freeze({
	PENDING: 'PENDING',
	STARTED: 'STARTED',
	CONFIRMED: 'CONFIRMED',
	COMPLETED: 'COMPLETED',
	CANCELLED: 'CANCELLED'
});

async function bookListing({ listingId, bookingDetails, bookedBy }) {
	try {
		const booking = new Booking({
			start: bookingDetails.startDate,
			end: bookingDetails.endDate,
			listing: listingId,
			bookedBy
		});
		const saved = await booking.save();
		const user = await helpers.user.getUserById(bookedBy);
		await user.save();
		return;
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

async function getBookingsByUser(userId) {
	try {
		const pastBookings = await Booking.find({
			bookedBy: userId
		})
			.populate({
				path: 'listing',
				select: '-createdAt -updatedAt -__v',
				populate: {
					path: 'host'
				}
			})
			// .populate({
			// 	path: 'host',
			// 	select: ''
			// })
			.exec();
		return pastBookings;
	} catch (error) {
		throw error;
	}
}

async function getHostedBookings(hostId) {}

module.exports = {
	bookListing,
	bookingAvailable,
	changeStatus,
	constants,
	getBookingsByUser
};
