const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
require('./database/database')
const router = require('./routes/blogRoute')
const authRouter = require('./routes/authRoute')
const port = 3033

app.listen(port, () => console.log(`Server Connected at Port ${port}`))

// Middlewares
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/img', express.static(__dirname + '/public/img'))
app.use(methodOverride('_method'))
app.use(router)
app.use(authRouter)

app.all('*', (req, res) => {
    res.send('ERROR 404, PAGE NOT FOUND!!! 😑😑😑')
})