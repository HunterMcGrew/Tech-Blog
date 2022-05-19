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
    let postData = await Post.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: User,
        attributes: { exclude: ["password"]},
      }],
    });
    const post = postData.get({ plain: true })
    res.render("single-post", {
      layout: "main",
      post,
    });

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
