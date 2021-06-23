module.exports = function (io) {
	io.on('disconnect', (socket) => {
		console.log(socket?.id, ' disconnected');
	});
};
