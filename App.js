const express = require('express')
const path = require('path')
const app = express();
const port = 80
app.use(express.static('templates'))
app.set(express.urlencoded())
// app.set('view engine','pug')
// app.set('templates',path.join(__dirname,'templates'));
require('../Chatting/server')
app.get('/',(req,res)=>{
    res.render('index')
})
app.listen(port,()=>{console.log('Listening on http://localhost')})