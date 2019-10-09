//black-jack-server/player/model.js
const Sequelize = require('sequelize')
const sequelize = require('../db')
const gamerooms = require('../gamerooms/model')

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
    },
    playerClickedStart: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false,
  //  tableName: 'users'
  })

  
  Player.belongsTo(gamerooms)
  gamerooms.hasMany(Player)
  
  module.exports = Player