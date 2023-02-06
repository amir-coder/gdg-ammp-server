const UserSchema =require('../models/users.model')
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs");



//register

module.exports.register = async (req,res) =>{
    try {

        const { name, Email, password } = req.body;

            //check if this email is already exist on our data  

        const existingUser = await UserSchema.findOne({ Email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
            // hash password of the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserSchema({
          name,
          Email,
          password: hashedPassword,
        });
        await user.save();
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 3600,
        });
        res.status(200).json({
          token,
          user: {
            id: user._id,
            name: user.name,
            Email: user.Email,
          },
        });
      } catch (error) {
        console.error(error.message);
        res.status(500).json("Server error");
    }
    

}

// Login 


module.exports.Login = async (req,res)=>{

    try {
        const { Email, password } = req.body;


        const user = await UserSchema.findOne({ Email });

        if (!user) {
          return res.status(400).json({ msg: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: 3600,
        });
        res.status(200).json({
          token,
          user: {
            id: user._id,
            name: user.name,
            Email: user.Email,
          },
        });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
      }
}