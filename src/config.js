module.exports = {
	db: {
		name: process.env.DB_NAME,
		password: process.env.DB_PASS,
		user: process.env.DB_USER
	},
	environment: process.env.NODE_ENV || 'development',
	jwtSecret: process.env.JWT_SECRET,
	storage: {
		projectId: process.env.FB_PROJECT_ID,
		privateKey: process.env.STORAGE_PRIVATE_KEY,
		name: process.env.STORAGE_BUCKET,
		clientEmail: process.env.CLIENT_EMAIL
	}
};
