var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile',isLoggedIn,  function (req, res, next) {
    res.render('user/profile');
});


router.get('/signup',function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup',{csrfToken: req.csrfToken, messaging: messages, hasErrors: messages.length > 0});
});

router.get('/signin',function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin',{csrfToken: req.csrfToken,messaging: messages, hasErrors: messages.length > 0});
});



router.post('/signup',passport.authenticate('local.signup',{
    successRedirect: '/oComp/ThankFeed',
    failureRedirect: '/user/signup',
    failureFlash: true
}) );


router.post('/signin',passport.authenticate('local.signin',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}) );



router.get('/logout', isLoggedIn,function (req,res,next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else if(req.isUnauthenticated()) {
        res.redirect('/');
    }

    res.redirect('/');
}

