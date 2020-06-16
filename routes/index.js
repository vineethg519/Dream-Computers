var express = require('express');
var router = express.Router();
var mongo = require('mongoose');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var csrf = require('csurf');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');
var Cart = require('../models/cart');
var Product = require('../models/product');

router.get('/user/signup',function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup',{ messaging: messages, hasErrors: messages.length > 0});
});

router.get('/user/signin',function (req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin',{messaging: messages, hasErrors: messages.length > 0});
});

router.get('/user/profile',isLoggedIn,  function (req, res, next) {
    var userChunks = [];
    var chunchsize = 3;

    User.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            userChunks.push(docs.slice(i,i + chunchsize))
        }
    });
    var procChunk = [];
    Product.procType.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.motherB.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.ram.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.graphics.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.psu.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.hdd.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    res.render('user/profile',{users: userChunks,processor: procChunk});
});


router.post('/user/signup',passport.authenticate('local.signup',{
    successRedirect: '/oComp/ThankFeed',
    failureRedirect: '/user/signup',
    failureFlash: true
}) );


router.post('/user/signin',passport.authenticate('local.signin',{
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}) );


router.get('/user/logout', isLoggedIn,function (req,res,next) {
    req.logout();
    res.redirect('/');
});




var url = 'localhost:27017/shopping';

router.post('/productsAdd',function (req, res, next) {
    var newItem = new Product.hdd({
        name: req.body.name,
        brand: req.body.brand,
        model: req.body.model,
        price: req.body.price
    });

    var insert = function (db, callback) {
        db.collection('rams').insertOne(newItem,function (err, result) {
            assert.equal(err,null);

            callback;
        });
    };
    MongoClient.connect(url,function (err, db) {
        assert.equal(null,err);
        insert(db,function () {
            console.log('added into ramss');
            db.close();
        });
    });
    res.redirect('/user/signin');
});

router.get('/admin/updateProduct/:id',function (req, res, next) {
    var prodId = req.params.id;

    Product.procType.findById(prodId,function (err, result) {
        if(err){
            return res.redirect('/');
        }
        console.log(result);
        res.render('admin/updateProduct',{result:result});
    });


});

router.post('/updateProd/:id',function (req, res, next) {
    console.log(req.params.id);
    console.log('another'    );
    console.log(req.body.name);
    var updateableid = req.params.id;
    console.log(updateableid);
    var nameB = req.body.name;
    var brandB = req.body.brand;
    var modelB = req.body.model;
    var priceB = req.body.price;

    var updateProd = function (db, callback) {
        var collection = db.collection('processortypes');
        collection.updateOne({_id:updateableid},{$set:
            { name : nameB, brand: brandB, model:modelB, price: priceB }
        },function (err, result) {
            assert.equal(err,null);
            console.log('updated');
            callback();
        });
    };
    MongoClient.connect(url,function (err, db) {
        assert.equal(null,err);
        updateProd(db,function () {
            console.log('deleted ');
            db.close();
            res.redirect('admin/profile');
        });
    });
});

router.get('/admin/delete_product/:id',function (req, res, next) {
    var prodId = req.params.id;
    var deleteDoc = function (db, callback) {
        var collection = db.collection('processortypes');
        collection.deleteOne({_id:prodId},function (err, result) {
             assert.equal(err,null);
            console.log('removed ');
            callback();
        });
    };

    MongoClient.connect(url,function (err, db) {
        assert.equal(null,err);
        deleteDoc(db,function () {
            console.log('deleted ');
            db.close();
        });
    });

   res.render('admin/delete_product');
});

router.post('/admin/addUser',function (req, res, next) {
    var item = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password: req.body.password,
        contactNo: req.body.contact_no
     });

    var insertNew = function (db,callback) {
        db.collection('users').insertOne(item,function (err, result) {
            assert.equal(err,null);
            console.log('adding users');
            callback();
        });
    };

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertNew(db,function () {
            console.log('ausers added');
            db.close();
            res.render('user/signin');
        });
    });
});

router.get('/admin/delete_user/:id',function (req, res, next) {

    var delId = req.params.id;

    var deleteDoc = function (db, callback) {
        var collection = db.collection('users');
        collection.deleteOne({_id:delId},function (err, result) {
            assert.equal(err,null);
            console.log('removed ');
            callback();
        });
    };

    MongoClient.connect(url,function (err, db) {
        assert.equal(null,err);
        deleteDoc(db,function () {
            console.log('deleted ');
            db.close();
        });
    });
    res.render('user/signin');

});
/* GET home page. */
router.get('/', function(req, res, next) {

  Product.lapi.find(function (err, docs) {
    var prodductChuncks = [];
    var chunchsize = 3;
    for(var i = 0; i<docs.length;i+=chunchsize){
      prodductChuncks.push(docs.slice(i,i + chunchsize))
    }
      res.render('shop/index', { title: 'Shopping Cart', product: prodductChuncks });
  });
});
router.post('/admin/profile',function (req, res, next) {
    var userChunks = [];
    var chunchsize = 3;

    User.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            userChunks.push(docs.slice(i,i + chunchsize))
        }
    });
    var procChunk = [];
    Product.procType.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.motherB.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.ram.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.graphics.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.psu.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    Product.hdd.find(function (err, docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            procChunk.push(docs.slice(i,i + chunchsize))
        }
    });

    res.render('admin/profile',{users: userChunks,processor: procChunk});
})
router.get('/shop/recRigs',function (req, res, next) {
    var entryChuncks = [];
    var greatChuncks = [];
    var gameChuncks = [];
    var chunchsize = 3;
    Product.entryRigs.find(function (err,docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            entryChuncks.push(docs.slice(i,i + chunchsize))
        }
    });
    Product.greatRigs.find(function (err,docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            greatChuncks.push(docs.slice(i,i + chunchsize))
        }
    });
    Product.gameRigs.find(function (err,docs) {
        for(var i = 0; i<docs.length;i+=chunchsize){
            gameChuncks.push(docs.slice(i,i + chunchsize))
        }
    });
    res.render('shop/recRigs',{entryItems: entryChuncks, greatItems: greatChuncks, gameItems: gameChuncks});
});

router.get('/addProduct/:id',function (req, res, next) {
    var proId = req.params.id;
    var cart = new Cart(req.session.cart? req.session.cart : {});

    Product.lapi.findById(proId,function (err, product) {
      if(err){
        return res.redirect('/');
      }
      cart.add(product,product.id);

        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/addrigs/:id',function (req, res, next) {
    var itemId = req.params.id;
    var cart = new Cart(req.session.cart? req.session.cart : {});

    Product.entryRigs.findById(itemId,function (err, entryRigItem) {
        if(err){
            return res.redirect('/shop/recRigs');
        }
        cart.add(entryRigItem,entryRigItem.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop/recRigs');
    });


});

router.get('/addgreat/:id',function (req, res, next) {
    var itemId = req.params.id;
    var cart = new Cart(req.session.cart? req.session.cart : {});

    Product.greatRigs.findById(itemId,function (err, greatItem) {
        if(err){
            return res.redirect('/shop/recRigs');
        }
        cart.add(greatItem,greatItem.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop/recRigs');
    });


});

router.get('/addGame/:id',function (req, res, next) {
    var itemId = req.params.id;
    var cart = new Cart(req.session.cart? req.session.cart : {});

    Product.greatRigs.findById(itemId,function (err, gameItem) {
        if(err){
            return res.redirect('/shop/recRigs');
        }
        cart.add(gameItem,gameItem.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop/recRigs');
    });


});

router.get('/itemsCart', function (req, res, next) {
    if (!req.session.cart){
      return res.render('shop/itemsCart',{products:null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/itemsCart',{products: cart.generateArray(),totalPrice : cart.totalPrice});
});

router.get('/oComp/contact',function (req, res, next) {
    res.render('oComp/contact');
});
router.get('/oComp/aboutus',function (req, res, next) {
    res.render('oComp/aboutus');
});
router.get('/oComp/ThankFeed',function (req, res, next) {
    res.render('oComp/ThankFeed');
});
router.get('/oComp/contThank',function (req, res, next) {
    res.render('oComp/contThank');
});
router.get('/gallery',function (req, res, next) {
    res.render('oComp/gallery');
});
router.get('/admin/addProduct',function (req, res, next) {
    res.render('admin/addProduct');
});
router.get('/admin/addUser',function (req, res, next) {
    res.render('admin/addUser');
});

router.get('/shop/checkout' ,function (req, res, next) {
    if(!req.session.cart){
        return res.redirect('shop/checkout');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = null;
    errMsg = req.flash('error'[0]);
    res.render('shop/checkout',{total: cart.totalPrice, errMsg: errMsg});

});

router.post('/checkout',function (req, res, next) {
    // if (!req.session.cart) {
    //     return res.redirect('/itemsCart');
    // }

    var cart = new Cart(req.session.cart);

    // var stripe = require("stripe")(
    //     "sk_test_rs3g2KqIoDk7wAnCco5VQz4n"
    // );

    req.flash('success','Successfully bought the product!');
    cart = null;
    req.session.cart = null;
    res.redirect('/shop/orderSuccess');

    // stripe.charges.create({
    //     amount: cart.totalPrice * 100,
    //     currency: "USD",
    //     source: req.body.stripeToken, // obtained with Stripe.js
    //     description: "Test Charge"
    // }, function(err, charge) {
    //     if(err){
    //         req.flash('error',err.message);
    //         return res.redirect('/checkout');
    //     }
    //     req.flash('success','Successfully bought the product!');
    //     req.cart = null;
    //     res.redirect('/');
    // });

});

router.get('/shop/orderSuccess',function (req, res, next) {
    res.render('shop/orderSuccess');
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else if(req.isUnauthenticated()) {
        res.redirect('/');
    }

    res.redirect('/');
};

function isLoggedToCart(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else if(req.isUnauthenticated()) {
        res.redirect('/user/signin');
    }

    res.redirect('/');
};