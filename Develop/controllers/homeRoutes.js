const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      order: [['name', 'ASC']],
      include: [
        {
            model: User,
            attributes: ['id', 'name']
        },
      ]
    });

    console.log(blogData);

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {

    const userBlogs = await Blog.findAll({ 
      where: { user_id: 2 },
      order: [['name', 'ASC']], 
    });

    const myBlogs = userBlogs.map((blog) => blog.get({ plain: true }));

    res.render('dashboard', {
      myBlogs,
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
