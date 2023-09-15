const UserSchema = require('../models/User.model')
const responses = require('../utils/responses')
const bcrypt = require('bcrypt')
const users = require('../DB/users')

exports.signupUser = async (req, res) => {
    let user;
    // console.log(req.body)
    // console.log(users.length)
    const { username, firstname, lastname, email, password, phoneno } = req.body
    try {
        // Ensure that req.body.password contains a valid password string
        if (!req.body.password) {
            return responses.sendResponse("password is missing", res, 500)
        }

        user = new UserSchema({
            username : username,
            firstname : firstname,
            lastname : lastname,
            email : email,
            password : password,
            phoneno : phoneno
        })

        let userByName = users.find((User) => User.username === username)
        let userByEmail =users.find((User) => User.email === email)

        if(userByName) {
            return responses.sendResponse("user with given name is already exist!!!", res, 400)
        }

        if(userByEmail) {
            return responses.sendResponse("user with given email is already is already exist!!!!", res, 400)
        }


        const salt = await bcrypt.genSalt(10)
        // console.log(salt)
        if (!salt) {
            return responses.sendResponse("Error generating salt!!!", res, 500)
        }

        const hashed_password = await bcrypt.hash(req.body.password, salt);
        // console.log(hashed_password)
        if (!hashed_password) {
            return responses.sendResponse("Error hashing password!!!", res, 500)
        }

        req.body.password = hashed_password
        user.password = hashed_password

        if(!user) {
            return responses.sendResponse("Error while creating user", res, 500)
        }
        users.push(req.body)
        // return res.redirect('/login')
        // console.log(users.length)
        return responses.sendResponse("Record created successfully...", res, 201)
    } catch(error) {
        console.log(error)
        return responses.serverErrorResponse(res)
    }
}

exports.signinUser = async (req, res) => {
    // console.log(req.body)
    const { usernameOrEmail , password } = req.body

    try {
        const user = users.find((User) => User.username === usernameOrEmail || User.email === usernameOrEmail)
        // console.log(user)

        if(!user) {
            return responses.sendResponse("Authentication failed! No such user exist!", res, 400)
        }

        const ok = await bcrypt.compare(password, user.password)

        if(ok) {
            return responses.sendResponse(user, res, 200)
        }
        else {
            return responses.sendResponse("invalid password!!!", res, 401)
        }
    } catch(error) {
        return responses.sendResponse(error, res, 500)
    }
}