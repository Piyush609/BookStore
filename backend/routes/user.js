const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./userAuth.js");

router.post("/sign-up", async (req, res) => {
    try{
        const {username, email, password, address} = req.body;
        if(username.length < 4){
            return res.status(400).json({message : "Username length should be greater than 3"});
        }
        const existingUsername = await User.exists({username : username});
        if(existingUsername){
            return res.status(400).json({message : "Username already exist"});
        }
        const existingEmail = await User.exists({email : email});
        if(existingEmail){
            return res.status(400).json({message : "Email already exist"});
        }
        if(password.length <= 5){
            return res.status(400).json({message : "Password length should greater than 5"});  
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new User({
            username : username, 
            email : email, 
            password : hashPass, 
            address : address
        });
        await newUser.save();
        return res.status(200).json({message : "SignUp Successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal Server Err"});
    }
})

router.post("/sign-in", async (req, res) => {
    try{
        const {username, password} = req.body; 
        const existingUser = await User.findOne({username});
        if(!existingUser){
            res.status(400).json({message : "Invalid Credentials"});
        }
        await bcrypt.compare(password, existingUser.password, (err, data)=>{
            if(data){
                const authclaims = [
                    {name : existingUser.username},
                    {role : existingUser.role},
                ]
                const token = jwt.sign({authclaims}, "bookStore123",{
                    expiresIn:"30d",
                })
                res.status(200).json({id : existingUser._id, role : existingUser.role, token : token,});
            }else{
                res.status(400).json({message : "Invalid Credentials"});
            }
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message : "Internal Server Err"});
    }
})

router.get("/get-user-information",authenticateToken , async (req, res) => {
    try{
        const {id} = req.headers;
        const data = await User.findById(id).select("-password");
        // console.log(data);
        return res.status(200).json(data);
    }catch(err){
        res.status(500).json({message : "Internal server error"});
    }
});

router.put("/update-address", authenticateToken, async (req, res) =>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address : address} );
        return res.status(200).json({message : "Address Update Succssfully"});
    }catch(err){
        res.status(500).json({message : "Internal server error"});
    }
})

router.put("/update-role", authenticateToken, async (req, res) =>{
    try{
        const {id} = req.headers;
        const {role} = req.body;
        await User.findByIdAndUpdate(id,{role : role} );
        return res.status(200).json({message : "Role Update Succssfully"});
    }catch(err){
        res.status(500).json({message : "Internal server error"});
    }
})

module.exports = router;