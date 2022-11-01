const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express  = require('express');
const app = express();


dotenv.config({path: './config.env'});  // just write this once in app.js and use it anywhere
require('./db/connectio');

// const User = require('./model/userSchema');

app.use(express.json()); // out application doesnot understand json so this line says that if we get data convert it in form of objects.

// we link the router files to make our route easy
app.use(require('./router/auth'));

const PORT = process.env.PORT;



// Middleware - we will use this to check whether user is logged in or not then only it will go to next page . this is just a demo.

 const middleware = (req,res,next) =>{
    console.log(`this is middleware`);
    next();   // if we dont use next function it will keep loading the page.
 }
 



app.get('/', (req, res) =>{
    res.send(`Hello world from server app.js`);
});

app.get('/about', middleware, (req, res) =>{
    console.log('Hello about');
    res.send(`Hello about world from server`);
});

app.get('/contact', (req, res) =>{
    res.send(`Hello contact world from server`);
});

app.get('/signin', (req, res) =>{
    res.send(`Hello login world from server`);
});

app.get('/signup', (req, res) =>{
    res.send(`Hello registration world from server`);
});

app.listen(PORT, () => {
    console.log('server is running at port '+PORT)
});