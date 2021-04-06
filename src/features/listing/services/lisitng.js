const { Listing, Amenity, Address } = require('../models');

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
	amenities: rAmenities
}) {
	try {
		const address = await new Address({
			address: location.address,
			province: location.province,
			city: location.city,
			zipCode: location.zipCode,
			longitude: location.longitude,
			latitude: location.latitude
		}).save();

		const amenities = await Amenity.collection.insertMany(rAmenities);
		await new Listing({
			title,
			description,
			imagesUrl,
			rate,
			guestsLimit,
			host: hostId,
			amenities: Object.keys(amenities.insertedIds).map(
				(key) => amenities.insertedIds[key]
			),
			address: address._id
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
				path: 'amenities'
			})
			.populate({
				path: 'address'
			})
			.exec();
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
			.populate({ path: 'amenities' })
			.populate({ path: 'reviews' })
			.exec();
		return listings;
	} catch (error) {
		throw error;
	}
}

async function remove({ listingId, hostId }) {}

async function getRandomListings(hostId) {
	try {
		const listings = await Listing.find()
			.where('host')
			.ne(hostId)
			.limit(10)
			.populate({ path: 'address' })
			.populate({ path: 'amenity' })
			.populate({ path: 'address' })
			.populate({ path: 'reviews' })
			.populate({ path: 'host', select: 'name email imageUrl' })
			.exec();
		return listings;
	} catch (error) {
		throw error;
	}
}

module.exports = { getRandomListings, get, remove, getHostedListings, create };
