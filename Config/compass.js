require("dotenv").config()
const mongoose = require("mongoose")
// const url = process.env.COMPASS
const url = process.env.ATLAS


mongoose.connect(url).then(()=> {
    console.log("Connected to the INTERNET");
}).catch((err)=> {
    console.log(err.message);
})

module.exports = mongoose