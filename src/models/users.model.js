const mongoose = require("mongoose");

const user = mongoose.model(
  "users",
  new mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    FamilyName:{
      type:String,
      require:true
    },
    UserName:{
      type:String,
      require:true
    },
    Email:{
      type:String,
      require:true,
      unique:true
    },
    password:{
      type:String,
      require:true

    },
    Date_of_join_GDG:{
      type:String,
      require:true
    },

    //add user infos
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "roles",
      },
    ],
  })
);

module.exports = user;