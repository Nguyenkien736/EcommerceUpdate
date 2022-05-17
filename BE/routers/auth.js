const router = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/user")
router.post('/register', async (req,res)=>{

    
    
    try{
        salt = await bcrypt.genSalt(10)
        encrypted_password = await bcrypt.hash(req.body.password,salt)
        if (req.body.role!="client"&&req.body.role!="admin")
        res.status(300).json("Bad Request")
        // create user
        const new_user = await new User({
        username: req.body.username,
        userfullname: req.body.userfullname,
        password: encrypted_password,
        role: req.body.role,
        email: req.body.email
        })
        const user = await new_user.save()
        res.status(200).json(user)

    }catch(e){
        console.log(e)
        res.status(300).send("Invalid")
    }
})

router.post('/login', async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email})
        if (!user) res.status(404).send("User not exist")
        const validpassword = await bcrypt.compare(req.body.password,user.password)
        if(!validpassword) res.status(500).send("wrong password")
        res.status(200).json(user)


    }catch(err){
        res.status(500).send(err)
    }
})



module.exports = router