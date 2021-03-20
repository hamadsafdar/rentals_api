const { Schema, model } = require('mongoose');

const listingSchema = new Schema(
	{
		description: { type: String, required: true },
		images: [{ type: String }],
		rate: { type: Schema.Types.Decimal128, required: true },
		guestsLimit: { type: Number, required: true },
		host: { type: Schema.Types.ObjectId, ref: 'user' },
		bookings: [{ type: Schema.Types.ObjectId, ref: 'booking' }],
		reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
		amenities: [{ type: Schema.Types.ObjectId, ref: 'amenity' }],
		address: { type: Schema.Types.ObjectId, ref: 'address' }
	},
	{ timestamps: true }
);

module.exports = model('amenity', listingSchema);
