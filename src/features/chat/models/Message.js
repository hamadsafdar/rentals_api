const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'user' },
	body: { type: Schema.Types.String }
});

module.export = model('message', messageSchema);
