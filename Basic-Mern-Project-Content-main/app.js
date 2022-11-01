
const express = require("express");
const dotenv = require('dotenv');
const app = express();




dotenv.config({path:'./config.env'})

require('./DB/conn');
app.use(express.json());


// const User = require('./Model/userSchema');

app.use(require('./Router/auth'));


const PORT = process.env.PORT;

const middleware =(req, res, next) => {
    console.log("hello from middleware")
    next();
}







app.get('/', (req, res) =>{
    res.send("hello world from server")
});

app.get('/contact', (req, res) =>{
    res.send("hello world from contact")
});
app.get('/about', (req, res) =>{
    res.send("hello world from about")
});
app.get('/signin', (req, res) =>{
    res.send("hello world from signin")
});
app.get('/signup', (req, res) =>{
    res.send("hello world from registration")
});


app.listen(PORT, (req, res)=>{
    console.log(`server listening at ${PORT}`)
});
