const Post = require('../models/PostModel');

module.exports = {
    index: (req, res) => {
        res.render('admin/index');
    },
    getPosts: (req, res) => {
        Post.find().lean().then(posts => {
            res.render('admin/posts/index', { posts: posts });
        });
    },
    submitPost: (req, res) => {

        const commentsAllowed = req.body.allowComments ? true : false;

        const newPost = new Post({
            title: req.body.title,
            status: req.body.status,
            description: req.body.description,
            allowComments: commentsAllowed
        });

        newPost.save().then(post => {
            req.flash('success-message', 'Post created successfully!');
            res.redirect('/admin/posts');
        });
    },
    createPost: (req, res) => {
        res.render('admin/posts/create');
    },
    editPost: (req, res) => {
        const id = req.params.id;

        Post.findById(id).lean().then(post => {
            res.render('admin/posts/edit', { post: post });
        });
    },
    deletePost: (req, res) => {
        Post.findByIdAndDelete(req.params.id).then(deletedPost => {
            req.flash('success-message', `Post '${deletedPost.title}' has been deleted successfully!`);
            res.redirect('/admin/posts');
        });
    }
}