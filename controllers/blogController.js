const blogModel = require('../models/blogSchema')

const getBlogPage = (req, res) => {
    const userToken = req.cookies.token
    console.log(userToken)
    let status = false
    if(userToken){
       status = true
    }
    console.log(status)


    blogModel.find()
    .then(results => {
       res.render('blogPage', {title: 'Blog Page', results, status})
    })
    .catch(error => console.log(error.message))
  }

const getCreateBlogPage = (req, res) => {
    const userToken = req.cookies.token
    console.log(userToken)
    let status = false
    if(userToken){
       status = true
    }
    console.log(status)
    res.render('createBlog', {title: 'Create Blog', status})
}


const postCreateBlogPage = (req, res) => {
    try{
     const {blogImage, blogTitle, blogAuthor, blogBody } = req.body
     console.log(blogImage)
         const newBlog = new blogModel({blogImage, blogTitle, blogAuthor, blogBody})
         newBlog.save()
         .then(()=>res.redirect('/'))
         .catch(err => console.log(err))
    }
    catch(err){
      console.error(err)
    }
}


const getSignUpPage = (req, res) => {
    const userToken = req.cookies.token
    console.log(userToken)
    let status = false
    if(userToken){
       status = true
    }
    console.log(status)
    res.render('signup', {title: "SignUp Page", status})
}

const getLoginPage = (req, res) => {
    const userToken = req.cookies.token
    console.log(userToken)
    let status = false
    if(userToken){
       status = true
    }
    console.log(status)
    res.render('login', {title: 'Login Page', status})
}




const getSingleBlog = async (req, res) => {
    const userToken = req.cookies.token
    console.log(userToken)
    let status = false
    if(userToken){
       status = true
    }
    console.log(status)
    const id = req.params.id
    await blogModel.findById(id)
    .then(result => {
        res.render('singleview', {title: 'Single View Blog', result, status})
    })
    .catch(error => console.log(error))
}


const getUpdateBlogForm = async (req, res)=> {
    const userToken = req.cookies.token
    console.log(userToken)
    let status = false
    if(userToken){
       status = true
    }
    console.log(status)
    const id = req.params.id
    await blogModel.findById(id)
    .then(result => {
        res.render('blogUpdate', {title: 'Update Blog Page', result, status})
    })
    .catch(error => console.log(error))
}

const postUpdateBlog = async (req, res) => {
    const id = req.params.id
    await blogModel.findByIdAndUpdate(id, req.body)
    .then(result => {
        res.redirect('/')
    })
    .catch(error => console.log(error))
}



const deleteBlog = async (req, res)=> {
    const id = req.params.id
    await blogModel.findByIdAndDelete(id)
    .then(result => {
        res.json({redirect: '/'})
    })
    .catch(error => console.log(error))
}


module.exports = {getBlogPage, getCreateBlogPage, postCreateBlogPage, getSignUpPage, getLoginPage, getSingleBlog, getUpdateBlogForm, postUpdateBlog, deleteBlog}