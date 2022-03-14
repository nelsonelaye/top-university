const schoolModel = require("../Model/model")
const cloudinary =require("../Config/cloudinary")
const fs = require("fs")

//read all schools
const readSchools = async (req, res) =>{
    try {
        const school = await schoolModel.find()
        if(school.length < 1) {
            res.status(404).json({
                message: "No data in the database yet"
            })
        }

        res.status(200).json({
            status: "Success",
            data: school
        })

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
}

//create new school
const createSchool = async (req, res) => {
    try {

        const cloudResult = await cloudinary.uploader.upload(req.file.path)
        const newSchool = {
            schoolName: req.body.schoolName,
            schoolLocation: req.body.schoolLocation,
            schoolImage: req.file.path,
            dateCreated: req.body.dateCreated,
            cloudUrl: cloudResult.secure_url,
            cloudId: cloudResult.public_id
        }
        await schoolModel.create(newSchool)
        res.status(201).json({
            status: "Succcess",
            data: newSchool
        })
        
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
}

const findASchool = async (req, res)=> {
    try {
        
        const id = req.params.id

        const school = await schoolModel.findById(id)

        if(!school){
            res.status(401).json({message:`School with id: ${id} not found`            })
        }

        res.status(200).json({
            status: "Found",
            data: school
        })
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
}

const deleteSchool = async (req, res) => {
    try {
        const id = req.params.id

        const school = await schoolModel.findById(id)

        if(!school){
            res.status(401).json({message:`School with id: ${id} not found`})
        }

        await cloudinary.uploader.destroy(school.cloudId)
        await fs.unlinkSync(school.schoolImage)
        await schoolModel.findByIdAndRemove(id)

        res.status(204).json({
            status: "Success",
            message: `School Deleted`
        })
        
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message
        })
    }
}

const updateSchool = async (req, res) => {
    try {

        const id = req.params.id
        let school = await schoolModel.findById(id)
        if(!school){
            res.status(401).json({message:`School with id: ${id} not found`})
        }

        // await cloudinary.uploader.

        const cloudResult = await cloudinary.uploader.upload(req.file.path)

        school = await schoolModel.findByIdAndUpdate(id, {
            schoolName: req.body.schoolName,
            schoolLocation: req.body.schoolLocation,
            schoolImage: req.file.path,
            dateCreated: req.body.dateCreated,
            cloudUrl: cloudResult.secure_url,
            cloudId: cloudResult.public_id
        }, {new: true})

        res.status(200).json({
            status: "Success",
            data: school
        })
        
    } catch (error) {
        // res.status(404).json({
        //     status: "Failed",
        //     message: error.message
        // })
        console.log(error);
    }
}


module.exports = {
    readSchools,
    createSchool,
    findASchool,
    deleteSchool,
    updateSchool
}