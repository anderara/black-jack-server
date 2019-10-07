//black-jack-server/cards/model.js
const Sequelize = require('sequelize')
const sequelize = require('../db')

const Cards = sequelize.define('card', {

    gameRoomName:{
        type: Sequelize.STRING
    },
    card1:{
        type: Sequelize.STRING
    },
    card2:{
        type: Sequelize.STRING
    },
    card3:{
        type: Sequelize.STRING
    },
    card4:{
        type: Sequelize.STRING
    },
    card5:{
        type: Sequelize.STRING
    },
    userClickedStart: {
        type: Sequelize.BOOLEAN
    }

  }, {
    timestamps: false,
   // tableName: 'gametables'
  })
  
  module.exports = Cards