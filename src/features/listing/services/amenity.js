const { Amenity } = require('../models');

async function create({ title, description, quantity = 0, listingId }) {
	try {
		const amenity = await new Amenity({
			title,
			description,
			quantity,
			listingId
		}).save();
		return amenity._id;
	} catch (error) {
		throw error;
	}
}

async function remove(amenityId) {
	try {
		await Amenity.remove({ _id: amenityId });
		return;
	} catch (error) {
		throw error;
	}
}

async function edit({ amenityId, attributes }) {
	try {
		await Amenity.findOneAndUpdate({ _id: amenityId }, attributes);
		return;
	} catch (error) {
		throw error;
	}
}

async function get(amentiyId) {
	try {
		const amenity = await Amenity.findById(amentiyId);
		return amenity;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	create,
	remove,
	edit,
	get
};
