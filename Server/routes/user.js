const router = require("express").Router();
const User = require('../model/User')
const bcrypt = require('bcrypt')

router.post("/signup", async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        const newUser = new User({
            userId: req.body.userId,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

router.post("/admin", async (req,res)=>{
    try{
        const user = await User.findOne({userId:req.body.userId});
        !user && res.status(404).send("User not found");

        const validPassword = await bcrypt.compare(req.body.password , user.password);
        !validPassword && res.status(400).json("Wrong password")
        
        res.status(200).json(user);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }    
});


router.post("/login", async (req,res)=>{
    try{
        const user = await User.findOne({userId:req.body.userId});
        !user && res.status(404).send("User not found");

        const validPassword = await bcrypt.compare(req.body.password , user.password);
        !validPassword && res.status(400).json("Wrong password")
        

        res.status(200).json(user);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }    
});


router.put("/logout/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        !user && res.status(404).send("User not found");
        res.status(200).json("User has been logged out");
    }catch(err){
        res.status(500).json(err);
    }    
});



router.get("/all", async (req,res)=>{
    try{
        const users = await User.find();
        res.status(200).json(users);
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
});

router.get("/accept/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        !user && res.status(404).send("User not found");

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {isAccepeted: true}, {new:true});

        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

router.put("/update/:id", async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        !user && res.status(404).send("User not found");
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        },{new:true});

        res.status(200).json(updatedUser);
    }catch(err){
        console.log(err)
        res.status(500).json(err);
    }
});

module.exports = router
