module.exports = (io) => {
	io.on('connection', (socket) => {
		console.log(socket.id, ' connected');
		socket.on('disconnect', () => {
			console.warn('close');
		});
	});
	io.on('disconnect', (socket) => {
		console.log(socket, 'disconnected');
	});
};
