const { createUser } = require('../services');

async function register(req, res) {
	const { body } = req;
	try {
		await createUser(body);
		return res.status(201).json({
			message: 'USER_CREATED'
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'INTERNAL_ERROR'
		});
	}
}

module.exports = { register };
