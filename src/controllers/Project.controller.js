const ProjectModel = require('../models/Projects.model')
const ObjectId = require("mongoose").Types.ObjectId;





// get all Project

module.exports.readProject = async (req, res) => {
  const Project = await ProjectModel.find().sort({ createdAt: -1 });
  res.status(200).json(Project);
};

// Create a new Project

module.exports.createProject = async (req, res) => {
  const newProject = new ProjectModel({
    name: req.body.name,
    description: req.body.description,
    logo: req.body.logo,
    type: req.body.type,
  
  });
  try {
    const Project = await newProject.save();
    res.status(200).json({ message: "Project created", Project });
  } catch (error) {
    res.status(400).json({ message: "failed to created new Project ", error });
  }
};





// get Project info  by id

module.exports.getProjectInfo = async (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send("ID unknown:" + req.params.id);

  ProjectModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown:" + err);
  })
};

// update Project by id

module.exports.updateProject = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const updateProject = await ProjectModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        
        $set: {
          description: req.body.description,
          name:req.body.name,
          logo:req.body.logo,
          type:req.body.type,

        },
       
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: "Project updated", updateProject });
  } catch (error) {
    res.status(400).json({ message: "failed to update Project ", error });
  }
};

// delete Project by id

module.exports.deleteProject = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).send({ message: "invalid id" });
  }

  try {
    const deleteProject = await ProjectModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Event deleted", deleteProject });
  } catch (error) {
    res.status(400).json({ message: "failed to delete Event ", error });
  }
};
