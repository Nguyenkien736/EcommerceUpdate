const mongoose = require("mongoose")

const Interested_itemSchema = new mongoose.Schema({
    itemid:{
        type:mongoose.Types.ObjectId,
        required:true

    },
    userid:{
        type:mongoose.Types.ObjectId,
        required:true
    }
})
module.exports = mongoose.model("Interested_item",Interested_itemSchema)