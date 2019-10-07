//black-jack-server/index.js
//const User = require('./user/model')

const Cards = require('./cards/model')
const bodyParser = require('body-parser')
const authRouter = require('./auth/router')
const cors = require('cors')


const userRouter = require('./user/router')


const express = require('express')

const corsMiddleware = cors()
const parserMiddleware = bodyParser.json()



const app = express()


const port = process.env.PORT || 4000

app.use(corsMiddleware)
app.use(parserMiddleware)

app.use(authRouter)
app.use(userRouter)

app.listen(port, console.log(`listening on port: ${port}`))