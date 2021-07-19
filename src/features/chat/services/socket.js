const { SocketMap } = require('../models');

async function getId(email) {
	try {
		const socket = await SocketMap.findOne({ email });
		if (!socket) return null;
		return socket.id;
	} catch (error) {
		throw error;
	}
}

async function createOrUpdate({ email, socketId }) {
	try {
		await SocketMap.updateOne(
			{ email },
			{ id: socketId },
			{ upsert: true }
		);
		return;
	} catch (error) {
		throw error;
	}
}

async function remove(socketId) {
	try {
		await SocketMap.updateOne({ id: socketId }, { id: null });
		return;
	} catch (error) {
		throw error;
	}
}

module.exports = { getId, remove, createOrUpdate };
