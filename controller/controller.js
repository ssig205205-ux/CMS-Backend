const Customer = require("../model/module");

const sendData = async (req, res) => {
  try {
    const userId = req.user;
    const user = await Customer.find({ userid: userId });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const getData = async (req, res) => {
  try {
    const data = req.body;
    const userId = req.user;
    console.log(userId)
    await Customer.create({ ...data, userid: userId });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const sendOneData = async (req, res) => {
  try {
    const {id} = await req.params;
    const userId = req.user;
    const data = await Customer.findOne({ _id: id, userid: userId });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
}

const deleData = async (req, res) => {
  try {
    const { id } = await req.params;
    await Customer.findByIdAndDelete(id);
    res.status(200).json({ message: "Data deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};



const updateData = async (req, res) => {
  try {
    const { id } = await req.params;
    const userId = req.user;
    const data = await req.body;
    await Customer.findByIdAndUpdate(id, { ...data, userid: userId });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  sendData,
  getData,
  deleData,
  updateData,
  sendOneData,
};
