// require("./Config/atlas")
require("./Config/compass")
const express = require("express")
const server = express()
const port = process.env.PORT || 2022

const route = require("./Router/router")

server.use(express.json())
server.use("/api", route)

server.listen(port, ()=> {
    console.log("Server running on port ", port);
})