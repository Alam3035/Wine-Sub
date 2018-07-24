const express = require("express");
const passport = require('passport');
const isLoggedIn = require('./utils/guard').isLoggedIn;

let redirectHomeIfLoggedIn = (req, res, next) => {
    console.log(req.session);
    if (!req.isAuthenticated())
        return next();
    res.redirect('/');
}

module.exports = class ViewRouter {

    router(knex) {
        let router = express.Router();

        //error handle
        router.use(function(err, req, res, next) {
            res.status(500).send("Something failded." + err);
        });

        // Homepage
        router.get('/', function(req, res) {
            res.render('index');
            console.log(req.user)
        });

        // Login
        router.get('/login', redirectHomeIfLoggedIn, function(req, res) {
            res.render('login');
        });

        router.post('/login', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));

        //Login with facebook
        router.get('/auth/facebook',
            passport.authenticate('facebook', {
                scope: ['email']
            })
        );

        router.get("/auth/facebook/callback", passport.authenticate('facebook', {
            failureRedirect: "/"
        }), (req, res) => res.redirect('/questionnaire'));

        // Signup
        router.get('/signup', redirectHomeIfLoggedIn, (req, res) => {
            res.render('signup');
        });

        let middleWare = (req, res, next) => {
            console.log(req.body);
            next();
        }

        router.post('/signup', middleWare, passport.authenticate('local-signup', {
            successRedirect: '/questionnaire',
            failureRedirect: '/error'
        }));

        // Logout
        router.get('/logout', isLoggedIn, function(req, res) {
            req.logout();
            res.redirect('/login');
        });

        // Signup error
        router.get('/error', (req, res) => {
            res.send('You are not logged in!');
        });

        // Questionnaire
        router.get('/questionnaire', isLoggedIn, function(req, res) {
            res.render('questionnaire');
        });

        // Questionnaire-Result
        router.get('/qr', isLoggedIn, function(req, res) {
            res.render('qr');
        });

        // Subscription
        router.get('/subscription', isLoggedIn, function(req, res) {
            res.render('subscription');
        });

        router.put('/api/subscription', function(req, res) {
            console.log(req.body);

            res.send('Message received');
            knex('order').insert({subscription: req.body.subscription}).then(function () {
            });        
        })

        // Checkout
        router.get('/checkout', isLoggedIn, function(req, res) {
            res.render('checkout');
        })

        // Transaction
        router.post('/tx', isLoggedIn, function(req, res) {
            console.log(req.body);
            res.send('Message received');
            knex('order').insert({
                txid: req.body
            }).then(function() {});
        })

        // Done Page
        router.get('/done', isLoggedIn, function(req, res) {
            res.render('done');
        })

        // Change Password
        router.get('/change-pw', isLoggedIn, function(req, res) {
            res.render('change-pw');
        })

        // Customer-Backend
        router.get('/customer-backend', isLoggedIn, function(req, res) {
            res.render('customer-backend');
        })

        return router;
    }
}