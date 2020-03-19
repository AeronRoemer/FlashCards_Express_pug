const express = require('express');
//node.js parses JSON data for you
const {data} = require('../data/flashcarddata.json');
const {cards} = data;
//creates new express router for cards page
const router = express.Router();

//radnomizes card on visit to /card
router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashCardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/card/${flashCardId}`);
})

//individual page information
router.get('/:id', (req, res) => {
    const { side } = req.query;
    const {id} = req.params;
//if no side selected, return question side
    if (!side){
        return res.redirect(`/card/${id}?side=question`);
    }
    const text = cards[id][side];
    const {hint} = cards[id];
    //get name from cookies
    const name = req.cookies.username;
    const templateData = {id, text, name};
    //displays 'Question or answer text. String passed to query string in HTML Doc
    if (side === 'question'){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer'){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }
    //renders 'card' page with data generate above
    res.render('card', templateData);
});

module.exports = router;

//continued: keep score for user, keep score ranking of past users