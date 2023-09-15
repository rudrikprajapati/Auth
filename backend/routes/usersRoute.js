const express = require('express')
const router = express.Router()

const userController = require('../contoller/user.Controller')

// create user
// sugnup user
// post request
router.post('/signup', userController.signupUser)


// read user
// signin user
// get request
router.post('/signin', userController.signinUser)

// update user
// put request

// delete user
// delete req

module.exports = router