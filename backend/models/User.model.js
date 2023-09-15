const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type : String,
        require : true,
        unique: true
    },
    firstname : {
        type : String,
        require : true
    },
    lastname : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique: true,
        match: /^\S+@\S+\.\S+$/ // Matches a basic email pattern
    },
    password : {
        type : String,
        require : true
    },
    phoneno : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model('Users',userSchema)