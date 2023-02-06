const router =require('express').Router()
const authController = require('../controllers/auth.controllers')



//register route


router.post('/register',authController.register)



// login route

router.post('/Login',authController.Login)



module.exports = router