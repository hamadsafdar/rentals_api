const { Address } = require('../models');

async function create({ address, city, province, zip }) {
	try {
		const address = new Address({ address, city, province, zip });
		const saved = await address.save();
		return { insertId: saved._id };
	} catch (error) {
		throw error;
	}
}

async function edit({ addressId, attributes }) {
	try {
		await Address.findOneAndUpdate({ _id: addressId }, attributes);
		return;
	} catch (error) {
		throw error;
	}
}

async function remove(addressId) {
	try {
		await Address.remove({ _id: addressId });
		return;
	} catch (error) {
		throw error;
	}
}

async function get(addressId) {
	try {
		const address = await Address.findById(addressId);
		return address;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	create,
	edit,
	remove,
	get
};
