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
        const gameRooms = await GameRooms.findAll({include:[{model: Player}]})
        //console.log('gameRooms data looks like this:', gameRooms)
        const data = JSON.stringify(gameRooms)
        stream.updateInit(data)
        stream.init(req,res)
    }
    catch(error){
        console.log(error)
    }

})

//let player join a gameroom
router.post('/gameroom', async (req, res, next) => {

        try{
            console.log('req.body.gameRoomName is:', req.body.gameRoomName)
            const gameroom = {
                gameRoomName: req.body.gameRoomName
            }
            const newroom = await GameRooms.create(gameroom)
            const gameRooms = await GameRooms.findAll({include:[{model: Player}]})
            const data = JSON.stringify(gameRooms)
            console.log('gameRooms data is', data)
            stream.updateInit(data)
            stream.init(req,res)

        }
        catch(error){
            console.log(error)
        }
    
})

//player joins this room
router.put('/joinroom', auth, async (req, res, next) => {
 
    console.log('PLAYER JOINING ROOM')
    //find the player
    const foundPlayer = await Player.findByPk(req.playerId)

    const updatefoundPlayer = await foundPlayer.update({
        gameroomId: req.body.gameRoomId
    })
})

//check whether player has clicked start and tell other players when
//another player has clicked start

//player has joined room
//display room name and players in room
//update players in room if necessary

const streamPlayingRoom = new Sse()
router.get('/playingroom', async (req, res, next) => {
//this end point gets entered into
    try{
        //const gameRooms = await GameRooms.findAll({include:[{model: Player}]})
        const allPlayers = await Player.findAll()
        //console.log('gameRooms data looks like this:', gameRooms)
        const data = JSON.stringify(allPlayers)
        streamPlayingRoom.updateInit(data)
        streamPlayingRoom.init(req,res)
        //const foundPlayer = await Player.findByPk(req.playerId)
        //console.log('foundPlayer data is:', foundPlayer)

    }
    catch(error){
        console.log(error)
}

})
module.exports = router