const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "./Images")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }

})

const filterFile = (req, file, cb)=> {
    let ext = path.extname(file.originalname)

    if(ext !== ".jpeg" || ext !== ".jpg" || ext !== ".png"){
        cb(null, new Error("file not supported"), false)
    } else {
        cb(null, true)
    }
}

const imageUploader = multer({
    storage: storage,
    filterFile: filterFile,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
}).single("schoolImage")

module.exports = imageUploader