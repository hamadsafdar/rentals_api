const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		imageUrl: {
			type: String,
			default: () =>
				'https://firebasestorage.googleapis.com/v0/b/saraay-363e2.appspot.com/o/profile%2Fava.jpg?alt=media&token=645b287f-8394-4cb6-8119-9a54de06e952'
		},
		bookings: [{ type: Schema.Types.ObjectId, ref: 'booking' }],
		lisitngs: [{ type: Schema.Types.ObjectId, ref: 'listing' }]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model('user', userSchema);
