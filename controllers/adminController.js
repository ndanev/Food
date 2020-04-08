const Post = require('../models/PostModel');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },
    getPosts: (req, res) => {
        Post.find().lean().then(posts => {
            // console.log(posts);
            res.render('admin/posts/index', { posts: posts });
        });
    },
    submitPost: (req, res) => {
        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.description
        });

        newPost.save().then(post => {
            // console.log(post);
            req.flash('success-message', 'Post created successfully');
            res.redirect('/admin/posts');
        });
    },
    createPost: (req, res) => {
        res.render('admin/posts/create');
    }
}