const mongoose = require("mongoose")

const ItemSchema = new mongoose.Schema({
    itemname:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    picture:{
        type:String,
        required:true,
        default:"someurl"
    },
    description:{
        type:String,
        required:true,
        default:" "
    },
    quantity:{
        type:Number,
        required:true
    },
    interestedrating:{
        type:Number,
        default:0
    },
    keywords:{
        type:[String],
        default:[]
    },
    sellingamount:{
        type:Number,
        default:0
    },
    ratings:{
        type:Number,
        default:0
    },
    genreid:{
        type: mongoose.Types.ObjectId
    },
    uploaddate:{
        type:Date,
        required:true
    }


},{
    timestamps: true
})
module.exports = mongoose.model("Item",ItemSchema)