const { Listing, Amenity, Address, Review, Booking } = require('../models');
const helper = require('../../../helpers');

//TODO: Edit
//host will also be the creator of listing

async function create({
	hostId,
	imagesUrl,
	title,
	description,
	rate,
	guestsLimit,
	address: location,
	amenities: rAmenities,
	bedrooms,
	bathrooms
}) {
	try {
		const address = await new Address({
			address: location.address,
			province: location.province,
			city: location.city,
			zipCode: location.zipCode,
			longitude: location?.longitude || 0.0,
			latitude: location?.latitude || 0.0
		}).save();

		const amenities = JSON.stringify(rAmenities);

		await new Listing({
			title,
			description,
			images: imagesUrl,
			rate,
			guestsLimit,
			host: hostId,
			amenities,
			address: address._id,
			bedrooms,
			bathrooms
		}).save();

		return;
	} catch (error) {
		throw error;
	}
}

async function get(listingId) {
	try {
		const listing = await Listing.findById(listingId)
			.populate({
				path: 'host',
				select: 'name email imageUrl'
			})
			.populate({
				path: 'reviews',
				populate: {
					path: 'reviewedBy'
				}
			})
			.populate({
				path: 'address'
			})
			.exec();
		console.log(listing);
		return listing;
	} catch (error) {
		throw error;
	}
}

async function getHostedListings(hostId) {
	try {
		const listings = await Listing.find({ host: hostId })
			.select('-host')
			.populate({ path: 'address', select: '-createdAt -updatedAt -__v' })
			.populate({ path: 'reviews' })
			.exec();

		return listings;
	} catch (error) {
		throw error;
	}
}

async function remove({ listingId, hostId }) {
	try {
		await Listing.findOneAndDelete({
			_id: listingId,
			host: hostId
		});
		return;
	} catch (error) {
		throw error;
	}
}

async function getRandomListings(hostId) {
	try {
		const listings = await Listing.find()
			.where('host')
			.ne(hostId)
			.limit(10)
			.populate({ path: 'address' })
			.populate({ path: 'address' })
			.populate({ path: 'reviews' })
			.populate({ path: 'host', select: 'name email imageUrl' })
			.exec();
		return listings;
	} catch (error) {
		throw error;
	}
}

async function getListingsByCity(city, hostId) {
	try {
		const listings = await Listing.find()
			.where('host')
			.ne(hostId)
			.limit(10)
			.populate({ path: 'host' })
			.populate({ path: 'address' })
			.populate({ path: 'address' })
			.populate({ path: 'reviews' })
			.exec();

		const cityListings = listings.filter(
			(listing) => listing.address.city === city
		);
		return cityListings;
	} catch (error) {
		throw error;
	}
}

async function reviewListing({ listingId, review }) {
	try {
		const newReview = new Review({
			for: listingId,
			comment: review.comment,
			author: review.author,
			rating: review.rating
		});
		return await newReview.save();
	} catch (error) {
		throw error;
	}
}

async function bookListing({ listingId, bookingDetails, bookedBy }) {}

async function getBookingsByListing(listingId) {}

async function getBookingsByUserId(userId) {}

async function getHistory(userId) {}

async function isBookingAvailable({ listingId, bookingDetails }) {}

module.exports = {
	getRandomListings,
	get,
	remove,
	getHostedListings,
	create,
	reviewListing,
	getListingsByCity
};
