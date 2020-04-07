const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/*', (req, res, next) => {

    req.app.locals.layout = 'admin';

    next();
});

router.get('/', adminController.index);

router.get('/posts', adminController.getPosts);
router.post('/posts', adminController.submitPost);

router.get('/posts/create', adminController.createPost);

module.exports = router;