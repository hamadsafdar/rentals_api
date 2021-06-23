const Multer = require('multer');

const fileFilter = (req, file, cb) => {
	const supportedMimes = ['image/jpg', 'image/png', 'image/jpeg'];
	if (supportedMimes.includes(file.mimetype)) cb(null, true);
	else cb(null, false);
};

module.exports = Multer({
	storage: Multer.memoryStorage(),
	limits: 1 * 1024 * 1024,
	fileFilter
});
