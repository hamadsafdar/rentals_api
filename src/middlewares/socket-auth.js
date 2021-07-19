const jwt = require('jsonwebtoken');

module.exports = (socket, next) => {
	const token = socket.handshake.auth.token;
	if (!token) {
		socket.emit('UNAUTHORIZED');
		socket.disconnect();
	}
};
