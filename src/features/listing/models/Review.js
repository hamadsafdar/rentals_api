const { Schema, model } = require('mongoose');

const reviewSchema = new Schema(
	{
		comment: { type: String, required: true },
		rating: { type: Number, min: 1, max: 5 },
		reviewedBy: { type: Schema.Types.ObjectId, ref: 'user' }, // validate if user has been experienced and only one review
		for: { type: Schema.Types.ObjectId, ref: 'listing' }
	},
	{ timestamps: true }
);

module.exports = model('review', reviewSchema);
