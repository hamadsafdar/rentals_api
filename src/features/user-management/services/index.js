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

async function emailExists({ email }) {
	try {
		const users = await User.find({ email });
		if (users.length === 0) {
			return Promise.resolve({ exists: false });
		} else return Promise.resolve({ exists: true });
	} catch (error) {
		return Promise.resolve(error);
	}
}

async function passwordCorrect({ email, password }) {
	try {
		const user = await User.findOne({ email });
		if (user.password === password)
			return Promise.resolve({
				correct: true,
				userId: user._id
			});
		else return Promise.resolve({ correct: false });
	} catch (error) {
		return Promise.reject(error);
	}
}

async function updateUser({ userId, attributes }) {
	try {
		//only name and password can be updated. make a check
		await User.findOneAndUpdate({ _id: userId }, attributes);
		return Promise.resolve();
	} catch (error) {
		return Promise.reject(error);
	}
}

async function getData(userId) {
	try {
		//Further data population will be done here.
		const user = await User.findById(userId).select(
			'name email imageUrl -_id'
		);
		return Promise.resolve(user);
	} catch (error) {
		return Promise.reject(error);
	}
}

module.exports = {
	createUser,
	emailExists,
	passwordCorrect,
	updateUser,
	getData
};
