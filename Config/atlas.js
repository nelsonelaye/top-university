require("dotenv").config()
const mongoose = require("mongoose")
const url = process.env.ATLAS

mongoose.connect(url).then(()=> {
    console.log("Connected to MongoDB Atlas");
}).catch((err)=> {
    console.log(err.message);
})

module.exports = mongoose