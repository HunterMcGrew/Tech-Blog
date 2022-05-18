const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      order: [
        ["id", "DESC"]
      ],
      include: [{
        model: User,
      }]
    });
  const posts = postData.map((post) => post.get({ plain: true }));
  res.render("all-posts", {
    layout: "main",
    posts,
  });

} catch (err) {
  if (err) throw err;
}

});

// get single post
router.get('/post/:id', async (req, res) => {
  try {
    let postData = await Post.findByPk({
      where: {
        id: req.params.id
      }
    });
    res.render("single-post");

  } catch (err) {
    if (err) throw err;
  }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
