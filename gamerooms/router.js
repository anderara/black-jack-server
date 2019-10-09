//black-jack-server/gameroom/router.js
const { Router } = require('express')
const GameRooms = require('./model')
const Sse = require('json-sse') //for data stream
//const bcrypt = require('bcrypt')
const router = new Router()

const stream = new Sse()

//stream game rooms when rooms added
router.get('/gameroom', async (req, res, next)=>{
    try{
        console.log('stream game rooms example ')
        const gameRooms = await GameRooms.findAll()
        const data = JSON.stringify(gameRooms)
        stream.updateInit(data)
        stream.init(req,res)
    }
    catch(error){
        console.log(error)
    }
    /*.then(rooms => res.status(200).send(rooms))
    .catch(err=>next(err))*/
})

router.post('/gameroom', async (req, res, next) => {

    try{
        console.log('req.body.gameRoomName is:', req.body.gameRoomName)
        const gameroom = {
            gameRoomName: req.body.gameRoomName
        }
        const newroom = await GameRooms.create(gameroom)
        const gameRooms = await GameRooms.findAll()
        const data = JSON.stringify(gameRooms)
        stream.updateInit(data)
        stream.init(req,res)
        /*.then(
        gameroom => res.status(200).send(gameroom)
        )
        .catch(next)*/
    }
    catch(error){
        console.log(error)
    }

    
})

module.exports = router