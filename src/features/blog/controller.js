const services = require('./services');

async function create(req, res) {
	try {
		const blog = req.body;
		await services.create({ ...blog, author: req.user.userId });
		return res.status(201).json({
			message: 'BLOG_POSTED'
		});
	} catch (error) {
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function remove(req, res) {
	try {
		const blogId = req.params.blogId;
		await services.remove(blogId, req.user.userId);
	} catch (error) {
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function getRandom(req, res) {
	try {
		const blogs = await services.getRandom(req.user.userId);
		return res.json({
			blogs
		});
	} catch (error) {
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function getOwn(req, res) {
	try {
		const blogs = await services.getOwn(req.user.userId);
		return res.json({
			blogs
		});
	} catch (error) {
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

async function get(req, res) {
	try {
		const blog = await services.get(req.params.blogId);
		return res.json({
			blog
		});
	} catch (error) {
		return res.status(500).json({ message: 'INTERNAL_ERROR' });
	}
}

module.exports = {
	create,
	remove,
	getRandom,
	getOwn,
	get
};
