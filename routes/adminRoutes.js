const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';

    next();
});

router.get('/', adminController.index);

router.get('/posts', adminController.getPosts);

router.get('/posts/create', adminController.createPost);
router.post('/posts/create', adminController.submitPost);

router.get('/posts/edit/:id', adminController.editPost);

router.delete('/posts/delete/:id', adminController.deletePost);

module.exports = router;