const services = require('../services');
const helper = require('../../../helpers');

async function getUserConversations(req, res) {
	try {
		let userId = req.user.userId;
		const conversations = await services.conversation.getAll(userId);
		res.json({ conversations });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function deleteConversation(req, res) {
	let conversationId = req.params.conversationId;
	try {
		await services.conversation.remove(conversationId);
		res.sendStatus(200);
	} catch (error) {
		res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function getConversation(req, res) {
	let conversationId = req.params.conversationId;
	let userId = req.user.userId; //req.decoded.userId
	try {
		const conversation = await services.conversation.getConversation({
			conversationId,
			userId
		});
		return res.json({ conversation });
	} catch (error) {
		console.log(error);
		return helper.response.send500(res);
	}
}

module.exports = {
	getUserConversations,
	deleteConversation,
	getConversation
};
