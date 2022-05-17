const router = require("express").Router()
const { json } = require("express")
const User = require("../models/user")
const Order = require("../models/order")
const { route } = require("./items")
const Ratting  = require("../models/rattings")


router.get("/userinfo",async(req,res)=>{
    try {
        const user =await User.findById(req.query.userid)
        //TODO: check if user exist
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).send("ERR")

    }
    
})

router.post("/additemtocart",async(req,res)=>{
    try {
        const user = await User.findById(req.body.userid)
        user.currentcaritems.push(req.body.itemid)
        user.currentcarquantity.push(req.body.itemquantity)
        await user.save()
        res.status(200).json("added to cart")
        
    } catch (error) {
        res.send("ERR")       
    }
    
    
})



router.post('/deleteitemcart',async(req,res)=>{
    try {
        const user = await User.findById(req.body.userid)
        const index = user.currentcaritems.indexOf(req.body.itemid)
        user.currentcaritems.splice(index,1)
        user.currentcarquantity.splice(index,1)
        await user.save()
        res.status(200).json("deleted")

        
    } catch (error) {
        console.log(error)
        res.send("ERR")
        
    }
})

router.post('/changeitemquantity',async(req,res)=>{
    try {
        const user = await User.findById(req.body.userid)
        const index = user.currentcaritems.indexOf(req.body.itemid)
        user.currentcarquantity[index] = req.body.newquantity
        await user.save()
        res.status(200).json("changed")
    } catch (error) {
        console.log(error)
        res.send("ERR")
        
    }
})

router.get("/getuserorder",async(req,res)=>{
    try {
        const orders = await Order.find({
            userid: req.query.userid
        })
        res.status(200).json(orders)

    } catch (error) {
        res.status(500).send(200)

    }
})

router.post("/ratingitem",async(req,res)=>{
    try {
        const ratting =await new Ratting({
            userid: req.body.userid,
            itemid:req.body.itemid,
            rate: req.body.rate

        })
        const saved_ratting = await ratting.save()
        res.status(200).json(saved_ratting)
        
    } catch (error) {

        console.log(error)
        res.send("ERR")
    }
})

module.exports = router