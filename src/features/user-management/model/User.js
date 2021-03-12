const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		imageUrl: { type: String, default: 'IMAGE_URL_PLACEHOLDER' }
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);
