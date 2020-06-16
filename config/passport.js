var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local');
var validate = require('express-validator');


passport.serializeUser(function (user,done) {
    done(null, user.id);
});

passport.deserializeUser(function (id,done) {
    User.findById(id,function (err,user) {
        done(err,user);
    })
});

passport.use('local.signup',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',

    passReqToCallback: true
},function (req,email,password,done) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var contactNo = req.body.contact_no;

    req.checkBody('email','email field should not leave empty').notEmpty;
    req.checkBody('email','enter valid email address').isEmail;
    req.checkBody('password','dont leave password field empty').notEmpty;
    req.checkBody('password','Please enter valid pass of minimum lenght of 4').isLength({min:4});
    var errors = req.validationErrors();
    if (errors){
        var messages = [];
        errors.forEach(function (error) {
            messages.push(error.msg);
        });
        return done(null,false,req.flash('error',messages));
    }
    User.findOne({'email':email},function (err,user) {
        if(err){
            return done(err);
        }
        if(user){
            return done(null,false,{message: 'There is already any account on this email'});
        }
        var newuser = new User();
        newuser.firstName = firstName;
         newuser.lastName = lastName;
         newuser.email = email
         newuser.password = newuser.encryptPassword(password);
         newuser.contactNo = contactNo;
         newuser.save(function (err,result) {
             if(err){
                 return done(err);
             }
             return done(null, newuser )
         });
    });
}));

passport.use('local.signin',new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function (req,email,password,done){
    req.checkBody('email','Please enter valid email id').notEmpty;//.isEmail();
    // req.checkBody('password','Please enter valid pass of minimum lenght of 4').notEmpty.isLength({min:4});
    // var errors = req.validationErrors();
    // if (errors){
    //     var messages = [];
    //     errors.forEach(function (error) {
    //         messages.push(error.msg);
    //     });
    //     return done(null,false,req.flash('error',messages));
    // }
    User.findOne({'email':email},function (err,user) {
        if(err){
            return done(err);
        }
        if(!user){
            return done(null,false,{message: 'Invalid User'});
        }
        if(!user.validPassword(password)){
            return done(null,false,{message: 'Invalid Password'})
        }
        return done(null, user );
    });
}));
