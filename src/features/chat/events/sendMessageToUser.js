const services = require('../services');

module.exports = async (socket, { message, from, to }) => {
	const socketId = await services.socket.getId(to);
	console.log(socketId);
	socket.to(socketId).emit('new-message', { message, from });
};
