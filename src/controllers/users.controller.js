const user =require('../models/users.model')
const ObjectId = require("mongoose").Types.ObjectId;


//get all users

module.exports.getAllUsers = async (req, res) => {
    const users = await user.find().select("-Password").populate("roles");
    res.status(200).json( users );
};

//get user by id

module.exports.getUserID = async (req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown:" + req.params.id)
    user.findById(req.params.id , (err,docs)=>{
        if (!err) res.send(docs);
        else console.log("ID unknown:" + err);
    }).select("-Password").populate("roles")
}


// update user
module.exports.updateUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown:" + req.params.id);
  
    try {
      const updateUser = await user.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            Email: req.body.Email,
          },
          $set: {
            UserName: req.body.UserName,
          },
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
  
      res.status(200).json({ message: "user update successfully", updateUser });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };
  
  // delete user by id
  
  module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send("ID unknown:" + req.params.id);
  
    try {
      await user.deleteOne({ _id: req.params.id }).exec();
      res.status(200).send({ message: "user deleted" });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  };