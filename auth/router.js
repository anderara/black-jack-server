//black-jack-server/auth/router.js
const { Router } = require('express')
const User = require('../user/model')
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
        User
            .findOne({
                where: {
                email: req.body.email
                }
            })
            .then(entity => {
                if (!entity) {
                  res.status(400).send({
                    message: 'User with that email does not exist'
                  })
                } else if (bcrypt.compareSync(req.body.password, entity.password)) {
                    // 3. if the password is correct, return a JWT with the userId of the user (user.id)
                    res.send({
                      jwt: toJWT({ userId: entity.id })
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
        message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
      })
   
  })

module.exports = router