const { Schema, model } = require('mongoose');

const listingSchema = new Schema(
	{
		description: { type: String, required: true },
		images: [{ type: String }],
		rate: { type: Schema.Types.Decimal128, required: true },
		images: [{ type: String }],
		guestsLimit: { type: Number, required: true },
		host: { type: Schema.Types.ObjectId, ref: 'user' },
		bookings: [{ type: Schema.Types.ObjectId, ref: 'booking' }],
		reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
		amenities: [{ type: Schema.Types.ObjectId, ref: 'amenity' }],
		address: { type: Schema.Types.ObjectId, ref: 'address' }
	},
	{ timestamps: true }
);

listingSchema.post(
	'remove',
	{ document: true, query: true }, // to run on all remove operations
	(listing, next) => {
		//all references should be removed here
		next();
	}
);

module.exports = model('amenity', listingSchema);
