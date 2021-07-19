const { model, Schema } = require('mongoose');

const blogSchema = new Schema({
	author: { type: Schema.Types.ObjectId, ref: 'user' },
	title: { type: String, required: true, default: 'Test Title' },
	content: { type: String }
});

module.exports = model('blog', blogSchema);
