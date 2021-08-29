const { Schema, model } = require('mongoose');

const listingSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		images: [{ type: String }],
		rate: { type: Number, required: true },
		guestsLimit: { type: Number, required: true },
		host: { type: Schema.Types.ObjectId, ref: 'user' },
		reviews: [{ type: Schema.Types.ObjectId, ref: 'review' }],
		amenities: { type: String },
		address: { type: Schema.Types.ObjectId, ref: 'address' },
		bedrooms: { type: Number, default: 0 },
		bathrooms: { type: Number, default: 0 }
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
