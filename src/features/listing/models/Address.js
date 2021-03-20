const { Schema, model } = require('mongoose');

const addressSchema = new Schema(
	{
		address: { type: String, required: true },
		city: { type: String, required: true },
		province: { type: String, required: true },
		zipCode: { type: String, required: true }
	},
	{ timestamps: true }
);

module.exports = model('address', addressSchema);
