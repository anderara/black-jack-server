//black-jack-server/player/router.js
const { Router } = require('express')
const Player = require('./model')
const bcrypt = require('bcrypt')
const auth = require('../auth/middleWare')
const router = new Router()
const fetch = require('node-fetch')

router.get('/', (req, res, next)=>{
    console.log('hello from the get ')
    res.status(200).send('hello from get')
    .catch(err=>next(err))
})
router.post('/player', (req, res, next) => {

    const player = {
        email: req.body.email,
        playerName: req.body.playerName,
        password: bcrypt.hashSync(req.body.password, 10)
    }
    Player.findOne({where: {
        email: player.email
        }
    })
    .then(
        playerRes => {
            if(playerRes){
            console.log(`Player ${player.email} already exists`, playerRes)
            res.status(400).send(player)
            
        }else{
            Player.create(player)
            .then(
            player => res.status(200).send(player)
            )
        }
    })
    .catch(next)
    
})

//Player has clicked start so we give them two cards
router.put('/playercards', auth, async (req, res, next)=>{
    
    //find the player
    const foundPlayer = await Player.findByPk(req.playerId)
    console.log('player sending request has id', foundPlayer)

   const updatefoundPlayer = await foundPlayer.update({
        playerClickedStart: true
    })
    //function to get five cards from API
    let cardsImages = []
    const resCardDeck = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    const resCardDeckJson = await resCardDeck.json()

    const cardDeckiD = resCardDeckJson.deck_id

    const resCards = await fetch(`https://deckofcardsapi.com/api/deck/${cardDeckiD}/draw/?count=5`)
    const resCardsJson = await resCards.json()
    
    const cards = resCardsJson.cards

    cards.map(card => cardsImages.push(card.images.png))
   
    updatefoundPlayer.update({
        card1:cardsImages[0],
        card2:cardsImages[1],
        card3:cardsImages[2],
        card4:cardsImages[3],
        card5:cardsImages[4]
    })
    //end of function to get cards

    .catch(err=>next(err))
})




module.exports = router