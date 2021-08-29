const {
	createUser,
	emailExists,
	passwordCorrect,
	updateUser,
	getData
} = require('../services');
const config = require('../../../config');
const jwt = require('jsonwebtoken');
const { uploadImage } = require('../../../util');
const User = require('../model/User');

async function register(req, res) {
	const { body } = req;

	try {
		const { exists } = await emailExists(body);
		if (!exists) {
			await createUser(body);
			return res.status(201).json({
				message: 'USER_CREATED'
			});
		} else {
			return res.status(409).json({
				message: 'DUPLICATED_EMAIL'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'INTERNAL_ERROR'
		});
	}
}

async function authenticate(req, res) {
	const { body } = req;
	try {
		const { exists } = await emailExists(body);
		if (exists) {
			const { correct, userId } = await passwordCorrect(body);
			if (correct) {
				const token = jwt.sign({ userId }, config.jwtSecret);
				const user = await getData(userId);
				return res.json({
					authenticated: true,
					token,
					user
				});
			} else {
				return res.status(401).json({
					message: 'INVALID_CREDS'
				});
			}
		} else {
			return res.status(401).json({
				message: 'INVALID_CREDS'
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'INTERNAL_ERROR'
		});
	}
}

async function editUser(req, res) {
	const { body: attributes } = req;
	try {
		//may check for user exists or add a middleware
		await updateUser({ userId: req.user.userId, attributes });
		return res.sendStatus(200);
	} catch (error) {
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function getUser(req, res) {
	const {
		user: { userId }
	} = req;
	try {
		//user exists check
		const user = await getData(userId);
		return res.json({ user });
	} catch (error) {
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function uploadProfilePic(req, res) {
	const {
		user: { userId },
		file
	} = req;
	try {
		const imageUrl = await uploadImage({ file, userId });
		const user = await User.findById(userId);
		user.imageUrl = imageUrl;
		await user.save();
		return res.sendStatus(200);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'INTERNAL_ERROR'
		});
	}
}

module.exports = {
	register,
	authenticate,
	editUser,
	getUser,
	uploadProfilePic
};
