const mongoose = require('mongoose')

// schema 
const blogSchema = new mongoose.Schema({
    blogImage: {
        type:String,
        required: true
    },
    blogTitle: {
        type: String,
        required: true
    },
    blogAuthor: {
        type: String,
        required: true
    },
    blogBody: {
        type: String,
        required: true
    }
})

// model
const blogModel = mongoose.model('blogmodel', blogSchema)

module.exports = blogModel