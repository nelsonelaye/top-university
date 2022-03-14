const mongoose = require("mongoose")

const schoolSchema = mongoose.Schema({
    schoolName:{
        type: String,
        required: true,
        unique: true
    },
    schoolLocation:{
        type: String,
        required: true
    },
    schoolImage:{
        type: String,
        required: true
    },
    dateCreated:{
        type: Date,
        required: true,
        default: new Date()
        
    },
    cloudUrl:{
        type: String
    },
    cloudId : {
        type:String
    }

})

module.exports = mongoose.model("schools", schoolSchema)