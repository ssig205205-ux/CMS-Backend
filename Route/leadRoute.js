const express = require("express");
const leadRouter = express.Router();
const {leadShow,createLead,deleteLead} = require("../controller/leadController");


leadRouter.route("/").get(leadShow).post(createLead);
leadRouter.route("/:id").delete(deleteLead);

module.exports = leadRouter;