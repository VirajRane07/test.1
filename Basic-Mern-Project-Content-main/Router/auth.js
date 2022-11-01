const express = require('express');
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

require("../DB/conn");
const User = require("../Model/userSchema");

router.get('/', (req, res) =>{
    res.send("hello world from Router");
});




router.post('/register', async (req, res) =>{
    // console.log(req.body);
    // res.json({message: req.body});

    const {name, email, phone, password, cpassword} = req.body;

    if (!name || !email || !phone || !password || !cpassword) {
        return res.json({ error : "Plz filled the field correctly"});
    }

    try {
        const userExist =  await User.findOne({email:email});

        if (userExist) {
            return res.json({error: "USER already exists"});
        } else if (password != cpassword){
            return res.status(422).json({error :"password doesnt match"});
        } else {
            const user = new User({name, email, phone, password, cpassword});



            await user.save();

            res.status(201).json({ message: "user registered successfully"});
        }
        
    } catch(err) {
        console.log(err);
    }









// router.post('/register', (req, res) =>{
//     // console.log(req.body);
//     // res.json({message: req.body});

//     const {name, email, phone, password, cpassword} = req.body;

//     if (!name || !email || !phone || !password || !cpassword) {
//         return res.json({ error : "Plz filled the field correctly"});
//     }
    
//     User.findOne({email:email})
//     .then((userExist) => {
//         if (userExist) {
//             return res.json({error: "USER already exists"});
//         }

//         const user = new User({name, email, phone, password, cpassword});

//         user.save().then(() => {
//             res.status(201).json({ message: "user registered successfully"});
//         }).catch((err) => res.status(500).json({error: "failed to registered"}));

//     }).catch(err => { console.log(err)});





    // console.log(req.body.name); 
 
    // res.send("running register page")
});

router.post('/signin', async (req, res) =>{
    // console.log(req.body)
    // res.json({message:"got user"})

    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({error: "plz fill the data"})
        }

        const userLogin =await User.findOne({email:email});
        // console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            const token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token ,{
                expires : new Date(Date.now() + 25892000000),
                httpOnly : true
            });



            if (!isMatch) {
                res.json({error: "user Error"})
            }else{
                res.json({message:"user signin successfully"});
            }
        } else{
            res.json({error: "user Error"});
        }

        
    }catch (err) {
        console.log(err)
    }
});








module.exports = router;