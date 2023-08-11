const express = require('express')
const router = express.Router()
const {getBlogPage, getCreateBlogPage, postCreateBlogPage, getSignUpPage, getLoginPage, getSingleBlog, getUpdateBlogForm, postUpdateBlog, deleteBlog} = require('../controllers/blogController')
const { storage } = require("../storage/storage")
const multer = require('multer')
const upload = multer({storage})

// Home
// blog submission
router.get('/', getBlogPage)

router.get('/createBlog', getCreateBlogPage,)

router.get('/signup', getSignUpPage)

router.get('/login', getLoginPage)

router.post('/blogSubmission', upload.single('blogImage'), postCreateBlogPage)

router.get('/single-blog/:id',  getSingleBlog)

router.get('/blog-update/:id', getUpdateBlogForm )

router.put('/update-blog/:id', postUpdateBlog)

router.delete('/delete-blog/:id', deleteBlog)


module.exports = router