const express = require('express');
const router = express.Router();
const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple'
  ];
//get requests for routes
router.get('/', (req, res) =>{
    res.locals.colors = colors;
    const name = req.cookies.username;
    //redirect to Hello page if cookie is not set
    if (name){
        res.render('index', {name: name});
    } else {
        res.redirect('/hello');
    }
    
})

router.get('/hello', (req, res) =>{
    const name = req.cookies.username;
    if (name){
        res.redirect('/');
    } else {
        res.render('hello');
    }
    
});

//post requests for routes
router.post('/hello', (req, res) =>{
    //sets cookie
    res.cookie('username', req.body.username);
    //residrects on response
    res.redirect('/');
});

//resets cookies and redirects to form page
router.post('/goodbye', (req, res)=>{
    res.clearCookie('username');
    res.redirect('/hello');
})


module.exports = router;