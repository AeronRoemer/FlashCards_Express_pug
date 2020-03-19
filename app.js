//requires express and a body-parser middleware for response objects
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
//sets the view engine as pug for render requests
app.set('view engine', 'pug');
//sets up the bodyParser so HTML form can post to the response body
app.use(bodyParser.urlencoded({extended: false}));
//sets up cookie Parser to user cookies
app.use(cookieParser());

//imports router middleware from file
//since it's index.js, it's automatically chosen to imoprt out of file
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/card');

app.use(mainRoutes);
app.use('/card', cardRoutes);


//creates error
app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})
//error handler

  app.use(( err, req, res, next ) => {
    res.locals.error = err;
    if (err.status >= 100 && err.status < 600)
      res.status(err.status);
    else
      res.status(500);
    res.render('error');
  });
  
  

//starts listening on specfied port(localhost:3000). Server must be started with node app.js in terminal
app.listen(3000, () =>{
    console.log('The server is up and running')
});