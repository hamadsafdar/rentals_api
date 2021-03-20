const { Schema, model } = require('mongoose');

const amenitySchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		quantiy: Number,
		listing: { type: Schema.Types.ObjectId, ref: 'listing' }
	},
	{ timestamps: true }
);

module.exports = model('amenity', amenitySchema);
