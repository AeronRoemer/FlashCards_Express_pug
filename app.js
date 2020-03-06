const express = require('express');
const app = express();
const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];
  
app.set('view engine', 'pug');
app.get('/', (req, res) =>{
    res.render('index');
})
app.get('/card', (req, res) =>{
    res.locals.prompt = 'Whatever';
    res.locals.Name = 'Nerd';
    res.locals.colors = colors;
    res.render('card');
});
app.listen(3000, () =>{
    console.log('The server is up and running')
});