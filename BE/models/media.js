const mongoose = require("mongoose")

const MediaSchema = new mongoose.Schema({
    imgurl:{
        type:String
    }
})
module.exports = mongoose.model("MediaSchem",MediaSchema)