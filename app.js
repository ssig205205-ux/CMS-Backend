const express = require("express");
const app = express();
const route = require("./Route/route");
const authRoute = require("./Route/Login&Sigin")
const leadRoute = require("./Route/leadRoute")
const mongoose = require("mongoose");
const cors = require("cors");
const authMiddleWare = require("./middleWare/userAuth");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 5000
const URL = process.env.URL

app.use(cookieParser());
app.use(cors({
   origin: [
        "http://localhost:5173",
        "https://pcms-c16pms85o-min-thu-kyaw-s-projects.vercel.app",
        "https://pcms-liart.vercel.app"
    ],
  credentials: true
}));


app.use(express.json());


app.use("/api/user", authRoute)
app.use(authMiddleWare);
app.use("/api/user", route);
app.use("/api/lead", leadRoute)

async function start() {
  try {
    await mongoose.connect(URL);


    app.listen(PORT, () => {
      console.log(`server is running on localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
