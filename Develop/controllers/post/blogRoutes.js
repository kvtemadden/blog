const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');
const fs = require("fs");
const { Console } = require('console');


router.get('/new', async (req, res) => {
  try {
    res.render('newpost');
  }
  catch (err) {
    res.status(400).json(err);
  }
});

router.get('/edit/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id);
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    const blog = blogData.get({ plain: true });
    res.render('editpost', {
      blog,
      logged_in: req.session.logged_in,
    });
  }
  catch (err) {
    res.status(400).json(err);
  }
});


router.post('/new', withAuth, async (req, res) => {
  try {
    console.log(req);
    const newBlog = await Blog.create({
      name: req.body.name,
      description: req.body.description,
      user_id: req.session.user_id,
    });

    updateFilename(newBlog);
    const filename = newBlog.id;
    const writeFile = req.body.text;

    writeToFile(writeFile, filename);

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

router.delete('/edit/:id', withAuth, async (req, res) => {
  try {

    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    console.log(req);
    const blogData = await Blog.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    blogData.description = req.body.description;
    const writeFile = req.body.text;
    const filename = req.body.filename;

    writeToFile(writeFile, filename);

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    blogData.name = req.body.name;
    res.status(200).json(blogData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Comment,
        attributes: ['id', 'text', 'blog_id', 'user_id', 'date_created'],
        include: {
           model: User,
           attributes: ['name']
      }
    },
    {   model: User,
        attributes: ['name']
    }
    ],
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    const blog = blogData.get({ plain: true });

    res.render('blog', {
      blog,
      logged_in: req.session.logged_in,
    });

    // res.status(200).json(blogData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      text: req.body.text,
      user_id: req.session.user_id,
      blog_id: req.body.id,
    });

    console.log(req.session.user_id);

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);

  }
});

function writeToFile(post, filename) {
  fs.writeFile(`${__dirname}/views/partials/${filename}.handlebars`, post, (err) =>
    err ? console.error(err) : console.log('New post added successfully!'));
};

updateFilename = async (blog) => {

  const updatedFilename = blog.id;
  try {
    const getBlog = await Blog.findByPk(blog.id)

    if (getBlog) {
      getBlog.update({
        filename: updatedFilename,
      })

    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = router;
