const events = require('../events');
const mid = require('../../../middlewares/socket-auth');

module.exports = (io) => {
	io.use(mid).on('connection', (socket) => {
		events.onRegister(socket);
		events.onMessage(socket);
		events.onDisconnect(socket);
	});
};
