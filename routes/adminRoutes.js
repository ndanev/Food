const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { isUserAuthenticated } = require('../config/customFunctions');

router.get('/*', isUserAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', adminController.index);

router.get('/posts', adminController.getPosts);

router.get('/posts/create', adminController.createPost);
router.post('/posts/create', adminController.submitPost);

router.get('/posts/edit/:id', adminController.editPost);
router.put('/posts/edit/:id', adminController.editPostSubmit);

router.delete('/posts/delete/:id', adminController.deletePost);

router.get('/category', adminController.getCategories);
router.post('/category', adminController.createCategories);

router.get('/category/edit/:id', adminController.editCategoriesGetRoute);
router.post('/category/edit/:id', adminController.editCategoriesPostRoute);

router.get('/comment', adminController.getComments);

module.exports = router;