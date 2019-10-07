//black-jack-server/user/model.js
const Sequelize = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
    userName:{
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
    tableName: 'users'
  })
  
  module.exports = User