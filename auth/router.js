//black-jack-server/auth/router.js
const { Router } = require('express')
const Player = require('../player/model')
const bcrypt = require('bcrypt')
const auth = require('./middleware')
const { toJWT, toData } = require('./jwt')

const router = new Router()

//let a player log in
router.post('/login', (req, res, next) => {
    if(!req.body){
        res.status(400).send({
            message: "Please supply a valid email and password"
        })
    }else{
        Player
            .findOne({
                where: {
                email: req.body.email
                }
            })
            .then(entity => {
                if (!entity) {
                  res.status(400).send({
                    message: 'Player with that email does not exist'
                  })
                } else if (bcrypt.compareSync(req.body.password, entity.password)) {
                    // 3. if the password is correct, return a JWT with the userId of the user (user.id)
                    console.log('-- ENTITY -- in router.js is', entity.dataValues.playerName)
                    res.send({
                      jwt: toJWT({ playerId: entity.id }),
                      name: entity.dataValues.playerName
                      
                      //name: toJWT({ })
                      //include username and user id here
                    })
                } else {
                    res.status(400).send({
                      message: 'Password was incorrect'
                    })
                  }
                })
            .catch(err => {
                  console.error(err)
                  res.status(500).send({
                    message: 'Something went wrong'
                  })
                })
       
    }
})

router.get('/secret-endpoint', auth, (req, res) => {

    res.send({
        message: `Thanks for visiting the secret endpoint ${req.player.email}.`,
      })
   
  })

module.exports = router