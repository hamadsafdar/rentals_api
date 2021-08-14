const { Schema, model } = require('mongoose');

const listingSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		images: [{ type: String }],
		rate: { type: Schema.Types.Decimal128, required: true },
		guestsLimit: { type: Number, required: true },
		host: { type: Schema.Types.ObjectId, ref: 'User' },
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

module.exports = model('listing', listingSchema);
