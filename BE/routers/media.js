const router = require("express").Router()
const { json } = require("express")
const MediaSchem = require("../models/media")

router.get("/getAllImg",async(req,res)=>{
    try{
        const imgs = await MediaSchem.find()
        res.status(200).json(imgs)

    }catch(err){
        console.log(err)
        res.status(300).send("ERR")
    }
})
router.post("/saveImg",async(req,res)=>{
    try{
        const img = await new MediaSchem({
            imgurl: req.body.url
        })
        await img.save()

        res.status(200).json(img)
    }catch(err){
        console.log(err)
        res.status(300).send("ERR")
    }
})
router.post("/deleteImg",async(req,res)=>{
    try{
        await MediaSchem.findOneAndDelete({
            imgurl: req.body.url
        })
        res.status(200).json("Deleted")
    }catch(err){
        console.log(err)
        res.status(300).send("ERR")
    }
})

module.exports = router