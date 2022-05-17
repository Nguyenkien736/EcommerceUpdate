const mongoose = require("mongoose")

const GenreSchema = new mongoose.Schema({
    genrename:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Genre",GenreSchema)