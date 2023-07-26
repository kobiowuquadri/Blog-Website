const mongoose = require('mongoose')

// schema 
const authSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// model

const authModel = mongoose.model('authmodel', authSchema)

module.exports = authModel