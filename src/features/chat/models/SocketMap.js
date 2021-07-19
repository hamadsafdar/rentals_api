const { Schema, model } = require('mongoose');

const socketMapSchema = new Schema({
	id: { type: String, unique: true },
	email: { type: String, unique: true }
});

module.exports = model('socketMap', socketMapSchema);
