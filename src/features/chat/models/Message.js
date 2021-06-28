const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
	{
		author: { type: Schema.Types.ObjectId, ref: 'user' },
		body: { type: Schema.Types.String },
		converstaion: { type: Schema.Types.ObjectId, ref: 'conversation' }
	},
	{
		timestamps: true
	}
);

module.exports = model('message', messageSchema);
