const { Schema, model } = require('mongoose');

const bookingSchema = new Schema(
	{
		start: { type: Date, required: true },
		end: { type: Date, required: true },
		status: {
			type: String,
			enum: ['CONFIRMED', 'CANCELLED', 'COMPLETED', 'STARTED', 'PENDING'],
			default: 'PENDING'
		},
		listing: { type: Schema.Types.ObjectId, ref: 'listing' },
		bookedBy: { type: Schema.Types.ObjectId, ref: 'user' },
		host: { type: Schema.Types.ObjectId, ref: 'user' }
	},
	{ timestamps: true }
);

module.exports = model('booking', bookingSchema);
