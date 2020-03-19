const express = require('express');
//node.js parses JSON data for you
const {data} = require('../data/flashcarddata.json');
const {cards} = data;
const router = express.Router();

router.get('/', (req, res) => {
    const numberOfCards = cards.length;
    const flashCardId = Math.floor(Math.random() * numberOfCards);
    res.redirect(`/card/${flashCardId}`);
})

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const {id} = req.params;

    if (!side){
        res.redirect(`/card/${id}?side=question`);
    }
    const text = cards[id][side];
    const {hint} = cards[id];

    const templateData = {id, text};

    if (side === 'question'){
        templateData.hint = hint;
        templateData.sideToShow = 'answer';
        templateData.sideToShowDisplay = 'Answer';
    } else if (side === 'answer'){
        templateData.sideToShow = 'question';
        templateData.sideToShowDisplay = 'Question';
    }

    res.render('card', templateData);
});

module.exports = router;