const services = require('../services');

module.exports = (socket) => {
	socket.on('message', async ({ body, to, from }, acknowledgement) => {
		const convo = await services.conversation.getOrCreate([to, from]);
		const newMessageId = await services.message.createMessage({
			author: convo.participants[0],
			body,
			conversationId: convo._id
		});
		acknowledgement(newMessageId);
	});
};
