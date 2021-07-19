const events = require('../events');

module.exports = (io) => {
	io.on('connection', (socket) => {
		events.onRegister(socket);
		events.onMessage(socket);
		events.onDisconnect(socket);
	});
};
