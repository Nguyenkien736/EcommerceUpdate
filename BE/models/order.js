const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Types.ObjectId,
        required:true
    },
    itemidlist:{
        type:[mongoose.Types.ObjectId],
        required:true
    },
    quantitylist:{
        type:[Number],
        required:true
    },
    voucherid:{
        type:mongoose.Types.ObjectId
    },
    orderstatus:{
        type: String,
        default: "Pending"
    }
    

},{
    timestamps:true  
  }
)
module.exports = mongoose.model("Order",OrderSchema)