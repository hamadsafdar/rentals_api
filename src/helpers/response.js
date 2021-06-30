function send500(res) {
	res.status(500).json({ message: 'INTERNAL_ERROR' });
}

module.exports = { send500 };
