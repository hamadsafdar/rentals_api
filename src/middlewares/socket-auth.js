const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (socket, next) => {
	const token = socket.handshake?.auth?.token;
	if (!token) {
		socket.emit('UNAUTHORIZED');
		socket.disconnect();
	} else {
		const decoded = jwt.verify(token, config.jwtSecret);
		socket.user = decoded;
		next();
	}
};
