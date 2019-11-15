//black-jack-server/player/router.js
const { Router } = require('express')
const Player = require('./model')
const bcrypt = require('bcrypt')
const auth = require('../auth/middleWare')
const router = new Router()
const fetch = require('node-fetch')
//set up a stream to update client side 
const Sse = require('json-sse') //for data stream
const stream = new Sse()

router.get('/', (req, res, next)=>{
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

router.get('/playercards', auth, async (req, res, next)=>{

    const allPlayers = await Player.findAll()
    const data = JSON.stringify(allPlayers)
    stream.updateInit(data)
    stream.init(req,res)

})
//stream cards data to user once cards is updated

//Player has clicked start so we give them two cards
router.put('/playercards', auth, async (req, res, next)=>{

    console.log('stream player cards example')
    try{
        const foundPlayer = await Player.findByPk(req.playerId)
        const updatefoundPlayer = await foundPlayer.update({
            playerClickedStart: true
        })

        //function to get two cards from API
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
            card2:cardsImages[1]
        })
        //end of function to get cards


        const allPlayers = await Player.findAll()
        const data = JSON.stringify(allPlayers)
        console.log('data in /playercards route is', data)
        stream.updateInit(data)
        stream.init(req,res)
    }
    


    catch{
        err=>next(err)
    }
 
})




module.exports = router