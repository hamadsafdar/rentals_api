const User = require('../model');

async function createUser({ name, email, password }) {
	try {
		const user = new User({ name, email, password });
		await user.save();
		return Promise.resolve({ created: true });
	} catch (error) {
		return Promise.reject({ created: false, error });
	}
}

module.exports = { createUser };
