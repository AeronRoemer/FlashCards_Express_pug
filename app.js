//requires express and a body-parser middleware for response objects
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];
//sets the view engine as pug for render requests
app.set('view engine', 'pug');
//sets up the bodyParser so HTML form can post to the response body
app.use(bodyParser.urlencoded({extended: false}));
//sets up cookie Parser to user cookies
app.use(cookieParser());

//creates error
app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})
//error handler
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error', err);
  });
  

//get requests for routes
app.get('/', (req, res) =>{
    res.locals.colors = colors;
    const name = req.cookies.username;
    //redirect to Hello page if cookie is not set
    if (name){
        res.render('index', {name: name});
    } else {
        res.redirect('/hello');
    }
    
})
app.get('/card', (req, res) =>{
    res.locals.prompt = 'Whatever';
    res.locals.Name = 'Nerd';
    res.render('card');
});
app.get('/hello', (req, res) =>{
    const name = req.cookies.username;
    if (name){
        res.redirect('/');
    } else {
        res.render('hello');
    }
    
});

//post requests for routes
app.post('/hello', (req, res) =>{
    //sets cookie
    res.cookie('username', req.body.username);
    //residrects on response
    res.redirect('/');
});

//resets cookies and redirects to form page
app.post('/goodbye', (req, res)=>{
    res.clearCookie('username');
    res.redirect('/hello')
})

//starts listening on specfied port(localhost:3000). Server must be started with node app.js in terminal
app.listen(3000, () =>{
    console.log('The server is up and running')
});