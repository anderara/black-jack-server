//black-jack-server/gameroom/model.js
const Sequelize = require('sequelize')
const sequelize = require('../db')

const GameRooms = sequelize.define('gameroom', {

    gameRoomName:{
        type: Sequelize.STRING,
        unique: true
    }

  }, {
    timestamps: false,
   // tableName: 'gametables'
  })
  
  module.exports = GameRooms