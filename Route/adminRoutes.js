const express = require("express");
const adminRouter = express.Router();
const {  getAllUsers,getAllCustomer,getAllleads,getOneUserData,getOneUserLead } = require("../controller/adminController");


adminRouter.route("/").get(getAllUsers);
adminRouter.route("/customers").get(getAllCustomer);
adminRouter.route("/leads").get(getAllleads);
adminRouter.route("/cus/:id").get(getOneUserData);
adminRouter.route("/lead/:id").get(getOneUserLead);

module.exports = adminRouter;