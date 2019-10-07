//black-jack-server/db.js

const Sequelize = require('sequelize')
const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres'

const db = new Sequelize(databaseURL)

db.sync({force: true})
    .then(() => console.log('Database schema updated'))
    .catch(err => {
        console.error('Unable to create tables, shutting down...', err);
        process.exit(1);
    })

module.exports = db