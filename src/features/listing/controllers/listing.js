const { listing: listingServices } = require('../services');

async function create(req, res) {
	try {
		await listingServices.create({ hostId: req.user.userId, ...req.body });
		return res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function getRandomListings(req, res) {
	try {
		const listings = await listingServices.getRandomListings(
			req.user.userId
		);
		return res.json({
			listings
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function getHostedLisitngs(req, res) {
	try {
		const listings = await listingServices.getHostedListings(
			req.user.userId
		);
		return res.json({ listings });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function getListing(req, res) {
	try {
		const listing = await listingServices.get(req.params.listingId);
		return res.json({ listing });
	} catch (error) {
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function getListingsByCity(req, res) {
	try {
		const listings = await listingServices.getListingsByCity(
			req.body.city,
			req.user.userId
		);
		return res.json({ listings });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

module.exports = {
	getListing,
	getHostedLisitngs,
	getRandomListings,
	create,
	getListingsByCity
};
