const mongoose = require("mongoose");

const Projects = mongoose.model(
  "Projects",
  new mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    description:{
      type:String,
      require:true
    },
    logo:{
      type:String,
      require:true 
    },
    type:{
      type:String,
      require:true,
     
    },
   
  })
);

module.exports = Projects;