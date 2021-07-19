const services = require('../services');
const helpers = require('../../../helpers');

module.exports = (socket) => {
	socket.on('register', async ({ email }) => {
		try {
			await services.socket.createOrUpdate({
				email,
				socketId: socket.id
			});
			console.log(await helpers.user.getUserByEmail('test@test.com'));
		} catch (error) {
			console.log(error);
		}
	});
};
