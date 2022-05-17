const mongoose = require("mongoose")

const Item_genreSchema = new mongoose.Schema({
    itemid:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    genreid:{
        type:mongoose.Types.ObjectId,
        required:true
    }

})
module.exports = mongoose.model("Item_genre",Item_genreSchema)