const mongoose = require("mongoose")

const RattingScheme = new mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId
        
    },
    itemid:{
        type:mongoose.Types.ObjectId
    },
    rate:{
        type:Number,
        max:5,
        min:0
    }

})