const { Storage } = require('@google-cloud/storage');
const config = require('../config');

const storage = new Storage({
	projectId: config.storage.projectId,
	credentials: {
		private_key: config.storage.privateKey,
		client_email: config.storage.clientEmail
	}
});

const bucket = storage.bucket(config.storage.name);

async function uploadImage({ file, userId = 'DEFUALT_USER_ID' }) {
	try {
		if (!file) return Promise.reject(new Error('NO_FILE_TO_UPLOAD'));
		const filename = `profile_pic_${userId}`;
		const upload = bucket.file(filename);
		const blobStream = upload.createWriteStream({
			metadata: {
				contentType: file.mimetype
			}
		});

		blobStream.on('error', (error) => {
			return Promise.reject(error);
		});
		blobStream.on('finish', () => {
			return Promise.resolve();
		});
		blobStream.end(file.buffer);
	} catch (error) {
		return Promise.reject(error);
	}
}

module.exports = uploadImage;
