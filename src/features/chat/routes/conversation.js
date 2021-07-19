const { Router } = require('express');
const controller = require('../controllers');
const {
	middleware: { authToken }
} = require('../../user-management');

const router = Router();

router.use(authToken);

router.get('/all', controller.getUserConversations);
router.delete('/:conversationId', controller.deleteConversation);
router.get('/:conversationId', controller.getConversation);

module.exports = router;
