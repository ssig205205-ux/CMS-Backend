const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const dotenv = require("dotenv");

dotenv.config();

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signUp = async function (email, password,name) {
  if(validator.isEmpty(name)){
    throw new Error("Name is required");
    res.status(400).json({ error: "Name is required" });
  }
  if(!validator.isLength(name,{min:3})){
    throw new Error("Name must be at least 3 characters long");
    res.status(400).json({ error: "Name must be at least 3 characters long" });
  }
  if(validator.isEmpty(email)){
    throw new Error("Email is required");
    res.status(400).json({ error: "Email is required" });
  }
  if(!validator.isEmail(email)){
    throw new Error("Invalid email format");
    res.status(400).json({ error: "Invalid email format" });
  }
  if(validator.isEmpty(String(password))){
    throw new Error("Password is required and must be at least 6 characters long");
    res.status(400).json({ error: "Password is required and must be at least 6 characters long" });
  }
  if(!validator.isLength(String(password),{min:6})){
    throw new Error("Password must be at least 6 characters long");
    res.status(400).json({ error: "Password must be at least 6 characters long" });
  }

  const existingUser = await this.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
    res.status(400).json({ error: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(String(password), salt);
  const user = await this.create({ name,email, password: hashedPassword });
  return user;
};

userSchema.statics.login = async function (email, password) {
  if(validator.isEmpty(email)){
    throw new Error("Email is required");
    res.status(400).json({ error: "Email is required" });
  }
  if(!validator.isEmail(email)){
    throw new Error("Invalid email format");
    res.status(400).json({ error: "Invalid email format" });
  }
  if(validator.isEmpty(password)){
    throw new Error("Password is required");
    res.status(400).json({ error: "Password is required" });
  }
  const exited = await this.findOne({ email });
  if (!exited) {
    throw new Error("User does not exist");
    res.status(400).json({ error: "User does not exist " });
  }
  const match = await bcrypt.compare(String(password), exited.password);
  if (!match) {
    throw new Error("Incorrect password");
    res.status(400).json({ error: "Incorrect password" });
  }
  const token = jwt.sign({ id: exited._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
