require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const connectMongo = require('connect-mongo')
const session = require('express-session')
const socket = require('./socket')
require('./config/dbConnect')()
const userRouter = require('./routers/userRouter')
const chatRouter = require('./routers/chatRouter')

const app = express()
const server = app.listen(5000, () => console.log("Server is listening on: http://localhost:5000"))
socket(server)

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connectMongo.create({
        collectionName: 'sessions',
        mongoUrl: process.env.DB_URI,
        ttl: 14 * 24 * 60 * 60 // session will expire in 14 days,
    }),
    cookie: {
        maxAge: 14 * 24 * 60 * 60 * 1000, // session expires in 14 days
    }
}))


app.use(userRouter)
app.use(chatRouter)

