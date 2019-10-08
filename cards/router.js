//black-jack-server/cards/router.js
const { Router } = require('express')
const Card = require('./model')
//const bcrypt = require('bcrypt')
const router = new Router()

router.get('/cardexample', (req, res, next)=>{
    console.log('hello from the get card example ')
    res.status(200).send('hello from get card example')
    .catch(err=>next(err))
})

router.post('/card', (req, res, next) => {

    console.log('req.body.gameRoomName is:', req.body.gameRoomName)
    const card = {
        gameRoomName: req.body.gameRoomName
    }
    Card.create(card)
    .then(
    card => res.status(200).send(card)
    )
    .catch(next)
    
})

module.exports = router