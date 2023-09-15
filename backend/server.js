const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyparser = require('body-parser')

dotenv.config()

const app = express()

const port = process.env.PORT || 4000


/* The code `app.use(function (req, res, next) { ... })` is a middleware function that sets the
necessary headers for enabling Cross-Origin Resource Sharing (CORS) in the Express application. */
// if you not add this lines of code, all permission will be accessed
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

/* When a request with a JSON body is received, 
this middleware parses the JSON data and makes it available in req.body for further processing */
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))

/* By calling cors(), you enable CORS support in your Express app, 
allowing it to respond to cross-origin requests from web pages hosted on different domains. */
app.use(cors())

// route
const userRoutes = require('./routes/usersRoute')

app.use('/user', userRoutes)

// server

app.set('port', port)

const server = app.listen(port, ()=> {
    console.log(`server running on port number ${port}`)
})