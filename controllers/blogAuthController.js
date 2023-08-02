const authModel = require('../models/authSchema')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const handleErrors = (err) => {
   let errors = {email:"", password: ""}
   if(err.message === "incorrect password"){
    errors.password = "Kindly enter a correct password"
    return errors
   }
   if(err.message === "incorrect email"){
    errors.email = "Invalid email address"
    return errors
   }
   return errors
}


const postSignUpPage = async (req, res) => {
    try{
       const {email, password} = req.body
       console.log(password)
       const salt = await bcrypt.genSalt()
       const newPassword = await bcrypt.hash(password, salt)
       const newData = new authModel({email, password:newPassword})
       newData.save()
       .then(result => {
        console.log(result)
        res.status(201).redirect('/login')
       })
       .catch(e => console.log(e))
    }
    catch(err){
       console.error(err) 
    }
}

const postLoginPage = async (req, res) => {
    try{
      const {email, password} = req.body
      console.log(email, password)
      const user = await authModel.findOne({email})
      console.log(user)
      if(user){
         const isPassword = await bcrypt.compareSync(password, user.password)
         if(isPassword){
           await jwt.sign({id: user._id}, process.env.JWT_SECRET, {}, (err, token)=> {
              if(err){
                  console.log(err)
                  res.redirect('/createBlog')
              }
               else {
                  console.log(token)
                  res.cookie("token", token)
                  res.status(200).json({user})
               }
            })

         }
         else{
            throw Error('incorrect password')
         }
      }
      else{ 
          throw Error('incorrect email')
      }
    }
    catch(err){
      console.log(err)
      const errors = handleErrors(err)
      res.status(400).json({error: errors})
    }
}

const logout = async (req, res) => {
   res.cookie("token"), "", {maxAge: 0}
   res.redirect('/login')
}


module.exports = {postSignUpPage, postLoginPage, logout}
