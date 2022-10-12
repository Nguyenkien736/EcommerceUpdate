const router = require("express").Router()
const mongoose = require("mongoose")
const item = require("../models/item")
const Item =  require("../models/item")
const Item_genre = require("../models/item_genre")
const Genre  =require("../models/genre")
const Interested_item  = require("../models/interested_item")





router.post("/createitem",async(req,res)=>{
    try{    
        const newitem = await new Item({
            itemname:req.body.itemname,
            price: req.body.price,
            picture: req.body.picture,
            description: req.body.description,
            quantity : req.body.quantity,
            uploaddate: new Date()

        })
        const genre = await Genre.findOne({genrename: req.body.genrename})
        const newitemgenre = await new Item_genre({
            genreid: genre._id,
            itemid: newitem._id
        })

        const item = await newitem.save()
        await newitemgenre.save()
        res.status(200).json(item)
    }catch(err){
        console.log(err)
        res.status(404).send("Error")
    }

})

router.get("/countitem",async(req,res)=>{
    try{
        const itemcount = await Item.find({})
        res.status(200).json({
            count: itemcount.length
        } 
        )
        

    }catch(err){
        console.log(err)
        res.send("ERR")
    }
})


router.get("/getitem/:id",async(req,res)=>{
    try{
        const item = await Item.findById(req.params.id)
        item.interestedrating = item.interestedrating + 1
        await item.save()
        res.status(200).json(item)

    }catch(err){
        console.log(err)
        res.status(404).send("Err")
        
    }
    
})

router.post("/updateitem/:id",async(req,res)=>{
    try{
        const item =await  Item.findById(req.params.id)
        item.price = req.body.price
        item.description = req.body.description
        item.picture = req.body.picture
        item.quantity = req.body.quantity
        item.interestedrating = req.body.interestedrating
        item.sellingamount = req.body.sellingamount
        item.rattings = req.body.ratings

        await item.save()
        res.status(200).json(item)

    }catch(err){
        res.status(500).send("ERR")

    }
})

router.post("/deleteitem/:id",async(req,res)=>{
    try{
        const item = await Item.findByIdAndDelete(req.params.id)
        await Item_genre.deleteMany({itemid: req.params.id})
        res.status(200).send("delete successfull")
    }catch(err){
        res.status(300).send("ERR")
    }
})


// filter by genre return item id
router.get("/getitemsbygenre/",async (req,res)=>{
    try{
        
        const skipnum = req.query.page        
        const items = await Item_genre.find({genreid:req.query.genreid}).sort({"_id":1}).skip(skipnum).limit(10)
        res.status(200).json(items)
            
    }catch(err)
    {
        console.log(err)
        res.status(300).send("ERR")
        
    }
})


// sort by best seller return item
router.get("/bestsellers/:page",async(req,res)=>{
    const skipnum = req.params.page
    const bestsellers = await Item.find({

    }).sort({"_id":1}).sort({"sellingamount":1}).skip(skipnum-1).limit(10)
    res.status(200).json(bestsellers)
})


// sort by best ratting
router.get("/bestrattings/:page",async(req,res)=>{
    const skipnum = req.params.page
    const bestrattings = await Item.find({

    }).sort({"_id":1}).sort({"rattings":1}).skip(skipnum).limit(10)
    res.status(200).json(bestrattings)
})


// filter interested item

router.get("/foryou/:page",async(req,res)=>{
    try {
        const skipnum = req.query.page
        const items  =  await Interested_item.find({
            userid: req.query.userid
        }).sort({"_id":1}).limit(10)
        
    } catch (error) {
        console.log(error)
        res.send("ERR")
    }
    
    
})


// search for items 

router.get('/search',async(req,res)=>{
    try {
        
        const items = await Item.find({
            itemname : new RegExp(req.query.value,'i')
            
        }).sort({"_id":1}).limit(10)
        //console.log(req.query.value)
        res.status(200).json(items)
    } catch (error) {
        res.send("ERR")
    }
})

//get item with cue

router.get('/getitem-with-cue/:id',async (req,res)=>{
    try{
        const s = req.params.id
        const regex = new RegExp(s, 'i') // i for case insensitive
        const itemList = await Item.find({itemname: {$regex: regex}})
        res.status(200).json(itemList)

    }catch(err){
        console.log(err)
        res.send("ERR")
    }
})


// return new book
router.get("/bestsellers/:page",async(req,res)=>{
    const skipnum = req.params.page
    const bestsellers = await Item.find({

    }).sort({"_id":1}).sort({"uploaddate":1}).skip(skipnum).limit(10)
    res.status(200).json(bestsellers)
})

router.get("/getsomeitem", async (req, res) => {
    try {
        const orders = await Item.find({}).sort({ "createAt": -1 }).skip(req.query.page).limit(req.query.limit)
        const total = await Item.count({})
        // const resp = []
        // for (let i = 0; i < orders.length; i++) {
        //     console.log(orders[i])
        //     let money = await OrderService.calculateEarning([orders[i]])
        //     const order = {
        //         orderid: orders[i]._id,
        //         order_date: orders[i].createdAt,
        //         total: money,
        //         status: orders[i].orderstatus
        //     }
        //     const user_order = await User.findById(orders[i].userid)
        //     let products = []
        //     for (let j = 0; j < orders[i].itemidlist.length; j++) {
        //         const product = await Item.findById(orders[i].itemidlist[j])
        //         products.push(product.itemname)
        //     }
        //     order.products = products
        //     order.customer_name = user_order.userfullname
        //     resp.push(order)
        //     console.log(resp)

        // }
        const result = {
            data: orders,
            total: total
        }
        res.status(200).json(result)
    } catch (err) {
        console.log(err)
    }

})
module.exports = router