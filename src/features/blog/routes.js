const router = require('express').Router();
const controller = require('./controller');
const { authToken } = require('../user-management/middlewares');

router
	.post('/', authToken, controller.create)
	.get('/', authToken, controller.getRandom)
	.delete('/:blogId', authToken, controller.remove)
	.get('/:blogId', authToken, controller.get)
	.get('/own', authToken, controller.getOwn);

module.exports = router;
