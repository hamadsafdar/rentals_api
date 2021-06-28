const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({
	participants: [{ type: Schema.Types.ObjectId, ref: 'user' }],
	messages: [{ type: Schema.Types.ObjectId, ref: 'message' }]
});

module.exports = model('conversation', conversationSchema);
