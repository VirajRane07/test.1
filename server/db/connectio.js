const mongoose = require ('mongoose');


const DB = process.env.DATABASE;// instea of passing link directly we are taking it from the .env file.

mongoose.connect(DB).then(() => {
    console.log('connection successful')
}).catch(() => {console.log('error in connection')})
