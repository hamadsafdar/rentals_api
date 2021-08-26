const services = require('../services');

module.exports = async (socket, message, to) => {
	const socketId = await services.socket.getId(to);
	console.log(message);
	socket.to(socketId).emit('new-message', message);
};
