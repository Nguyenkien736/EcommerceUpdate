const router = require("express").Router()
const { json } = require("express")
const User = require("../models/user")
const Order = require("../models/order")
const { route } = require("./items")
const Ratting  = require("../models/rattings")
const Item = require("../models/item")
const user = require("../models/user")

router.get("/userinfo/:id",async(req,res)=>{
    try {
        const user =await User.findById(req.params.id)
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
        console.log(user)
        user.currentcartitems.push(req.body.itemid)
        user.currentcartquantity.push(req.body.itemquantity)
        await user.save()
        res.status(200).json("added to cart")
        
    } catch (error) {
        console.log(error)
        res.send("err")       
    }
    
    
})


router.post('/deleteitemcart',async(req,res)=>{
    try {
        const user = await User.findById(req.body.userid)
        const index = user.currentcartitems.indexOf(req.body.itemid)
        user.currentcartitems.splice(index,1)
        user.currentcartquantity.splice(index,1)
        await user.save()
        res.status(200).json("deleted")

        
    } catch (error) {
        console.log(error)
        res.send("ERR")
        
    }
})

router.get('/get-all-item/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        const items_id = user.currentcartitems
        
        const items = []
        
        for(let i = 0;i<items_id.length;i++){
            const item = await Item.findById(items_id[i])
            items.push(item)
        }
            //console.log(items)
            const resp = {
                cart_items: items,
                quans: user.currentcartquantity
            }
            res.status(200).json(resp)

        
        

    }catch(err){
        console.log(err)
        res.send("Err")
    }
})

router.post('/changeitemquantity',async(req,res)=>{
    try {
        const user = await User.findById(req.body.userid)
        const index = user.currentcartitems.indexOf(req.body.itemid)
        user.currentcartquantity[index] = req.body.newquantity
        await user.save()
        console.log(req.body.newquantity)
        res.status(200).json(req.body.newquantity)
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
            rate: req.body.rate,
            message: req.body.message,
            orderid: req.body.orderid

        })
        const item = await Item.findById(req.body.itemid)
        item.rattingcount++;
        item.ratings += req.body.rate

        await item.save()

        const saved_ratting = await ratting.save()
        res.status(200).json(saved_ratting)
        
    } catch (error) {

        console.log(error)
        res.send("ERR")
    }
})

router.get("/getrattingcontent",async(req,res)=>{
    try{
        const ratting = await Ratting.findOne({
            orderid:req.query.orderid,
            itemid:req.query.itemid,
        }) 
        console.log(ratting)
        res.status(200).json(ratting)

    }catch(err){
        console.log(err)
        res.send("ERR")
    }
})


router.post("/updatecontactinfo",async(req,res)=>{
    try{
        const user = await User.findById(req.body.userid)
        user.address = req.body.address
        user.phonenumber = req.body.phonenumber

        await user.save()
        res.status(200).json(user)

    }catch(err){
        console.log(err)
        res.send("ERR")
    }
})

// update user info

router.post("/updateinfo",async(req,res)=>{
    try{
        let update = {
            username: req.body.username,
            userfullname: req.body.userfullname,
            phonenumber: req.body.phonenumber,
            email: req.body.email,
            dob: req.body.dob,
            address : req.body.address
        }

        await User.findByIdAndUpdate(req.body.userid,update,(err,docs)=>{
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated User : ", docs);
                //res.status(200).send("Updated")
            }
        })
        res.status(200).send("Updated")
        

    }catch(err){
        console.log(err)
        res.send("ERR")
    }
})
router.get("/get-amount-user",async (req,res)=>{
    try {
        const month = req.query.month
        const year = req.query.year
        const results = {
            part_user: 0,
            all_user: 0
        }


        Promise.all([
            User.count({}).exec(),
            User.count({createdAt: {
                $gte: new Date(year,month,1)
            }
}).exec()
          ]).then(function(result) {
            console.log([].concat.apply([],result));
            
            results.all_user = result[0]
            results.part_user = result[1]
            console.log(results)
            
          }).finally(()=>{
            res.status(200).json(results)

          })
       
       

        
        
    } catch (error) {
        console.log(error)
        res.send("err")
        
    }
})
router.get("/getsomeuser",async(req,res)=>{
    try{
        const users = await User.find({}).sort({"createAt":-1}).skip(req.query.page).limit(req.query.limit)
        const total = await User.count({})
        const result = {
            data: users,
            total:total
        }
        res.status(200).json(result)
    }catch(err){
        console.log(err)
    }

})

router.post("/deleteuser/:id",async(req,res)=>{
    try{
        // delete every things
        await Order.deleteMany({userid:req.params.id})
        await Ratting.deleteMany({userid:req.params.id})
        await User.findByIdAndDelete(req.params.id)

        res.status(200).json("DELETED")

    }catch(err){
        console.log(err)
        res.send("ERR")

    }
})
module.exports = router