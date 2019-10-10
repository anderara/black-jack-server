//black-jack-server/gameroom/router.js
const { Router } = require('express')
const GameRooms = require('./model')
const auth = require('../auth/middleWare')
const Sse = require('json-sse') //for data stream
const Player = require('../player/model')
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

//let player join a gameroom
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

//player wants to join a room
router.put('/joinroom', auth, async (req, res, next) => {
    //console.log('POST AN IMAGE REQ IS', req.userId)
    console.log('You are true')
    console.log('GAMEROOMS req.playerID', req.playerId)
    console.log('req.body is:', req.body)
    
    //find the player
    const foundPlayer = await Player.findByPk(req.playerId)
    //console.log('FOUND PLAYER IS', foundPlayer)
    console.log('foundPlayer in game room is', foundPlayer)
    console.log('req.body.gameRoomId is', req.body.gameRoomId)
    const updatefoundPlayer = await foundPlayer.update({
        gameroomId: req.body.gameRoomId
    })


})

module.exports = router