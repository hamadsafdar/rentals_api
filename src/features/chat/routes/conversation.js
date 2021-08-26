const { Router } = require('express');
const controller = require('../controllers');
const {
	middleware: { authToken }
} = require('../../user-management');

const router = Router();

router.use(authToken);

router
	.get('/all', controller.getUserConversations)
	.get('/:conversationId', controller.getConversation)
	.delete('/:conversationId', controller.deleteConversation);

module.exports = router;
