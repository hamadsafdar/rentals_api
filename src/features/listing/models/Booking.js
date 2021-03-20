const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
	{
		start: { type: Date, required: true },
		end: { type: Date, required: true },
		status: {
			type: String,
			required: true,
			enum: ['CONFIRMED', 'CANCELLED']
		},
		listing: { type: Schema.Types.ObjectId, ref: 'listing' },
		guest: { type: Schema.Types.ObjectId, ref: 'user' }
	},
	{ timestamps: true }
);

module.exports = model('booking', bookingSchema);
