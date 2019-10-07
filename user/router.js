//black-jack-server/user/router.js
const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const router = new Router()

router.post('/user', (req, res, next) => {

    const user = {
        email: req.body.email,
        userName: req.body.userName,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    User.findOne({where: {
        email: user.email
        }
    })
    .then(
        userRes => {
            if(userRes){
            console.log(`User ${user.email} already exists`, userRes)
            res.status(400).send(user)
            
        }else{
            User.create(user)
            .then(
            user => res.status(200).send(user)
            )
        }
    })
    .catch(next)
    
})

module.exports = router