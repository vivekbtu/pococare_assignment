const express = require("express");
const cors = require("cors")
const jwt = require("jsonwebtoken")


const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.router");
const {todoRouter} = require("./routes/notes.router");
const { Authentication } = require("./middleware/authentication");
const { verifyRefresh } = require("./middleware/authentication")

const app = express();
app.use(express.json())
app.use(cors({
    origin : "*"
}))

require("dotenv").config();

app.get("/",(req,res)=>{
    res.send("Welcome to Our App")
})
app.use("/user",userRouter)

// Refresh Token

app.post("/refresh", (req, res) => {
    const { email, refresh_token } = req.body;
    const isValid = verifyRefresh(email, refresh_token);
    if (!isValid) {
    return res
    .status(401)
    .json({ success: false, error: "Invalid token,try login again" });
    }
    const token = jwt.sign({ email: email }, process.env.KEY, {
    expiresIn: "10m",
    });
    return res.status(200).json({ success: true, token });
    });

app.use(Authentication)

app.use("/todos",todoRouter)

 
const PORT = process.env.PORT
app.listen(PORT,async()=>{
    try{
        await connection
        console.log(`Listening  http://localhost:${PORT}`)
    }
    catch(err){
        console.log(err)
    }
})