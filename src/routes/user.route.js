const router =require('express').Router()
const UserController = require('../controllers/users.controller')



// get all users

router.get('/getallUsers',UserController.getAllUsers)


//get user by id

router.get('/getSetUser/:id',UserController.getUserID)


// delete user 

router.delete('/deleteUser/:id',UserController.deleteUser)

// update user by id 

router.put('/update/:id',UserController.updateUser)







module.exports = router

