const { createUser, emailExists, passwordCorrect } = require('../services');

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
			const { correct } = await passwordCorrect(body);
			if (correct) {
				//generate jwt here
				return res.status(200).json({
					authenticated: true,
					token: '' + Date.now() + '8&*#@8'
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
			message: 'INTERNAT_ERROR'
		});
	}
}

module.exports = { register, authenticate };
