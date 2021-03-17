const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		imageUrl: {
			type: String,
			default:
				'https://firebasestorage.googleapis.com/v0/b/fyprjct.appspot.com/o/Profile_avatar_placeholder_large.png?alt=media&token=feb135d6-2eef-4ab2-803d-899a7a6cab7e'
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('User', userSchema);
