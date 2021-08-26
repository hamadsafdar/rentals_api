const services = require('../services');
const helpers = require('../../../helpers');
const send = require('./sendMessageToUser');

module.exports = async (socket) => {
	socket.on('message', async ({ body, to, from }, acknowledgement) => {
		try {
			const convo = await services.conversation.getOrCreate([to, from]);
			const newMessage = await services.message.createMessage({
				author: socket.user.userId,
				body,
				conversationId: convo._id
			});
			convo.messages.push(newMessage._id);
			await convo.save();
			send(socket, newMessage, to);
			acknowledgement(newMessage);
		} catch (error) {
			console.log('message event', error);
		}
	});
};
