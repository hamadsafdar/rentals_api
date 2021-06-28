const { Conversation } = require('../models');
const { User } = require('../../user-management');

async function getOrCreate(participants) {
	try {
		const users = await User.find().where('email').in(participants).exec();
		const conversation = await Conversation.findOne()
			.where('participants')
			.all([users[0]._id, users[1]._id])
			.exec();
		if (!conversation) {
			const newConvo = new Conversation({
				participants: [users[0]._id, users[1]._id]
			});
			return await newConvo.save();
		} else {
			return conversation;
		}
	} catch (error) {
		console.warn('Error getting conversation', error);
	}
}

module.exports = { getOrCreate };
