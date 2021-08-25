const services = require('../services');

module.exports = (socket) => {
	socket.on('disconnect', async () => {
		try {
			await services.socket.remove(socket.id);
		} catch (error) {
			console.log(error);
		}
	});
};
