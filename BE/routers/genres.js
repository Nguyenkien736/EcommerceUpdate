

const Genre = require("../models/genre")

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

module.exports = router