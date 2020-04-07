const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');

router.get('/*', (req, res, next) => {

    req.app.locals.layout = 'default';

    next();
});

router.get('/', defaultController.index);

router.get('/login', defaultController.loginGet);
router.post('/login', defaultController.loginPost);

router.get('/register', defaultController.registerGet);
router.post('/register', defaultController.registerPost);

module.exports = router;