//black-jack-server/index.js
const db = require('./db')
const model = require('./user/model')

const express = require('express')
//const db = require('./db')
//const Image = require('./image/model')
//routers

const bodyParser = require('body-parser')
//const cors = require('cors')
//const corsMiddleware = cors()
//const parserMiddleware = bodyParser.json()



const app = express()

//model()
const port = process.env.PORT || 4000

//app.use(corsMiddleware)
//app.use(parserMiddleware)

//app.use(Image) no longer required when you define routs in imageRouter.  imageRouter requires ./image/model
//app.use(imageRouter)
//app.use(authRouter)
//app.use(userRouter)

app.listen(port, console.log(`listening on port: ${port}`))