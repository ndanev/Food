const Post = require('../models/PostModel');
const Category = require('../models/CategoryModel');
const User = require('../models/UserModel');
const Comment = require('../models/CommentModel');
const bcrypt = require('bcryptjs');

module.exports = {
    index: async (req, res) => {
        const posts = await Post.find().lean();
        const categories = await Category.find().lean();
        res.render('default/index', { posts: posts, categories: categories });
    },
    loginGet: (req, res) => {
        res.render('default/login');
    },
    loginPost: (req, res) => {
        res.send('Congrass you are logged in!')
    },
    registerGet: (req, res) => {
        res.render('default/register');
    },
    registerPost: (req, res) => {

        let errors = [];

        if (!req.body.firstName) {
            errors.push({ message: 'First name is required!' });
        }

        if (!req.body.lastName) {
            errors.push({ message: 'Last name is required!' });
        }

        if (!req.body.email) {
            errors.push({ message: 'Email is required!' });
        }

        if (req.body.password !== req.body.passwordConfirm) {
            errors.push({ message: 'Passwords are not matched!' });
        }

        if (errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        }

        else {
            User.findOne({ email: req.body.email }).then(user => {
                if (user) {
                    req.flash('error-message', 'Email already exists, try to login.');
                    res.redirect('/login');
                } else {
                    const newUser = new User(req.body);
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;

                            newUser.save().then(user => {
                                req.flash('success-message', 'You are now registerd.');
                                res.redirect('/login');
                            });
                        });
                    });
                }
            });
        }
    },
    aboutGet: (req, res) => {
        res.render('default/about');
    },
    faqGet: (req, res) => {
        res.render('default/faq');
    },
    getSinglePost: (req, res) => {
        const id = req.params.id;

        Post.findById(id).lean().populate({ path: 'comments', populated: { path: 'user', model: 'user' } }).then(post => {
            if (!post) {
                res.status(404).json({ message: 'Blog is not found' });
            } else {
                res.render('default/singlePost', { post: post, comments: post.comments });
            }
        });
    },
    submitComment: (req, res) => {
        if (req.user) {
            Post.findById(req.body.id).then(post => {
                const newComment = new Comment({
                    user: req.user.id,
                    body: req.body.comment_body
                });


                post.comments.push(newComment);

                post.save().then(savedPost => {
                    newComment.save().then(savedComment => {
                        console.log(req.user);
                        req.flash('success-message', 'Your comment has been submitted for review!');
                        res.redirect(`/post/${post._id}`);
                    });
                });

            });
        }

        else {
            req.flash('error-message', 'Login first to comment');
            res.redirect('/login');
        }
    }
}