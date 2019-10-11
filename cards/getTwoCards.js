const fetch = require('node-fetch')

let cards =[]
let cardsImages = []

const getTwoCards = async ()=> {
    

    const resCardDeck = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    const resCardDeckJson = await resCardDeck.json()

    const cardDeckiD = resCardDeckJson.deck_id

    const resCards = await fetch(`https://deckofcardsapi.com/api/deck/${cardDeckiD}/draw/?count=5`)
    const resCardsJson = await resCards.json()
    
    const cards = resCardsJson.cards

    cards.map(card => cardsImages.push(card.images.png))
    

    console.log('cardImages is', cardsImages)


    //return cardImages   this causes a rejection error         

}

getTwoCards()
