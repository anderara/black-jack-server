//black-jack-server/auth/middleWare.js
const Player = require('../player/model')
const { toData } = require('./jwt')

function auth(req, res, next) {
  const auth = req.headers.authorization && req.headers.authorization.split(' ')
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1])
      console.log('data is', data)
      Player
        .findByPk(data.playerId)
        .then(player => {
          if (!player) return next('Player does not exist')
          console.log('player is:', player)
          req.player = player
          console.log("req.player is", req.player)
          req.playerId = data.playerId  //added this line to try and add userId column to images
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