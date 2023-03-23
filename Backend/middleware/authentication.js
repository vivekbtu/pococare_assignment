
const jwt = require("jsonwebtoken");

const Authentication = async (req, res, next) => {

    const token = req.headers?.authorization?.split(" ")[1]
    try{
        if(token){
            const decoded = jwt.verify(token, process.env.KEY)
            if(decoded){
                const userID = decoded.email
                req.body.userID = userID
                next()
            }
            else{
                return res.status(401).json({ message: "Unauthorized"});
            }  
        }

        else{
            return res.status(401).json({ message: "Token is empty"});
        }
    }
    catch{
        return res.status(401).json({ message: "Unauthorized"});
    }
}

function verifyRefresh(email, token) {
    try {
     const decoded = jwt.verify(token, process.env.REFRESH_KEY);
     return decoded.email === email;
    } catch (error) {
     // console.error(error);
     return false;
    }
   }

module.exports = {Authentication, verifyRefresh}