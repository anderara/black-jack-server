//black-jack-server/player/router.js
const { Router } = require('express')
const Player = require('./model')
const bcrypt = require('bcrypt')
const auth = require('../auth/middleWare')
const router = new Router()
router.get('/', (req, res, next)=>{
    console.log('hello from the get ')
    res.status(200).send('hello from get')
    .catch(err=>next(err))
})
router.post('/player', (req, res, next) => {

    const player = {
        email: req.body.email,
        playerName: req.body.playerName,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    Player.findOne({where: {
        email: player.email
        }
    })
    .then(
        playerRes => {
            if(playerRes){
            console.log(`Player ${player.email} already exists`, playerRes)
            res.status(400).send(player)
            
        }else{
            Player.create(player)
            .then(
            player => res.status(200).send(player)
            )
        }
    })
    .catch(next)
    
})

//let player join a room

router.put('/joinroom', (req, res, next) => {
    //console.log('POST AN IMAGE REQ IS', req.userId)
    console.log('You are trying to join a room')
})

module.exports = router