const User = require("../model/userModel");

const signUp = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.signUp(  email, password, name);
    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const token = await User.login(email, password);
    res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
    maxAge: 5 * 60 * 1000
});
    const { name } = await User.findOne({ email });
    res.status(200).json({ message: "Login successful",  user: { name } });
   
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  try {
   const userId = req.user;
   console.log(userId)
   const { name } = await User.findOne({ _id: userId });
   
   res.status(200).json({ message: "Login successful",  user: { name } });
  }
  catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }}


const logout = (req, res) => {
  try{
       res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
 
}


module.exports = {
  signUp,
  login,
  getCurrentUser,
  logout
};
