const { createUser, emailExists, passwordCorrect } = require('../services');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

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
				return res.status(200).json({
					authenticated: true,
					token
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

async function uploadProfilePic(req, res) {}

module.exports = { register, authenticate };
