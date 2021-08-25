const services = require('../services');
const helpers = require('../../../helpers');
const send = require('./sendMessageToUser');

module.exports = async (socket) => {
	socket.on('message', async ({ body, to, from }, acknowledgement) => {
		socket.emit('test');
		const convo = await services.conversation.getOrCreate([to, from]);
		const newMessageId = await services.message.createMessage({
			author: socket.user.userId,
			body,
			conversationId: convo._id
		});
		convo.messages.push(newMessageId);
		await convo.save();
		send(socket, { from, to, message: body });
		acknowledgement(newMessageId);
	});
};
