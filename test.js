const cloudinary = require("cloudinary").v2

cloudinary.config({ 
    cloud_name: 'dzc9ivqeh', 
    api_key: '251438779594268', 
    api_secret: 'efFVnn6b-xTHaxDXh6vMsuKsMiA',
    secure: true
  });

// console.log(cloudinary.uploader)

const fs = require("fs")

console.log(fs)