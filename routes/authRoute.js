const express = require('express')
const authRouter = express.Router()
const {postSignUpPage, postLoginPage} = require('../controllers/blogAuthController')

authRouter.post('/signup', postSignUpPage)

// login post
authRouter.post('/login', postLoginPage)

module.exports = authRouter