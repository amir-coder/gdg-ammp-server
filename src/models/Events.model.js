const mongoose = require("mongoose");

const events = mongoose.model(
  "events",
  new mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    description:{
      type:String,
      require:true
    },
    GlobalStatistics:{
      type:String,
      require:true
    },
    Organisation:{
      type:String,
      require:true,
    },
   
  })
);

module.exports = events;