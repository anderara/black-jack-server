//black-jack-server/player/model.js
const Sequelize = require('sequelize')
const sequelize = require('../db')

const Player = sequelize.define('player', {
    playerName:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    gamesWon: {
        type: Sequelize.INTEGER
    },
    gamesLost: {
        type: Sequelize.INTEGER
    }
  }, {
    timestamps: false,
  //  tableName: 'users'
  })
  
  module.exports = Player