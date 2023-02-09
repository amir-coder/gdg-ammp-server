const router = require('express').Router()
const ProjectController =require('../controllers/Project.controller')
// create new project 

router.post('/createProject',ProjectController.createProject);

// get all Projects

router.get('/getAllProjects',ProjectController.readProject)

// get Project by id 

router.get('/getProject/:id',ProjectController.getProjectInfo)

// update Project by Id 

router.put('/update/:id',ProjectController.updateProject)

//delete Project by id 

router.delete('/:id',ProjectController.deleteProject)

 
module.exports = router