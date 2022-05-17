const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    userfullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
    },
    phonenumber:{
        type:String
    },
    password:{
        type:String,
        required:true

    },
    role:{
        type:String,
        required:true
    },
    dob:{
        type:String
    },
    currentcartitems:{
        type:[mongoose.Types.ObjectId],
        default:[]
    },
    currentcartquantity:{
        type:[Number],
        default:[]
    }
    
})
module.exports = mongoose.model("User",UserSchema)