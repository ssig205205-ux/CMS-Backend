const { sendData, getData, deleData,updateData,sendOneData } = require("../controller/controller");
const { signUp, login } = require("../controller/userController");
const express = require("express");
const Router = express.Router();

Router.route("/").get(sendData).post(getData);
Router.route("/:id").delete(deleData).put(updateData).get(sendOneData);


module.exports = Router;
