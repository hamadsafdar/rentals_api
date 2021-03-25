const Multer = require('multer');

const fileFilter = (req, file, cb) => {
	cb(null, true);
};

module.exports = Multer({
	storage: Multer.memoryStorage(),
	limits: 1 * 1024 * 1024,
	fileFilter
});
