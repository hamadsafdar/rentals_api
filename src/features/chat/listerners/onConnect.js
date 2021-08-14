const events = require('../events');

module.exports = (io) => {
	io.on('connection', (socket) => {
		console.warn('connected');
		events.onRegister(socket);
		events.onMessage(socket);
		events.onDisconnect(socket);
	});
};
