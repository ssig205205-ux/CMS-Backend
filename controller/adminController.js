const User = require("../model/userModel");
const Customer = require("../model/module");
const Lead = require("../model/leadmodel");

const getAllUsers = async (req, res) => {
    try {
        const { Team } = req.admin;
        console.log(Team);
        const users = await User.getUsersWithStats(Team);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllCustomer = async (req,res) =>{
    try {
        const { Team } = req.admin;
        const customers = await Customer.find({Team});
        res.status(200).json(customers)
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

const getAllleads = async (req,res) =>{
     try {
        const { Team } = req.admin;
        const leads = await Lead.find({Team});
        res.status(200).json(leads)
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

const getOneUserData = async (req, res) => {
    try{
        const {id} = req.params;
        const cus = await Customer.find({ userid: id });
        res.status(200).json(cus)
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}

const getOneUserLead = async (req, res) => {
    try{
        const {id} = req.params;
        const cus = await Lead.find({ userid: id });
        res.status(200).json(cus)
    } catch (error){
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getAllUsers,
    getAllCustomer,
    getAllleads,
    getOneUserData, 
    getOneUserLead
};
