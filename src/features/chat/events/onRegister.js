const services = require('../services');
const helpers = require('../../../helpers');

module.exports = (socket) => {
	socket.on('register', async () => {
		try {
			const user = await helpers.user.getUserById(socket.user.userId);
			await services.socket.createOrUpdate({
				email: user.email,
				socketId: socket.id
			});
		} catch (error) {
			console.log(error);
		}
	});
};
