
const { Router } = require("express")
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");
const userRouter = Router();
const jwt = require("jsonwebtoken")
require("dotenv").config();


// user/signup
userRouter.post("/signup", async (req, res) => {
    console.log(req.body)
    const {email, password} = req.body;
    const userPresent = await UserModel.findOne({email})
    
    if(userPresent?.email){
        return res.status(400).json({ message: "User already exist"})
    }
    else{
        try{
            bcrypt.hash(password, 4, async function(err, hash) {
                const user = new UserModel({email,password:hash})
                await user.save()
                res.send("Sign up successfull")
            });
           
        }
       catch(err){
            console.log(err)
            res.send("Something went wrong, pls try again later")
       }
    }
    
})

// user/login
userRouter.post("/login", async (req, res, next) => {
    const {email, password} = req.body;
    try{
        const user = await UserModel.find({email})
         
    //   if(user.length > 0){
    //     const hashed_password = user[0].password;
    //     bcrypt.compare(password, hashed_password, function(err, result) {
    //         if(result){
    //             const token = jwt.sign({"userID":user[0]._id}, process.env.KEY, {
    //                 expiresIn: "1h"
    //             });
    //             res.send({"msg":"Login successfull","token" : token})
    //         }
    //         else{
    //             res.send("Login failed please check password")
    //         }
    //   })} 
    //   else{
    //     res.send("Login failed user not valid")
    //   }

    if(!user) {
        return res.status(401).json({ message: "Invalid email or password"});
    }

    const isPassMatch = await bcrypt.compare(password, user[0].password);
    if(!isPassMatch) {
        return res.status(401).json({ message: "Invalid email or password"});
    }

    const token = jwt.sign({ userID:  user[0]._id}, process.env.KEY, {
        expiresIn: "1m"
    });

    // const refreshtoken = randtoken.uid(25)
    // refreshtokens[refreshtoken] = res.json({token: 'JWT' + token, refreshtoken: refreshtoken})

    const refresh_token = jwt.sign({ email: email }, process.env.REFRESH_KEY, {
        expiresIn: "28d",
      });

    res.send({"msg":"Login successfull","token" : token, "refresh_token": refresh_token})

    }
    catch{
        res.send("Something went wrong in Login, please try again later")
    }
})


module.exports = { userRouter }


