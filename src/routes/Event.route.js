const router = require('express').Router()
const EventController =require('../controllers/Events.controllers')



// create new project 

router.post('/createEvent',EventController.createEvents)

// get all events

router.get('/getAllEvents',EventController.readEvents)

// get event by id 

router.get('/getEvent/:id',EventController.getEventInfo)

// update Event by Id 

router.put('/update/:id',EventController.updateEvent)

//delete Event by id 

 router.delete('/:id',EventController.deleteEvent)
module.exports = router