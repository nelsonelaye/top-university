const express = require("express")
const route =  express.Router()
const imageUploader = require("../Config/multer")
const {readSchools, createSchool, findASchool, deleteSchool, updateSchool} = require("../Controller/controller")


route
    .route("/schools")
    .get(readSchools)

route 
    .route("/schools/:id")
    .get(findASchool)
    .delete(deleteSchool)
    .patch(imageUploader, updateSchool)

route.post("/create", imageUploader, createSchool)
    // .route("/allschools")
    // .get(readSchools)




module.exports = route