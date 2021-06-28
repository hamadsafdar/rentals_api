const { Message, Conversation } = require('../models');

async function createMessage({ body, author, conversationId }) {
	try {
		const msg = new Message({
			author,
			body,
			conversation: conversationId
		});
		const stored = await msg.save();
		return stored._id;
	} catch (error) {
		console.log(error);
	}
}

module.exports = { createMessage };
