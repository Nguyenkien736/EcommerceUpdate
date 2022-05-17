const mongoose = require('mongoose')

const VoucherSchema = new mongoose.Schema({
    vouchername:{
        type:String,
        required:true
    },
    minapplied:{
        type:Number,
        required:true,
        default:0
    },
    maxdiscount:{
        type:Number,
        required:true,
        default:0
    },
    // 0 with amount of discount 1 with percent of discount 
    vouchertype:{
        type:Boolean,
        required:true,
        default:false
    },
    amountdiscount:{
        type:Number,
        required:true,
        min:0,
        default:0
    },
    percentdiscount:{
        type:Number,
        required:true,
        max:100,
        min:0
    }



})

module.exports = mongoose.model("Voucher",VoucherSchema)