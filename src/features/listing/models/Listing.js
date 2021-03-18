const { Schema, model } = require('mongoose');

const listingSchema = new Schema(
	{
		description: { type: String, required: true },
		images: [{ type: String }],
		host_id: { type: Schema.Types.ObjectId, ref: 'user' },
		rate: { type: Schema.Types.Decimal128, required: true }
	},
	{ timestamps: true }
);

module.exports = model('amenity', listingSchema);
