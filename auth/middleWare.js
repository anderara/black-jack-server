//black-jack-server/auth/middleWare.js
const User = require('../player/model')
const { toData } = require('./jwt')

function auth(req, res, next) {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
      User
        .findByPk(data.userId)
        .then(user => {
          if (!user) return next('User does not exist')
          console.log('user is:', user)
          req.user = user
          console.log("req.user is", req.user)
          req.userId = data.userId  //added this line to try and add userId column to images
          next()
        })
        .catch(next)
    }
    catch(error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`,
      })
    }
  }
  else {
    res.status(401).send({
      message: 'Please supply some valid credentials'
    })
  }
}

module.exports = auth