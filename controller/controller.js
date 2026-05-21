const Customer = require("../model/module");
const User = require("../model/userModel");

const sendData = async (req, res) => {
  try {
    const {userId, Team} = req.user;
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
    const {userId, Team , name, UserType} = req.user;
    console.log(userId, Team , name, UserType);
    let userName;
    let userID;
    if(UserType === "admin"){ 
      userName = data.userName;
      const { _id } = await User.findOne({ name: data.userName});
      if(!_id){
        return res.status(400).json({ error: "User not found" });
      }
      userID = _id;
    } else {
      userName = name;
      userID = userId;
    }
    await Customer.create({ ...data, userid: userID , Team, userName: name });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const sendOneData = async (req, res) => {
  try {
    const {id,UserId} = await req.params;
    console.log(id,UserId)
    const {userId, Team, UserType} = req.user;
    if(UserType==="admin"){
      const data = await Customer.findOne({ _id: id, userid: UserId });
      res.status(200).json(data);
    } else {
    const data = await Customer.findOne({ _id: id });
    res.status(200).json(data);
    }
    
  } catch (error) {
    res.status(400).json({ error:error.message });
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
    const { id } = req.params;
    const data = req.body;

    const { userId, Team, name, UserType } = req.user;

    let userID;
    let userName;

    if (UserType === "admin") {

      const user = await User.findOne({
        name: data.userName,
      });

      if (!user) {
        return res.status(400).json({
          error: "User not found",
        });
      }

      userID = user._id;
      userName = data.userName;

    } else {

      userID = userId;
      userName = name;
    }

    const data2 = await Customer.findByIdAndUpdate(
      id,
      {
        ...data,
        userid: userID,
        Team,
        userName,
      },
      { new: true } // IMPORTANT
    );

    return res.status(200).json(data2);

  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  sendData,
  getData,
  deleData,
  updateData,
  sendOneData,
};
