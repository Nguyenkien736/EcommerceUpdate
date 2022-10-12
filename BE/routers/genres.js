
const Genre = require("../models/genre")
const item = require("../models/item")
const item_genre = require("../models/item_genre")
const { route } = require("./items")

const router = require("express").Router()

router.post("/creategenre",async(req,res)=>{
    try{
        const new_genre = await new Genre({
            genrename: req.body.genrename
        })
        ge = await new_genre.save()
        res.status(200).json(ge)

    }catch(err){
        res.status(300).send("ERR")

    }
        
})
router.get("/getgenres",async(req,res)=>{
    try{
        const genres = await Genre.find()
        res.status(200).json(genres)

    }catch(err){
        res.status(300).send("ERR")
    }
})
router.get("/getgenretable",async(req,res)=>{
    try{
        const genres = await Genre.find()
        const genreinfo = []

         for(let i =0 ;i<genres.length;i++){
            
            const a = await item_genre.count({
                genreid: genres[i]._id
            })
            
            
            const buff_object = Object.assign({},genres[i])
            const buf = buff_object._doc
            buf.nobook = a
            console.log(buf)
            genreinfo.push(buf)
        
         }
        const result = {
            data: genreinfo,
            total : genres.length
        }
        res.status(200).json(result)

    }catch(err){
        console.log(err)
        res.status(400).send("ERRyyy")
    }
})
router.get("/getgenreitemcount/:id",async(req,res)=>{
    try{
        const itemcount = await item_genre.count({
            genreid: req.params.id
        })
        res.status(200).json(itemcount)


    }catch(err)
    {
        res.status(300).send("ERR")

    }
})
module.exports = router