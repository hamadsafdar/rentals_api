const { Schema, model } = require('mongoose');

const addressSchema = new Schema(
	{
		address: { type: String, required: true },
		city: { type: String, required: true },
		province: { type: String, required: true },
		zipCode: { type: String, required: true },
		longitude: { type: Number },
		latitude: { type: Number }
	},
	{ timestamps: true }
);

module.exports = model('address', addressSchema);
