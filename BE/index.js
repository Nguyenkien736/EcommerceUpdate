const express = require("express")
const nodemon = require("nodemon")
const helmet = require("helmet")
const morgan = require("morgan")
//const dotenv = require("dotenv")
const mongoose = require("mongoose")
const userRoute = require('../BE/routers/users')
const authRoute = require('../BE/routers/auth')
const itemRoute = require("../BE/routers/items")
const genreRoute = require("../BE/routers/genres")
const { application } = require("express")
const { getRounds } = require("bcrypt")
require('dotenv').config()
//dotenv.config()
//console.log(process.env)
app = express()
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected")

}).catch(e=>{console.log(e)})




// middle ware
app.use(express.json())

app.use(helmet())
app.use(morgan('common'))
app.use("/api/user",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/item",itemRoute)
app.use("/api/genre",genreRoute)


app.listen(8080,()=>{
    console.log("back end server is running")
})