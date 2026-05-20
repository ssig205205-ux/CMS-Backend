const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema({
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  Team: {
    type: String,
    default: "none"
  }

});

const Lead = mongoose.model("Lead", leadSchema);
module.exports = Lead;
