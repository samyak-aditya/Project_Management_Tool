const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.DATABASE_URL;

const dbConnect = () => {
    mongoose.connect(URL).then(()=>{
        console.log("Successful Database Connection !");
    }).catch( (error) => {
        console.log("Error is :");
        console.error(error);
        console.log("Unsuccessful Database Connection !");
    } );
}

module.exports = dbConnect;