const express = require('express');
const app = express();
app.get('/', (req, res) =>{
    res.send('Whatever');
})
app.get('/hello', (req, res) =>{
    res.send('<h1>Hello</h1>Whatever');
});
app.listen(3000, () =>{
    console.log('The server is up and running')
});