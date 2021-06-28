const onMessage = require('../events/onMessage');

module.exports = (io) => {
	io.on('connection', (socket) => {
		onMessage(socket);
	});
};
