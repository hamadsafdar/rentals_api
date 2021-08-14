const { User } = require('../features/user-management');

async function getUserByEmail(email) {
	try {
		const user = await User.findOne({ email });
		return user;
	} catch (error) {
		throw error;
	}
}

async function getUserById(userId) {
	try {
		return await User.findById(userId);
	} catch (error) {
		throw error;
	}
}

module.exports = { getUserByEmail, getUserById };
