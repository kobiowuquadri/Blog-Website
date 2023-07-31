const express = require('express')
const authRouter = express.Router()
const {postSignUpPage, postLoginPage, logout} = require('../controllers/blogAuthController')

authRouter.post('/signup', postSignUpPage)

// login post
authRouter.post('/login', postLoginPage)

authRouter.get('/logout', logout)

module.exports = authRouter