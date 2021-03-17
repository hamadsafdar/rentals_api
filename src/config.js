module.exports = {
	db: {
		name: process.env.DB_NAME,
		password: process.env.DB_PASS,
		user: process.env.DB_USER
	},
	environment: process.env.NODE_ENV || 'development',
	jwtSecret: process.env.JWT_SECRET
};
