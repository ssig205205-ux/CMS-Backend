const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const User = require("../model/userModel");


dotenv.config();
async function adminMiddleWare(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  //const token = auth.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const { UserType, Team} = await User.findById(decode.id);
    
    if( UserType !== "admin"){
        return res.status(403).json({ message: "Access denied" });
    }
    req.admin = {UserType, Team};
    console.log(req.admin);
    console.log("user is authorized");
    next();
  } catch (error) {
    return res.status(401).json({ message: "User is not allowed" });
  }
}

module.exports = adminMiddleWare;
