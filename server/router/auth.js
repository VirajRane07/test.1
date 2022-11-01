const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

require('../db/connectio');
const User = require("../Models/userSchema");

router.get('/', (req, res) => {
    res.send('Hello from the server router js')
});


// using promises.
// router.post('/register',  (req, res)=>{

//    const { name, email, phone,work, password,cpassword} = req.body; //destructuting . we can directly access properties with its name instead fo writting rwq.body.something everytime.
// //    console.log(req.body);
// // //    console.log(req.body.name); // to send singlr attribute.
// // console.log(name);
// //    res.json({message:req.body});
// // //    res.send('My register page');

//         if (!name || !email || !phone || !work || !password || !cpassword){
//              return res.status(422).json({Error:"please fill all fields"});
// }

//             User.findOne({ email:email })
//                  .then((userExist) => {
//               if(userExist) {
//                  return res.status(422).json({Error:"Email already exist"});

//         } 

//         const user = new User({ name, email, phone,work, password,cpassword});

//         user.save().then(()=>{
//             res.status(201).json({ message: "user registered successfully"});

//         }).catch((err) => res.status(500).json({ error: "Failed to register"})); 
//     }).catch(err => { console.log(err);});

// })

//using async


router.post('/register', async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body; //destructuting . we can directly access properties with its name instead fo writting rwq.body.something everytime.

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ Error: "please fill all fields" });
    }

    try {
        const userExist = await User.findOne({ email: email })

        if (userExist) {
            return res.status(422).json({ error: " Email already Exist" });
        } else if (password != cpassword) {
            return res.status(422).json({ error: "password are not matching" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            // yeha pe
            await user.save();
            res.status(201).json({ message: " user registered successfuly" });
        }
    } catch (err) {
        console.log(err);
    }


});

// Login route 

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "please fill field" })
        }
        const userLogin = await User.findOne({ email: email });
        // console.log(userLogin);
        if (userLogin) {
            const isMatch = await bcrypt.compare(req.body.password, userLogin.password);

            if (!isMatch) {
                res.status(400).json({ error: "Invalid Credentials pass" });
            } else {
                res.json({ message: "user Signin Successfully" });
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials " });
        }
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;