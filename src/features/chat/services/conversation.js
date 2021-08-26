const { Conversation, Message } = require('../models');
const { User } = require('../../user-management');

async function getOrCreate(participants) {
	try {
		const users = await User.find().where('email').in(participants).exec();
		let conversation = await Conversation.findOne()
			.where('participants')
			.all([users[0]._id, users[1]._id])
			.populate({
				path: 'participants',
				select: 'name email imageUrl -_id'
			})
			.populate({
				path: 'messages',
				select: 'author body createdAt _id'
			})
			.exec();
		if (!conversation) {
			const newConvo = new Conversation({
				participants: [users[0]._id, users[1]._id]
			});
			conversation = await newConvo.save();

			return await Conversation.findById(conversation._id)
				.populate({
					path: 'participants',
					select: 'name email imageUrl -_id'
				})
				.populate({
					path: 'messages',
					select: 'author body createdAt _id'
				})
				.exec();
		} else {
			return conversation;
		}
	} catch (error) {
		console.warn('Error getting conversation', error);
	}
}

async function remove(conversationId) {
	try {
		await Conversation.findOneAndDelete({ _id: conversationId });
		return;
	} catch (error) {
		throw error;
	}
}

async function getAll(userId) {
	try {
		const conversations = await Conversation.find()
			.where('participants')
			.all([userId])
			.populate({
				path: 'participants',
				select: 'name email imageUrl',
				match: { _id: { $nte: userId } }
			})
			.populate({
				path: 'messages',
				perDocumentLimit: 10
			})
			.exec();
		return conversations;
	} catch (error) {
		throw error;
	}
}

async function getConversationMessages(conversationId, offset) {
	try {
		const messages = await Message.find({ conversation: conversationId })
			.select('-__v')
			.skip(parseInt(offset))
			.limit(10)
			.exec();
		return messages;
	} catch (error) {
		throw error;
	}
}

async function getConversation({ conversationId, userId }) {
	try {
		return await Conversation.findById(conversationId)
			.populate({ path: 'messages', populate: { path: 'author' } })
			.populate({
				path: 'participants',
				// match: { _id: { $nte: userId } },
				select: '+name +email +imageUrl -__v'
			})
			.exec();
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getOrCreate,
	remove,
	getAll,
	getConversationMessages,
	getConversation
};
