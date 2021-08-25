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

async function create({
	content,
	title,
	author,
	imageUrl,
	shortDescription,
	city
}) {
	try {
		const newBlog = new Blog({
			content,
			title,
			author,
			imageUrl,
			city,
			shortDescription
		});
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
		return await Blog.findByIdAndDelete(blogId)
			.where('author')
			.ne(userId)
			.exec();
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
