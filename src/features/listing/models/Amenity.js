const { Schema, model } = require('mongoose');

const amenitySchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		quantity: { type: Number, default: 0 },
		listing: { type: Schema.Types.ObjectId, ref: 'listing' }
	},
	{ timestamps: true }
);

module.exports = model('amenity', amenitySchema);
