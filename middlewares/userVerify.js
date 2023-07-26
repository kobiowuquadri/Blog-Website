// Middleware to check if the user is the blog author
const checkBlogOwnership = async (req, res, next) => {
    try {
      if (req.isAuthenticated() && req.user._id.equals(blog.author._id)) {
        // User is the author of the blog
        res.locals.isBlogOwner = true;
      } else {
        // User is not the author
        res.locals.isBlogOwner = false;
      }
      next();
    } catch (err) {
      // Handle error
      next(err);
    }
  };