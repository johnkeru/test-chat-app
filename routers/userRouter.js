const { Router } = require('express')
const { login, showLogin, register, showRegister, logout } = require('../controllers/authController')
const auth = require('../middlewares/auth')

const userRouter = Router()

userRouter.get('/login', showLogin)
userRouter.post('/login', login)
userRouter.get('/register', showRegister)
userRouter.post('/register', register)

userRouter.get('/logout', auth, logout)


module.exports = userRouter;