const router = require("express").Router()
const { json } = require("express")
const Item = require("../models/item")
const Order = require("../models/order")



router.post("/createorder",async(req,res)=>{
    try {
        const new_order = await new Order({
            userid: req.body.userid,
            itemidlist: req.body.itemidlist,
            quantitylist:req.body.quantitylist
        })
        
        const created_order = await new_order.save()



        res.status(200).send(created_order)
        
    } catch (err) {
        console.log(err)
        res.send(err)
        
    }
})

router.get("/getorder",async(req,res)=>{
    try {
        const order = await Order.findById(req.query.orderid)
        res.status(200),json(order)
    } catch (error) {
        console.log(error)

    }
})

router.post("/changeorderstatus",async(req,res)=>{
    try {
        const order = await Order.findById(req.query.orderid)
        order.status = req.body.orderstatus
        await order.save()
        res.status(200).json("change successfull")

    } catch (error) {
        console.log(error)
        res.send("ERR")
    }
})