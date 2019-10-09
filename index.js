//black-jack-server/index.js
//const User = require('./user/model')

//const Cards = require('./cards/model')
const bodyParser = require('body-parser')
const authRouter = require('./auth/router')
const cors = require('cors')


const playerRouter = require('./player/router')
const cardsRouter = require('./cards/router')
const gameroomsRouter = require('./gamerooms/router')


const express = require('express')

const corsMiddleware = cors()
const parserMiddleware = bodyParser.json()

const app = express()
const port = process.env.PORT || 4000

app.use(corsMiddleware)
app.use(parserMiddleware)

app.use(authRouter)
app.use(playerRouter)
app.use(cardsRouter)
app.use(gameroomsRouter)

app.listen(port, console.log(`listening on port: ${port}`))