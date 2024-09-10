const { Router } = require('express')
const auth = require('../middlewares/auth')
const { chats } = require('../controllers/messageController')

const chatRouter = Router()

chatRouter.get('/chats', auth, chats)

module.exports = chatRouter;
