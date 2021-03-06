const { Storage } = require('@google-cloud/storage');
const path = require('path');
const config = require('../config');
const folder = 'profile-images/';
const storage = new Storage({
	projectId: config.storage.projectId,

	credentials: {
		private_key: config.storage.privateKey,
		client_email: config.storage.clientEmail
	}
});

const bucket = storage.bucket(config.storage.name);

function uploadImage({ file, userId = 'DEFUALT_USER_ID' }) {
	return new Promise((resolve, reject) => {
		if (!file) return reject(new Error('NO_FILE_TO_UPLOAD'));
		const filename = `${
			userId + Date.now() + path.extname(file.originalname)
		}`;
		const blob = bucket.file(folder + filename);
		const blobStream = blob.createWriteStream({
			resumable: false,
			public: true,
			metadata: {
				contentType: file.mimetype
			}
		});

		blobStream.on('error', (error) => {
			reject(error);
		});
		blobStream.on('finish', () => {
			resolve(blob.publicUrl());
		});
		blobStream.end(file.buffer);
	});
}

module.exports = uploadImage;
