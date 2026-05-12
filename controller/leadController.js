const Lead = require("../model/leadmodel");

const leadShow = async (req, res) => {
  try {
    const userid = req.user;
    const leads = await Lead.find({ userid });
    res.status(200).json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLead = async (req, res) => {
  const data = req.body;
  if (!data.name || !data.phone) {
    return res.status(400).json({ error: "Name and phone are required" });
  }
  try {
    const userid = req.user;
    const lead = await Lead.create({ ...data, userid });
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLead = async (req, res) => {
  const { id } = req.params;
  try {
    await Lead.findByIdAndDelete(id);
    res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createLead,
  deleteLead,
  leadShow,
};
