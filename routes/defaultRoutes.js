const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/defaultController');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel');

router.get('/*', (req, res, next) => {

    req.app.locals.layout = 'default';

    next();
});

router.get('/', defaultController.index);


passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true,


}, (req, email, password, done) => {
    User.findOne({ email: email }).then(user => {
        if (!user) {
            return done(null, false, req.flash('error-message', 'User not found with this email'));
        }

        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if (err) {
                return err;
            }

            if (!passwordMatched) {
                return done(null, false, req.flash('error-message', 'Invalid username or password.'));
            }

            return done(null, user, req.flash('success-message', 'Loggedin Successfully!'));
        });
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

router.get('/login', defaultController.loginGet);
router.post('/login', passport.authenticate('local', { successRedirect: '/admin', failureRedirect: '/login', failureFlash: true, successFlash: true, session: true }), defaultController.loginPost);

router.get('/register', defaultController.registerGet);
router.post('/register', defaultController.registerPost);

router.get('/about', defaultController.aboutGet);

router.get('/faq', defaultController.faqGet);

module.exports = router;