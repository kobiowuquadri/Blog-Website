const authModel = require('../models/authSchema')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
            jwt.sign({id: user._id}, process.env.JWT_SECRET, {}, (err, token)=> {
              if(err){
                  console.log(err)
                  res.redirect('/')
              }
               else {
                  console.log(token)
                  res.cookie("token", token)
                  res.status(200).redirect('/createBlog')
               }
            })

         }
         else{
            throw Error('Your password is incorrect')
         }
      }
      else{ 
          throw Error('User with this email does not exist')
      }
    }
    catch(err){
      console.error(err)
    }
}


module.exports = {postSignUpPage, postLoginPage}
