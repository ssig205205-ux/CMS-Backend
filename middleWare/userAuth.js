const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


dotenv.config();
function authMiddleWare(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }
  //const token = auth.split(" ")[1];
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode.id;  
    console.log(decode)
    console.log("user is authorized");
    next();
  } catch (error) {
    return res.status(401).json({ message: "User is not authorized" });
  }
}

module.exports = authMiddleWare;
