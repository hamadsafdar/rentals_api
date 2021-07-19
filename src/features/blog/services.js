const { Blog } = require('./models');

async function getRandom(userId) {
	try {
		const blogs = await Blog.find()
			.where('author')
			.ne(userId)
			.limit(10)
			.exec();
		return blogs;
	} catch (error) {
		throw error;
	}
}

async function create({ content, title, author }) {
	try {
		const newBlog = new Blog({ content, title, author });
		return await newBlog.save();
	} catch (error) {
		throw error;
	}
}

async function get(blogId) {
	try {
		const blog = await Blog.findById(blogId)
			.populate({
				path: 'author',
				select: 'name imageUrl'
			})
			.exec();
		return blog;
	} catch (error) {
		throw error;
	}
}

async function remove(blogId, userId) {
	try {
		//verify if owner
		return await Blog.findByIdAndDelete(blogId);
	} catch (error) {
		throw error;
	}
}

async function getOwn(userId) {
	try {
		const blogs = await Blog.find({ author: userId }).exec();
		return blogs;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	getRandom,
	create,
	get,
	remove,
	getOwn
};
