const { Schema, model } = require('mongoose');

const addressSchema = new Schema(
	{
		address: { type: String, required: true },
		city: { type: String, required: true },
		province: { type: String, required: true },
		zipCode: { type: String, required: true },
		longitude: { type: Schema.Types.Decimal128 },
		latitude: { type: Schema.Types.Decimal128 }
	},
	{ timestamps: true }
);

module.exports = model('address', addressSchema);
