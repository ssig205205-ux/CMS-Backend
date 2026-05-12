const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  userid:{
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
  },
});

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;
